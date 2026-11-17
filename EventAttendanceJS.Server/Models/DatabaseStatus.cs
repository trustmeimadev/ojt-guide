namespace EventAttendanceJS.Server.Models;

public class DatabaseStatus 
{
    public bool Connected { get; set; }

    public string Database { get; set; } = string.Empty;

    public string Server { get; set; } = string.Empty;
}