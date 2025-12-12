"use client";

import { useEffect, useState, use } from "react";
import { getAllBatches, Batch } from "@/lib/api";
import { Loader2, ArrowLeft, Layers, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ViewBatchesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllBatches()
            .then((data) => setBatches(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/batches`}
                    className="p-3 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Batches</h1>
                    <p className="text-gray-500">List of all academic batches enrolled.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-purple-100 rounded-full"></div>
                        <div className="w-12 h-12 border-4 border-purple-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                </div>
            ) : batches.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {batches.map((batch, idx) => (
                        <motion.div
                            key={batch.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all p-6 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">ID: {batch.id}</span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{batch.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-4">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>Academic Session</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No batches found. Create one to get started.</p>
                </div>
            )}
        </motion.div>
    );
}
