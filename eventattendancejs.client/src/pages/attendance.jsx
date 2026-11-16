import PageShell from "@/components/page-shell"; //Navigation
import { AttendanceCard } from "@/components/attendance-card"; //   Attendance Card for inputtin the Employee ID and the Selection of which event they attended
import { Button } from "@/components/ui/button";
import { usePersistedState } from "@/hooks/use-persisted-state";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AttendancePage() {
    const [attendanceRecords, setAttendanceRecords] = usePersistedState(
        "attendance-records",
        []
    );
    const [events, setEvents] = usePersistedState("event-records", []);

    function addAttendance(record) {
        const attendanceRecord = {
            ...record,
            id: crypto.randomUUID(),
            name: "—",
            level: "—",
            status: "Present",
        };

        setAttendanceRecords((records) => [
            ...records,
            attendanceRecord,
        ]);

        setEvents((currentEvents) => currentEvents.map((event) => (
            event.id === record.eventId
                ? {
                    ...event,
                    attendees: [
                        ...(event.attendees ?? []),
                        {
                            id: attendanceRecord.id,
                            employeeId: attendanceRecord.employeeId,
                            name: attendanceRecord.name,
                            level: attendanceRecord.level,
                            timestamp: attendanceRecord.date,
                            status: attendanceRecord.status,
                        },
                    ],
                }
                : event
        )));
    }

    return ( // The table for each employee to know what event they attended.
        <PageShell title="Attendance Listing">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <AttendanceCard events={events} onAddAttendance={addAttendance} />

                <div className="min-w-0 flex-1 overflow-hidden rounded-xl bg-white/95 p-4 shadow-2xl">
                    <div className="mb-4 flex flex-wrap justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                        >
                            Export
                        </Button>
                        <Button
                            type="button"
                            className="bg-yellow-400 text-slate-900 hover:bg-yellow-300"
                        >
                            View Flagged
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Delete Log
                        </Button>
                    </div>
                    <Table className="text-black" style={{ color: "#000000" }}>
                        <TableCaption>Attendance records</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Employee ID</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Name</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Employee Level</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Event</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Timestamp</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceRecords.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-8 text-center"
                                        style={{ color: "#6b7280" }}
                                    >
                                        No attendance records yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                attendanceRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.employeeId}</TableCell>
                                        <TableCell>{record.name ?? "—"}</TableCell>
                                        <TableCell>{record.level ?? "—"}</TableCell>
                                        <TableCell>{record.event}</TableCell>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.status}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </PageShell>
    );
}

//<div className="rounded-lg bg-blue-500 p-6 text-lg text-white shadow-sm">
    //Attendance Content
//</div>