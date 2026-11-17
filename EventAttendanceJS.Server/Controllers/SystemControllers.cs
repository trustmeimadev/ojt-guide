using EventAttendanceJS.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventAttendanceJS.Server.Controllers;

[ApiController]
[Route("api/system")]
public class SystemController : ControllerBase
{
    private readonly DatabaseService _databaseService;

    public SystemController(DatabaseService databaseService)
    {
        _databaseService = databaseService;
    }

    [HttpGet("database")]
    public async Task<IActionResult> GetDatabaseStatus()
    {
        try
        {
            var result =
                await _databaseService.GetDatabaseStatusAsync();

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new
                {
                    connected = false,
                    message = ex.Message
                }
            );
        }
    }
}