import { getTeacherCourses, Course } from "@/lib/api";
import AnnouncementCoursesContent from "./AnnouncementCoursesContent";

export default async function AnnouncementCoursesPage({
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

    return <AnnouncementCoursesContent id={id} courses={courses} />;
}
