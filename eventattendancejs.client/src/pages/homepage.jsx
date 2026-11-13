import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the homepage.
import { usePersistedState } from "@/hooks/use-persisted-state"; // Custom hook to persist state in localStorage and synchronize across tabs.
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function formatDateTime(value) { // A utility function to format date and time values for display in the tables.
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function DashboardTable({ headers, rows }) { // Combined table for displaying attendance and event records on the homepage.
    return (
        <div className="w-full overflow-hidden rounded-xl bg-white/95 p-4 shadow-2xl">
            <Table className="text-black" style={{ color: "#000000" }}>
                <TableCaption>Attendance and event records</TableCaption>
                <TableHeader>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHead
                                key={header}
                                className="text-black"
                                style={{ color: "#000000" }}
                            >
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={headers.length}
                                className="py-8 text-center"
                                style={{ color: "#6b7280" }}
                            >
                                No attendance or event records yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.cells.map((cell, index) => (
                                    <TableCell key={`${row.id}-${index}`}>
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default function HomePage() { // The layout for the homepage
    const [attendanceRecords] = usePersistedState("attendance-records", []);
    const [events] = usePersistedState("event-records", []);

    const attendanceRows = attendanceRecords.map((record) => ({
        id: record.id,
        cells: [
            record.employeeId,
            record.event,
            "—",
            record.date,
            record.status,
            "—",
            "—",
        ],
    }));

    const eventRows = events.map((event) => ({
        id: event.id,
        cells: [
            "—",
            event.name,
            event.venue,
            "—",
            "—",
            formatDateTime(event.start), // Format the event start and end times for display in the table.
            formatDateTime(event.ended), // Format the event start and end times for display in the table.
        ],
    }));

    const combinedRows = [...attendanceRows, ...eventRows];

    return (
        <PageShell title="Dashboard">
            <div className="flex flex-col gap-6">
                <DashboardTable
                    headers={[
                        "Employee ID",
                        "Event Name",
                        "Venue",
                        "Attendance Date",
                        "Status",
                        "Event Start",
                        "Event Ended",
                    ]}
                    rows={combinedRows}
                />
            </div>
        </PageShell>
    );
}