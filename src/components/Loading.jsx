function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-white font-montserrat text-2xl">
            <div className="w-12 h-12 border-8 border-t-8 border-white border-opacity-10 rounded-full border-t-white animate-spin"></div>
            <div className="ml-4">Loading...</div>
        </div>
    );
}

export default Loading;
