import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminTeachers, Teacher } from "@/lib/api";
import TeacherCard from "./TeacherCard";

// Reusing or creating a Teacher card component would be ideal, but for now I'll build it inline or look for one.
// There isn't a generic "TeacherCard" in components yet, so I'll create a simple one here or in a separate file if it gets complex.
// The user asked for "similar to these portals", so using the glassmorphism style.

export default async function TeachersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let teachers: Teacher[] = [];

    try {
        teachers = await getAdminTeachers();
    } catch (error) {
        console.error("Failed to fetch teachers:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
                    <p className="text-gray-500">Manage faculty members and their assignments</p>
                </div>
                <Link
                    href={`/admin/${id}/teachers/new`}
                    className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Teacher
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <TeacherCard key={teacher.id} teacher={teacher} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                        No teachers found. Click "Add New Teacher" to get started.
                    </div>
                )}
            </div>
        </div>
    );
}

