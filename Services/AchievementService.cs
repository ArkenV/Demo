using Demo.Models;

namespace Demo.Services
{
  public class AchievementService : IAchievementService
  {
    public Task<List<AchievementModel>> GetUserAchievementsAsync()
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
          Title = "Team Player",
          Description = "Completed 100 referrals within the month",
          IconUrl = "images/badges/team-player.svg",
          EarnedDate = DateTime.Now.AddDays(-10),
          IsEarned = true
        },
        new AchievementModel
        {
          Title = "Early Bird",
          Description = "No late starts within 1 month",
          IconUrl = "images/badges/early-bird.svg",
          EarnedDate = DateTime.Now.AddDays(-15),
          IsEarned = true
        }
      };

      return Task.FromResult(achievements);
    }

    public Task CheckForNewAchievementsAsync()
    {
      return Task.CompletedTask;
    }
  }
}