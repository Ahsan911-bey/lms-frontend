"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createStudent, StudentCreationData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const studentSchema = z.object({
    id: z.coerce.number().min(1, "ID is required"),
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
    profilePic: z.string().url("Must be a valid URL").optional().or(z.string().min(0)),
    password: z.string().min(6, "Password must be at least 6 chars"),
    cgpa: z.coerce.number().min(0).max(4).optional(),
    wifiAccount: z.string().optional(),
    office365Email: z.string().email("Invalid O365 email").optional().or(z.string().min(0)),
    office365Pass: z.string().optional(),
    batch: z.string().min(1, "Batch is required"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function CreateStudentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<StudentFormValues>({
        resolver: zodResolver(studentSchema) as Resolver<StudentFormValues>,
        defaultValues: {
            profilePic: "https://pyxis.nymag.com/v1/imgs/a85/912/a5ef47190c966169cf6e9c6da815b0f0ad-07-john-wick-2-2.rsquare.w400.jpg",
            cgpa: 0
        }
    });

    const onSubmit = async (data: StudentFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createStudent(data as StudentCreationData);
            router.push("/admin/students");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create student");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/students" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Register Student</h2>
                    <p className="text-gray-500 text-sm mt-1">Enroll a new student into the system.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Student Identity</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Internal ID</label>
                        <input type="number" {...register("id")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. 12" />
                        {errors.id && <p className="text-xs text-red-500">{errors.id.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <input {...register("name")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Student Name" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Father Name</label>
                        <input {...register("fatherName")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
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
                        <input {...register("guardianNumber")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.guardianNumber && <p className="text-xs text-red-500">{errors.guardianNumber.message}</p>}
                    </div>

                    {/* Academic Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100 mt-4">
                        <h3 className="text-lg font-bold text-gray-800">Academic details</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Registration No</label>
                        <input {...register("regNo")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="CS-001" />
                        {errors.regNo && <p className="text-xs text-red-500">{errors.regNo.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Program</label>
                        <input {...register("program")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Computer Science" />
                        {errors.program && <p className="text-xs text-red-500">{errors.program.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Session</label>
                        <input {...register("session")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="SP25" />
                        {errors.session && <p className="text-xs text-red-500">{errors.session.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Semester</label>
                        <input {...register("semester")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="1" />
                        {errors.semester && <p className="text-xs text-red-500">{errors.semester.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Campus</label>
                        <input {...register("campus")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="SWL" />
                        {errors.campus && <p className="text-xs text-red-500">{errors.campus.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Class</label>
                        <input {...register("className")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="CS-1A" />
                        {errors.className && <p className="text-xs text-red-500">{errors.className.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Batch</label>
                        <select {...register("batch")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                            <option value="">Select Batch</option>
                            <option value="Batch-A">Batch-A</option>
                            <option value="Batch-B">Batch-B</option>
                            <option value="Batch-C">Batch-C</option>
                            <option value="Batch-D">Batch-D</option>
                            <option value="Batch-E">Batch-E</option>
                        </select>
                        {errors.batch && <p className="text-xs text-red-500">{errors.batch.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">CGPA (Optional)</label>
                        <input type="number" step="0.01" {...register("cgpa")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.cgpa && <p className="text-xs text-red-500">{errors.cgpa.message}</p>}
                    </div>

                    {/* Account Info */}
                    <div className="col-span-full pb-2 border-b border-gray-100 mt-4">
                        <h3 className="text-lg font-bold text-gray-800">Digital Credentials</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input type="email" {...register("emailAddress")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.emailAddress && <p className="text-xs text-red-500">{errors.emailAddress.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <input type="password" {...register("password")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Office 365 Email</label>
                        <input type="email" {...register("office365Email")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.office365Email && <p className="text-xs text-red-500">{errors.office365Email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Office 365 Password</label>
                        <input type="text" {...register("office365Pass")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.office365Pass && <p className="text-xs text-red-500">{errors.office365Pass.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Wifi Account</label>
                        <input {...register("wifiAccount")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        {errors.wifiAccount && <p className="text-xs text-red-500">{errors.wifiAccount.message}</p>}
                    </div>

                    <div className="col-span-full space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Profile Picture URL</label>
                        <input {...register("profilePic")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
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
                        {isSubmitting ? "Creating..." : "Register Student"}
                    </button>
                </div>
            </form>
        </div>
    );
}
