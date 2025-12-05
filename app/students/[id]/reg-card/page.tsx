"use client";

import { use } from "react";
import Image from "next/image";
import { getStudentProfile, Student } from "@/lib/api";
import { useEffect, useState } from "react";
import { Printer } from "lucide-react";

export default function RegCardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await getStudentProfile(id);
                setStudent(data);
            } catch (error) {
                console.error("Failed to fetch student profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading registration card...</div>;
    }

    if (!student) {
        return <div className="p-8 text-center text-red-500">Student not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Printer size={18} />
                    <span>Print Card</span>
                </button>
            </div>

            <div className="max-w-2xl mx-auto bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-lg print:border-2 print:border-gray-800 print:shadow-none print:mx-auto print:w-full print:max-w-none">
                {/* Header */}
                <div className="bg-blue-900 text-white p-6 text-center print:bg-blue-900 print:text-white">
                    <div className="flex items-center justify-center space-x-4 mb-2">
                        {/* Placeholder for Logo */}
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-xl">
                            U
                        </div>
                        <div className="text-left">
                            <h1 className="text-xl font-bold uppercase tracking-wider">BA University</h1>
                            <p className="text-sm text-blue-200">Excellence in Education</p>
                        </div>
                    </div>
                    <div className="mt-4 border-t border-blue-700 pt-2">
                        <h2 className="text-lg font-semibold uppercase tracking-widest text-yellow-400">Student Registration Card</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3 print:gap-8 bg-white relative">
                    {/* Watermark/Background Pattern could go here */}

                    {/* Photo Column */}
                    <div className="md:col-span-1 flex flex-col items-center space-y-4">
                        <div className="w-40 h-48 bg-gray-200 border-2 border-gray-300 rounded-lg overflow-hidden relative shadow-inner">
                            {student.profilePic ? (
                                <img
                                    src={student.profilePic}
                                    alt={student.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                    <span className="text-xs">No Photo</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center w-full">
                            <div className="border-b-2 border-gray-800 pb-1 mb-1">
                                <p className="font-mono font-bold text-lg">{student.regNo}</p>
                            </div>
                            <p className="text-xs text-gray-500 uppercase">Registration No</p>
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="md:col-span-2 space-y-4 print:col-span-2">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="border-b border-gray-200 pb-1">
                                <p className="text-xs text-gray-500 uppercase mb-1">Student Name</p>
                                <p className="text-lg font-bold text-gray-900">{student.name}</p>
                            </div>

                            <div className="border-b border-gray-200 pb-1">
                                <p className="text-xs text-gray-500 uppercase mb-1">Father's Name</p>
                                <p className="text-lg font-medium text-gray-800">{student.fatherName}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-b border-gray-200 pb-1">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Program</p>
                                    <p className="font-medium text-gray-800">{student.program}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-1">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Session</p>
                                    <p className="font-medium text-gray-800">{student.session}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-b border-gray-200 pb-1">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Class</p>
                                    <p className="font-medium text-gray-800">{student.className}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-1">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Batch</p>
                                    <p className="font-medium text-gray-800">{student.batch}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-b border-gray-200 pb-1">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Campus</p>
                                    <p className="font-medium text-gray-800">{student.campus}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-1">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Valid Upto</p>
                                    <p className="font-medium text-gray-800">Dec 2029</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 border-t border-gray-200 print:bg-gray-50">
                    <div className="flex justify-between items-end">
                        <div className="text-left w-1/3">
                            <div className="h-10 border-b border-gray-400 mb-1"></div>
                            <p className="text-xs text-center text-gray-500 uppercase">Student Signature</p>
                        </div>
                        <div className="text-center w-1/3">
                            {/* Barcode Placeholder */}
                            <div className="inline-block px-4 py-2 bg-white border border-gray-300">
                                <p className="font-mono text-xs tracking-[0.3em]">{student.regNo.replace('-', '')}</p>
                            </div>
                        </div>
                        <div className="text-right w-1/3">
                            <div className="h-10 border-b border-gray-400 mb-1"></div>
                            <p className="text-xs text-center text-gray-500 uppercase">Authority Signature</p>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-gray-400">
                            This card is the property of BA University. If found, please return to the Registrar Office.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: auto;
                    }
                    body {
                        background: white;
                    }
                    /* Hide everything except the card */
                    body > *:not(.max-w-2xl) {
                        display: none;
                    }
                    /* Ensure headers/footers of browser are hidden if possible, user needs to uncheck in print dialog */
                }
            `}</style>
        </div>
    );
}
