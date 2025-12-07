import { getTeacherCourses, Course } from "@/lib/api";
import DashboardContent from "./DashboardContent";

export default async function TeacherDashboardPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let courses: Course[] = [];
    let stats = {
        totalCourses: 0,
        totalStudents: 0,
        totalAssignments: 0,
        totalAnnouncements: 0
    };

    try {
        const result = await getTeacherCourses(id);
        // The API might return an object or array, adapting based on usage
        courses = Array.isArray(result) ? result : [];

        if (courses.length > 0) {
            stats.totalCourses = courses.length;
            stats.totalStudents = courses.reduce((acc, c) => acc + (c.studentIds?.length || 0), 0);
            stats.totalAssignments = courses.reduce((acc, c) => acc + (c.assignments?.length || 0), 0);
            stats.totalAnnouncements = courses.reduce((acc, c) => acc + (c.announcements?.length || 0), 0);
        }
    } catch (error) {
        console.warn("Failed to fetch teacher courses", error);
    }

    return <DashboardContent stats={stats} courses={courses} semesterName="Spring 2025" />;
}
