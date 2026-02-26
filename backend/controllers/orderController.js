import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { logActivity } from '../utils/activityLogger.js';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
    try {
        const { status, sortBy, order } = req.query;

        let query = {};

        // Regular users can only see their own orders
        if (req.user.role !== 'admin') {
            query.userId = req.user._id;
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Sort options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1; // Default: newest first
        }

        const orders = await Order.find(query)
            .populate('userId', 'name email')
            .populate('items.productId', 'name')
            .sort(sortOptions);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('items.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, items, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Validate stock and calculate total
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }

            // Reduce stock
            product.stock -= item.quantity;
            await product.save();

            orderItems.push({
                productId: product._id,
                productName: product.name,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;
        }

        // Create order
        const order = await Order.create({
            userId: req.user._id,
            customerName,
            customerEmail,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        // Log activity
        await logActivity({
            userId: req.user._id,
            userName: req.user.name,
            entityType: 'order',
            entityId: order._id,
            entityName: `Order #${order._id.toString().slice(-6)}`,
            action: 'ordered',
            description: `Created order with ${items.length} items - Total: ₹${totalAmount}`
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        const updatedOrder = await order.save();

        // Log activity
        await logActivity({
            userId: req.user._id,
            userName: req.user.name,
            entityType: 'order',
            entityId: order._id,
            entityName: `Order #${order._id.toString().slice(-6)}`,
            action: 'updated',
            description: `Updated order status to: ${status}`
        });

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.deleteOne();
        res.json({ message: 'Order removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
