"use client";

import { Users, AlertCircle, ArrowLeft } from "lucide-react";
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
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};

interface TeacherCourseBatchesContentProps {
    id: string;
    courseNo: string;
    activeBatches: { batch: string; count: number }[];
}

export default function TeacherCourseBatchesContent({ id, courseNo, activeBatches }: TeacherCourseBatchesContentProps) {
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
                        <Link href={`/teachers/${id}/students`} className="hover:text-blue-600 hover:underline flex items-center gap-1 transition-colors">
                            <ArrowLeft size={14} /> Students
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{courseNo}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Select Batch</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose a batch to view the student list.</p>
                </div>
            </motion.div>

            {/* Batches Grid */}
            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {activeBatches.length > 0 ? (
                    activeBatches.map((item) => (
                        <Link
                            key={item.batch}
                            href={`/teachers/${id}/students/${courseNo}/${item.batch}`}
                            className="block group"
                        >
                            <motion.div
                                variants={itemVars}
                                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-blue-200 rotation-0 group-hover:rotate-3">
                                    <Users size={36} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.batch}</h3>
                                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-sm font-medium border border-gray-100">
                                    {item.count} Students
                                </div>
                                <span className="mt-6 px-6 py-2.5 bg-gray-50 text-gray-600 text-sm font-bold uppercase tracking-wider rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors w-full">
                                    View List
                                </span>
                            </motion.div>
                        </Link>
                    ))
                ) : (
                    <motion.div variants={itemVars} className="col-span-full text-center py-16 bg-white rounded-2xl border border-gray-200 border-dashed">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 mb-6 group">
                            <AlertCircle className="h-8 w-8 text-orange-400 group-hover:text-orange-600 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Batches Found</h3>
                        <p className="mt-2 text-sm text-gray-500">No students are currently enrolled in any batch for this course.</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
