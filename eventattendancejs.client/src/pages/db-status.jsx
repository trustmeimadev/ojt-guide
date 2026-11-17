import { useEffect, useState } from "react";
import { CircleCheck, CircleX, Database } from "lucide-react";

import api from "@/services/api";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function DBStatus() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkDatabaseConnection() {
            try {
                const response = await api.get("/system/database");

                setStatus(response.data);
            } catch (error) {
                console.error("Error checking database connection:", error);
                setStatus({
                    connected: false,
                    message: "Unable to connect to the database.",
                });
            } finally {
                setLoading(false);
            }
        }

        checkDatabaseConnection();
    }, []);

    return (
        <div className= "flex h-full w-full items-center justify-center px-4" >
        <div className="w-full max-w-lg" >
            <div className="mb-5 flex flex-col items-center text-center" >
                <img
            src="/dole.png"
    alt = "Dole"
    className = "h-20 w-auto object-contain"
        />

        <h1 className="mt-3 text-2xl font-semibold text-white" >
            DFL App Template
                </h1>

                < div className = "mt-3 flex items-center justify-center gap-4" >
                    <div className="flex items-center gap-2" >
                        <img
                src="/react.svg"
    alt = "React"
    className = "size-7 object-contain"
        />

        <span className="text-sm font-medium text-white" > React </span>
            </div>

            < span className = "text-sm text-white/50" > +</span>

                < div className = "flex items-center gap-2" >
                    <img
                src="/csharp.svg"
    alt = "C#"
    className = "size-7 object-contain"
        />

        <span className="text-sm font-medium text-white" >
            ASP.NET Core
                </span>
                </div>
                </div>

                < p className = "mt-2 text-xs text-white/60" >
                    Application Status
                        </p>
                        </div>

                        < Card className = "bg-card/95 shadow-lg" >
                            <CardHeader className="pb-3" >
                                <div className="flex items-center justify-center gap-3" >
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted" >
                                        <Database className="size-5" />
                                            </div>

                                            < div >
                                            <CardTitle className="text-base" >
                                                Database Connection
                                                    </CardTitle>

    {
        loading ? (
            <p className= "mt-1 text-xs text-muted-foreground" >
            Checking connection...
        </p>
                ) : status?.connected ? (
            <p className= "mt-1 flex items-center gap-1 text-xs text-green-600" >
            <CircleCheck className="size-3.5" />
                Connected
                </p>
                ) : (
            <p className= "mt-1 flex items-center gap-1 text-xs text-destructive" >
            <CircleX className="size-3.5" />
                Not connected
                    </p>
                )
    }
    </div>
        </div>
        </CardHeader>

    {
        status?.connected && (
            <CardContent>
            <div className="space-y-2 border-t pt-4 text-sm" >
                <div>
                <span className="text-muted-foreground" > Server: </span>{" "}
        { status.server }
        </div>

            < div >
            <span className="text-muted-foreground" > Database: </span>{" "}
        { status.database }
        </div>
            </div>
            </CardContent>
          )
    }
    </Card>
        </div>
        </div>
  );
}