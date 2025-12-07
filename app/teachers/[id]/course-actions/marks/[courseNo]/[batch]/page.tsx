"use client";

import { useState, useEffect, Suspense } from "react";
import { getStudentsByBatch, submitMark, MarksSubmissionData } from "@/lib/api";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Loader2, Save, ArrowLeft, CheckCircle, AlertCircle, Info, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function MarksEntryContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const teacherId = params?.id as string;
    const courseNo = params?.courseNo as string;
    const batch = params?.batch as string;
    const type = searchParams.get("type");
    const courseId = searchParams.get("courseId");

    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [marks, setMarks] = useState<Record<string, string>>({}); // studentId -> value
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: number; failed: number } | null>(null);

    // Validation
    useEffect(() => {
        if (!type || !courseId || !courseNo || !batch) {
            setError("Missing required parameters. Please start again.");
            setLoading(false);
        } else {
            fetchStudents();
        }
    }, [type, courseId, courseNo, batch]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const data = await getStudentsByBatch(courseNo, batch);
            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch students.");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkChange = (studentId: number, value: string) => {
        setMarks(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    const handleSubmit = async () => {
        if (!confirm("Are you sure you want to submit marks? This action cannot be easily undone.")) return;

        setSubmitting(true);
        let successCount = 0;
        let failCount = 0;

        try {
            const promises = students.map(async (student) => {
                const value = marks[student.studentId]; // API returns studentId, name, etc.

                if (value === undefined || value === "") return null;

                const payload: MarksSubmissionData = {
                    studentId: Number(student.studentId),
                    courseId: Number(courseId),
                };

                const numValue = parseFloat(value);
                if (isNaN(numValue)) return null;

                if (type === 'quiz') payload.quizMarks = numValue;
                else if (type === 'assignment') payload.assignmentMarks = numValue;
                else if (type === 'mids') payload.midsMarks = numValue;
                else if (type === 'final') payload.finalMarks = numValue;

                try {
                    await submitMark(payload);
                    return true;
                } catch (e) {
                    console.error(`Failed to submit for student ${student.studentId}`, e);
                    return false;
                }
            });

            const results = await Promise.all(promises);
            successCount = results.filter(r => r === true).length;
            failCount = results.filter(r => r === false).length;

            setSubmitStatus({ success: successCount, failed: failCount });

        } catch (err) {
            console.error("Batch submission error", err);
            setError("An error occurred during submission.");
        } finally {
            setSubmitting(false);
        }
    };

    const typeLabels: Record<string, string> = {
        quiz: "Quiz Marks",
        assignment: "Assignment Marks",
        mids: "Mid-Term Marks",
        final: "Final Exam Marks"
    };

    if (error) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Error</h3>
                <p className="text-gray-500">{error}</p>
                <button onClick={() => router.back()} className="mt-4 text-blue-600 hover:underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${teacherId}/course-actions/marks/${courseNo}?type=${type}&courseId=${courseId}`} className="hover:text-blue-600 hover:underline flex items-center gap-1">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <span>/</span>
                        <span className="font-bold text-gray-700">Enter Marks</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Enter {typeLabels[type || ''] || 'Marks'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {batch && batch.replace('-', ' ')} • {courseNo}
                    </p>
                </div>

                {submitStatus ? (
                    <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 ${submitStatus.failed > 0 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                        <div className="font-semibold">
                            Submission Complete
                        </div>
                        <div className="text-sm">
                            <span className="text-green-600 font-bold">{submitStatus.success} Success</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className={submitStatus.failed > 0 ? "text-red-600 font-bold" : "text-gray-400"}>{submitStatus.failed} Failed</span>
                        </div>
                        <button
                            onClick={() => setSubmitStatus(null)}
                            className="ml-2 text-xs uppercase font-bold text-gray-500 hover:text-gray-700"
                        >
                            Dismiss
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || loading || students.length === 0}
                        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {submitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Submit Marks
                    </button>
                )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-blue-800 text-sm">
                <Info size={18} className="mt-0.5 shrink-0" />
                <p>
                    Enter marks for the students below. You can use the TAB key to quickly navigate between input fields.
                    Only students with valid numeric entries will be submitted. Leave empty to skip.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Link</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-48 text-right">
                                        {typeLabels[type || ''] || 'Marks'}
                                    </th>
                                </tr>
                            </thead>
                            <motion.tbody
                                className="divide-y divide-gray-100"
                                variants={{
                                    show: { transition: { staggerChildren: 0.05 } }
                                }}
                                initial="hidden"
                                animate="show"
                            >
                                {students.length > 0 ? (
                                    students.map((student) => (
                                        <motion.tr
                                            key={student.studentId}
                                            className="hover:bg-gray-50 transition-colors group"
                                            variants={{
                                                hidden: { opacity: 0, x: -20 },
                                                show: { opacity: 1, x: 0 }
                                            }}
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                                {student.studentId}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs ring-2 ring-white group-hover:ring-emerald-50 transition-all">
                                                        {student.name?.charAt(0) || "S"}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{student.name}</div>
                                                        <div className="text-xs text-gray-500">{student.regNo || 'No Reg No'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`/teachers/${teacherId}/course-actions/attendance/check/${courseNo}/${batch}/${student.studentId}`}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="View Attendance"
                                                    target="_blank"
                                                >
                                                    <UserCheck size={18} />
                                                </Link>
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.5"
                                                    placeholder="0.0"
                                                    value={marks[student.studentId] || ""}
                                                    onChange={(e) => handleMarkChange(student.studentId, e.target.value)}
                                                    className="w-32 text-right p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-gray-700"
                                                />
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No students found in this batch.
                                        </td>
                                    </tr>
                                )}
                            </motion.tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MarksEntryPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500" /></div>}>
            <MarksEntryContent />
        </Suspense>
    );
}
