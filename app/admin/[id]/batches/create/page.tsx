"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { createBatch } from "@/lib/api";
import { Loader2, ArrowLeft, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const batchSchema = z.object({
    name: z.string().min(2, "Batch Name is required"),
});

type BatchFormValues = z.infer<typeof batchSchema>;

export default function CreateBatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BatchFormValues>({
        resolver: zodResolver(batchSchema),
    });

    const onSubmit = async (data: BatchFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            await createBatch(data);
            setSuccess(true);
            reset();
            setTimeout(() => {
                router.push(`/admin/${id}/batches/view`);
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Failed to create batch.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
        >
            <Link
                href={`/admin/${id}/batches`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Batches
            </Link>

            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Create New Batch</h1>
                        <p className="text-gray-500 mt-1">Add a new academic batch.</p>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                        <Layers className="h-6 w-6" />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-green-50 text-green-600 rounded-xl text-sm border border-green-100"
                        >
                            Batch created successfully! Redirecting...
                        </motion.div>
                    )}

                    <Input label="Batch Name" className="text-zinc-900" placeholder="Fall 2024" error={errors.name} {...register("name")} />

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Link
                            href={`/admin/${id}/batches`}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 disabled:opacity-50 flex items-center"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            Create Batch
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

function Input({ label, error, className = "", ...props }: any) {
    return (
        <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white transition-all duration-200 outline-none ${error
                    ? "border-red-200 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{error.message}</p>}
        </div>
    );
}
