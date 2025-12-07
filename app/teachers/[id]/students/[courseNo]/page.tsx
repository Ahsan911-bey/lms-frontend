import { getStudentsByBatch } from "@/lib/api";
import TeacherCourseBatchesContent from "./TeacherCourseBatchesContent";

const BATCHES = ["Batch-A", "Batch-B", "Batch-C", "Batch-D", "Batch-E"];

export default async function TeacherCourseBatchesPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string }>;
}) {
    const { id, courseNo } = await params;

    // Concurrently fetch students for all batches to identify which ones exist
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

    return <TeacherCourseBatchesContent id={id} courseNo={courseNo} activeBatches={activeBatches} />;
}
