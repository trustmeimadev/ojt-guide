using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace EventAttendanceJS.Server.Data;

// Only class that touches SqlConnection. All DB calls go through Dapper here.
public class SqlExecutor
{
    private readonly string connectionString;

    public SqlExecutor(IConfiguration configuration)
    {
        // OLD: configuration.GetConnectionString("DefaultConnection") — key didn't match user secrets
        // Dev: user secrets. Prod: env variable ConnectionStrings__DatabaseMSSql
        connectionString = configuration.GetConnectionString("DatabaseMSSql")
            ?? throw new InvalidOperationException("Connection string 'DatabaseMSSql' is missing. Run dotnet user-secrets set.");
    }

    // Many rows → list
    public async Task<IEnumerable<T>> QueryAsync<T>(string procedureName, object? parameters = null)
    {
        using var connection = new SqlConnection(connectionString);
        return await connection.QueryAsync<T>(procedureName, parameters, commandType: CommandType.StoredProcedure);
    }

    // One row or null
    public async Task<T?> QuerySingleAsync<T>(string procedureName, object? parameters = null)
    {
        using var connection = new SqlConnection(connectionString);
        return await connection.QueryFirstOrDefaultAsync<T>(procedureName, parameters, commandType: CommandType.StoredProcedure);
    }

    // Insert / update / delete → affected rows
    public async Task<int> ExecuteAsync(string procedureName, object? parameters = null)
    {
        using var connection = new SqlConnection(connectionString);
        return await connection.ExecuteAsync(procedureName, parameters, commandType: CommandType.StoredProcedure);
    }

    // Connection check only — the one place inline SQL is allowed, no SP needed for SELECT 1
    public async Task PingAsync(CancellationToken cancellationToken = default)
    {
        using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);
        await connection.ExecuteScalarAsync<int>(new CommandDefinition("SELECT 1", cancellationToken: cancellationToken));
    }
}