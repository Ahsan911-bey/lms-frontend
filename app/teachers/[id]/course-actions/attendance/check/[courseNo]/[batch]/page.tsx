import { getStudentsByBatch } from "@/lib/api";
import CheckAttendanceStudentListContent from "./CheckAttendanceStudentListContent";

export default async function CheckAttendanceStudentListPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string; batch: string }>;
}) {
    const { id, courseNo, batch } = await params;
    const decodedBatch = decodeURIComponent(batch);

    let students: any[] = [];
    try {
        students = await getStudentsByBatch(courseNo, decodedBatch);
    } catch (error) {
        console.warn(`Failed to fetch students for ${courseNo} ${decodedBatch}`, error);
    }

    return <CheckAttendanceStudentListContent id={id} courseNo={courseNo} batch={batch} decodedBatch={decodedBatch} students={students} />;
}
