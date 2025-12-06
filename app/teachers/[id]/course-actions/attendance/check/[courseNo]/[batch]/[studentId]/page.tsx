import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { getStudentAttendance, getStudentProfile, getTeacherCourses } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StudentAttendanceDetailPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string; batch: string; studentId: string }>;
}) {
    const { id, courseNo, batch, studentId } = await params;
    const decodedBatch = decodeURIComponent(batch);

    // Fetch data in parallel
    const [attendanceData, studentProfile, teacherCourses] = await Promise.all([
        getStudentAttendance(studentId),
        getStudentProfile(studentId).catch(() => null),
        getTeacherCourses(id).catch(() => [])
    ]);

    // Find the current course ID to filter attendance correctly
    // We match based on courseNo (e.g. "CS-101")
    let currentCourseId: number | null = null;
    let currentCourseName: string = "";

    // Attempt to find the course ID from the teacher's course list
    // This is necessary because courseNo is in URL but attendance API returns courseId
    if (Array.isArray(teacherCourses)) {
        const foundCourse = teacherCourses.find((c: any) => c.courseNo === courseNo);
        if (foundCourse) {
            currentCourseId = foundCourse.id;
            currentCourseName = foundCourse.courseName;
        }
    }

    // Filter attendance for the specific course
    let targetAttendance = null;
    if (attendanceData && Array.isArray(attendanceData)) {
        // Try to match by ID first if we found it
        if (currentCourseId) {
            targetAttendance = attendanceData.find(a => a.courseId === currentCourseId);
        }

        // Fallback: If we couldn't resolve ID, try to match partially by name or just take the first one if length is 1 for robustness
        // In a real app, we should enforce strict ID matching
        if (!targetAttendance) {
            // Mock fallback logic if direct ID match fails (for demonstration if mock data ids don't align perfectly)
            targetAttendance = attendanceData.find(a => a.courseName.includes(courseNo) || courseNo.includes(a.courseName.split(' ')[0]));
        }
    }

    // Calculate percentage
    const defaults = { presents: 0, absents: 0, totalClasses: 0 };
    const stats = targetAttendance || defaults;
    const percentage = stats.totalClasses > 0
        ? Math.round((stats.presents / stats.totalClasses) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Link href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${batch}`} className="hover:text-blue-600 hover:underline flex items-center gap-1">
                    <ArrowLeft size={14} /> Back to List
                </Link>
                <span>/</span>
                <span className="font-semibold text-gray-700">Student Details</span>
            </div>

            {/* Student Header Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white shadow-lg">
                    {studentProfile?.name?.charAt(0) || "S"}
                </div>
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{studentProfile?.name || `Student #${studentId}`}</h2>
                    <p className="text-gray-500">{studentProfile?.regNo || "REG-UNKNOWN"}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Overall Status</div>
                    <div className={`text-2xl font-bold ${percentage >= 75 ? 'text-green-600' : 'text-orange-500'}`}>
                        {percentage}%
                    </div>
                </div>
            </div>

            {/* Attendance Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">Attendance Record: {courseNo}</h3>
                    <p className="text-sm text-gray-500">{currentCourseName}</p>
                </div>

                <div className="p-8">
                    {stats.totalClasses > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl border border-green-100">
                                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                                <span className="text-3xl font-bold text-gray-900">{stats.presents}</span>
                                <span className="text-sm font-medium text-green-700">Present</span>
                            </div>

                            <div className="flex flex-col items-center p-4 bg-red-50 rounded-xl border border-red-100">
                                <XCircle className="h-8 w-8 text-red-500 mb-2" />
                                <span className="text-3xl font-bold text-gray-900">{stats.absents}</span>
                                <span className="text-sm font-medium text-red-700">Absent</span>
                            </div>

                            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <AlertCircle className="h-8 w-8 text-gray-500 mb-2" />
                                <span className="text-3xl font-bold text-gray-900">{stats.totalClasses}</span>
                                <span className="text-sm font-medium text-gray-600">Total Classes</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No Attendance Records</h3>
                            <p className="text-gray-500">No attendance has been marked for this student in this course yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
