import Link from "next/link";
import { ClipboardList, Bell, FileText, CheckSquare } from "lucide-react";

export default function CourseActionsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Course Actions</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage attendance, assessments, and announcements.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="./course-actions/attendance" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center text-center h-full">
                        <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <CheckSquare size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">Attendance</h3>
                        <p className="text-sm text-gray-500 mt-2">Check or mark student attendance for your classes.</p>
                    </div>
                </Link>

                <Link href="./course-actions/announcements" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all flex flex-col items-center text-center h-full">
                        <div className="h-14 w-14 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Bell size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-700">Announcements</h3>
                        <p className="text-sm text-gray-500 mt-2">Post updates and alerts for your students.</p>
                    </div>
                </Link>

                <div className="group cursor-not-allowed opacity-60 relative">
                    <div className="absolute top-2 right-2 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Coming Soon</div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                        <div className="h-14 w-14 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mb-4">
                            <FileText size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Assignments</h3>
                        <p className="text-sm text-gray-500 mt-2">Create and grade course assignments.</p>
                    </div>
                </div>

                <div className="group cursor-not-allowed opacity-60 relative">
                    <div className="absolute top-2 right-2 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Coming Soon</div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                        <div className="h-14 w-14 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
                            <ClipboardList size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Marks</h3>
                        <p className="text-sm text-gray-500 mt-2">Upload and manage result sheets.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
