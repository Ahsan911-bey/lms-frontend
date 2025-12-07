import { getTeacherCourses, Course } from "@/lib/api";
import MarkAttendanceCoursesContent from "./MarkAttendanceCoursesContent";

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

    return <MarkAttendanceCoursesContent id={id} courses={courses} />;
}
