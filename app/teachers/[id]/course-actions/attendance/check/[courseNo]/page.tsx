import { Users, AlertCircle } from "lucide-react";
import { getStudentsByBatch } from "@/lib/api";
import Link from "next/link";

const BATCHES = ["Batch-A", "Batch-B", "Batch-C", "Batch-D", "Batch-E"];

export default async function CheckAttendanceBatchesPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string }>;
}) {
    const { id, courseNo } = await params;

    // Concurrently fetch students for all batches to identify which ones exist
    // This reuses the logic from the student navigation to ensure consistency
    const batchResults = await Promise.allSettled(
        BATCHES.map(async (batch) => {
            try {
                const students = await getStudentsByBatch(courseNo, batch);
                return { batch, count: Array.isArray(students) ? students.length : 0 };
            } catch (err) {
                return { batch, count: 0 };
            }
        })
    );

    const activeBatches = batchResults
        .map((result) => (result.status === "fulfilled" ? result.value : null))
        .filter((item): item is { batch: string; count: number } => item !== null && item.count > 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions/attendance`} className="hover:text-blue-600 hover:underline">Attendance</Link>
                        <span>/</span>
                        <Link href={`/teachers/${id}/course-actions/attendance/check`} className="hover:text-blue-600 hover:underline">Check</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{courseNo}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Select Batch</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose a batch to check attendance for.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBatches.length > 0 ? (
                    activeBatches.map((item) => (
                        <Link
                            key={item.batch}
                            href={`/teachers/${id}/course-actions/attendance/check/${courseNo}/${item.batch}`}
                            className="block group"
                        >
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center text-center">
                                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">{item.batch}</h3>
                                <p className="text-sm text-gray-500 mt-2">{item.count} Students Enrolled</p>
                                <span className="mt-4 px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600">
                                    Check Status
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 mb-4">
                            <AlertCircle className="h-6 w-6 text-orange-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Batches Found</h3>
                        <p className="mt-1 text-sm text-gray-500">No students are currently enrolled in any batch for this course.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
