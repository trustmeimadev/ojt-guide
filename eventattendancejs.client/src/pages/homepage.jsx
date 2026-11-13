import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the homepage.

export default function HomePage() { // The layout for the homepage
    return (
        <PageShell title="Dashboard">
            <div className="rounded-lg bg-blue-500 p-6 text-lg text-white shadow-sm">
                Dashboard Content
            </div>
        </PageShell>
    );
}