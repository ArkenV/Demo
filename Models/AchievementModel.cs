namespace Demo.Models
{
  public class AchievementModel
  {
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? IconUrl { get; set; }
    public DateTime EarnedDate { get; set; }
    public int Level { get; set; } = 1;
    public double ProgressPercentage { get; set; }
    public string? ProgressText { get; set; }
    public bool IsEarned { get; set; }
  }
}