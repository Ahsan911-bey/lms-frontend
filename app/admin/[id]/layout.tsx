import { getAdminProfile, Admin } from "@/lib/api";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

// Mock data for fallback/development
const MOCK_ADMIN: Admin = {
    id: 1,
    name: "Dr. Muhammad Admin",
    regNo: "ADMIN-001",
    emailAddress: "admin@university.edu",
    contactNumber: "0300-0000001",
    guardianNumber: "0300-0000002",
    fatherName: "Admin Father",
    program: "Administration",
    session: "FA23",
    semester: "N/A",
    campus: "ISL",
    className: "Admin Office",
    nationality: "Pakistani",
    dob: "1975-01-01",
    profilePic: "https://pyxis.nymag.com/v1/imgs/a85/912/a5ef47190c966169cf6e9c6da815b0f0ad-07-john-wick-2-2.rsquare.w400.jpg",
    designation: "Director",
    department: "IT Administration"
};

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let admin: Admin;

    try {
        // Fetch admin profile using the ID from the URL
        admin = await getAdminProfile(id);
    } catch (error) {
        console.warn(`Failed to fetch admin profile for ID ${id}, using mock data. Ensure backend is running at http://localhost:8080`);
        admin = { ...MOCK_ADMIN, id: Number(id) };
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <AdminHeader admin={admin} />

            <div className="flex flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 gap-8">
                <AdminSidebar adminId={admin.id} />
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
