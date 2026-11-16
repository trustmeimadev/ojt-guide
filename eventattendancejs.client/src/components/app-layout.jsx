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
                <header className="flex h-20 items-center gap-4 border-b bg-sidebar px-6"> {/* This changes the background color of the header */}
                    <SidebarTrigger className="size-14 text-yellow-300 [&_svg]:size-9" />
                    <h1 className="min-w-max whitespace-nowrap text-3xl font-extrabold tracking-wide text-yellow-300 drop-shadow-sm">
                        Event Attendance System
                    </h1>
                </header>

                <main className="page-background min-h-[calc(100vh-5rem)] flex-1 p-4">
                  
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}