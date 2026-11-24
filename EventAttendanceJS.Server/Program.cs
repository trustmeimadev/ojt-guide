// using EventAttendanceJS.Server.Data;
// using EventAttendanceJS.Server.Services;

// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddControllers();
// builder.Services.AddOpenApi();
// // OLD — remove if present: SwaggerGen 6.x conflicts with Microsoft.OpenApi 2.x
// // builder.Services.AddEndpointsApiExplorer();
// // builder.Services.AddSwaggerGen();

// // Dapper executor — singleton is safe, it only holds the connection string
// builder.Services.AddSingleton<SqlExecutor>();

// // Feature services — add one line per new feature
// // builder.Services.AddScoped<DatabaseService>();
// builder.Services.AddScoped<UserService>();

// var app = builder.Build();

// app.UseDefaultFiles();
// app.MapStaticAssets();

// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi(); // /openapi/v1.json
//     // OLD — remove if present: app.UseSwagger();
//     app.UseSwaggerUI(options =>
//     {
//         options.SwaggerEndpoint("/openapi/v1.json", "EventAttendance API v1");
//     });
// }

// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();
// app.MapFallbackToFile("/index.html");

// app.Run();


using EventAttendanceJS.Server.Data;
using EventAttendanceJS.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

// Dapper executor — singleton is safe, it only holds the connection string
builder.Services.AddSingleton<SqlExecutor>();

// DB connection check → GET /api/health
builder.Services.AddHealthChecks().AddCheck<DatabaseHealthCheck>("database");

// Feature services — add one line per new feature
builder.Services.AddScoped<UserService>();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // /openapi/v1.json
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "EventAttendance API v1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapHealthChecks("/api/health");
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();