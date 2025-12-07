import { redirect } from "next/navigation";

export default async function TeacherRootPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    redirect(`/teachers/${id}/dashboard`);
}
