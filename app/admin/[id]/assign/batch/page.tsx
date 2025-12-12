"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { getAllBatches, getAdminCourses, assignBatchToCourse, Batch, Course } from "@/lib/api";
import { Loader2, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const assignBatchSchema = z.object({
    courseId: z.string().min(1, "Select a course"),
    batchId: z.string().min(1, "Select a batch"),
});

type AssignBatchFormValues = z.infer<typeof assignBatchSchema>;

export default function AssignBatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [batches, setBatches] = useState<Batch[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        Promise.all([getAllBatches(), getAdminCourses()])
            .then(([b, c]) => {
                setBatches(b);
                setCourses(c);
            })
            .catch(console.error);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AssignBatchFormValues>({
        resolver: zodResolver(assignBatchSchema),
    });

    const onSubmit = async (data: AssignBatchFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            await assignBatchToCourse({
                courseId: Number(data.courseId),
                batchId: Number(data.batchId)
            });
            setSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.message || "Failed to assign batch.");
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
                href={`/admin/${id}/assign`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
            </Link>

            <div className="bg-white rounded-3xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Assign Batch</h1>
                        <p className="text-gray-500 mt-1">Enroll an entire batch into a course.</p>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-gray-100">
                        <Users className="h-6 w-6" />
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
                            Batch assigned successfully!
                        </motion.div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
                        <div className="relative">
                            <select
                                {...register("courseId")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-zinc-700 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all appearance-none"
                            >
                                <option value="">Select a course...</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.courseName} ({c.courseNo})</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        {errors.courseId && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.courseId.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Batch</label>
                        <div className="relative">
                            <select
                                {...register("batchId")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-zinc-700 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all appearance-none"
                            >
                                <option value="">Select a batch...</option>
                                {batches.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        {errors.batchId && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.batchId.message}</p>}
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Link
                            href={`/admin/${id}/assign`}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 hover:shadow-purple-300 disabled:opacity-50 flex items-center"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            Assign Batch
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
