"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { createTeacher } from "@/lib/api";
import { Loader2, ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const teacherSchema = z.object({
    name: z.string().min(2, "Name is required"),
    regNo: z.string().min(2, "Registration Number is required"),
    emailAddress: z.string().email("Invalid email address"),
    contactNumber: z.string().min(10, "Contact Number is required"),
    guardianNumber: z.string().min(10, "Guardian Number is required"),
    fatherName: z.string().min(2, "Father Name is required"),
    program: z.string().min(2, "Program is required"),
    session: z.string().min(2, "Session is required"),
    semester: z.string().min(1, "Semester is required"),
    campus: z.string().min(2, "Campus is required"),
    className: z.string().min(2, "Class Name is required"),
    nationality: z.string().min(2, "Nationality is required"),
    dob: z.string().min(10, "Date of Birth is required (YYYY-MM-DD)").regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
    profilePic: z.string().url("Valid URL required").or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
    qualification: z.string().min(2, "Qualification is required"),
    specialization: z.string().min(2, "Specialization is required"),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export default function CreateTeacherPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherFormValues>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            profilePic: "",
        },
    });

    const onSubmit = async (data: TeacherFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createTeacher(data);
            router.push(`/admin/${id}/teachers`);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create teacher.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <Link
                href={`/admin/${id}/teachers`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Teachers
            </Link>

            <div className="bg-white rounded-3xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Teacher</h1>
                        <p className="text-gray-500 mt-1">Enter the details to register a new faculty member.</p>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-gray-100">
                        <UploadCloud className="h-6 w-6" />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center"
                        >
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></span>
                            {error}
                        </motion.div>
                    )}

                    {/* Personal Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Full Name" error={errors.name} {...register("name")} />
                            <Input label="Father Name" error={errors.fatherName} {...register("fatherName")} />
                            <Input label="Date of Birth (YYYY-MM-DD)" type="date" error={errors.dob} {...register("dob")} />
                            <Input label="Nationality" error={errors.nationality} {...register("nationality")} />
                            <Input label="Contact Number" error={errors.contactNumber} {...register("contactNumber")} />
                            <Input label="Guardian Contact" error={errors.guardianNumber} {...register("guardianNumber")} />
                        </div>
                    </div>

                    {/* Academic Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Academic Profile</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Registration No" placeholder="T-001" error={errors.regNo} {...register("regNo")} />
                            <Input label="Qualification" placeholder="PhD Computer Science" error={errors.qualification} {...register("qualification")} />
                            <Input label="Specialization" placeholder="Artificial Intelligence" error={errors.specialization} {...register("specialization")} />
                            <Input label="Program" placeholder="Computer Science" error={errors.program} {...register("program")} />
                        </div>
                    </div>

                    {/* Assignment Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Assignment Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Campus" placeholder="ISL" error={errors.campus} {...register("campus")} />
                            <Input label="Session" placeholder="FA23" error={errors.session} {...register("session")} />
                            <Input label="Semester" placeholder="1" error={errors.semester} {...register("semester")} />
                            <Input label="Class Name" placeholder="CS-1A" error={errors.className} {...register("className")} />
                        </div>
                    </div>

                    {/* Account Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Account Credentials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Email Address" type="email" error={errors.emailAddress} {...register("emailAddress")} />
                            <Input label="Password" type="password" error={errors.password} {...register("password")} />
                            <div className="col-span-2">
                                <Input label="Profile Picture URL" placeholder="https://..." error={errors.profilePic} {...register("profilePic")} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Link
                            href={`/admin/${id}/teachers`}
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
                            Create Teacher
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
                    : "border-gray-200 hover:border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{error.message}</p>}
        </div>
    );
}
