using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace EventAttendanceJS.Server.Data;

public class DatabaseHealthCheck : IHealthCheck
{
    private readonly SqlExecutor sqlExecutor;

    public DatabaseHealthCheck(SqlExecutor sqlExecutor) => this.sqlExecutor = sqlExecutor;

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            await sqlExecutor.PingAsync(cancellationToken);
            return HealthCheckResult.Healthy("Database connected.");
        }
        catch (Exception exception)
        {
            // Exception is logged server-side only; the endpoint just returns "Unhealthy"
            return HealthCheckResult.Unhealthy("Database connection failed.", exception);
        }
    }
}