import { getTeacherCourses } from "@/lib/api";
import TeacherStudentsContent from "./TeacherStudentsContent";

export default async function TeacherStudentsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let courses: any[] = [];

    try {
        courses = await getTeacherCourses(id);
    } catch (error) {
        console.warn("Failed to fetch teacher courses inside students page", error);
        // Fallback or empty state handled by UI
    }

    return <TeacherStudentsContent id={id} courses={courses} />;
}
