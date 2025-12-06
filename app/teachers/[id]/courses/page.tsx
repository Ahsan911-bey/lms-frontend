import { BookOpen, Users, FileText, Video, Bell } from "lucide-react";
import { getTeacherCourses, Course } from "@/lib/api";
import Link from "next/link";

export default async function TeacherCoursesPage({
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
                    <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your courses, assignments and resources.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-100">
                                                {course.courseNo}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {course.credits} Credits
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {course.courseName}
                                        </h3>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-md">
                                                    <Users size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.studentIds?.length || 0}</p>
                                                    <p className="text-xs text-gray-500">Students</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                                                    <Bell size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.announcements?.length || 0}</p>
                                                    <p className="text-xs text-gray-500">Alerts</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="p-2 bg-amber-100 text-amber-600 rounded-md">
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.assignments?.length || 0}</p>
                                                    <p className="text-xs text-gray-500">Assignments</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-md">
                                                    <Video size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.learningResources?.length || 0}</p>
                                                    <p className="text-xs text-gray-500">Resources</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 min-w-[140px]">
                                        <Link
                                            href={`/teachers/${id}/students/${course.courseNo}`}
                                            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center shadow-sm shadow-blue-200"
                                        >
                                            View Students
                                        </Link>
                                        <button className="w-full px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            Manage Course
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Latest Announcement Teaser */}
                            {course.announcements && course.announcements.length > 0 && (
                                <div className="bg-orange-50/50 px-6 py-3 border-t border-gray-100 flex items-start gap-2">
                                    <Bell size={14} className="text-orange-500 mt-0.5" />
                                    <p className="text-xs text-gray-600">
                                        <span className="font-semibold text-gray-800">Latest:</span> {course.announcements[0].message}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 mb-4">
                            <BookOpen className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Courses Assigned</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't been assigned any teaching courses yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
