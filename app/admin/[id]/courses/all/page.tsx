import Link from "next/link";
import { getAdminCourses, Course } from "@/lib/api";
import { BookOpen, Users, FileText, Bell, ArrowLeft } from "lucide-react";

export default async function AllCoursesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let courses: Course[] = [];

    try {
        courses = await getAdminCourses();
    } catch (error) {
        console.error("Failed to fetch courses:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/courses`}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
                    <p className="text-gray-500">Overview of all active courses and their statistics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 mb-2">
                                        {course.courseNo}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {course.courseName}
                                    </h3>
                                </div>
                                <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                <span className="font-medium">Credits:</span> {course.credits}
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                                <div className="text-center">
                                    <div className="flex items-center justify-center text-purple-600 mb-1">
                                        <Users className="h-4 w-4" />
                                    </div>
                                    <span className="block text-lg font-bold text-gray-900">{course.studentIds?.length || 0}</span>
                                    <span className="text-xs text-gray-400">Students</span>
                                </div>
                                <div className="text-center border-l border-gray-50">
                                    <div className="flex items-center justify-center text-orange-600 mb-1">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <span className="block text-lg font-bold text-gray-900">{course.assignments?.length || 0}</span>
                                    <span className="text-xs text-gray-400">Assignments</span>
                                </div>
                                <div className="text-center border-l border-gray-50">
                                    <div className="flex items-center justify-center text-green-600 mb-1">
                                        <Bell className="h-4 w-4" />
                                    </div>
                                    <span className="block text-lg font-bold text-gray-900">{course.announcements?.length || 0}</span>
                                    <span className="text-xs text-gray-400">Notices</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                        No courses found. Create a new course to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
