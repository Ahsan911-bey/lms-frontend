"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Teacher, deleteTeacher } from "@/lib/api";
import { Trash2, Loader2 } from "lucide-react";

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${teacher.name}?`)) {
            setIsDeleting(true);
            try {
                await deleteTeacher(teacher.id);
                router.refresh();
            } catch (error) {
                console.error("Failed to delete teacher:", error);
                alert("Failed to delete teacher. Please try again.");
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group relative">
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg backdrop-blur-sm transition-colors z-10"
                title="Delete Teacher"
            >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </button>

            <div className="h-24 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="px-6 pb-6 relative">
                <div className="relative -mt-12 mb-4">
                    <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                        <img
                            src={teacher.profilePic || `https://ui-avatars.com/api/?name=${teacher.name}&background=random`}
                            alt={teacher.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                <p className="text-sm text-purple-600 font-medium mb-1">{teacher.qualification}</p>
                <p className="text-xs text-gray-500 mb-4">{teacher.emailAddress}</p>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Department:</span>
                        <span className="font-medium">{teacher.program}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Reg No:</span>
                        <span className="font-medium">{teacher.regNo}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Contact:</span>
                        <span className="font-medium">{teacher.contactNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
