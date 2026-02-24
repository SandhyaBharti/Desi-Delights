import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <nav className="sticky top-0 z-50 glass-morphism border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to={isAdmin ? '/' : '/products'}
                        className="group flex items-center gap-3 text-2xl font-bold hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative">
                            <span className="text-3xl block transform group-hover:rotate-12 transition-transform duration-300">🛒</span>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse-soft"></div>
                        </div>
                        <span className="gradient-text font-extrabold tracking-tight animate-pulse-soft hover:animate-bounce transition-all duration-300">
                            Desi Delights
                        </span>
                    </Link>

                    {user && (
                        <div className="flex items-center gap-6">
                            {/* Admin-only nav links */}
                            {isAdmin && (
                                <div className="hidden md:flex items-center gap-2">
                                    <Link to="/" className="nav-link">
                                        <span className="flex items-center gap-2">
                                            <span className="text-lg">📊</span>
                                            <span className="font-semibold">Dashboard</span>
                                        </span>
                                    </Link>
                                    <Link to="/activity" className="nav-link">
                                        <span className="flex items-center gap-2">
                                            <span className="text-lg">📋</span>
                                            <span className="font-semibold">Activity</span>
                                        </span>
                                    </Link>
                                </div>
                            )}

                            {/* Common nav links */}
                            <div className="hidden lg:flex items-center gap-2">
                                <Link to="/products" className="nav-link">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">📦</span>
                                        <span className="font-semibold">Products</span>
                                    </span>
                                </Link>
                                <Link to="/orders" className="nav-link">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">📋</span>
                                        <span className="font-semibold">Orders</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Cart with enhanced badge */}
                            <Link to="/cart" className="relative group">
                                <div className="nav-link p-3">
                                    <span className="text-2xl block group-hover:scale-110 transition-transform">🛒</span>
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-lg animate-bounce-soft">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            {/* User section with dropdown */}
                            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                                {/* User profile dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="flex items-center gap-3 hover:scale-105 transition-all duration-300"
                                    >
                                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                                            isAdmin
                                                ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-700 border-purple-300/50'
                                                : 'bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-700 border-indigo-300/50'
                                        }`}>
                                            {isAdmin ? '🛡️ Admin' : '👤 User'}
                                        </div>
                                        <span className="text-slate-700 font-bold text-sm">{user.name}</span>
                                        <span className="text-slate-400 text-xs">
                                            {showProfileDropdown ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    
                                    {/* Profile Dropdown */}
                                    {showProfileDropdown && (
                                        <div className="absolute right-0 mt-2 w-64 glass-morphism border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                                            <div className="p-4 border-b border-slate-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-800 font-bold">{user.name}</p>
                                                        <p className="text-slate-600 text-xs">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <div className="px-3 py-2 text-slate-600 text-xs">
                                                    Role: {isAdmin ? 'Administrator' : 'Customer'}
                                                </div>
                                                <div className="px-3 py-2 text-slate-600 text-xs">
                                                    Member since: {new Date().toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Logout button */}
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-ghost group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>➜</span>
                                        <span className="hidden sm:inline">Logout</span>
                                    </span>
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button className="btn btn-ghost p-2">
                                    <span className="text-xl">📱</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
