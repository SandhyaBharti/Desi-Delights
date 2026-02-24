const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="glass-dark border border-error/30 bg-error/10 text-error px-6 py-4 rounded-xl mb-6 animate-slide-up shadow-glow">
            <div className="flex items-center gap-3">
                <span className="text-2xl animate-pulse-soft">⚠️</span>
                <div className="flex-1">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm text-error/80">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
