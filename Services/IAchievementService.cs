using Demo.Models;

namespace Demo.Services
{
  public interface IAchievementService
  {
    Task CheckForNewAchievementsAsync();
    Task<List<AchievementModel>> GetUserAchievementsAsync();
  }
}