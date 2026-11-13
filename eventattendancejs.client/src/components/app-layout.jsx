import { Outlet, useLocation } from "react-router"; // Importing the Outlet component to render nested routes and useLocation hook to access the current location in the router.
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"; // Importing the AppSidebar component to render the sidebar navigation for the application.

export default function AppLayout() { //Dashboard layout with sidebar and routed page content.
    const { pathname } = useLocation();
    const pageTitles = {
        "/": "Dashboard",
        "/attendance": "Attendance",
        "/events": "Events",
        "/employees": "Employees",
        "/settings": "Settings",
    };

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                {/* Sidebar toggle and current page title. */}
                <header className="flex h-16 items-center gap-3 border-b px-4">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold">
                        {pageTitles[pathname] ?? "Dashboard"}
                    </h1>
                </header>

                <main className="flex-1 p-4">
                  
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}