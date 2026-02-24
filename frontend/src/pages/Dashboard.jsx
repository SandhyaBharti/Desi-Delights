import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const { data } = await api.get('/analytics');
            setAnalytics(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="card border border-red-200 bg-red-50 text-red-700 px-6 py-4 rounded-xl animate-slide-up">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <p className="font-semibold">Error</p>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    if (!analytics) return null;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-5xl font-bold mb-2 gradient-text">Analytics Dashboard</h1>
                    <p className="text-slate-600 text-lg">Overview of your inventory and sales performance</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card-hover p-6 animate-slide-up" style={{ animationDelay: '0ms' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Products</p>
                                <p className="text-3xl font-bold text-slate-800">{analytics.totalProducts || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Orders</p>
                                <p className="text-3xl font-bold text-slate-800">{analytics.totalOrders || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                                <p className="text-3xl font-bold text-slate-800">${analytics.totalRevenue || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Users</p>
                                <p className="text-3xl font-bold text-slate-800">{analytics.totalUsers || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="card p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Sales Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analytics.salesTrend || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="date" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'white', 
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px'
                                    }} 
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="sales" 
                                    stroke="#6366f1" 
                                    strokeWidth={2}
                                    dot={{ fill: '#6366f1', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Product Categories</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analytics.categories || []}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {(analytics.categories || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="card p-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Order ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Customer</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Amount</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(analytics.recentOrders || []).map((order, index) => (
                                    <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="py-3 px-4 text-sm text-slate-800">#{order._id?.slice(-6) || 'N/A'}</td>
                                        <td className="py-3 px-4 text-sm text-slate-800">{order.user?.name || 'N/A'}</td>
                                        <td className="py-3 px-4 text-sm text-slate-800">${order.totalAmount || 0}</td>
                                        <td className="py-3 px-4">
                                            <span className={`badge ${
                                                order.status === 'completed' ? 'badge-success' :
                                                order.status === 'pending' ? 'badge-warning' :
                                                'badge-error'
                                            }`}>
                                                {order.status || 'Unknown'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(analytics.recentOrders || []).length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-slate-500">No recent orders found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
