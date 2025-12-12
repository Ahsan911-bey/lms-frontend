import Link from "next/link";
import { getAllBatches, Batch } from "@/lib/api";
import { Users, ArrowLeft } from "lucide-react";
import { use } from "react";

export default async function SelectBatchPage({ params }: { params: Promise<{ id: string; courseNo: string }> }) {
    const { id, courseNo } = await params;

    // Decode courseNo in case it has special characters (though unlikely for partial URL segments)
    const decodedCourseNo = decodeURIComponent(courseNo);

    let batches: Batch[] = [];
    try {
        batches = await getAllBatches();
    } catch (error) {
        console.error("Failed to fetch batches:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/students/view`}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Select Batch</h1>
                    <p className="text-gray-500">
                        Viewing batches for <span className="font-medium text-purple-600">{decodedCourseNo}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {batches.length > 0 ? (
                    batches.map((batch) => (
                        <Link
                            key={batch.id}
                            href={`/admin/${id}/students/find/${courseNo}/${batch.name}`}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group text-center"
                        >
                            <div className="h-14 w-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                                {batch.name}
                            </h3>
                            <p className="text-sm text-gray-400">View Students &rarr;</p>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                        No batches found.
                    </div>
                )}
            </div>
        </div>
    );
}
