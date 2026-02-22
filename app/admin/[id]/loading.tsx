import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex-1 min-w-0 h-full min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <div className="space-y-2 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Loading admin dashboard...</h3>
                <p className="text-sm text-gray-500">Please wait while we fetch system data</p>
            </div>

            <div className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
                <div className="h-40 bg-gray-200 rounded-3xl animate-pulse"></div>
                <div className="h-40 bg-gray-200 rounded-3xl animate-pulse"></div>
            </div>
        </div>
    );
}
