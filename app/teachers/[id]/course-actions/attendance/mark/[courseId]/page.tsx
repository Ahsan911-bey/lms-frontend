import { getStudentsByBatch, getTeacherCourses } from "@/lib/api";
import Link from "next/link";
import { AlertCircle } from "lucide-react"; // Import AlertCircle for error state
import MarkAttendanceBatchesContent from "./MarkAttendanceBatchesContent";

const BATCHES = ["Batch-A", "Batch-B", "Batch-C", "Batch-D", "Batch-E"];

export default async function MarkAttendanceBatchesPage({
    params,
}: {
    params: Promise<{ id: string; courseId: string }>;
}) {
    const { id, courseId } = await params;

    // 1. Fetch all courses to find the courseCode associated with this courseId
    let courseCode = "";
    try {
        const courses = await getTeacherCourses(id);
        const course = Array.isArray(courses) ? courses.find((c: any) => c.id == courseId) : null;
        if (course) {
            courseCode = course.courseNo;
        } else {
            console.warn(`Course ID ${courseId} not found in teacher's course list.`);
        }
    } catch (error) {
        console.warn("Failed to fetch teacher courses for code lookup", error);
    }

    if (!courseCode) {
        return (
            <div className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Course Not Found</h3>
                <p className="text-gray-500">Could not identify the course details.</p>
                <Link href={`./`} className="text-blue-600 hover:underline mt-4 inline-block">Go Back</Link>
            </div>
        );
    }

    // 2. Concurrently fetch students for all batches to identify which ones exist
    const batchResults = await Promise.allSettled(
        BATCHES.map(async (batch) => {
            try {
                const students = await getStudentsByBatch(courseCode, batch);
                return { batch, count: Array.isArray(students) ? students.length : 0 };
            } catch (err) {
                return { batch, count: 0 };
            }
        })
    );

    const activeBatches = batchResults
        .map((result) => (result.status === "fulfilled" ? result.value : null))
        .filter((item): item is { batch: string; count: number } => item !== null && item.count > 0);

    return <MarkAttendanceBatchesContent id={id} courseId={courseId} courseCode={courseCode} activeBatches={activeBatches} />;
}
