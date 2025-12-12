"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { assignTeacherToCourse } from "@/lib/api";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const assignTeacherSchema = z.object({
    courseId: z.coerce.number().min(1, "Course ID is required"),
    teacherId: z.coerce.number().min(1, "Teacher ID is required"),
});

type AssignTeacherFormValues = z.infer<typeof assignTeacherSchema>;

export default function AssignTeacherPage({ params }: { params: Promise<{ id: string }> }) {
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
    } = useForm<AssignTeacherFormValues>({
        resolver: zodResolver(assignTeacherSchema) as any,
    });

    const onSubmit = async (data: AssignTeacherFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            await assignTeacherToCourse(data);
            setSuccess(true);
            reset();
            setTimeout(() => {
                router.push(`/admin/${id}/assign`);
            }, 1500); // Redirect to assign landing
        } catch (err: any) {
            setError(err.message || "Failed to assign teacher.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link
                href={`/admin/${id}/assign`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Assignments
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <h1 className="text-2xl font-bold text-gray-900">Assign Teacher</h1>
                    <p className="text-gray-500 mt-1">Assign a faculty member to a course.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">
                            Teacher assigned successfully! Redirecting...
                        </div>
                    )}

                    <Input label="Course ID" type="number" placeholder="e.g. 5" error={errors.courseId} {...register("courseId")} />
                    <Input label="Teacher ID" type="number" placeholder="e.g. 10" error={errors.teacherId} {...register("teacherId")} />

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center justify-center"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Assign Teacher
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Input({ label, error, className = "", ...props }: any) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <input
                className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white transition-all duration-200 ${error ? "border-red-300 focus:ring-red-200 focus:border-red-500" : "border-gray-200 focus:ring-purple-200 focus:border-purple-500 focus:ring-4"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
