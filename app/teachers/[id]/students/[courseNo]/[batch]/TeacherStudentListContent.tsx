"use client";

import { Search, Mail, FileText, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVars: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface TeacherStudentListContentProps {
    id: string;
    courseNo: string;
    decodedBatch: string;
    students: any[];
}

export default function TeacherStudentListContent({ id, courseNo, decodedBatch, students }: TeacherStudentListContentProps) {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div variants={itemVars}>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/students`} className="hover:text-blue-600 hover:underline flex items-center gap-1 transition-colors">
                            Students
                        </Link>
                        <span>/</span>
                        <Link href={`/teachers/${id}/students/${courseNo}`} className="hover:text-blue-600 hover:underline">{courseNo}</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{decodedBatch}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Student List</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and view details of enrolled students.</p>
                </motion.div>

                <motion.div
                    variants={itemVars}
                    className="relative group"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-72 bg-white shadow-sm transition-all"
                    />
                </motion.div>
            </div>

            {/* Students Table */}
            <motion.div
                variants={itemVars}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Reg No</th>
                                <th className="px-6 py-4">Roll No</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <motion.tr
                                        key={student.studentId}
                                        className="hover:bg-blue-50/30 transition-colors group"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            show: { opacity: 1, y: 0 }
                                        }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm ring-4 ring-white shadow-sm group-hover:scale-110 transition-transform">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-xs text-gray-500">ID: {student.studentId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            {student.regNo}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium border border-gray-200">
                                                {student.rollNo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-400" />
                                                {student.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href={`mailto:${student.email}`}
                                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                <Mail size={14} />
                                                Email Student
                                            </a>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center opacity-60">
                                            <User size={48} className="text-gray-300 mb-2" />
                                            <p>No students found in this batch.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {students.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
                        <div>Showing <span className="font-medium text-gray-900">{students.length}</span> students</div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white disabled:opacity-50 text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm" disabled>Previous</button>
                            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white disabled:opacity-50 text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm" disabled>Next</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
