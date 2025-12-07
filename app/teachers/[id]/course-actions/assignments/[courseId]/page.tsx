import CourseAssignmentsContent from "./CourseAssignmentsContent";

export default async function ManageAssignmentsPage({
    params,
}: {
    params: Promise<{ id: string; courseId: string }>;
}) {
    const { id, courseId } = await params;

    return <CourseAssignmentsContent id={id} courseId={courseId} />;
}
