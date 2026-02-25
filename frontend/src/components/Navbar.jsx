import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeSecret, setUpgradeSecret] = useState('');
    const [upgradeError, setUpgradeError] = useState('');
    const [upgradeLoading, setUpgradeLoading] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
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
        setShowMobileMenu(false);
    };

    const handleUpgradeRole = async (e) => {
        e.preventDefault();
        setUpgradeError('');
        setUpgradeLoading(true);
        try {
            const { data } = await api.put('/auth/update-role', { adminSecret: upgradeSecret });
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.reload();
        } catch (err) {
            setUpgradeError(err.response?.data?.message || 'Failed to upgrade role');
        } finally {
            setUpgradeLoading(false);
        }
    };

    const isAdmin = user?.role === 'admin';

    return (
        <nav className="sticky top-0 z-50 glass-morphism border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-0.5 sm:px-1 lg:px-8">
                {/* Mobile/Tablet Header - Compact */}
                <div className="flex items-center justify-between lg:hidden">
                    {/* Logo - Left side, only on mobile and tablet */}
                    <Link
                        to={isAdmin ? '/' : '/products'}
                        className="group flex items-center gap-1 text-sm sm:text-base font-bold hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative">
                            <span className="text-sm sm:text-base block transform group-hover:rotate-12 transition-transform duration-300">🛒</span>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse-soft"></div>
                        </div>
                        <span className="gradient-text font-extrabold tracking-tight animate-pulse-soft hover:animate-bounce transition-all duration-300 hidden sm:block text-[8px] sm:text-xs">
                            iNet Mart
                        </span>
                        <span className="gradient-text font-extrabold tracking-tight animate-pulse-soft hover:animate-bounce transition-all duration-300 sm:hidden text-xs">
                            iNM
                        </span>
                    </Link>

                    {/* Mobile menu button - Right side, only on mobile and tablet */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="p-1 rounded hover:bg-slate-100 transition-colors bg-slate-50/50"
                    >
                        <span className="text-[10px] sm:text-xs">☰</span>
                    </button>
                </div>

                {/* Desktop Navigation - Only on large screens */}
                <div className="hidden lg:flex items-center justify-between">
                    {/* Logo - Left side */}
                    <Link
                        to={isAdmin ? '/' : '/products'}
                        className="group flex items-center gap-1 text-sm sm:text-base lg:text-xl font-bold hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative">
                            <span className="text-sm sm:text-base lg:text-xl block transform group-hover:rotate-12 transition-transform duration-300">🛒</span>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse-soft"></div>
                        </div>
                        <span className="gradient-text font-extrabold tracking-tight animate-pulse-soft hover:animate-bounce transition-all duration-300 text-[8px] sm:text-xs lg:text-base">
                            iNet Mart
                        </span>
                    </Link>

                    {/* Navigation items - Right side with proper spacing */}
                    <div className="flex items-center gap-4">
                        {/* Common nav links - Always visible */}
                        <div className="flex items-center gap-2">
                            {user && isAdmin && (
                                <>
                                    <Link to="/" className="nav-link">
                                        <span className="flex items-center gap-2">
                                            <span className="text-base lg:text-lg">📊</span>
                                            <span className="font-semibold text-sm lg:text-base">Dashboard</span>
                                        </span>
                                    </Link>

                                    <Link to="/users" className="nav-link">
                                        <span className="flex items-center gap-2">
                                            <span className="text-base lg:text-lg">👥</span>
                                            <span className="font-semibold text-sm lg:text-base">Users</span>
                                        </span>
                                    </Link>

                                    <Link to="/activity" className="nav-link">
                                        <span className="flex items-center gap-2">
                                            <span className="text-base lg:text-lg">📋</span>
                                            <span className="font-semibold text-sm lg:text-base">Activity</span>
                                        </span>
                                    </Link>
                                </>
                            )}
                            {user && (
                                <Link to="/products" className="nav-link">
                                    <span className="flex items-center gap-2">
                                        <span className="text-base lg:text-lg">📦</span>
                                        <span className="font-semibold text-sm lg:text-base">Products</span>
                                    </span>
                                </Link>
                            )}
                            {user && (
                                <Link to="/orders" className="nav-link">
                                    <span className="flex items-center gap-2">
                                        <span className="text-base lg:text-lg">📋</span>
                                        <span className="font-semibold text-sm lg:text-base">Orders</span>
                                    </span>
                                </Link>
                            )}
                            <Link to="/cart" className="relative group">
                                <div className="nav-link p-2">
                                    <span className="text-lg lg:text-xl block group-hover:scale-110 transition-transform">🛒</span>
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-lg animate-bounce-soft">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </div>

                        {/* User section */}
                        {user && (
                            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
                                    >
                                        <div className={`px-2 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${isAdmin
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
                                            {!isAdmin && (
                                                <div className="mt-2 border-t border-slate-200 pt-2">
                                                    {!showUpgrade ? (
                                                        <button
                                                            onClick={() => setShowUpgrade(true)}
                                                            className="w-full text-left px-3 py-2 text-xs text-purple-600 font-semibold hover:bg-purple-50 rounded-lg transition-colors"
                                                        >
                                                            🛡️ Upgrade to Admin
                                                        </button>
                                                    ) : (
                                                        <form onSubmit={handleUpgradeRole} className="px-3 py-2 space-y-2">
                                                            <p className="text-xs font-semibold text-slate-700">Enter Admin Secret Key:</p>
                                                            <input
                                                                type="password"
                                                                value={upgradeSecret}
                                                                onChange={(e) => setUpgradeSecret(e.target.value)}
                                                                placeholder="Admin secret key"
                                                                className="w-full text-xs border border-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-purple-400"
                                                                autoFocus
                                                            />
                                                            {upgradeError && <p className="text-red-500 text-xs">{upgradeError}</p>}
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="submit"
                                                                    disabled={upgradeLoading}
                                                                    className="flex-1 bg-purple-600 text-white text-xs py-1.5 rounded-lg hover:bg-purple-700 transition-colors"
                                                                >
                                                                    {upgradeLoading ? '...' : 'Confirm'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => { setShowUpgrade(false); setUpgradeError(''); setUpgradeSecret(''); }}
                                                                    className="flex-1 bg-slate-200 text-slate-600 text-xs py-1.5 rounded-lg hover:bg-slate-300 transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="btn btn-ghost group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>➜</span>
                                    <span>Logout</span>
                                </span>
                            </button>
                        </div>
                    )}

                    {!user && (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
                </div>

                {/* Mobile Menu - Always Available */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-slate-200 glass-morphism" ref={mobileMenuRef}>
                        <div className="px-4 py-3 space-y-2">
                            {/* Admin-only mobile links - First in order */}
                            {user && isAdmin && (
                                <>
                                    <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                        <span className="flex items-center gap-2">
                                            <span className="text-sm">📊</span>
                                            <span className="font-semibold text-xs">Dashboard</span>
                                        </span>
                                    </Link>

                                    <Link to="/users" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                        <span className="flex items-center gap-2">
                                            <span className="text-sm">👥</span>
                                            <span className="font-semibold text-xs">Users</span>
                                        </span>
                                    </Link>

                                    <Link to="/activity" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                        <span className="flex items-center gap-2">
                                            <span className="text-sm">📋</span>
                                            <span className="font-semibold text-xs">Activity</span>
                                        </span>
                                    </Link>
                                </>
                            )}

                            {/* Common mobile links - Only for logged-in users */}
                            {user && (
                                <Link to="/products" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                    <span className="flex items-center gap-2">
                                        <span className="text-sm">📦</span>
                                        <span className="font-semibold text-xs">Products</span>
                                    </span>
                                </Link>
                            )}

                            {/* Orders link - Only for logged-in users */}
                            {user && (
                                <Link to="/orders" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                    <span className="flex items-center gap-2">
                                        <span className="text-sm">📋</span>
                                        <span className="font-semibold text-xs">Orders</span>
                                    </span>
                                </Link>
                            )}

                            {/* Cart link - Only for logged-in users */}
                            {user && (
                                <Link to="/cart" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                    <span className="flex items-center gap-2">
                                        <span className="text-sm">🛒</span>
                                        <span className="font-semibold text-xs">Cart</span>
                                        {getTotalItems() > 0 && (
                                            <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full">
                                                {getTotalItems()}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            )}

                            {user ? (
                                /* User info and logout */
                                <div className="border-t border-slate-200 pt-2 mt-2">
                                    <div className="px-3 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`px-2 py-1 rounded-full text-[10px] font-bold border ${isAdmin
                                                ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-700 border-purple-300/50'
                                                : 'bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-700 border-indigo-300/50'
                                                }`}>
                                                {isAdmin ? '🛡️ Admin' : '👤 User'}
                                            </div>
                                            <div>
                                                <p className="text-slate-800 font-bold text-xs">{user.name}</p>
                                                <p className="text-slate-600 text-[10px]">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-semibold text-xs"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>➜</span>
                                            <span>Logout</span>
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                /* Auth buttons for non-logged in users */
                                <div className="border-t border-slate-200 pt-2 mt-2 space-y-2">
                                    <Link to="/login" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                        <span className="flex items-center gap-2">
                                            <span className="text-sm">🔑</span>
                                            <span className="font-semibold text-xs">Login</span>
                                        </span>
                                    </Link>
                                    <Link to="/register" className="block px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setShowMobileMenu(false)}>
                                        <span className="flex items-center gap-2">
                                            <span className="text-sm">📝</span>
                                            <span className="font-semibold text-xs">Register</span>
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
