import { RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUsers from "@/hooks/users/use-users";

export default function UsersPage() {
  const { users, isLoading, errorMessage, reloadUsers } = useUsers();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Users</h1>
          <p className="mt-1 text-sm text-white/75">Manage user accounts and status.</p>
        </div>
        <Button variant="outline" onClick={reloadUsers} disabled={isLoading}>
          <RefreshCw className={isLoading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        {isLoading ? (
          <p className="px-4 py-8 text-sm text-muted-foreground">Loading users...</p>
        ) : errorMessage ? (
          <div className="flex flex-col items-start justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center">
            <p className="text-sm text-destructive">{errorMessage}</p>
            <Button variant="outline" size="sm" onClick={reloadUsers}>
              <RefreshCw />
              Try again
            </Button>
          </div>
        ) : users.length === 0 ? (
          <p className="px-4 py-8 text-sm text-muted-foreground">No users found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="h-11 px-4 font-semibold text-card-foreground">
                  Username
                </TableHead>
                <TableHead className="h-11 px-4 font-semibold text-card-foreground">
                  Full name
                </TableHead>
                <TableHead className="h-11 w-32 px-4 text-right font-semibold text-card-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const fullName = [
                  user.firstName,
                  user.middleName,
                  user.lastName,
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <TableRow key={user.userId} className="hover:bg-muted/30">
                    <TableCell className="px-4 py-3 font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {fullName || "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
