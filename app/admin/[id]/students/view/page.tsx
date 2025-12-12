import Link from "next/link";
import { getAdminCourses, Course } from "@/lib/api";
import { BookOpen, ArrowLeft } from "lucide-react";
import { use } from "react";

export default async function ViewCoursesPage({ params }: { params: Promise<{ id: string }> }) {
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
                    href={`/admin/${id}/students`}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Select Course</h1>
                    <p className="text-gray-500">Choose a course to view enrolled students.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/admin/${id}/students/find/${course.courseNo}`}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition-colors">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-medium text-gray-400">{course.courseNo}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                {course.courseName}
                            </h3>
                            <p className="text-sm text-gray-500">Credits: {course.credits}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {course.studentIds?.length || 0} Students Enrolled
                            </p>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                        No courses found.
                    </div>
                )}
            </div>
        </div>
    );
}
