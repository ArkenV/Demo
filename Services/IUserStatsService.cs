using Demo.Models;

namespace Demo.Services
{
  public interface IUserStatsService
  {
    Task<UserStatsModel> GetUserStatsAsync();
    Task<List<AchievementModel>> GetNextAchievementsAsync();
    Task<List<AchievementModel>> GetRecentAchievementsAsync();
  }
}