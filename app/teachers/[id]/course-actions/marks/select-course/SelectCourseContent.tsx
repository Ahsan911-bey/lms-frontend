"use client";

import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/api";
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface SelectCourseContentProps {
    id: string;
    type: string;
    courses: Course[];
}

export default function SelectCourseContent({ id, type, courses }: SelectCourseContentProps) {
    const typeLabels: Record<string, string> = {
        quiz: "Quiz Marks",
        assignment: "Assignment Marks",
        mids: "Mids Marks",
        final: "Final Marks"
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVars} className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions/marks`} className="hover:text-blue-600 hover:underline flex items-center gap-1 transition-colors">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">Select Course</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Select Course</h2>
                    <p className="text-gray-500 text-sm mt-1">Which course are you uploading <strong className="text-blue-600">{typeLabels[type] || type}</strong> for?</p>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/teachers/${id}/course-actions/marks/${course.courseNo}?type=${type}&courseId=${course.id}`}
                            className="block group"
                        >
                            <motion.div
                                variants={itemVars}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all h-full flex flex-col hover:-translate-y-1 relative"
                            >
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider border border-blue-100">
                                            {course.courseNo}
                                        </span>
                                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                            <BookOpen size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                                        {course.courseName}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <span className="text-gray-500 font-medium">
                                            Select Course
                                        </span>
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))
                ) : (
                    <motion.div variants={itemVars} className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 mb-6 group">
                            <BookOpen className="h-8 w-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Courses Found</h3>
                        <p className="mt-2 text-gray-500">You haven't been assigned any courses yet.</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
