using Demo.Models;
using Microsoft.JSInterop;

namespace Demo.Services
{
  public class NotificationService : INotificationService
  {
    private readonly IJSRuntime _jsRuntime;
    
    public NotificationService(IJSRuntime jsRuntime)
    {
      _jsRuntime = jsRuntime;
    }
    
    public async Task ShowAchievementNotification(AchievementModel achievement)
    {
      await _jsRuntime.InvokeVoidAsync("gamificationInterop.showAchievementNotification", achievement);
    }
  }
}