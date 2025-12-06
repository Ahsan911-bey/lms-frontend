import { BookOpen, Users, Bell, ArrowRight } from "lucide-react";
import { getTeacherCourses, Course } from "@/lib/api";
import Link from "next/link";

export default async function AnnouncementCoursesPage({
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
                        <span className="font-semibold text-gray-700">Announcements</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Course Announcements</h2>
                    <p className="text-gray-500 text-sm mt-1">Select a course to manage its announcements.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/teachers/${id}/course-actions/announcements/${course.id}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all h-full flex flex-col">
                                <div className="h-2 bg-orange-400 group-hover:bg-orange-500 transition-colors"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded uppercase tracking-wider">
                                            {course.courseNo}
                                        </span>
                                        <Bell size={20} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors line-clamp-2">
                                        {course.courseName}
                                    </h3>

                                    {course.announcements && course.announcements.length > 0 && (
                                        <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 line-clamp-1 italic">
                                            "{course.announcements[0].message}"
                                        </div>
                                    )}

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1">
                                            <Bell size={14} /> {course.announcements?.length || 0} Posted
                                        </span>
                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
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
