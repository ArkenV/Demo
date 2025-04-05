namespace Demo.Models
{
  public class UserStatsModel
  {
    public int CurrentLevel { get; set; }
    public string? LevelTitle { get; set; }
    public int TotalPoints { get; set; }
    public int PointsToNextLevel { get; set; }
    public int LevelProgressPercentage { get; set; }
    public int NextLevelThreshold { get; set; }
    public int TodaysClaims { get; set; }
    public int DailyTarget { get; set; }
  }
}