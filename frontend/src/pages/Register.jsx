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
            navigate(role === 'admin' ? '/' : '/products');
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="text-slate-400">Join Desi Delights today</p>
                    </div>

                    <ErrorMessage message={error} />

                    {/* Role Toggle */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-300 mb-3 text-center">
                            Register as
                        </label>
                        <div className="flex rounded-lg overflow-hidden border border-slate-600 bg-slate-900/50">
                            <button
                                type="button"
                                onClick={() => { setRole('user'); setAdminSecret(''); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all duration-200 ${role === 'user'
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                            >
                                <span className="text-lg">👤</span>
                                User
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all duration-200 ${role === 'admin'
                                    ? 'bg-secondary text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                            >
                                <span className="text-lg">🛡️</span>
                                Admin
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            {role === 'user'
                                ? 'You can browse products, add to cart & place orders'
                                : 'You get full access to manage products, orders & analytics'}
                        </p>

                        {/* Admin Secret Key — only shown for admin role */}
                        {role === 'admin' && (
                            <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                <label className="block text-sm font-medium text-amber-400 mb-2">
                                    🔑 Admin Secret Key
                                </label>
                                <input
                                    type="password"
                                    value={adminSecret}
                                    onChange={(e) => setAdminSecret(e.target.value)}
                                    placeholder="Enter the admin secret key"
                                    className="input border-amber-500/40 focus:border-amber-400"
                                    required={role === 'admin'}
                                />
                                <p className="text-xs text-amber-500/70 mt-2">Contact your system administrator for the secret key.</p>
                            </div>
                        )}

                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
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

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn w-full font-bold py-3 ${role === 'admin' ? 'btn-secondary' : 'btn-primary'}`}
                            disabled={loading}
                        >
                            {loading
                                ? 'Creating account...'
                                : `Sign Up as ${role === 'admin' ? '🛡️ Admin' : '👤 User'}`}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-slate-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-light hover:text-primary font-semibold transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
