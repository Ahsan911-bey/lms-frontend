"use client";

import { BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};

interface TeacherStudentsContentProps {
    id: string;
    courses: any[];
}

export default function TeacherStudentsContent({ id, courses }: TeacherStudentsContentProps) {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVars} className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">My Students</h2>
                    <p className="text-gray-500 text-sm mt-1">Select a course to view enrolled students.</p>
                </div>
            </motion.div>

            {/* Courses List */}
            <motion.div variants={containerVars} className="space-y-4">
                {courses.length > 0 ? (
                    courses.map((course: any) => (
                        <Link
                            key={course.id}
                            href={`/teachers/${id}/students/${course.courseNo}`}
                            className="block group"
                        >
                            <motion.div
                                variants={itemVars}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group flex"
                            >
                                <div className="w-2 bg-blue-600 flex-shrink-0 group-hover:bg-blue-700 transition-colors"></div>
                                <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider border border-blue-100">
                                                {course.courseNo}
                                            </span>
                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {course.batch || "FA24"}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                                            {course.courseName}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-2">
                                            <Users size={16} className="text-blue-400" /> {course.totalStudents || 0} Students
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="px-4 py-2 bg-gray-50 text-gray-600 text-sm font-semibold rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all whitespace-nowrap shadow-sm group-hover:shadow-blue-200">
                                            Select Course &rarr;
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                ) : (
                    <motion.div variants={itemVars} className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4 group">
                            <BookOpen className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Courses Found</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't been assigned any courses yet.</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
