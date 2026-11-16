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
        <div className="dashboard-table w-full overflow-hidden rounded-xl bg-white/95 p-3 shadow-2xl">
            <Table className="text-xs text-black" style={{ color: "#000000" }}>
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

    const eventRows = events.flatMap((event) => {
        const attendees = event.attendees ?? [];
        const eventDetails = [
            event.id,
            event.name,
            event.venue,
            formatDateTime(event.start),
            formatDateTime(event.ended),
            formatDateTime(event.dateCreated),
        ];

        if (attendees.length === 0) {
            return [{
                id: event.id,
                cells: ["—", "—", "—", eventDetails[0], eventDetails[1], eventDetails[2], "—", "—", eventDetails[3], eventDetails[4], eventDetails[5]],
            }];
        }

        return attendees.map((attendee) => ({
            id: `${event.id}-${attendee.id}`,
            cells: [
                attendee.employeeId,
                attendee.name,
                attendee.level,
                eventDetails[0],
                eventDetails[1],
                eventDetails[2],
                attendee.timestamp,
                attendee.status,
                eventDetails[3],
                eventDetails[4],
                eventDetails[5],
            ],
        }));
    });

    const linkedAttendanceIds = new Set(
        events.flatMap((event) => (event.attendees ?? []).map((attendee) => attendee.id))
    );
    const orphanAttendanceRows = attendanceRecords
        .filter((record) => !linkedAttendanceIds.has(record.id))
        .map((record) => ({
            id: record.id,
            cells: [record.employeeId, record.name ?? "—", record.level ?? "—", record.eventId ?? "—", record.event, record.venue ?? "—", record.date, record.status, "—", "—", "—"],
        }));

    const combinedRows = [...eventRows, ...orphanAttendanceRows];

    return (
        <PageShell title="Dashboard">
            <div className="flex flex-col gap-6">
                <DashboardTable
                    headers={[
                        "Employee ID",
                        "Name",
                        "Employee Level",
                        "Event ID",
                        "Event Name",
                        "Venue",
                        "Timestamp",
                        "Status",
                        "Event Start",
                        "Event Ended",
                        "Date Created",
                    ]}
                    rows={combinedRows}
                />
            </div>
        </PageShell>
    );
}