import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Activity from '../models/Activity.js';
import User from '../models/User.js';

// @desc    Get analytics data
// @route   GET /api/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
    try {
        // Counts
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();

        // Total Revenue
        const revenueResult = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        // Category Distribution for pie chart → { name, value }
        const categoryStats = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const categories = categoryStats.map(c => ({ name: c._id || 'Other', value: c.count }));

        // Sales Trend (Last 7 days) → { date, sales }
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const salesTrendRaw = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    sales: { $sum: '$totalAmount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const salesTrend = salesTrendRaw.map(s => ({ date: s._id, sales: s.sales }));

        // Recent Orders
        const recentOrders = await Order.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalProducts,
            totalOrders,
            totalRevenue,
            totalUsers,
            categories,
            salesTrend,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get inventory insights
// @route   GET /api/analytics/inventory
// @access  Private
export const getInventoryInsights = async (req, res) => {
    try {
        const lowStockAlerts = await Product.find({ stock: { $lte: 10 }, status: 'active' })
            .select('name category stock')
            .sort({ stock: 1 });

        const categoryDistribution = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalStock: { $sum: '$stock' },
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
                }
            }
        ]);

        res.json({
            lowStockAlerts,
            categoryDistribution
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
