import { redirect } from 'next/navigation';

export default async function StudentsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    redirect(`/students/${id}/dashboard`);
}
