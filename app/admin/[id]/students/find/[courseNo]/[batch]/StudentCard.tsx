"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteStudent, CourseStudent } from "@/lib/api";
import { Trash2, Loader2, User } from "lucide-react";
import { motion } from "framer-motion";

interface StudentCardProps {
    student: CourseStudent;
    index?: number;
}

export default function StudentCard({ student, index = 0 }: StudentCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${student.name} (${student.regNo})? This action cannot be undone.`)) {
            setIsDeleting(true);
            try {
                await deleteStudent(student.studentId);
                router.refresh();
            } catch (error) {
                console.error("Failed to delete student:", error);
                alert("Failed to delete student. Please try again.");
                setIsDeleting(false);
            }
        }
    };

    return (
        <motion.tr
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className="hover:bg-purple-50/30 transition-colors group"
        >
            <td className="py-5 px-8">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <User className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-base">{student.name}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{student.email}</p>
                    </div>
                </div>
            </td>
            <td className="py-5 px-8 text-sm text-gray-600 font-semibold bg-gray-50/30 rounded-lg mx-2">{student.regNo}</td>
            <td className="py-5 px-8 text-sm text-gray-500 font-mono">{student.rollNo}</td>
            <td className="py-5 px-8 text-right">
                <div className="flex justify-end">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm hover:shadow-md"
                        title="Delete Student"
                    >
                        {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                    </button>
                </div>
            </td>
        </motion.tr>
    );
}
