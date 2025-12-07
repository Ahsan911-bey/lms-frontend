"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { assignTeacherToCourse, AssignTeacherData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const assignTeacherSchema = z.object({
    courseId: z.coerce.number().min(1, "Course ID required"),
    teacherId: z.coerce.number().min(1, "Teacher ID required"),
});

type AssignTeacherFormValues = z.infer<typeof assignTeacherSchema>;

export default function AssignTeacherToCoursePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<AssignTeacherFormValues>({
        resolver: zodResolver(assignTeacherSchema)
    });

    const onSubmit = async (data: AssignTeacherFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await assignTeacherToCourse(data);
            router.push("/admin/courses");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to assign teacher");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/courses" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Assign Teacher</h2>
                    <p className="text-gray-500 text-sm mt-1">Link a professor to a course.</p>
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
                        <label className="text-sm font-semibold text-gray-700">Course ID</label>
                        <input type="number" {...register("courseId")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. 8" />
                        <p className="text-xs text-gray-500">Enter the numeric ID of the Course.</p>
                        {errors.courseId && <p className="text-xs text-red-500">{errors.courseId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Teacher ID</label>
                        <input type="number" {...register("teacherId")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. 3" />
                        <p className="text-xs text-gray-500">Enter the numeric ID of the Teacher.</p>
                        {errors.teacherId && <p className="text-xs text-red-500">{errors.teacherId.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting ? "Assigning..." : "Confirm Assignment"}
                    </button>
                </div>
            </form>
        </div>
    );
}
