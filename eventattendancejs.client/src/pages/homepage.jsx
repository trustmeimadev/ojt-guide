import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the homepage.
import { usePersistedState } from "@/hooks/use-persisted-state"; // Custom hook to persist state in localStorage and synchronize across tabs.
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

function DashboardTable({ headers, rows, onClearLogs }) { // Combined table for displaying attendance and event records on the homepage.
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
            <div className="flex justify-end border-t border-sidebar-border bg-sidebar p-3">
                <AlertDialog>
                    <AlertDialogTrigger
                        render={
                            <Button
                                type="button"
                                variant="default"
                                size="lg"
                                className="bg-sidebar px-5 font-bold text-white shadow-lg hover:bg-sidebar/80"
                                style={{ backgroundColor: "var(--sidebar)", color: "#ffffff" }}
                            />
                        }
                    >
                        Clear Logs
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Clear attendance logs?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will remove all attendance logs and attendee links from the dashboard.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={onClearLogs}
                            >
                                Clear Logs
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default function HomePage() { // The layout for the homepage
    const [attendanceRecords, setAttendanceRecords] = usePersistedState("attendance-records", []);
    const [events, setEvents] = usePersistedState("event-records", []);

    function clearLogs() {
        setAttendanceRecords([]);
        setEvents((currentEvents) =>
            currentEvents.map((event) => ({ ...event, attendees: [] }))
        );
    }

    const eventRows = events.flatMap((event) => {
        const attendees = event.attendees ?? [];
        const eventDetails = [
            event.id,
            event.name,
            event.venue,
            formatDateTime(event.start),
            formatDateTime(event.ended),
        ];

        if (attendees.length === 0) {
            return [{
                id: event.id,
                 cells: ["—", "—", "—", eventDetails[0], eventDetails[1], eventDetails[2], "—", "—", eventDetails[3], eventDetails[4]],
            }];
        }

        return attendees.map((attendee) => ({ // This maps each attendee to a row in the table, combining their details with the event details.
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
            cells: [record.employeeId, record.name ?? "—", record.level ?? "—", record.eventId ?? "—", record.event, record.venue ?? "—", record.date, record.status, "—", "—"], // This maps orphan attendance records to rows in the table, filling in missing event details with placeholders.
        }));

    const combinedRows = [...eventRows, ...orphanAttendanceRows];

    return (
        <PageShell title="Dashboard">
            <div className="flex flex-col gap-6"> {/* This div contains the DashboardTable component, which displays the combined attendance and event records in a table format. */}
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
                    ]}
                    rows={combinedRows}
                    onClearLogs={clearLogs}
                />
            </div>
        </PageShell>
    );
}