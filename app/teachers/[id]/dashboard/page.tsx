import { BookOpen, Users, Clock, Calendar } from "lucide-react";
import { getTeacherCourses } from "@/lib/api";

const MOCK_COURSES = [
    {
        id: 101,
        courseName: "Introduction to Computing",
        courseNo: "CS-101",
        credits: 3,
        batch: "FA24",
        totalStudents: 45,
        schedule: "Mon, Wed 08:30 AM"
    },
    {
        id: 102,
        courseName: "Programming Fundamentals",
        courseNo: "CS-102",
        credits: 4,
        batch: "FA24",
        totalStudents: 42,
        schedule: "Tue, Thu 10:00 AM"
    },
    {
        id: 103,
        courseName: "Object Oriented Programming",
        courseNo: "CS-201",
        credits: 4,
        batch: "SP24",
        totalStudents: 38,
        schedule: "Mon, Wed 11:30 AM"
    }
];

export default async function TeacherDashboardPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let courses = [];
    let stats = {
        totalCourses: 0,
        totalStudents: 0,
        pendingGrades: 5, // Mock
        upcomingClasses: 2 // Mock
    };

    try {
        courses = await getTeacherCourses(id);
        // Calculate stats if real data is available
        if (courses && Array.isArray(courses)) {
            stats.totalCourses = courses.length;
            // stats.totalStudents = courses.reduce((acc, c) => acc + (c.studentCount || 0), 0);
        } else {
            // Fallback if API returns empty or invalid
            courses = MOCK_COURSES;
            stats.totalCourses = courses.length;
            stats.totalStudents = 125;
        }
    } catch (error) {
        console.warn("Failed to fetch teacher courses, using mock data");
        courses = MOCK_COURSES;
        stats.totalCourses = courses.length;
        stats.totalStudents = 125;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <p className="text-gray-500 text-sm mt-1">Welcome back, get ready for your classes.</p>
                </div>
                <span className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Spring 2025</span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium">Assigned Courses</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCourses}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <BookOpen size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                        <Users size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium">Upcoming Classes</h3>
                        <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.upcomingClasses}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <Clock size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium">Pending Grades</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-2">{stats.pendingGrades}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                        <Calendar size={24} />
                    </div>
                </div>
            </div>

            {/* Courses Overview */}
            <h3 className="font-bold text-xl text-gray-800 mt-8">Your Courses</h3>
            <div className="space-y-4">
                {courses.map((course: any) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex">
                        <div className="w-2 bg-blue-600 flex-shrink-0"></div>
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
                                <h4 className="text-lg font-bold text-gray-900 line-clamp-1" title={course.courseName}>
                                    {course.courseName}
                                </h4>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <Clock size={16} /> {course.credits} Cr
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users size={16} /> {course.totalStudents || 40} Students
                                </span>
                                <span className="flex items-center gap-2 hidden lg:flex">
                                    <Calendar size={16} /> {course.schedule || "Mon, Wed 08:30 AM"}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <button className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors whitespace-nowrap">
                                    View Details &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
