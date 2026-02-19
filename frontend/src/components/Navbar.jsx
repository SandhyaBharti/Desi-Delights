import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to={isAdmin ? '/' : '/products'}
                        className="flex items-center gap-2 text-xl font-bold text-white hover:scale-105 transition-transform"
                    >
                        <span className="text-2xl">🛒</span>
                        <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                            Desi Delights
                        </span>
                    </Link>

                    {user && (
                        <div className="flex items-center gap-4">
                            {/* Admin-only nav links */}
                            {isAdmin && (
                                <>
                                    <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                        Dashboard
                                    </Link>
                                    <Link to="/activity" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                        Activity
                                    </Link>
                                </>
                            )}

                            {/* Common nav links */}
                            <Link to="/products" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                Products
                            </Link>
                            <Link to="/orders" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                Orders
                            </Link>
                            <Link to="/cart" className="relative text-lg text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-primary/10 transition-all">
                                <span>🛒</span>
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                                {/* User info + role badge */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="text-white font-medium text-sm">{user.name}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isAdmin
                                            ? 'bg-secondary/20 text-secondary border border-secondary/40'
                                            : 'bg-primary/20 text-primary-light border border-primary/40'
                                        }`}>
                                        {isAdmin ? '🛡️ Admin' : '👤 User'}
                                    </span>
                                </div>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                    Logout
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
