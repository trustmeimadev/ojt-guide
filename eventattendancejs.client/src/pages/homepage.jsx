import PageShell from "@/components/page-shell";

export default function HomePage() {
    return (
        <PageShell title="Dashboard">
            <div className="rounded-lg bg-blue-500 p-6 text-lg text-white shadow-sm">
                Dashboard Content
            </div>
        </PageShell>
    );
}