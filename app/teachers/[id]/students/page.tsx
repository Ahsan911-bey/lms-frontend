import { BookOpen, Users, Clock, Calendar } from "lucide-react";
import { getTeacherCourses, Course } from "@/lib/api";
import Link from "next/link";

export default async function TeacherStudentsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let courses: any[] = [];

    try {
        courses = await getTeacherCourses(id);
    } catch (error) {
        console.warn("Failed to fetch teacher courses inside students page", error);
        // Fallback or empty state handled by UI
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Students</h2>
                    <p className="text-gray-500 text-sm mt-1">Select a course to view enrolled students.</p>
                </div>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
                {courses.length > 0 ? (
                    courses.map((course: any) => (
                        <Link
                            key={course.id}
                            href={`/teachers/${id}/students/${course.courseNo}`}
                            className="block"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group flex">
                                <div className="w-2 bg-blue-600 flex-shrink-0 group-hover:bg-blue-700 transition-colors"></div>
                                <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">
                                                {course.courseNo}
                                            </span>
                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {course.batch || "FA24"}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                                            {course.courseName}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-2">
                                            <Users size={16} /> {course.totalStudents || 0} Students
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="px-4 py-2 bg-gray-50 text-gray-600 text-sm font-semibold rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                                            Select Course &rarr;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                            <BookOpen className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Courses Found</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't been assigned any courses yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
