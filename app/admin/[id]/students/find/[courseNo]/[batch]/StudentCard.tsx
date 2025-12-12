"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteStudent, CourseStudent } from "@/lib/api";
import { Trash2, Loader2, User } from "lucide-react";

interface StudentCardProps {
    student: CourseStudent;
}

export default function StudentCard({ student }: StudentCardProps) {
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
        <tr className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors group">
            <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-gray-600 font-medium">{student.regNo}</td>
            <td className="py-4 px-6 text-sm text-gray-500">{student.rollNo}</td>
            <td className="py-4 px-6 text-right">
                <div className="flex justify-end">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete Student"
                    >
                        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                </div>
            </td>
        </tr>
    );
}
