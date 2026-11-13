import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the Employees page.

export default function EmployeesPage() { // The layout for the Employees page
    return (
        <PageShell title="Employees">
            <div className="rounded-lg bg-blue-500 p-6 text-lg text-white shadow-sm">
                Employees Content
            </div>
        </PageShell>
    );
}
