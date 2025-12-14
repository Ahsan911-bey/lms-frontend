"use client";

import { motion } from "framer-motion";
import { BookOpen, User, Clock, ArrowRight } from "lucide-react";
import { Course } from "@/lib/api";

interface CourseCardProps {
    course: Course;
    onClick: (courseId: number) => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-full cursor-pointer"
            onClick={() => onClick(course.id)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl transform transition-transform duration-300 group-hover:scale-105" />

            <div className="relative h-full bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                            {course.courseNo}
                        </span>
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <BookOpen size={20} className="text-blue-600" />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {course.courseName}
                    </h3>

                    <div className="space-y-3 mt-auto pt-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <User size={16} className="mr-2 text-gray-400" />
                            <span>Dr. Smith (ID: {course.teacherId})</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <Clock size={16} className="mr-2 text-gray-400" />
                            <span>{course.credits} Credits</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-blue-600 font-medium">
                        <span className="text-sm">View Details</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
