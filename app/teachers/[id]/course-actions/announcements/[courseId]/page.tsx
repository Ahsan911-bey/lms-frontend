import { getTeacherCourses, Course } from "@/lib/api";
import ManageAnnouncementsContent from "./ManageAnnouncementsContent";

export default async function ManageAnnouncementsPage({
    params,
}: {
    params: Promise<{ id: string; courseId: string }>;
}) {
    const { id, courseId } = await params;

    let course: Course | null = null;
    let error: string | null = null;

    try {
        const courses = await getTeacherCourses(id);
        if (Array.isArray(courses)) {
            const found = courses.find((c: any) => c.id == courseId);
            if (found) {
                course = found;
            } else {
                error = "Course not found.";
            }
        } else {
            error = "Invalid response format";
        }
    } catch (err) {
        console.error(err);
        error = "Failed to load course details.";
    }

    return <ManageAnnouncementsContent id={id} courseId={courseId} initialCourse={course} initialError={error} />;
}
