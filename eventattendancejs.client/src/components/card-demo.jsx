import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CardDemo() {
    return (
        <Card className="mx-auto w-full max-w-md border-0 bg-white/95 shadow-2xl">
            <CardHeader className="pb-3 text-center">
                <CardTitle className="text-2xl font-bold">Attendance</CardTitle>
                <CardDescription className="text-base">
                    Enter the employee details to record attendance
                </CardDescription>
            </CardHeader>
            <form onSubmit={(event) => event.preventDefault()}>
                <CardContent className="space-y-1">
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="employee-id">
                                Employee ID
                            </label>
                            <Input
                                className="h-10"
                                id="employee-id"
                                type="text"
                                placeholder="Enter employee ID"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="employee-name">
                                Name
                            </label>
                            <Input
                                className="h-10"
                                id="employee-name"
                                type="text"
                                placeholder="Enter employee name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="employee-level">
                                Level
                            </label>
                            <Input
                                className="h-10"
                                id="employee-level"
                                type="text"
                                placeholder="e.g. Officer"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-left text-sm font-medium" htmlFor="event">
                                Event
                            </label>
                            <select
                                id="event"
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
