import { Search, Mail, ArrowRight } from "lucide-react";
import { getStudentsByBatch } from "@/lib/api";
import Link from "next/link";

export default async function CheckAttendanceStudentListPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string; batch: string }>;
}) {
    const { id, courseNo, batch } = await params;
    const decodedBatch = decodeURIComponent(batch);

    let students: any[] = [];
    try {
        students = await getStudentsByBatch(courseNo, decodedBatch);
    } catch (error) {
        console.warn(`Failed to fetch students for ${courseNo} ${decodedBatch}`, error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions/attendance/check`} className="hover:text-blue-600 hover:underline">Check</Link>
                        <span>/</span>
                        <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}`} className="hover:text-blue-600 hover:underline">{courseNo}</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{decodedBatch}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Select Student</h2>
                    <p className="text-gray-500 text-sm mt-1">Click on a student to view their attendance record.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Reg No</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.studentId} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4">
                                            <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${encodeURIComponent(batch)}/${student.studentId}`} className="flex items-center gap-3 block w-full">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{student.name}</div>
                                                    <div className="text-xs text-gray-500">{student.email}</div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            {student.regNo}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${encodeURIComponent(batch)}/${student.studentId}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline flex items-center gap-1">
                                                View Attendance <ArrowRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                        No students found in this batch.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
