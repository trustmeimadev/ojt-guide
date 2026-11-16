import { Button } from "@/components/ui/button"; // Importing the Button component from the UI library for use in the form submission button.
import {
    Card,
    CardContent,
    CardDescription, // Importing the CardDescription component from the UI library for providing a description within the card layout.
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Importing the Input component from the UI library for use in the form input fields.

export function EventCard({ onAddEvent }) { // Input that is similar to the attendance Input for employees
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        onAddEvent?.({
            name: formData.get("eventName"),
            venue: formData.get("venue"),
            start: formData.get("eventStart"),
            ended: formData.get("eventEnded"),
        });

        event.currentTarget.reset();
    }

    return (
        <Card className="w-full max-w-md border-0 bg-white/95 shadow-2xl lg:w-80 lg:max-w-none lg:flex-none">
            <CardHeader className="pb-3 text-center">
                <CardTitle className="text-2xl font-bold">Event Management</CardTitle>
                <CardDescription className="text-base">
                    Enter the details for the event
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="event-name">
                                Event Name
                            </label>
                            <Input
                                className="h-10"
                                id="event-name"
                                name="eventName"
                                type="text"
                                placeholder="Enter event name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="venue">
                                Venue
                            </label>
                            <Input
                                className="h-10"
                                id="venue"
                                name="venue"
                                type="text"
                                placeholder="Enter event venue"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="event-start">
                                Event Start
                            </label>
                            <Input
                                className="h-10"
                                id="event-start"
                                name="eventStart"
                                type="datetime-local"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="event-ended">
                                Event Ended
                            </label>
                            <Input
                                className="h-10"
                                id="event-ended"
                                name="eventEnded"
                                type="datetime-local"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 border-0 bg-transparent pt-3 pb-6">
                    <Button type="submit" size="lg" className="w-full font-semibold">
                        Add Event
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
