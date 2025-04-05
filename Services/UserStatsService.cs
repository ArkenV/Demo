using Demo.Models;

namespace Demo.Services
{
  public class UserStatsService : IUserStatsService
  {
    public Task<UserStatsModel> GetUserStatsAsync()
    {
      var stats = new UserStatsModel
      {
        CurrentLevel = 8,
        LevelTitle = "Resolution Ranger",
        TotalPoints = 2650,
        PointsToNextLevel = 350,
        LevelProgressPercentage = 65,
        NextLevelThreshold = 3000,
        TodaysClaims = 32,
        DailyTarget = 30
      };

      return Task.FromResult(stats);
    }

    public Task<List<AchievementModel>> GetRecentAchievementsAsync()
    {
      var achievements = new List<AchievementModel>
      {
        new AchievementModel
        {
          Title = "Quick Closer",
          Description = "Maintained an average case time under 5 minutes for one week",
          IconUrl = "images/badges/quick-closer.svg",
          EarnedDate = DateTime.Now.AddDays(-2),
          IsEarned = true
        },
        new AchievementModel
        {
          Title = "Resolution Rock Star",
          Description = "Top 10% performer in case closures this month",
          IconUrl = "images/badges/rockstar.svg",
          EarnedDate = DateTime.Now.AddDays(-5),
          IsEarned = true
        }
      };
    
      return Task.FromResult(achievements);
    }

    public Task<List<AchievementModel>> GetNextAchievementsAsync()
    {
      var achievements = new List<AchievementModel>
      {
        new AchievementModel
        {
          Title = "Zero Backlog",
          Description = "Clear your pending queue for 5 consecutive days",
          IconUrl = "images/badges/zero-backlog.svg",
          ProgressPercentage = 60,
          ProgressText = "3/5 days completed",
          IsEarned = false
        },
        new AchievementModel
        {
          Title = "Quality Guru",
          Description = "Maintain 95% quality score for 30 days",
          IconUrl = "images/badges/quality-guru.svg",
          ProgressPercentage = 80,
          ProgressText = "24/30 days completed",
          IsEarned = false
        }
      };

      return Task.FromResult(achievements);
    }
  }
}