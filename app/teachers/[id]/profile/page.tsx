import { getTeacherProfile, Teacher } from "@/lib/api";
import TeacherProfileContent from "./TeacherProfileContent";

export default async function TeacherProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let teacher: Teacher | null = null;
    let error: string | null = null;

    try {
        teacher = await getTeacherProfile(id);
    } catch (err) {
        console.error("Failed to fetch teacher profile:", err);
        error = "Failed to load profile data.";
    }

    if (error || !teacher) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
                    <p className="text-gray-500">{error || "Teacher not found."}</p>
                </div>
            </div>
        );
    }

    return <TeacherProfileContent teacher={teacher} />;
}
