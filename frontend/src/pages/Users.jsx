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
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (err) {
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
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-5xl font-bold mb-2 gradient-text">Users</h1>
                        <p className="text-slate-600 text-lg">Manage user accounts and permissions</p>
                    </div>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
                        <div className="card-hover bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm">Total Users</p>
                                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                                </div>
                                <div className="text-4xl">👥</div>
                            </div>
                        </div>
                        <div className="card-hover bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm">Admin Users</p>
                                    <p className="text-3xl font-bold">{stats.adminUsers}</p>
                                </div>
                                <div className="text-4xl">🛡️</div>
                            </div>
                        </div>
                        <div className="card-hover bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm">Regular Users</p>
                                    <p className="text-3xl font-bold">{stats.regularUsers}</p>
                                </div>
                                <div className="text-4xl">👤</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="card-hover mb-8 animate-slide-up">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                                    🔍
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="input pl-12"
                                />
                            </div>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="input"
                            >
                                <option value="all">All Users</option>
                                <option value="admin">Admin Users</option>
                                <option value="user">Regular Users</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <ErrorMessage message={error} />

                {/* Users Table */}
                <div className="card-hover animate-fade-in">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left p-4 font-semibold text-slate-700">User</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Role</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Joined</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold text-slate-800">{user.name}</p>
                                                <p className="text-sm text-slate-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                                                        : 'bg-blue-100 text-blue-700 border-blue-300'
                                                } border`}
                                            >
                                                <option value="user">👤 User</option>
                                                <option value="admin">🛡️ Admin</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-slate-600">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn btn-danger btn-sm"
                                                title="Delete user"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">👥</div>
                                <h3 className="text-xl font-semibold text-slate-700 mb-2">No users found</h3>
                                <p className="text-slate-500">
                                    {search || roleFilter !== 'all'
                                        ? 'Try adjusting your search or filters'
                                        : 'No users have registered yet'}
                                </p>
                            </div>
                        )}
                    </div>
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
