import { getStudentCourses, getStudentAttendance } from "@/lib/api";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Fetch data concurrently on the server
    const [courses, attendance] = await Promise.all([
        getStudentCourses(id),
        getStudentAttendance(id)
    ]);

    return <DashboardClient courses={courses} attendance={attendance} />;
}

