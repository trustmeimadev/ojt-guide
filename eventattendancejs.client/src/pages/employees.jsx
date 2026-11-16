import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the Employees page.
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function EmployeesPage() { // The layout for the Employees page
    return (
        <PageShell title="Employees">
            <div className="w-full overflow-hidden rounded-xl bg-white/95 p-4 shadow-2xl">
                <Table className="text-black" style={{ color: "#000000" }}>
                    <TableCaption>Employee records</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-black" style={{ color: "#000000" }}>
                                Employee ID
                            </TableHead>
                            <TableHead className="text-black" style={{ color: "#000000" }}>
                                Name
                            </TableHead>
                            <TableHead className="text-black" style={{ color: "#000000" }}>
                                Employee Level
                            </TableHead>
                            <TableHead className="text-black" style={{ color: "#000000" }}>
                                Department
                            </TableHead>
                            <TableHead className="text-black" style={{ color: "#000000" }}>
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-8 text-center"
                                style={{ color: "#6b7280" }}
                            >
                                No employee records yet.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </PageShell>
    );
}
