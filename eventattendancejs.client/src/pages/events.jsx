import PageShell from "@/components/page-shell"; // Importing the PageShell component to provide a consistent layout for the event page.
import { EventCard } from "@/components/event-card"; // Importing the EventCard component to provide a card layout for event details and management.
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

function formatDateTime(value) {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

export default function EventPage() { //  The layout for the event page
    const [events, setEvents] = usePersistedState("event-records", []);

    function addEvent(event) {
        setEvents((currentEvents) => [
            ...currentEvents,
            { // This code generates a unique ID for each event by prefixing the event number with "EVT-" and padding it with leading zeros to ensure a consistent format. It also adds a timestamp for when the event was created.
                ...event,
                id: `EVT-${String(currentEvents.length + 1).padStart(3, "0")}`,
                dateCreated: new Date().toISOString(),
            },
        ]);
    }

    return ( // Event page layout with the event card and table for the employee to be able to see the list of employees that are in the system
        <PageShell title="Event Listing">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <EventCard onAddEvent={addEvent} />

                <div className="event-table min-w-0 flex-1 overflow-hidden rounded-xl bg-white/95 p-3 shadow-2xl">
                    <Table className="text-xs text-black" style={{ color: "#000000" }}>
                        <TableCaption>Event records</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-black" style={{ color: "#000000" }}>
                                    Event ID
                                </TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>
                                    Event Name
                                </TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>
                                    Venue
                                </TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>
                                    Event Start
                                </TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>
                                    Event Ended
                                </TableHead>
                                <TableHead className="text-black" style={{ color: "#000000" }}>
                                    Date Created
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-8 text-center"
                                        style={{ color: "#6b7280" }}
                                    >
                                        No event records yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>{event.id}</TableCell>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>{event.venue}</TableCell>
                                        <TableCell>{formatDateTime(event.start)}</TableCell>
                                        <TableCell>{formatDateTime(event.ended)}</TableCell>
                                        <TableCell>{formatDateTime(event.dateCreated)}</TableCell>
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