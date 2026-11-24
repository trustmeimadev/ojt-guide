using EventAttendanceJS.Server.Data;
using EventAttendanceJS.Server.Models.Users;

namespace EventAttendanceJS.Server.Services;

public class UserService
{
    private readonly SqlExecutor sqlExecutor;

    public UserService(SqlExecutor sqlExecutor) => this.sqlExecutor = sqlExecutor;
    
    public Task<IEnumerable<UserDto>> GetAllUsers() =>
        sqlExecutor.QueryAsync<UserDto>(StoredProcedures.GetAllUsers);


  
}