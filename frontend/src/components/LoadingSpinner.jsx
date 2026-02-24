const LoadingSpinner = ({ size = 'default', message = 'Loading...' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        default: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    const dotSizeClasses = {
        small: 'w-1.5 h-1.5',
        default: 'w-2 h-2',
        large: 'w-3 h-3'
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
            {/* Modern animated spinner */}
            <div className="relative">
                <div className={`${sizeClasses[size]} border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin`}></div>
                <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-b-purple-600 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            
            {/* Loading message */}
            <p className="mt-4 text-slate-600 text-sm font-medium animate-pulse-soft">
                {message}
            </p>

            {/* Optional decorative elements */}
            <div className="flex gap-2 mt-6">
                <div className={`${dotSizeClasses[size]} bg-indigo-600 rounded-full animate-bounce-soft`}></div>
                <div className={`${dotSizeClasses[size]} bg-purple-600 rounded-full animate-bounce-soft`} style={{ animationDelay: '0.1s' }}></div>
                <div className={`${dotSizeClasses[size]} bg-pink-600 rounded-full animate-bounce-soft`} style={{ animationDelay: '0.2s' }}></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
