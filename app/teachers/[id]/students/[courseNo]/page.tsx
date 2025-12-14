import { getStudentsByBatch, getAllBatches } from "@/lib/api";
import TeacherCourseBatchesContent from "./TeacherCourseBatchesContent";



export default async function TeacherCourseBatchesPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string }>;
}) {
    const { id, courseNo } = await params;

    // Fetch all batches dynamically
    const batches = await getAllBatches();

    // Concurrently fetch students for all batches to identify which ones exist
    const batchResults = await Promise.allSettled(
        batches.map(async (batchItem) => {
            try {
                const students = await getStudentsByBatch(courseNo, batchItem.name);
                return { batch: batchItem.name, count: Array.isArray(students) ? students.length : 0 };
            } catch (err) {
                return { batch: batchItem.name, count: 0 };
            }
        })
    );

    const activeBatches = batchResults
        .map((result) => (result.status === "fulfilled" ? result.value : null))
        .filter((item): item is { batch: string; count: number } => item !== null && item.count > 0);

    return <TeacherCourseBatchesContent id={id} courseNo={courseNo} activeBatches={activeBatches} />;
}
