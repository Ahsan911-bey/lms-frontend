"use client";

import { ClipboardList, BookOpen, FileText, GraduationCap, ArrowRight } from "lucide-react";
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function MarksTypeContent({ id }: { id: string }) {
    const marksTypes = [
        {
            id: "quiz",
            title: "Quiz Marks",
            description: "Upload marks for class quizzes.",
            icon: ClipboardList,
            color: "blue"
        },
        {
            id: "assignment",
            title: "Assignment Marks",
            description: "Upload marks for home assignments.",
            icon: FileText,
            color: "purple"
        },
        {
            id: "mids",
            title: "Mids Marks",
            description: "Upload Mid-Term examination results.",
            icon: BookOpen,
            color: "orange"
        },
        {
            id: "final",
            title: "Final Marks",
            description: "Upload Final examination results.",
            icon: GraduationCap,
            color: "emerald"
        }
    ];

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
                        <Link href={`/teachers/${id}/course-actions`} className="hover:text-blue-600 hover:underline">Course Actions</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">Marks</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Select Marks Type</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose the category of marks you want to upload.</p>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-4">
                {marksTypes.map((type) => (
                    <Link
                        key={type.id}
                        href={`/teachers/${id}/course-actions/marks/select-course?type=${type.id}`}
                        className="group"
                    >
                        <motion.div
                            variants={itemVars}
                            className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all flex items-center gap-6 h-full hover:shadow-xl hover:-translate-y-1 hover:border-${type.color}-100 relative overflow-hidden`}
                        >
                            {/* Accents */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-${type.color}-50 rounded-full blur-2xl -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                            <div className={`h-16 w-16 shrink-0 bg-${type.color}-50 text-${type.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                                <type.icon size={32} />
                            </div>
                            <div className="flex-1 relative z-10">
                                <h3 className={`text-xl font-bold text-gray-900 group-hover:text-${type.color}-700 transition-colors`}>
                                    {type.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                            </div>
                            <div className={`h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-${type.color}-500 group-hover:text-white transition-all shadow-sm`}>
                                <ArrowRight size={18} />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>
        </motion.div>
    );
}
