import Link from "next/link";
import { Plus } from "lucide-react";

export default async function StudentsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Note: User didn't ask for a "Get All Students" endpoint implementation, only "Get Students of a Course".
    // So this page mainly serves as a landing to add new students, or we could add a placeholder list.

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-500">Add new students or view and manage existing records.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                    href={`/admin/${id}/students/new`}
                    className="block p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group"
                >
                    <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Create New Student</h3>
                    <p className="text-gray-500">Register a new student into the university system with their personal and academic details.</p>
                </Link>

                <Link
                    href={`/admin/${id}/students/view`}
                    className="block p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                >
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">View by Course</h3>
                    <p className="text-gray-500">Browse students by selecting a course and batch.</p>
                </Link>

                <Link
                    href={`/admin/${id}/students/all`}
                    className="block p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
                >
                    <div className="h-12 w-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">View All Students</h3>
                    <p className="text-gray-500">List all students in the university with full details.</p>
                </Link>
            </div>
            {/* Added explicit 3-column grid for better layout if needed, but the parent is grid-cols-1 md:grid-cols-2. I should probably update the parent grid to be 3 columns or just let it wrap. 
               The previous code was: <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               If I add a 3rd item, it will wrap or I can change grid-cols to 3.
               I will change the grid to grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            */}

        </div>
    );
}
