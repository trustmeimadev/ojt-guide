import PageShell from "@/components/page-shell"; //Navigation
import { AttendanceCard } from "@/components/attendance-card"; //   Attendance Card for inputtin the Employee ID and the Selection of which event they attended
import { useState } from "react";
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
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    function addAttendance(record) {
        setAttendanceRecords((records) => [
            ...records,
            { ...record, id: crypto.randomUUID() },
        ]);
    }

    return ( // The table for each employee to know what event they attended.
        <PageShell title="Attendance">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <AttendanceCard onAddAttendance={addAttendance} />

                <div className="min-w-0 flex-1 overflow-hidden rounded-xl bg-white/95 p-4 shadow-2xl">
                    <Table className="text-black" style={{ color: "#000000" }}>
                        <TableCaption>Attendance records</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Employee ID</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Event</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Date</TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceRecords.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
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