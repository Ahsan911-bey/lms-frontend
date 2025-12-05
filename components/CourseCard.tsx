"use client";

import { motion } from "framer-motion";
import { BookOpen, User } from "lucide-react";
import { Course } from "@/lib/api";

interface CourseCardProps {
    course: Course;
    onClick: (courseId: number) => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300"
            onClick={() => onClick(course.id)}
        >
            {/* Dark Glass Container */}
            <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-lg group-hover:shadow-2xl transition-all duration-300 z-0"></div>

            {/* Gradient Background Overlay (Subtle Dark) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-0"></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Header Section with Gradient Blob */}
                <div className="relative h-32 p-6 flex flex-col justify-between overflow-hidden">
                    {/* Decorative Gradient Blob */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                        <BookOpen size={90} className="text-white" />
                    </div>

                    <div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 backdrop-blur-md text-blue-200 border border-white/10 shadow-sm mb-3">
                            {course.courseNo}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors drop-shadow-sm">
                            {course.courseName}
                        </h3>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6 pt-2 flex-grow flex flex-col justify-end">
                    <div className="flex items-center text-sm font-medium text-slate-300 mb-5 bg-black/20 p-2 rounded-lg border border-white/5">
                        <User size={16} className="mr-2 text-blue-400" />
                        <span>Teacher ID: {course.teacherId}</span>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                            {course.credits} Credits
                        </span>
                        <span className="text-blue-400 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform group-hover:text-blue-300">
                            View Details
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
