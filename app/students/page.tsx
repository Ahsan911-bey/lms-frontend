"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, ArrowRight, GraduationCap, BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import { validateStudent } from "@/lib/api";
import LoginHelp from "@/components/LoginHelp";

const loginSchema = z.object({
    id: z.number().min(1, "Student ID is required"),
    regNo: z.string().min(1, "Registration Number is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function StudentPortalLogin() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await validateStudent(data);

            if (response && response.token) {
                // Store token and redirect
                // Use the ID from the response if available, otherwise fall back to form data (though backend should return it)
                const userId = response.id || data.id;

                // Dynamically import setAuth to avoid SSR issues if any, though it checks for window
                const { setAuth } = await import("@/lib/auth");
                setAuth(response.token, response.role, userId);

                router.push(`/students/${userId}/dashboard`);
            } else {
                // Display specific error message from backend if available
                const errorMessage = (response as any)?.message || "Login failed: Invalid response from server";
                setError(errorMessage);
            }
        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-zinc-950 font-sans lg:flex-row flex-col">
            {/* Left Side - Hero Section */}
            <div className="relative w-full lg:w-[55%] flex flex-col items-center justify-center p-8 lg:p-16 overflow-hidden bg-zinc-900">
                {/* Background Gradients/Patterns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-zinc-900 to-indigo-900 opacity-90"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                    {/* Animated Blobs */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-12 right-12 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 flex flex-col items-start max-w-lg text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                            <GraduationCap className="w-8 h-8 text-blue-200" />
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                            Welcome to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Student Portal
                            </span>
                        </h1>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            Access your course materials, check attendance, view grades, and manage your academic profile all in one place.
                        </p>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <BookOpen className="w-5 h-5 text-blue-300" />
                                <span className="text-sm font-medium text-zinc-200">Course Resources</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-purple-300" />
                                <span className="text-sm font-medium text-zinc-200">Real-time Updates</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 lg:p-16 bg-white dark:bg-zinc-950 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-sm"
                >
                    {/* University Logo */}
                    <div className="mb-10 flex justify-center">
                        <div className="relative w-64 h-24">
                            <Image
                                src="https://swl-cms.comsats.edu.pk:8082/Content/img/logo_with_text.png"
                                alt="University Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Sign in to your account</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            Please enter your credentials below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-4">
                            {/* ID Field */}
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Student ID
                                </label>
                                <input
                                    id="id"
                                    type="number"
                                    placeholder="Enter ID (e.g. 12)"
                                    {...register("id", { valueAsNumber: true })}
                                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-all outline-none
                      ${errors.id
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                                            : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-zinc-50 dark:bg-zinc-900"
                                        } dark:text-white`}
                                />
                                {errors.id && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.id.message}</p>
                                )}
                            </div>

                            {/* RegNo Field */}
                            <div>
                                <label htmlFor="regNo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Registration No
                                </label>
                                <input
                                    id="regNo"
                                    type="text"
                                    placeholder="e.g. FA21-BCS-001"
                                    {...register("regNo")}
                                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-all outline-none
                      ${errors.regNo
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                                            : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-zinc-50 dark:bg-zinc-900"
                                        } dark:text-white`}
                                />
                                {errors.regNo && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.regNo.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                        Forgot password?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-all outline-none
                      ${errors.password
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                                            : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-zinc-50 dark:bg-zinc-900"
                                        } dark:text-white`}
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3 dark:bg-red-900/10 dark:border-red-900/30"
                                >
                                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">Authentication Failed</h4>
                                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center items-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-zinc-950"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In to Portal
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                <div className="absolute bottom-6 w-full text-center">
                    <p className="text-xs text-zinc-400">
                        © {new Date().getFullYear()} COMSATS University Islamabad. All rights reserved.
                    </p>
                </div>
            </div>
            <LoginHelp role="student" />
        </div>
    );
}
