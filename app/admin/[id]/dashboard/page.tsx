import { getAdminProfile } from "@/lib/api";

export default async function AdminDashboard({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // In a real scenario, we might want to fetch stats here or pass them down
    // For now we just fetch profile again if needed or rely on layout
    // But pages should generally be independent data fetchers if possible for suspense
    // However, since layout already fetched it, Next.js request duplication might handle it or we can just use the ID.

    const admin = await getAdminProfile(id).catch(() => ({ name: "Administrator", designation: "Admin" }));

    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, <span className="text-purple-600">{admin.name.split(' ')[0]}</span>!
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Here's what's happening in your university portal today.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Stats Cards */}
                {/* Note: We'll populate these with real data counts later if API permits */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Students</h3>
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">1,234</p> {/* Placeholder */}
                    <p className="text-green-600 text-sm font-medium mt-2 flex items-center">
                        <span className="bg-green-100 rounded-full p-1 mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-8m0 0V4" /><path d="m6 10 6-2 6 2" /></svg></span>
                        +12% from last semester
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Teachers</h3>
                        <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">56</p> {/* Placeholder */}
                    <p className="text-gray-500 text-sm font-medium mt-2">Active Faculty Members</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Active Courses</h3>
                        <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">23</p> {/* Placeholder */}
                    <p className="text-gray-500 text-sm font-medium mt-2">Currently in session</p>
                </div>
            </div>
        </div>
    );
}
