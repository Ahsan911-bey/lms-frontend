"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Student, getAllStudents, deleteStudent } from "@/lib/api";
import { Trash2, Loader2, ArrowLeft, Search, Eye } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function AllStudentsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: adminId } = use(params);
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<number | string | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();
                setStudents(data);
            } catch (err) {
                console.error("Failed to fetch students:", err);
                setError("Failed to load students. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (studentId: number | string) => {
        if (confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
            setDeletingId(studentId);
            try {
                await deleteStudent(studentId);
                setStudents(students.filter(s => s.id !== studentId));
            } catch (err) {
                console.error("Failed to delete student:", err);
                alert("Failed to delete student.");
            } finally {
                setDeletingId(null);
            }
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/${adminId}/students`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">All Students</h1>
                        <p className="text-gray-500">Manage all registered students in the system.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search by name, registration number, or email..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                    {error}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Program</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Session</th>
                                    <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="py-4 px-6 text-sm text-gray-500">#{student.id}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                                        <img
                                                            src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                                                            alt={student.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{student.name}</div>
                                                        <div className="text-xs text-gray-500">{student.regNo}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-600">{student.program}</td>
                                            <td className="py-4 px-6 text-sm text-gray-600">{student.session}</td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/${adminId}/students/details/${student.id}`}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(student.id)}
                                                        disabled={deletingId === student.id}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Student"
                                                    >
                                                        {deletingId === student.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            No students found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
