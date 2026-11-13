import { Outlet } from "react-router"; // Importing the Outlet component to render nested routes.
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"; // Importing the AppSidebar component to render the sidebar navigation for the application.

export default function AppLayout() { //Dashboard layout with sidebar and routed page content.
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                {/* Sidebar toggle and current page title. */}
                <header className="flex h-16 items-center gap-3 border-b px-4">
                    <SidebarTrigger className="size-10 [&_svg]:size-6" />
                    <h1 className="min-w-max whitespace-nowrap text-2xl font-bold tracking-wide text-yellow-300">
                        Event Attendance System
                    </h1>
                </header>

                <main className="flex-1 p-4">
                  
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}