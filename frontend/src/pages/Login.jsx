import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Background decorations - Responsive sizes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-indigo-100/30 rounded-full blur-3xl animate-float top-5 sm:top-10 left-5 sm:left-10"></div>
                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-100/30 rounded-full blur-3xl animate-float-delayed bottom-5 sm:bottom-10 right-5 sm:right-10"></div>
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-pink-100/30 rounded-full blur-2xl animate-float-delayed-2 top-1/2 left-1/2"></div>
            </div>

            <div className="w-full max-w-sm sm:max-w-md relative z-10">
                <div className="glass-morphism rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl animate-scale-in">
                    {/* Logo and header - Responsive */}
                    <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg animate-bounce-soft">
                            <span className="text-2xl sm:text-3xl lg:text-4xl">🛒</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 gradient-text">
                            Welcome
                        </h1>
                        <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Sign in to your iNet Mart account</p>
                    </div>

                    {/* Role selection - Responsive */}
                    <div className="mb-4 sm:mb-6">
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3 text-center">
                            Select Your Role
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('user')}
                                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-105 ${role === 'user'
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
                                    }`}
                            >
                                <div className="text-center">
                                    <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">👤</span>
                                    <p className="text-xs sm:text-sm font-semibold">User</p>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-105 ${role === 'admin'
                                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                                    }`}
                            >
                                <div className="text-center">
                                    <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">🛡️</span>
                                    <p className="text-xs sm:text-sm font-semibold">Admin</p>
                                    <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Full Access</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    <ErrorMessage message={error} />

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                                📧 Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                                🔒 Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input pr-10 sm:pr-12 text-sm sm:text-base"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary w-full py-3 sm:py-4 font-bold text-sm sm:text-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-sm sm:text-base">🚀</span>
                                    Sign In
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Footer - Responsive */}
                    <div className="mt-4 sm:mt-6 text-center">
                        <p className="text-slate-600 text-xs sm:text-sm">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors hover:underline underline-offset-4"
                            >
                                Sign Up Now
                            </Link>
                        </p>
                    </div>

                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200">
                        <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                            By signing in, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>

                {/* Quick demo info - Responsive */}
                <div className="mt-4 sm:mt-6 text-center">
                    <div className="glass-morphism rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
                        <p className="text-[10px] sm:text-xs text-slate-600 mb-1 sm:mb-2">Quick Demo Access:</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
                            <div>
                                <span className="text-indigo-600 font-semibold">User:</span> user@test.com
                            </div>
                            <div>
                                <span className="text-purple-600 font-semibold">Admin:</span> admin@test.com
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Password: password123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
