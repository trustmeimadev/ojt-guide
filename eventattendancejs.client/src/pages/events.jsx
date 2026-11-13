import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the event page.
import { EventCard } from "@/components/event-card"; // Importing the EventCard component to provide a card layout for event details and management.
import { Table } from "../components/ui/table"; // Importing the Table component to display a list of employees in the system.

export default function EventPage() { //  The layout for the event page
    return ( // Event page layout with the event card and table for the employee to be able to see the list of employees that are in the system
        <PageShell title="Events">
            <EventCard />
            <Table/>
        </PageShell>
    );
}