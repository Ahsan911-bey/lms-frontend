"use client";

import Link from "next/link";
import { getAdminCourseStudents, CourseStudent } from "@/lib/api";
import { ArrowLeft, Users, GraduationCap } from "lucide-react";
import StudentCard from "./StudentCard";
import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentListPage({ params }: { params: Promise<{ id: string; courseNo: string; batch: string }> }) {
    const { id, courseNo, batch } = use(params);
    const decodedCourseNo = decodeURIComponent(courseNo || "");
    const decodedBatch = decodeURIComponent(batch || "");
    const [students, setStudents] = useState<CourseStudent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminCourseStudents(courseNo, batch)
            .then(setStudents)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [courseNo, batch]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/students/find/${courseNo}`}
                    className="p-3 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student List</h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{decodedCourseNo}</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{decodedBatch}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-pulse space-y-4">
                            <div className="h-12 bg-gray-50 rounded-xl w-full"></div>
                            <div className="h-12 bg-gray-50 rounded-xl w-full"></div>
                            <div className="h-12 bg-gray-50 rounded-xl w-full"></div>
                        </div>
                    </div>
                ) : students.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="py-5 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="py-5 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Registration No</th>
                                    <th className="py-5 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Roll No</th>
                                    <th className="py-5 px-8 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence>
                                    {students.map((student, idx) => (
                                        <StudentCard key={student.studentId} student={student} index={idx} />
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <div className="h-20 w-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <GraduationCap className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Students Found</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                            There are no students enrolled in {decodedCourseNo} for {decodedBatch}.
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
