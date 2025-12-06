import { Search, Mail, FileText, User } from "lucide-react";
import { getStudentsByBatch } from "@/lib/api";
import Link from "next/link";

export default async function TeacherStudentListPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string; batch: string }>;
}) {
    const { id, courseNo, batch } = await params;

    // Decode batch name if it was URL encoded (though usually next does this)
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
                        <Link href={`/teachers/${id}/students`} className="hover:text-blue-600 hover:underline">Students</Link>
                        <span>/</span>
                        <Link href={`/teachers/${id}/students/${courseNo}`} className="hover:text-blue-600 hover:underline">{courseNo}</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{decodedBatch}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Student List</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and view details of enrolled students.</p>
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

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Reg No</th>
                                <th className="px-6 py-4">Roll No</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-xs text-gray-500">ID: {student.studentId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            {student.regNo}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                                                {student.rollNo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-400" />
                                                {student.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline p-2">
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No students found in this batch.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {students.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
                        <div>Showing <span className="font-medium">{students.length}</span> students</div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
