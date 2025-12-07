"use client";

import { Mail, Phone, MapPin, User, Calendar, BookOpen, GraduationCap, Briefcase, Award, Edit } from "lucide-react";
import Image from "next/image";
import { Teacher } from "@/lib/api";
import { motion, Variants } from "framer-motion";

const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const cardVars: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface TeacherProfileContentProps {
    teacher: Teacher;
}

export default function TeacherProfileContent({ teacher }: TeacherProfileContentProps) {
    return (
        <motion.div
            className="space-y-6 max-w-5xl mx-auto pb-12"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            {/* Header / Cover */}
            <motion.div variants={itemVars} className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 group">
                <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row items-end -mt-16 mb-6 gap-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="relative h-32 w-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-100 shrink-0 group-hover:scale-105 transition-transform duration-300"
                        >
                            {teacher.profilePic ? (
                                <Image
                                    src={teacher.profilePic}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-50 text-gray-300">
                                    <User size={48} />
                                </div>
                            )}
                        </motion.div>
                        <div className="flex-1 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                {teacher.name}
                                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <Edit size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
                                </span>
                            </h1>
                            <p className="text-gray-500 font-medium text-lg">{teacher.qualification || "Faculty Member"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-gray-600 group/item hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover/item:bg-blue-100 transition-colors">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</p>
                                <p className="text-sm font-medium">{teacher.emailAddress}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 group/item hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg group-hover/item:bg-purple-100 transition-colors">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Contact</p>
                                <p className="text-sm font-medium">{teacher.contactNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 group/item hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className="p-2.5 bg-green-50 text-green-600 rounded-lg group-hover/item:bg-green-100 transition-colors">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Reg No</p>
                                <p className="text-sm font-medium">{teacher.regNo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Info */}
                <motion.div variants={cardVars} className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 pb-4 border-b border-gray-50">
                            <User size={20} className="text-blue-500" /> Personal Details
                        </h3>
                        <div className="space-y-6">
                            <div className="group">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-blue-500 transition-colors">Father's Name</p>
                                <p className="text-sm font-medium text-gray-700">{teacher.fatherName}</p>
                            </div>
                            <div className="group">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-blue-500 transition-colors">Date of Birth</p>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Calendar size={14} className="text-gray-400" />
                                    {teacher.dob}
                                </div>
                            </div>
                            <div className="group">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-blue-500 transition-colors">Nationality</p>
                                <p className="text-sm font-medium text-gray-700">{teacher.nationality}</p>
                            </div>
                            <div className="group">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 group-hover:text-blue-500 transition-colors">Emergency Contact</p>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Phone size={14} className="text-gray-400" />
                                    {teacher.guardianNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Academic & University Info */}
                <motion.div variants={containerVars} className="lg:col-span-2 space-y-6">
                    <motion.div variants={cardVars} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 pb-4 border-b border-gray-50">
                            <GraduationCap size={20} className="text-purple-500" /> Academic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-gray-50 rounded-2xl hover:bg-purple-50/50 transition-colors border border-transparent hover:border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
                                        <Award size={20} />
                                    </div>
                                    <span className="font-semibold text-gray-700">Qualification</span>
                                </div>
                                <p className="text-gray-600 text-sm pl-11">{teacher.qualification}</p>
                            </div>
                            <div className="p-5 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                        <Briefcase size={20} />
                                    </div>
                                    <span className="font-semibold text-gray-700">Specialization</span>
                                </div>
                                <p className="text-gray-600 text-sm pl-11">{teacher.specialization}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={cardVars} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 pb-4 border-b border-gray-50">
                            <BookOpen size={20} className="text-emerald-500" /> Department Details
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Department</p>
                                <p className="text-sm font-bold text-gray-800">{teacher.program}</p>
                            </div>
                            <div className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Campus</p>
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                    <MapPin size={14} className="text-gray-400" />
                                    {teacher.campus}
                                </div>
                            </div>
                            <div className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Session</p>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                                    {teacher.session}
                                </span>
                            </div>
                            <div className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Semester</p>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100">
                                    {teacher.semester}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
