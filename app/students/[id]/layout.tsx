import { getStudentProfile, Student } from "@/lib/api";
import ProfileHeader from "@/components/ProfileHeader";
import Sidebar from "@/components/Sidebar";

// Mock data for fallback/development
const MOCK_STUDENT: Student = {
    id: 12,
    name: "Ahsan Khan",
    regNo: "CS-001",
    emailAddress: "ahsan.khan@student.com",
    contactNumber: "0300-3000000",
    guardianNumber: "0300-4000000",
    fatherName: "Father of Ahsan Khan",
    program: "Computer Science",
    session: "2020-2024",
    semester: "1",
    campus: "Main",
    className: "CS-1A",
    nationality: "Pakistani",
    dob: "2000-01-01",
    profilePic: "", // Empty to trigger fallback in UI
    cgpa: 4.32,
    wifiAccount: "wifi-1",
    office365Email: "ahsan.khan@office365.university.edu",
    batch: "Batch-A"
};

export default async function StudentLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let student: Student;

    try {
        // Fetch student profile using the ID from the URL
        student = await getStudentProfile(id);
    } catch (error) {
        console.warn(`Failed to fetch student profile for ID ${id}, using mock data. Ensure backend is running at http://localhost:8080`);
        student = { ...MOCK_STUDENT, id: Number(id) };
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <ProfileHeader student={student} />

            <div className="flex flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 gap-8">
                <Sidebar studentId={student.id} />
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
