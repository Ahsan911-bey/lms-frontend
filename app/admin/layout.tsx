import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import PageWrapper from "@/components/PageWrapper";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <AdminHeader />

            <div className="flex flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 gap-8">
                <AdminSidebar />
                <main className="flex-1 min-w-0">
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
}
