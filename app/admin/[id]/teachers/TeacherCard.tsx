import { useState } from "react";
import { useRouter } from "next/navigation";
import { Teacher } from "@/lib/api";
import { Trash2, Loader2, Mail, GraduationCap, Phone, Building2, User } from "lucide-react";
import { motion } from "framer-motion";

interface TeacherCardProps {
    teacher: Teacher;
    adminId: string;
    onDelete: () => Promise<void>;
    index: number;
}

export default function TeacherCard({ teacher, adminId, onDelete, index }: TeacherCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${teacher.name}?`)) {
            setIsDeleting(true);
            try {
                await onDelete();
            } catch (error) {
                console.error("Failed to delete teacher:", error);
                alert("Failed to delete teacher. Please try again.");
                setIsDeleting(false);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group relative"
        >
            <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-2 bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg backdrop-blur-sm transition-colors"
                    title="Delete Teacher"
                >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>
            </div>

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

                <h3 className="text-lg font-bold text-gray-900 mb-1">{teacher.name}</h3>
                <div className="flex items-center text-purple-600 mb-3">
                    <GraduationCap className="h-4 w-4 mr-1.5" />
                    <span className="text-sm font-medium">{teacher.qualification}</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="truncate">{teacher.emailAddress}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>{teacher.program}</span>
                    </div>
                    {(teacher.regNo) && (
                        <div className="flex items-center text-gray-500">
                            <User className="h-4 w-4 mr-2" />
                            <span>{teacher.regNo}</span>
                        </div>
                    )}
                    {(teacher.contactNumber) && (
                        <div className="flex items-center text-gray-500">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{teacher.contactNumber}</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
