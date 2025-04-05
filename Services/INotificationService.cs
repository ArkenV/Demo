using Demo.Models;

namespace Demo.Services
{
  public interface INotificationService
  {
    Task ShowAchievementNotification(AchievementModel achievement);
  }
}