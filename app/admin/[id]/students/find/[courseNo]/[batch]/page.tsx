import Link from "next/link";
import { getAdminCourseStudents, CourseStudent } from "@/lib/api";
import { ArrowLeft, Users } from "lucide-react";
import StudentCard from "./StudentCard";
import { use } from "react";

export default async function StudentListPage({ params }: { params: Promise<{ id: string; courseNo: string; batch: string }> }) {
    const { id, courseNo, batch } = await params;

    const decodedCourseNo = decodeURIComponent(courseNo);
    const decodedBatch = decodeURIComponent(batch);

    let students: CourseStudent[] = [];
    try {
        students = await getAdminCourseStudents(courseNo, batch);
    } catch (error) {
        console.error("Failed to fetch students:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/students/find/${courseNo}`}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student List</h1>
                    <p className="text-gray-500">
                        {decodedCourseNo} <span className="mx-2 text-gray-300">/</span> <span className="font-medium text-purple-600">{decodedBatch}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {students.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Registration No</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
                                    <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <StudentCard key={student.studentId} student={student} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Students Found</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                            There are no students enrolled in {decodedCourseNo} for {decodedBatch}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
