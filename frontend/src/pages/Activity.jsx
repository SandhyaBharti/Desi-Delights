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
        <div className="min-h-screen py-6 sm:py-8">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-1 sm:mb-2 gradient-text">Activity Log</h1>
                    <p className="text-slate-400 text-xs sm:text-sm lg:text-lg">Track all system activities</p>
                </div>

                {/* Filters */}
                <div className="card mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
                    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        <div>
                            <label className="block text-[10px] sm:text-xs lg:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Entity Type</label>
                            <select
                                value={filter.entityType}
                                onChange={(e) => setFilter({ ...filter, entityType: e.target.value })}
                                className="input text-xs sm:text-sm lg:text-base py-2 sm:py-3"
                            >
                                <option value="">All Types</option>
                                {entityTypes.map(type => (
                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] sm:text-xs lg:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Action</label>
                            <select
                                value={filter.action}
                                onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                                className="input text-xs sm:text-sm lg:text-base py-2 sm:py-3"
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
                <div className="space-y-2 sm:space-y-4 animate-fade-in">
                    {activities.map((activity) => (
                        <div key={activity._id} className="card p-3 sm:p-4 lg:p-6">
                            <div className="flex items-start gap-2 sm:gap-4">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm sm:text-lg lg:text-2xl flex-shrink-0">
                                    {getActivityIcon(activity.action)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 sm:mb-2 gap-2">
                                        <h3 className="text-xs sm:text-sm lg:text-lg font-semibold line-clamp-2">{activity.description}</h3>
                                        <span className={`badge text-[8px] sm:text-xs lg:text-sm ${activity.action === 'created' ? 'badge-success' :
                                                activity.action === 'updated' ? 'badge-info' :
                                                    activity.action === 'deleted' ? 'badge-error' :
                                                        'badge-warning'
                                            }`}>
                                            {activity.action}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs lg:text-sm text-slate-400">
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
                    <div className="card text-center py-6 sm:py-8 lg:py-12 text-slate-400">
                        <p className="text-sm sm:text-base lg:text-xl">No activities found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activity;
