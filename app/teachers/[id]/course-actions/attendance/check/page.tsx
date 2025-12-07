import { getTeacherCourses, Course } from "@/lib/api";
import CheckAttendanceContent from "./CheckAttendanceContent";

export default async function CheckAttendanceCoursesPage({
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

    return <CheckAttendanceContent id={id} courses={courses} />;
}
