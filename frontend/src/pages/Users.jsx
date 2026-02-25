import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log('Fetching users...');
            const { data } = await api.get('/users');
            console.log('Users fetched:', data);
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/users/stats');
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/users/${userId}/role`, { role: newRole });
            fetchUsers(); // Refresh users list
            fetchStats(); // Refresh stats
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/users/${userId}`);
                fetchUsers(); // Refresh users list
                fetchStats(); // Refresh stats
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 animate-fade-in gap-2">
                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-1 gradient-text">Users</h1>
                        <p className="text-slate-600 text-[10px] sm:text-xs lg:text-sm">Manage user accounts and permissions</p>
                    </div>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2 lg:gap-4 mb-3 sm:mb-4 lg:mb-6 animate-slide-up">
                        <div className="card-hover bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 sm:p-2.5 lg:p-4 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-[8px] sm:text-[10px] lg:text-xs">Total Users</p>
                                    <p className="text-sm sm:text-base lg:text-xl font-bold">{stats.totalUsers}</p>
                                </div>
                                <div className="text-sm sm:text-base lg:text-2xl">👥</div>
                            </div>
                        </div>
                        <div className="card-hover bg-gradient-to-br from-purple-500 to-purple-600 text-white p-2 sm:p-2.5 lg:p-4 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-[8px] sm:text-[10px] lg:text-xs">Admin Users</p>
                                    <p className="text-sm sm:text-base lg:text-xl font-bold">{stats.adminUsers}</p>
                                </div>
                                <div className="text-sm sm:text-base lg:text-2xl">🛡️</div>
                            </div>
                        </div>
                        <div className="card-hover bg-gradient-to-br from-green-500 to-green-600 text-white p-2 sm:p-2.5 lg:p-4 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-[8px] sm:text-[10px] lg:text-xs">Regular Users</p>
                                    <p className="text-sm sm:text-base lg:text-xl font-bold">{stats.regularUsers}</p>
                                </div>
                                <div className="text-sm sm:text-base lg:text-2xl">👤</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="card-hover mb-3 sm:mb-4 lg:mb-6 animate-slide-up">
                    <div className="p-2.5 sm:p-3 lg:p-4">
                        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                            <div className="relative">
                                <span className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                    🔍
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="input pl-7 sm:pl-8 text-xs sm:text-sm lg:text-base py-2 sm:py-2"
                                />
                            </div>

                            <div>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="input text-xs sm:text-sm lg:text-base py-2 sm:py-2"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <ErrorMessage message={error} />

                {/* Users Table */}
                <div className="card-hover animate-fade-in">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left p-3 lg:p-4 font-semibold text-slate-700 text-sm">User</th>
                                    <th className="text-left p-3 lg:p-4 font-semibold text-slate-700 text-sm">Role</th>
                                    <th className="text-left p-3 lg:p-4 font-semibold text-slate-700 text-sm">Joined</th>
                                    <th className="text-left p-3 lg:p-4 font-semibold text-slate-700 text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="p-3 lg:p-4">
                                            <div>
                                                <p className="font-semibold text-slate-800 text-sm lg:text-base">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-3 lg:p-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                                                        : 'bg-blue-100 text-blue-700 border-blue-300'
                                                } border`}
                                            >
                                                <option value="user">👤 User</option>
                                                <option value="admin">🛡️ Admin</option>
                                            </select>
                                        </td>
                                        <td className="p-3 lg:p-4">
                                            <p className="text-xs text-slate-600">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="p-3 lg:p-4">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn btn-danger btn-sm text-xs"
                                                title="Delete user"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile/Tablet Cards */}
                    <div className="lg:hidden space-y-2 sm:space-y-3">
                        {filteredUsers.map((user) => (
                            <div key={user._id} className="card p-2 sm:p-3 border border-slate-200 rounded-lg">
                                <div className="flex flex-col gap-2 sm:gap-3">
                                    {/* User Info */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{user.name}</p>
                                            <p className="text-[8px] sm:text-[10px] text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="btn btn-danger btn-xs text-[8px] sm:text-xs flex-shrink-0 ml-2"
                                            title="Delete user"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    {/* Role and Date */}
                                    <div className="flex items-center justify-between">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className={`px-2 py-1 rounded-full text-[8px] sm:text-[10px] font-medium flex-shrink-0 ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700 border-purple-300'
                                                    : 'bg-blue-100 text-blue-700 border-blue-300'
                                            } border`}
                                        >
                                            <option value="user">👤 User</option>
                                            <option value="admin">🛡️ Admin</option>
                                        </select>
                                        <p className="text-[8px] sm:text-[10px] text-slate-600 flex-shrink-0">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-6 sm:py-8 lg:py-12">
                            <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">👥</div>
                            <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-slate-700 mb-1 sm:mb-2">No users found</h3>
                            <p className="text-xs sm:text-sm text-slate-500">
                                {search || roleFilter !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'No users have registered yet'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Recent Users */}
                {stats?.recentUsers && stats.recentUsers.length > 0 && (
                    <div className="mt-8 card-hover animate-slide-up">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Users</h3>
                            <div className="space-y-3">
                                {stats.recentUsers.map((user) => (
                                    <div key={user._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{user.name}</p>
                                                <p className="text-sm text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {user.role}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
