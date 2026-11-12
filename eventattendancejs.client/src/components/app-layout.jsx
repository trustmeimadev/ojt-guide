import { Outlet } from "react-router";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-16 items-center border-b px-4">
                    <SidebarTrigger />
                </header>

                <main className="flex-1 p-4">
                  
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}