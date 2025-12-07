"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { assignBatch, BatchAssignData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const assignBatchSchema = z.object({
    studentIds: z.string().min(1, "Student IDs required"), // We handle this as comma separated string or multiline for easier input, then parse
    batch: z.string().min(1, "Batch is required"),
});

type AssignBatchFormValues = z.infer<typeof assignBatchSchema>;

export default function AssignBatchPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<AssignBatchFormValues>({
        resolver: zodResolver(assignBatchSchema)
    });

    const onSubmit = async (data: AssignBatchFormValues) => {
        setIsSubmitting(true);
        setError(null);

        // Parse IDs
        const ids = data.studentIds
            .split(/[\n,]+/) // Split by newline or comma
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));

        if (ids.length === 0) {
            setError("No valid Student IDs found");
            return;
        }

        try {
            await assignBatch({
                studentIds: ids,
                batch: data.batch
            });
            router.push("/admin/students");
            router.refresh(); // Or show success message
        } catch (err: any) {
            setError(err.message || "Failed to assign batch");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/students" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Assign Batch</h2>
                    <p className="text-gray-500 text-sm mt-1">Bulk assign students to a batch.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Batch</label>
                        <select {...register("batch")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                            <option value="">Select Target Batch</option>
                            <option value="Batch-A">Batch-A</option>
                            <option value="Batch-B">Batch-B</option>
                            <option value="Batch-C">Batch-C</option>
                            <option value="Batch-D">Batch-D</option>
                            <option value="Batch-E">Batch-E</option>
                        </select>
                        {errors.batch && <p className="text-xs text-red-500">{errors.batch.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Student IDs</label>
                        <textarea
                            {...register("studentIds")}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Enter Student IDs separated by commas or new lines. Example:
101
102
103"
                        />
                        <p className="text-xs text-gray-500">Paste a list of numeric Student IDs here.</p>
                        {errors.studentIds && <p className="text-xs text-red-500">{errors.studentIds.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting ? "Assigning..." : "Assign Students"}
                    </button>
                </div>
            </form>
        </div>
    );
}
