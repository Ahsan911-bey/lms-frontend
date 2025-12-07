import { getStudentsByBatch } from "@/lib/api";
import TeacherStudentListContent from "./TeacherStudentListContent";

export default async function TeacherStudentListPage({
    params,
}: {
    params: Promise<{ id: string; courseNo: string; batch: string }>;
}) {
    const { id, courseNo, batch } = await params;

    // Decode batch name if it was URL encoded (though usually next does this)
    const decodedBatch = decodeURIComponent(batch);

    let students: any[] = [];
    try {
        students = await getStudentsByBatch(courseNo, decodedBatch);
    } catch (error) {
        console.warn(`Failed to fetch students for ${courseNo} ${decodedBatch}`, error);
    }

    return <TeacherStudentListContent id={id} courseNo={courseNo} decodedBatch={decodedBatch} students={students} />;
}
