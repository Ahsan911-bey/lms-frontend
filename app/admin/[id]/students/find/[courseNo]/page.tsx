"use client";

import Link from "next/link";
import { getAllBatches, Batch } from "@/lib/api";
import { Users, ArrowLeft, Layers } from "lucide-react";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SelectBatchPage({ params }: { params: Promise<{ id: string; courseNo: string }> }) {
    const { id, courseNo } = use(params);
    const decodedCourseNo = decodeURIComponent(courseNo || "");
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllBatches().then(setBatches).catch(console.error).finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/students/view`}
                    className="p-3 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Select Batch</h1>
                    <p className="text-gray-500 mt-1">
                        Viewing batches for <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{decodedCourseNo}</span>
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-40 bg-gray-50 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {batches.length > 0 ? (
                        batches.map((batch, idx) => (
                            <Link
                                key={batch.id}
                                href={`/admin/${id}/students/find/${courseNo}/${batch.name}`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all group text-center h-full flex flex-col items-center justify-center"
                                >
                                    <div className="h-16 w-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 shadow-inner group-hover:bg-green-600 group-hover:text-white">
                                        <Layers className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                        {batch.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium group-hover:text-green-500 transition-colors">View Students &rarr;</p>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                            No batches found.
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
