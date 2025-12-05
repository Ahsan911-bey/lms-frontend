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
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-300"
            onClick={() => onClick(course.id)}
        >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen size={100} className="text-white transform rotate-12 translate-x-4 -translate-y-4" />
                </div>
                <div className="relative z-10">
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white mb-2">
                        {course.courseNo}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">
                        {course.courseName}
                    </h3>
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User size={16} className="mr-2 text-gray-400" />
                    <span>Teacher ID: {course.teacherId}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {course.credits} Credits
                    </span>
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                        View Details →
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
