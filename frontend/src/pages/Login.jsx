import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(email, password);
            // Redirect based on role
            navigate(data.role === 'admin' ? '/' : '/products');
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                err.message ||
                'Failed to login';
            setError(errorMessage);
            console.error('Login error:', err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400">Sign in to your account</p>
                    </div>

                    {/* Role hint */}
                    <div className="flex gap-3 mb-6">
                        <div className="flex-1 flex items-center gap-2 bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3">
                            <span className="text-xl">👤</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-300">User</p>
                                <p className="text-xs text-slate-500">Browse, cart & orders</p>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center gap-2 bg-slate-900/60 border border-secondary/30 rounded-lg px-4 py-3">
                            <span className="text-xl">🛡️</span>
                            <div>
                                <p className="text-xs font-semibold text-secondary">Admin</p>
                                <p className="text-xs text-slate-500">Full access</p>
                            </div>
                        </div>
                    </div>

                    <ErrorMessage message={error} />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-3 font-bold" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-light hover:text-primary font-semibold transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
