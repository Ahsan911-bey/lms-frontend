import { getStudentCourses } from "@/lib/api";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch courses on the server
    const courses = await getStudentCourses(id);

    return <CoursesClient studentId={id} courses={courses} />;
}

