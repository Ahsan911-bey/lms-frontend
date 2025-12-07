"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createTeacher, TeacherCreationData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

const teacherSchema = z.object({
    name: z.string().min(1, "Name is required"),
    regNo: z.string().min(1, "Registration No is required"),
    emailAddress: z.string().email("Invalid email"),
    contactNumber: z.string().min(1, "Contact is required"),
    guardianNumber: z.string().min(1, "Guardian Contact is required"),
    fatherName: z.string().min(1, "Father Name is required"),
    program: z.string().min(1, "Program is required"),
    session: z.string().min(1, "Session is required"),
    semester: z.string().min(1, "Semester is required"),
    campus: z.string().min(1, "Campus is required"),
    className: z.string().min(1, "Class Name is required"),
    nationality: z.string().min(1, "Nationality is required"),
    dob: z.string().min(1, "Date of Birth is required"),
    profilePic: z.string().url("Must be a valid URL").optional().or(z.string().min(0)), // Allow empty string or URL
    password: z.string().min(6, "Password must be at least 6 chars"),
    qualification: z.string().min(1, "Qualification is required"),
    specialization: z.string().min(1, "Specialization is required"),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export default function CreateTeacherPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<TeacherFormValues>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            profilePic: "https://pyxis.nymag.com/v1/imgs/a85/912/a5ef47190c966169cf6e9c6da815b0f0ad-07-john-wick-2-2.rsquare.w400.jpg" // Default as per example
        }
    });

    const onSubmit = async (data: TeacherFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createTeacher(data as TeacherCreationData);
            router.push("/admin/teachers");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create teacher");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/teachers" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Create New Teacher</h2>
                    <p className="text-gray-500 text-sm mt-1">Fill in the details to register a new teacher.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <input {...register("name")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. Dr. Ali Ahmed" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Father Name</label>
                        <input {...register("fatherName")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Father's Name" />
                        {errors.fatherName && <p className="text-xs text-red-500">{errors.fatherName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                        <input type="date" {...register("dob")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.dob && <p className="text-xs text-red-500">{errors.dob.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Nationality</label>
                        <input {...register("nationality")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. Pakistani" />
                        {errors.nationality && <p className="text-xs text-red-500">{errors.nationality.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Contact Number</label>
                        <input {...register("contactNumber")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="0300-XXXXXXX" />
                        {errors.contactNumber && <p className="text-xs text-red-500">{errors.contactNumber.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Guardian Number</label>
                        <input {...register("guardianNumber")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="0300-XXXXXXX" />
                        {errors.guardianNumber && <p className="text-xs text-red-500">{errors.guardianNumber.message}</p>}
                    </div>

                    {/* Academic Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100 mt-4">
                        <h3 className="text-lg font-bold text-gray-800">Academic details</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Registration No (ID)</label>
                        <input {...register("regNo")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. T-001" />
                        {errors.regNo && <p className="text-xs text-red-500">{errors.regNo.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Qualification</label>
                        <input {...register("qualification")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. PhD Computer Science" />
                        {errors.qualification && <p className="text-xs text-red-500">{errors.qualification.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Specialization</label>
                        <input {...register("specialization")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. Artificial Intelligence" />
                        {errors.specialization && <p className="text-xs text-red-500">{errors.specialization.message}</p>}
                    </div>

                    {/* Employment Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100 mt-4">
                        <h3 className="text-lg font-bold text-gray-800">Employment Details</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Program</label>
                        <input {...register("program")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. Computer Science" />
                        {errors.program && <p className="text-xs text-red-500">{errors.program.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Session</label>
                        <input {...register("session")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. SP25" />
                        {errors.session && <p className="text-xs text-red-500">{errors.session.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Semester</label>
                        <input {...register("semester")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. 1" />
                        {errors.semester && <p className="text-xs text-red-500">{errors.semester.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Campus</label>
                        <input {...register("campus")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. SWL" />
                        {errors.campus && <p className="text-xs text-red-500">{errors.campus.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Class Name</label>
                        <input {...register("className")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. CS-1A" />
                        {errors.className && <p className="text-xs text-red-500">{errors.className.message}</p>}
                    </div>

                    {/* Account Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100 mt-4">
                        <h3 className="text-lg font-bold text-gray-800">Account Credentials</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input type="email" {...register("emailAddress")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="teacher@university.edu" />
                        {errors.emailAddress && <p className="text-xs text-red-500">{errors.emailAddress.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <input type="password" {...register("password")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="******" />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="col-span-full space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Profile Picture URL</label>
                        <input {...register("profilePic")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="https://..." />
                        {errors.profilePic && <p className="text-xs text-red-500">{errors.profilePic.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting ? "Creating..." : "Create Teacher"}
                    </button>
                </div>
            </form>
        </div>
    );
}
