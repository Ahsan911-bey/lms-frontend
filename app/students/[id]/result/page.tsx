"use client";

import { use, useEffect, useState } from "react";
import { Printer, Calculator, GraduationCap } from "lucide-react";
import { getStudentCourses, getStudentMarks, Course, MarksData } from "@/lib/api";

interface CourseResult {
    courseId: number;
    courseCode: string;
    courseName: string;
    credits: number;
    obtainedMarks: number;
    gpa: number;
    grade: string;
}

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [results, setResults] = useState<CourseResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [cgpa, setCgpa] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);

    const calculateGradeAndGPA = (marks: number) => {
        if (marks >= 85) return { grade: "A", gpa: 4.0 };
        if (marks >= 80) return { grade: "A-", gpa: 3.7 };
        if (marks >= 75) return { grade: "B+", gpa: 3.3 };
        if (marks >= 70) return { grade: "B", gpa: 3.0 };
        if (marks >= 65) return { grade: "B-", gpa: 2.7 };
        if (marks >= 61) return { grade: "C+", gpa: 2.3 };
        if (marks >= 58) return { grade: "C", gpa: 2.0 };
        if (marks >= 55) return { grade: "C-", gpa: 1.7 };
        if (marks >= 50) return { grade: "D", gpa: 1.0 };
        return { grade: "F", gpa: 0.0 };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesData, marksData] = await Promise.all([
                    getStudentCourses(id),
                    getStudentMarks(id)
                ]);

                let totalGpaPoints = 0;
                let totalCreditsCount = 0;
                const calculatedResults: CourseResult[] = [];

                // Create a map of marks by courseId
                const marksMap = new Map(marksData.map(m => [m.courseId, m]));

                coursesData.forEach(course => {
                    const marks = marksMap.get(course.id);
                    if (marks) {
                        const totalObtained =
                            (marks.quizMarks || 0) +
                            (marks.assignmentMarks || 0) +
                            (marks.midsMarks || 0) +
                            (marks.finalMarks || 0);

                        const { grade, gpa } = calculateGradeAndGPA(totalObtained);

                        totalGpaPoints += gpa * course.credits;
                        totalCreditsCount += course.credits;

                        calculatedResults.push({
                            courseId: course.id,
                            courseCode: course.courseNo,
                            courseName: course.courseName,
                            credits: course.credits,
                            obtainedMarks: totalObtained,
                            gpa: gpa,
                            grade: grade
                        });
                    }
                });

                setResults(calculatedResults);
                setTotalCredits(totalCreditsCount);
                setCgpa(totalCreditsCount > 0 ? totalGpaPoints / totalCreditsCount : 0);

            } catch (error) {
                console.error("Failed to fetch result data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading result card...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center print:hidden">
                <h2 className="text-2xl font-bold text-gray-800">Result Card</h2>
                <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Printer size={18} />
                    <span>Print Result</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print:shadow-none print:border-2 print:border-gray-800">
                {/* Header for Print */}
                <div className="hidden print:block bg-blue-900 text-white p-6 text-center mb-6">
                    <h1 className="text-2xl font-bold uppercase tracking-wider">University Portal</h1>
                    <h2 className="text-lg font-semibold mt-2 text-yellow-400">Semester Result Card</h2>
                    <p className="text-sm text-blue-200 mt-1">Fall 2025 Semester</p>
                </div>

                <div className="p-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:grid-cols-3">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center space-x-4 print:border-gray-300">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-600 print:hidden">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-blue-600 font-medium uppercase print:text-black">CGPA</p>
                                <p className="text-2xl font-bold text-gray-900">{cgpa.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-center space-x-4 print:border-gray-300">
                            <div className="bg-purple-100 p-2 rounded-full text-purple-600 print:hidden">
                                <Calculator size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-purple-600 font-medium uppercase print:text-black">Total Credits</p>
                                <p className="text-2xl font-bold text-gray-900">{totalCredits}</p>
                            </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center space-x-4 print:border-gray-300">
                            <div className="bg-green-100 p-2 rounded-full text-green-600 print:hidden">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-green-600 font-medium uppercase print:text-black">Courses Passed</p>
                                <p className="text-2xl font-bold text-gray-900">{results.filter(r => r.grade !== 'F').length} / {results.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Result Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 print:bg-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Code</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Cr. Hrs</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Marks</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Grade</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">GPA</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {results.length > 0 ? (
                                    results.map((result) => (
                                        <tr key={result.courseId} className="hover:bg-gray-50 transition-colors print:hover:bg-transparent">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{result.courseCode}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{result.courseName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 text-center">{result.credits}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">{result.obtainedMarks.toFixed(1)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${result.grade === 'F' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
                                                    print:bg-transparent print:text-black print:border print:border-gray-300
                                                `}>
                                                    {result.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">{result.gpa.toFixed(1)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No result data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Footer for Print */}
                <div className="hidden print:block p-8 mt-8 border-t border-gray-200">
                    <div className="flex justify-between items-end">
                        <div className="text-center w-1/3">
                            <div className="h-px bg-gray-400 mb-2"></div>
                            <p className="text-xs uppercase text-gray-500">Controller of Examinations</p>
                        </div>
                        <div className="text-center w-1/3">
                            <p className="text-[10px] text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-center w-1/3">
                            {/* Empty for balance or second signature */}
                        </div>
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
                    body > *:not(.space-y-6) {
                        display: none; // This might hide the sidebar if it wraps the page
                    }
                    /* Better way to hide layouts: target specific non-print elements */
                     nav, aside, header, footer {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
