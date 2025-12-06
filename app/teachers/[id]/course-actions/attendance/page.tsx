import Link from "next/link";
import { Eye, Edit } from "lucide-react";

export default async function AttendanceActionsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions`} className="hover:text-blue-600 hover:underline">Course Actions</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">Attendance</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Attendance</h2>
                    <p className="text-gray-500 text-sm mt-1">Select an action to proceed.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <Link href={`/teachers/${id}/course-actions/attendance/check`} className="group">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex items-start gap-6">
                        <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Eye size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Check Attendance</h3>
                            <p className="text-gray-500 mt-2">View attendance records for students in your courses. Drill down by batch and student.</p>
                        </div>
                    </div>
                </Link>

                <Link href={`/teachers/${id}/course-actions/attendance/mark`} className="group">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md hover:border-blue-200 transition-all">
                        <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Edit size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Mark Attendance</h3>
                            </div>
                            <p className="text-gray-500 mt-2">Take attendance for a specific class session.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
