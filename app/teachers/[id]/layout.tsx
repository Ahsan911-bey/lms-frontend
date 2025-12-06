import { getTeacherProfile, Teacher } from "@/lib/api";
import TeacherProfileHeader from "@/components/TeacherProfileHeader";
import TeacherSidebar from "@/components/TeacherSidebar";

// Mock data for fallback/development
const MOCK_TEACHER: Teacher = {
    id: 2,
    name: "Dr. Ali Ahmed",
    regNo: "T-001",
    emailAddress: "draliahmed@university.edu",
    contactNumber: "0300-1000000",
    guardianNumber: "0300-2000000",
    fatherName: "Father of Dr. Ali Ahmed",
    program: "Computer Science",
    session: "SP25",
    semester: "1",
    campus: "SWL",
    className: "CS-1A",
    nationality: "Pakistani",
    dob: "1970-01-01",
    profilePic: "",
    qualification: "PhD Computer Science",
    specialization: "Artificial Intelligence"
};

export default async function TeacherLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let teacher: Teacher;

    try {
        // Fetch teacher profile using the ID from the URL
        teacher = await getTeacherProfile(id);
    } catch (error) {
        console.warn(`Failed to fetch teacher profile for ID ${id}, using mock data. Ensure backend is running at http://localhost:8080`);
        teacher = { ...MOCK_TEACHER, id: Number(id) };
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <TeacherProfileHeader teacher={teacher} />

            <div className="flex flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 gap-8">
                <TeacherSidebar teacherId={teacher.id} />
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
