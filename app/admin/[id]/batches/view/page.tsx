import Link from "next/link";
import { getAllBatches, Batch } from "@/lib/api";
import { ArrowLeft, Layers } from "lucide-react";

export default async function ViewBatchesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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
                    href={`/admin/${id}/batches`}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Batches</h1>
                    <p className="text-gray-500">List of all active batches.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-100">
                    {batches.length > 0 ? (
                        batches.map((batch) => (
                            <div key={batch.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                                        <Layers className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{batch.name}</h3>
                                        <span className="text-xs text-gray-400">ID: {batch.id}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {/* Placeholder for future stats like student count if API supported it */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No batches found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
