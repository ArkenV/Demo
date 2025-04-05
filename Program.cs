using Demo;
using Demo.Services;
using MudBlazor.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddMudServices();

builder.Services.AddScoped<IUserStatsService, UserStatsService>();
builder.Services.AddScoped<IAchievementService, AchievementService>(); 
builder.Services.AddScoped<INotificationService, NotificationService>();

await builder.Build().RunAsync();