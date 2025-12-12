"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Student, getAllStudents, deleteStudent } from "@/lib/api";
import { Trash2, Loader2, ArrowLeft, Search, Eye } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/${adminId}/students`}
                        className="p-3 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">All Students</h1>
                        <p className="text-gray-500">Manage all registered students in the system.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center bg-white px-5 py-4 rounded-2xl border border-gray-100 shadow-sm focus-within:shadow-md focus-within:border-purple-200 transition-all">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search by name, registration number, or email..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-purple-100 rounded-full"></div>
                        <div className="w-12 h-12 border-4 border-purple-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100">
                    <p className="font-medium">{error}</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="py-5 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="py-5 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="py-5 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Program</th>
                                    <th className="py-5 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Session</th>
                                    <th className="py-5 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student, index) => (
                                            <motion.tr
                                                key={student.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-gray-50/80 transition-colors group"
                                            >
                                                <td className="py-4 px-6 text-sm text-gray-500 font-medium">#{student.id}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                                            <img
                                                                src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                                                                alt={student.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900">{student.name}</div>
                                                            <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded-md mt-1">{student.regNo}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-600 font-medium">{student.program}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{student.session}</td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={`/admin/${adminId}/students/details/${student.id}`}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(student.id)}
                                                            disabled={deletingId === student.id}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                            title="Delete Student"
                                                        >
                                                            {deletingId === student.id ? (
                                                                <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                                                            ) : (
                                                                <Trash2 className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-16 text-center text-gray-500">
                                                No students found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
