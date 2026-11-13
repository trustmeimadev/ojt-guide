import { Button } from "@/components/ui/button"; // Button from components to be able to submit the employee into the table
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Input Ui for the button

export function AttendanceCard({ onAddAttendance }) { // The layout for the attendance
    function handleSubmit(event) { // Handle the attendance button to insert new employee into the table
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const eventSelect = event.currentTarget.elements.event;

        onAddAttendance?.({
            employeeId: formData.get("employeeId"),
            event: eventSelect.options[eventSelect.selectedIndex].text,
            date: new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(new Date()),
            status: "Present",
        });

        event.currentTarget.reset();
    }

    return ( // The layout for the attendance card
        <Card className="w-full max-w-md border-0 bg-white/95 shadow-2xl">
            <CardHeader className="pb-3 text-center">
                <CardTitle className="text-2xl font-bold">Attendance Management</CardTitle>
                <CardDescription className="text-base">
                    Enter the employee details to record attendance
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-1">
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="employee-id">
                                Employee ID
                            </label>
                            <Input
                                className="h-10"
                                id="employee-id"
                                name="employeeId"
                                type="text"
                                placeholder="Enter employee ID"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="event">
                                Event
                            </label>
                            <select
                                id="event"
                                name="event"
                                defaultValue=""
                                className="h-10 w-full rounded-lg border border-input bg-white px-2.5 py-1 text-left text-base text-gray-900 outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                                required
                            >
                                <option value="" disabled>
                                    Select an event
                                </option>
                                <option value="annual-general-meeting">
                                    Annual General Meeting
                                </option>
                                <option value="staff-orientation">Staff Orientation</option>
                                <option value="community-outreach">Community Outreach</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 border-0 bg-transparent pt-3 pb-6">
                    <Button type="submit" size="lg" className="w-full font-semibold">
                        Add Attendance
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
