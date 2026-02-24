import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [adminSecret, setAdminSecret] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showAdminSecret, setShowAdminSecret] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password, role, adminSecret);
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                err.message ||
                'Failed to register';
            setError(errorMessage);
            console.error('Registration error:', err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl animate-float top-10 left-10"></div>
                <div className="absolute w-96 h-96 bg-purple-100/30 rounded-full blur-3xl animate-float-delayed bottom-10 right-10"></div>
                <div className="absolute w-64 h-64 bg-pink-100/30 rounded-full blur-2xl animate-float-delayed-2 top-1/2 left-1/2"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="glass-morphism rounded-3xl p-8 shadow-2xl animate-scale-in">
                    {/* Logo and header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg animate-bounce-soft">
                            <span className="text-4xl">🛒</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2 gradient-text">
                            Create Account
                        </h1>
                        <p className="text-slate-600 text-lg">Join Desi Delights today</p>
                    </div>

                    <ErrorMessage message={error} />

                    {/* Role selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
                            Register as
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => { setRole('user'); setAdminSecret(''); }}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${role === 'user' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'}`}
                            >
                                <div className="text-center">
                                    <span className="text-2xl mb-2 block">👤</span>
                                    <p className="text-sm font-semibold">User</p>
                                    <p className="text-xs mt-1">Browse & Shop</p>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${role === 'admin' ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'}`}
                            >
                                <div className="text-center">
                                    <span className="text-2xl mb-2 block">🛡️</span>
                                    <p className="text-sm font-semibold">Admin</p>
                                    <p className="text-xs mt-1">Full Access</p>
                                </div>
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            {role === 'user'
                                ? 'You can browse products, add to cart & place orders'
                                : 'You get full access to manage products, orders & analytics'}
                        </p>
                    </div>

                    {/* Admin Secret Key — only shown for admin role */}
                    {role === 'admin' && (
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                🔑 Admin Secret Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showAdminSecret ? "text" : "password"}
                                    value={adminSecret}
                                    onChange={(e) => setAdminSecret(e.target.value)}
                                    placeholder="Enter admin secret key"
                                    className="input pr-12"
                                    required={role === 'admin'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowAdminSecret(!showAdminSecret)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                                    aria-label={showAdminSecret ? "Hide admin secret" : "Show admin secret"}
                                >
                                    {showAdminSecret ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Contact your system administrator for the secret key.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                👤Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="input"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                📧Email
                            </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                🔒Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                🔒Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    className="input pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn w-full font-bold py-3 ${role === 'admin' ? 'btn-secondary' : 'btn-primary'}`}
                            disabled={loading}
                        >
                            {loading
                                ? 'Creating account...'
                                : `Sign Up as ${role === 'admin' ? '🛡️Admin' : '👤User'}`}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-slate-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
