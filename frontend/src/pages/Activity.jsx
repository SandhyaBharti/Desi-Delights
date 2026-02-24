import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ entityType: '', action: '' });

    const entityTypes = ['product', 'order', 'user'];
    const actions = ['created', 'updated', 'deleted', 'ordered'];

    useEffect(() => {
        fetchActivities();
    }, [filter]);

    const fetchActivities = async () => {
        try {
            const params = {};
            if (filter.entityType) params.entityType = filter.entityType;
            if (filter.action) params.action = filter.action;

            const { data } = await api.get('/activity', { params });
            setActivities(data);
        } catch (err) {
            console.error('Failed to fetch activities:', err);
        } finally {
            setLoading(false);
        }
    };

    const getActivityIcon = (action) => {
        const icons = {
            created: '➕',
            updated: '✏️',
            deleted: '🗑️',
            ordered: '🛒'
        };
        return icons[action] || '📝';
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-5xl font-bold mb-2 gradient-text">Activity Log</h1>
                    <p className="text-slate-400 text-lg">Track all system activities</p>
                </div>

                {/* Filters */}
                <div className="card mb-8 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Entity Type</label>
                            <select
                                value={filter.entityType}
                                onChange={(e) => setFilter({ ...filter, entityType: e.target.value })}
                                className="input"
                            >
                                <option value="">All Types</option>
                                {entityTypes.map(type => (
                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Action</label>
                            <select
                                value={filter.action}
                                onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                                className="input"
                            >
                                <option value="">All Actions</option>
                                {actions.map(action => (
                                    <option key={action} value={action}>{action.charAt(0).toUpperCase() + action.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4 animate-fade-in">
                    {activities.map((activity) => (
                        <div key={activity._id} className="card">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl flex-shrink-0">
                                    {getActivityIcon(activity.action)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-semibold">{activity.description}</h3>
                                        <span className={`badge ${activity.action === 'created' ? 'badge-success' :
                                                activity.action === 'updated' ? 'badge-info' :
                                                    activity.action === 'deleted' ? 'badge-error' :
                                                        'badge-warning'
                                            }`}>
                                            {activity.action}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                        <span>👤 {activity.userName}</span>
                                        <span>📁 {activity.entityType}</span>
                                        <span>🕒 {new Date(activity.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {activities.length === 0 && (
                    <div className="card text-center py-12 text-slate-400">
                        <p className="text-xl">No activities found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activity;
