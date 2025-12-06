import { BookOpen, Users, ArrowRight } from "lucide-react";
import { getTeacherCourses, Course } from "@/lib/api";
import Link from "next/link";

export default async function MarkAttendanceCoursesPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let courses: Course[] = [];

    try {
        courses = await getTeacherCourses(id);
    } catch (error) {
        console.warn("Failed to fetch teacher courses", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions`} className="hover:text-blue-600 hover:underline">Course Actions</Link>
                        <span>/</span>
                        <Link href={`/teachers/${id}/course-actions/attendance`} className="hover:text-blue-600 hover:underline">Attendance</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">Mark</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Select Course</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose a course to mark attendance for.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/teachers/${id}/course-actions/attendance/mark/${course.id}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all h-full flex flex-col">
                                <div className="h-2 bg-emerald-600 group-hover:bg-emerald-700 transition-colors"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">
                                            {course.courseNo}
                                        </span>
                                        <BookOpen size={20} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                        {course.courseName}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1">
                                            <Users size={14} /> {course.studentIds?.length || 0} Students
                                        </span>
                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
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
