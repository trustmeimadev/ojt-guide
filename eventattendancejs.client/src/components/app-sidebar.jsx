import {
    CalendarDays,
    Users,
    Settings,
    Home,
} from "lucide-react";

import { Link, useLocation } from "react-router";


import {
    SidebarHeader,
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    // useSidebar,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        // page: "Dashboard",
    },
    {
        title: "Attendance",
        url: "/attendance",
        icon: CalendarDays,
        // page: "attendance",
    },
    {
        title: "Events",
        url: "/events",
        icon: CalendarDays,
        // page: "events",
    },
    {
        title: "Employees",
        url: "/employees",
        icon: Users,
        // page: "employees",
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        // page: "settings",
    },
];

// this component is responsible for rendering the sidebar of the application.
export function AppSidebar() { // {AppSidebar({ currentPage, setCurrentPage }) {
    const pathname = useLocation().pathname;
    // const {setOpenMobile} = useSidebar();
    return (
        <Sidebar>
            <SidebarHeader>
                <header id="">
                    <div className="brand">
                        <img
                            className="brand-logo"
                            src="https://www.dolesunshine.com/wp-content/themes/heritage/public/images/logo_main.png"
                            alt="Attendance Management System logo"
                        />
                    </div>
                </header>
            </SidebarHeader>
            <SidebarContent>
                {/* <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.page}>
                            <SidebarMenuButton
                                isActive={currentPage === item.page}
                                onClick={() => setCurrentPage(item.page)}
                            >
                                <item.icon />
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu> */}
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive =
                            item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);

                        return (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}