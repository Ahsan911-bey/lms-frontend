import { BookOpen, Clock, AlertCircle } from "lucide-react";
import { getStudentCourses, getStudentAttendance, Course, AttendanceStats } from "@/lib/api";

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let courses: Course[] = [];
    let attendance: AttendanceStats[] = [];
    let totalCourses = 0;
    let attendancePercentage = 0;
    let pendingAssignments = 0;

    try {
        const [coursesData, attendanceData] = await Promise.all([
            getStudentCourses(id),
            getStudentAttendance(id)
        ]);

        courses = coursesData;
        attendance = attendanceData;
        totalCourses = courses.length;

        // Calculate pending assignments
        courses.forEach(course => {
            if (course.assignments) {
                pendingAssignments += course.assignments.filter(a => a.status === 'pending').length;
            }
        });

    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Fallback or error state could be handled here
    }

    // Create a map for faster lookup of attendance by course name
    const attendanceMap = new Map(attendance.map(a => [a.courseName, a]));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <span className="text-sm text-gray-500">Fall 2025 Semester</span>
            </div>

            {/* Stats / Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Courses</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{totalCourses}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <BookOpen size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium">Pending Assignments</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-2">{pendingAssignments}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                        <AlertCircle size={24} />
                    </div>
                </div>
            </div>

            {/* Recent Activity / Courses List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Current Courses</h3>
                    <button className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-100">
                    {courses.length > 0 ? (
                        courses.map((course) => {
                            const courseAttendance = attendanceMap.get(course.courseName);
                            const percentage = courseAttendance && courseAttendance.totalClasses > 0
                                ? Math.round((courseAttendance.presents / courseAttendance.totalClasses) * 100)
                                : 0;
                            const hasAttendance = !!courseAttendance;

                            return (
                                <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                {course.courseNo.split('-')[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{course.courseName}</h4>
                                                <p className="text-sm text-gray-500">{course.courseNo} • {course.credits} Credits</p>
                                            </div>
                                        </div>
                                        {hasAttendance ? (
                                            <div className="flex flex-col items-end">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${percentage >= 75 ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-orange-100'}`}>
                                                    Attendance: {percentage}%
                                                </span>
                                                <span className="text-xs text-gray-400 mt-1">
                                                    {courseAttendance.presents}/{courseAttendance.totalClasses} Classes
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                                                No Data
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            No courses found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
