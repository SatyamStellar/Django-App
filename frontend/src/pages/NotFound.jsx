function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-6">404 Not Found</h1>
                <p className="text-lg text-gray-300">
                    The page you're looking for doesn't exist.
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-6 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-200"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default NotFound;
