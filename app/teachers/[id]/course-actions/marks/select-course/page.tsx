import { getTeacherCourses, Course } from "@/lib/api";
import { redirect } from "next/navigation";
import SelectCourseContent from "./SelectCourseContent";

export default async function MarksCourseSelectionPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ type?: string }>;
}) {
    const { id } = await params;
    const { type } = await searchParams;

    if (!type) {
        redirect(`/teachers/${id}/course-actions/marks`);
    }

    let courses: Course[] = [];
    try {
        courses = await getTeacherCourses(id);
    } catch (error) {
        console.warn("Failed to fetch teacher courses", error);
    }

    return (
        <SelectCourseContent id={id} type={type} courses={courses} />
    );
}
