import { getTeacherCourses, Course } from "@/lib/api";
import AssignmentsContent from "./AssignmentsContent";

export default async function AssignmentCoursesPage({
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

    return <AssignmentsContent id={id} courses={courses} />;
}
