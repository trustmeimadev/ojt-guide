using Microsoft.Data.SqlClient;

namespace EventAttendanceJS.Server.Services;

public class DatabaseService
{
    private readonly string _connectionString;

    public DatabaseService(IConfiguration configuration)
    {
        _connectionString =
            configuration.GetConnectionString("DatabaseMSSql")
            ?? throw new InvalidOperationException(
                "DatabaseMSSql connection string was not found."
            );

        Console.WriteLine($"Database connection string: {_connectionString}");
    }

    public async Task<object> GetDatabaseStatusAsync()
    {
        await using var connection =
            new SqlConnection(_connectionString);

        await connection.OpenAsync();

        return new
        {
            Connected = true,
            Server = connection.DataSource,
            Database = connection.Database
        };
    }
}