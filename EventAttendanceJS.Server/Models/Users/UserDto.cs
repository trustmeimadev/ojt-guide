namespace EventAttendanceJS.Server.Models.Users;

// Output model. Property names must match SP column names
public class UserDto
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string First_Name { get; set; } = string.Empty;
    public string MiddleName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsActive { get; set; }

}