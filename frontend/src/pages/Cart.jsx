import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import ErrorMessage from '../components/ErrorMessage';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const orderData = {
            customerName,
            customerEmail,
            shippingAddress,
            items: cartItems.map(item => ({
                productId: item._id,
                quantity: item.quantity
            }))
        };

        try {
            await api.post('/orders', orderData);
            clearCart();
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-5xl font-bold mb-2 gradient-text">Shopping Cart</h1>
                    <p className="text-slate-400 text-lg">Review your items and checkout</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="card text-center py-12 animate-fade-in">
                        <p className="text-xl text-slate-400 mb-4">Your cart is empty</p>
                        <button onClick={() => navigate('/products')} className="btn btn-primary">
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4 animate-fade-in">
                            {cartItems.map((item) => (
                                <div key={item._id} className="card">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                                            <p className="text-slate-400 text-sm mb-2">{item.category}</p>
                                            <p className="text-2xl font-bold text-green-400">₹{item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                disabled={item.quantity >= item.stock}
                                                className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 transition-colors disabled:opacity-50"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-bold mb-2">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Form */}
                        <div className="animate-fade-in">
                            <div className="card sticky top-24">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                                <div className="border-t border-slate-700 pt-4 mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-400">Items ({cartItems.length})</span>
                                        <span>₹{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold border-t border-slate-700 pt-2">
                                        <span>Total</span>
                                        <span className="text-green-400">₹{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>

                                <ErrorMessage message={error} />

                                <form onSubmit={handleCheckout} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="John Doe"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="john@example.com"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Shipping Address</label>
                                        <textarea
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                            placeholder="123 Main St, City, Country"
                                            className="input min-h-[80px]"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                        {loading ? 'Processing...' : 'Place Order'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
