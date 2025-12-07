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
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface CheckAttendanceBatchesContentProps {
    id: string;
    courseNo: string;
    activeBatches: { batch: string; count: number }[];
}

export default function CheckAttendanceBatchesContent({ id, courseNo, activeBatches }: CheckAttendanceBatchesContentProps) {
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
                        <Link href={`/teachers/${id}/course-actions/attendance/check`} className="hover:text-blue-600 hover:underline flex items-center gap-1 transition-colors">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{courseNo}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Select Batch</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose a batch to check attendance for.</p>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {activeBatches.length > 0 ? (
                    activeBatches.map((item) => (
                        <Link
                            key={item.batch}
                            href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${item.batch}`}
                            className="block group"
                        >
                            <motion.div
                                variants={itemVars}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all flex flex-col items-center text-center hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner relative z-10 group-hover:scale-110">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors relative z-10">{item.batch}</h3>
                                <p className="text-sm text-gray-500 mt-2 relative z-10">{item.count} Students Enrolled</p>
                                <span className="mt-6 px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 relative z-10 transition-colors">
                                    Check Status
                                </span>
                            </motion.div>
                        </Link>
                    ))
                ) : (
                    <motion.div variants={itemVars} className="col-span-full text-center py-16 bg-white rounded-xl border border-gray-100 border-dashed">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 mb-4 group">
                            <AlertCircle className="h-8 w-8 text-orange-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Batches Found</h3>
                        <p className="mt-2 text-gray-500">No students are currently enrolled in any batch for this course.</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
