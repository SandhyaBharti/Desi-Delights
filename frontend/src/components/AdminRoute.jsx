import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500">
                <div className="text-center animate-fade-in">
                    <div className="text-7xl mb-6">🚫</div>
                    <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
                    <p className="text-slate-400 mb-6">This page is restricted to administrators only.</p>
                    <a href="/products" className="btn btn-primary">
                        Browse Products
                    </a>
                </div>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
