import { getAdminTeachers } from "@/lib/api";
import Link from "next/link";
import { Plus, Mail, Phone, BookOpen, GraduationCap } from "lucide-react";

export default async function AdminTeachersPage() {
    let teachers: any[] = [];
    try {
        teachers = await getAdminTeachers();
    } catch (error) {
        console.error("Failed to fetch teachers", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Teachers</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage all registered teachers.</p>
                </div>
                <Link
                    href="/admin/teachers/create"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add New Teacher
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={teacher.profilePic || `https://ui-avatars.com/api/?name=${teacher.name}&background=random`}
                                        alt={teacher.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate" title={teacher.name}>{teacher.name}</h3>
                                        <p className="text-xs text-purple-600 font-medium uppercase tracking-wider bg-purple-50 inline-block px-2 py-0.5 rounded mt-1">
                                            {teacher.regNo}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1 truncate">{teacher.qualification}</p>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Mail size={16} className="text-gray-400" />
                                        <span className="truncate">{teacher.emailAddress}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Phone size={16} className="text-gray-400" />
                                        <span>{teacher.contactNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <BookOpen size={16} className="text-gray-400" />
                                        <span>{teacher.specialization}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <GraduationCap size={16} className="text-gray-400" />
                                        <span>{teacher.program} - {teacher.campus}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end">
                                <button className="text-sm font-semibold text-gray-600 hover:text-purple-600 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
                        No teachers found. Click "Add New Teacher" to create one.
                    </div>
                )}
            </div>
        </div>
    );
}
