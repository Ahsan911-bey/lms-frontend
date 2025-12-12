import Link from "next/link";
import { Plus } from "lucide-react";

export default async function StudentsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Note: User didn't ask for a "Get All Students" endpoint implementation, only "Get Students of a Course".
    // So this page mainly serves as a landing to add new students, or we could add a placeholder list.

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                    <p className="text-gray-500">Manage student records and admissions</p>
                </div>
                <Link
                    href={`/admin/${id}/students/new`}
                    className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Student
                </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <div className="h-16 w-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Student Directory</h3>
                <p className="text-gray-500 max-w-sm mx-auto mt-2">
                    To view students, please navigate to specific Courses. Global student search is coming soon.
                </p>
                <div className="mt-6">
                    <Link
                        href={`/admin/${id}/students/new`}
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                    >
                        Register a new student &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
