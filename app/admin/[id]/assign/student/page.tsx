"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { assignStudentsToCourse } from "@/lib/api";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const assignStudentsSchema = z.object({
    courseId: z.coerce.number().min(1, "Course ID is required"),
    studentIdsStr: z.string().min(1, "Enter at least one Student ID"),
});

type AssignStudentsFormValues = z.infer<typeof assignStudentsSchema>;

export default function AssignStudentsPage({ params }: { params: Promise<{ id: string }> }) {
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
    } = useForm<AssignStudentsFormValues>({
        resolver: zodResolver(assignStudentsSchema) as any,
    });

    const onSubmit = async (data: AssignStudentsFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        // Convert comma-separated string to number array
        const studentIds = data.studentIdsStr
            .split(',')
            .map(id => Number(id.trim()))
            .filter(id => !isNaN(id) && id > 0);

        if (studentIds.length === 0) {
            setError("Please enter valid numeric Student IDs.");
            return;
        }

        try {
            await assignStudentsToCourse({
                courseId: data.courseId,
                studentIds
            });
            setSuccess(true);
            reset();
            setTimeout(() => {
                router.push(`/admin/${id}/assign`);
            }, 1500); // Redirect to assign landing
        } catch (err: any) {
            setError(err.message || "Failed to assign students.");
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
                    <h1 className="text-2xl font-bold text-gray-900">Assign Students</h1>
                    <p className="text-gray-500 mt-1">Enroll multiple students into a course.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">
                            Students assigned successfully! Redirecting...
                        </div>
                    )}

                    <div>
                        <Input label="Course ID" type="number" placeholder="e.g. 5" error={errors.courseId} {...register("courseId")} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Student IDs (Comma Separated)</label>
                        <textarea
                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white transition-all duration-200 h-32 ${errors.studentIdsStr ? "border-red-300 focus:ring-red-200 focus:border-red-500" : "border-gray-200 focus:ring-green-200 focus:border-green-500 focus:ring-4"
                                }`}
                            placeholder="e.g. 101, 102, 103"
                            {...register("studentIdsStr")}
                        />
                        {errors.studentIdsStr && <p className="mt-1 text-sm text-red-500">{errors.studentIdsStr.message}</p>}
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50 flex items-center justify-center"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Assign Students
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
                className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white transition-all duration-200 ${error ? "border-red-300 focus:ring-red-200 focus:border-red-500" : "border-gray-200 focus:ring-green-200 focus:border-green-500 focus:ring-4"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
