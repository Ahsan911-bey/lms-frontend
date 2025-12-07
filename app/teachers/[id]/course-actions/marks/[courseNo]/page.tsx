import { ArrowRight, ArrowLeft, Layers, Users } from "lucide-react";
import { getStudentsByBatch } from "@/lib/api";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MarksBatchCheckPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string; courseNo: string }>;
    searchParams: Promise<{ type?: string; courseId?: string }>;
}) {
    const { id, courseNo } = await params;
    const { type, courseId } = await searchParams;

    if (!type || !courseId) {
        redirect(`/teachers/${id}/course-actions/marks`);
    }

    const batchesToCheck = ["A", "B", "C", "D", "E"];
    const activeBatches: { name: string; studentCount: number }[] = [];

    // Concurrent fetch
    const results = await Promise.allSettled(
        batchesToCheck.map(batch => getStudentsByBatch(courseNo, `Batch-${batch}`))
    );

    results.forEach((result, index) => {
        if (result.status === "fulfilled" && Array.isArray(result.value) && result.value.length > 0) {
            activeBatches.push({
                name: `Batch-${batchesToCheck[index]}`,
                studentCount: result.value.length
            });
        }
    });

    const typeLabels: Record<string, string> = {
        quiz: "Quiz Marks",
        assignment: "Assignment Marks",
        mids: "Mids Marks",
        final: "Final Marks"
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions/marks/select-course?type=${type}`} className="hover:text-blue-600 hover:underline flex items-center gap-1">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">Select Batch</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Select Batch</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Uploading <strong>{typeLabels[type] || type}</strong> for <strong>{courseNo}</strong>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBatches.length > 0 ? (
                    activeBatches.map((batch) => (
                        <Link
                            key={batch.name}
                            href={`/teachers/${id}/course-actions/marks/${courseNo}/${batch.name}?type=${type}&courseId=${courseId}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all h-full flex flex-col">
                                <div className="h-2 bg-emerald-500 group-hover:bg-emerald-600 transition-colors"></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                                            <Layers size={20} />
                                        </div>
                                        <div className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase tracking-wider flex items-center gap-1">
                                            <Users size={12} /> {batch.studentCount} Students
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                                        {batch.name}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Select Batch
                                        </span>
                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                            <Layers className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Active Batches Found</h3>
                        <p className="mt-1 text-sm text-gray-500">We couldn't find any students in Batches A-E for this course.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
