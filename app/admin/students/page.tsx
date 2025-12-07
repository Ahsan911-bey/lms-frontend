import Link from "next/link";
import { Plus, Users, ArrowRight } from "lucide-react";

export default function AdminStudentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Students Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Create, manage and assign students.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/students/create" className="group">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all h-full">
                        <div className="h-14 w-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Register New Student</h3>
                        <p className="text-gray-500 mb-4">Add a new student to the system manually.</p>
                        <span className="text-purple-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Start Registration <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>

                <Link href="/admin/courses" className="group">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all h-full">
                        <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">View Students by Course</h3>
                        <p className="text-gray-500 mb-4">Browse students enrolled in specific courses and batches.</p>
                        <span className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Browse Courses <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>

                <Link href="/admin/students/assign-batch" className="group">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all h-full">
                        <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Assign Students to Batch</h3>
                        <p className="text-gray-500 mb-4">Bulk assign multiple students to a specific batch.</p>
                        <span className="text-indigo-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Assign Batch <ArrowRight size={16} />
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
