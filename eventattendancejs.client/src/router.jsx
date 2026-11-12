import { createBrowserRouter } from "react-router";
import AppLayout from "@/components/app-layout";
import HomePage from "@/pages/homepage";
import EventPage from "@/pages/events";
import EmployeesPage from "@/pages/employees";
import SettingsPage from "@/pages/settings";
import AttendancePage from "@/pages/attendance";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/events", element: <EventPage /> },
            { path: "/employees", element: <EmployeesPage /> },
            { path: "/settings", element: <SettingsPage /> },
            { path: "/attendance", element: <AttendancePage /> },
            {
}
        ],
    },
]);