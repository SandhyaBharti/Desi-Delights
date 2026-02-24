import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');

    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const fetchOrders = async () => {
        try {
            const params = statusFilter ? { status: statusFilter } : {};
            const { data } = await api.get('/orders', { params });
            setOrders(data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}`, { status: newStatus });
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (err) {
            alert('Failed to update order status');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-5xl font-bold mb-2 gradient-text">Orders</h1>
                    <p className="text-slate-400 text-lg">Manage customer orders</p>
                </div>

                {/* Status Filter */}
                <div className="card mb-8 animate-fade-in">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input max-w-xs"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map(status => (
                            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Orders List */}
                <div className="space-y-6 animate-fade-in">
                    {orders.map((order) => (
                        <div key={order._id} className="card">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Order #{order._id.slice(-6)}</h3>
                                    <p className="text-slate-400 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <span className={`badge ${order.status === 'delivered' ? 'badge-success' :
                                    order.status === 'cancelled' ? 'badge-error' :
                                        order.status === 'shipped' ? 'badge-info' :
                                            'badge-warning'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-slate-400 text-sm">Customer</p>
                                    <p className="font-medium">{order.customerName}</p>
                                    <p className="text-sm text-slate-400">{order.customerEmail}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">Shipping Address</p>
                                    <p className="text-sm">{order.shippingAddress}</p>
                                </div>
                            </div>

                            <div className="border-t border-slate-700 pt-4 mb-4">
                                <h4 className="font-semibold mb-3">Order Items</h4>
                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <span>{item.productName} × {item.quantity}</span>
                                            <span className="text-green-400 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                                <div>
                                    <p className="text-slate-400 text-sm">Total Amount</p>
                                    <p className="text-2xl font-bold text-green-400">₹{order.totalAmount.toFixed(2)}</p>
                                </div>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                    className="input max-w-[200px]"
                                >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <p className="text-xl">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
