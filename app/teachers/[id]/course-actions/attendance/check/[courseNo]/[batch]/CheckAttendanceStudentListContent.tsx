"use client";

import { Search, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface CheckAttendanceStudentListContentProps {
    id: string;
    courseNo: string;
    batch: string;
    decodedBatch: string;
    students: any[];
}

export default function CheckAttendanceStudentListContent({ id, courseNo, batch, decodedBatch, students }: CheckAttendanceStudentListContentProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions/attendance/check`} className="hover:text-blue-600 hover:underline">Check</Link>
                        <span>/</span>
                        <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}`} className="hover:text-blue-600 hover:underline flex items-center gap-1 transition-colors">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{decodedBatch}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Select Student</h2>
                    <p className="text-gray-500 text-sm mt-1">Click on a student to view their attendance record.</p>
                </div>

                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-72 shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Reg No</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            className="divide-y divide-gray-100"
                            variants={containerVars}
                            initial="hidden"
                            animate="show"
                        >
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <motion.tr
                                        key={student.studentId}
                                        variants={itemVars}
                                        className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${encodeURIComponent(batch)}/${student.studentId}`} className="flex items-center gap-4 block w-full">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{student.name}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail size={12} /> {student.email}
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono bg-gray-50/30">
                                            {student.regNo}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${encodeURIComponent(batch)}/${student.studentId}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                                                View <ArrowRight size={14} />
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr variants={itemVars}>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                        No students found matching your search.
                                    </td>
                                </motion.tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
