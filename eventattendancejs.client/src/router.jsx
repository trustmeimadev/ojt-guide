import { createBrowserRouter } from "react-router"; // Importing the createBrowserRouter function from react-router to create a router for the application
import AppLayout from "@/components/app-layout"; // Importing the AppLayout component for the main layout of the application
import HomePage from "@/pages/homepage"; // Importing the HomePage component for the root route
import EventPage from "@/pages/events"; // Importing the EventPage component for the events route
import EmployeesPage from "@/pages/employees"; // Importing the EmployeesPage component for the employees route
import AttendancePage from "@/pages/attendance"; // Importing the AttendancePage component for the attendance route

export const router = createBrowserRouter([ // Creating a router instance using createBrowserRouter with route configurations
    {
        element: <AppLayout />,
        children: [
            // Application pages rendered inside AppLayout.
            { path: "/", element: <HomePage /> },
            { path: "/events", element: <EventPage /> },
            { path: "/employees", element: <EmployeesPage /> },
            { path: "/attendance", element: <AttendancePage /> },
        ],
    },
]);