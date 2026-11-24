using EventAttendanceJS.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventAttendanceJS.Server.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserService userService;

    public UsersController(UserService userService) => this.userService = userService;

    [HttpGet]
     [HttpGet]
    public async Task<IActionResult> GetAllUsers() =>
        Ok(await userService.GetAllUsers());

   
}