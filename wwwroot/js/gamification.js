function renderPerformanceChart(elementId, labels, userPerformance, teamAverage)
{
  const element = document.getElementById(elementId);
  
  if (!element)
  {
      console.error("Element not found:", elementId);
      return;
  }
  
  const ctx = element.getContext('2d');
  const userGradient = ctx.createLinearGradient(0, 0, 0, 400);
  const teamGradient = ctx.createLinearGradient(0, 0, 0, 400);

  userGradient.addColorStop(0, 'rgba(25, 118, 210, 0.6)');
  userGradient.addColorStop(1, 'rgba(25, 118, 210, 0.1)');
  
  teamGradient.addColorStop(0, 'rgba(123, 31, 162, 0.6)');
  teamGradient.addColorStop(1, 'rgba(123, 31, 162, 0.1)');
  
  new Chart(ctx,
  {
    type: 'line',
    data:
    {
      labels: labels,
      datasets:
      [
        {
          label: 'Your Performance',
          data: userPerformance,
          borderColor: '#1976D2',
          backgroundColor: userGradient,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#1976D2',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Team Average',
          data: teamAverage,
          borderColor: '#7B1FA2',
          backgroundColor: teamGradient,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#7B1FA2',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options:
    {
      responsive: true,
      maintainAspectRatio: false,
      plugins:
      {
        legend:
        {
          position: 'top',
        },
        tooltip:
        {
          mode: 'index',
          intersect: false,
          callbacks:
          {
            label: context => context.dataset.label + ': ' + context.formattedValue + ' claims'
          }
        },
        title:
        {
          display: true,
          text: 'Weekly Performance Comparison'
        }
      },
      scales:
      {
        y:
        {
          beginAtZero: true,
          title:
          {
            display: true,
            text: 'Claims Processed'
          },
          ticks:
          {
            callback: value => value
          }
        },
        x:
        {
          title:
          {
            display: true,
            text: 'Day of Week'
          }
        }
      }
    }
  });
}

function celebrateAchievement(elementId, achievementLevel = 1)
{
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  {
    playMinimalCelebration(elementId);
    return;
  }

  const config =
  {
    particleCount: Math.min(50 + (achievementLevel * 20), 200),
    spread: 70 + (achievementLevel * 10),
    startVelocity: 20 + (achievementLevel * 5),
    colors: ['#1976D2', '#4CAF50', '#FFC107', '#E91E63']
  };

  if (typeof confetti === 'function')
  {
    confetti
    ({
      particleCount: config.particleCount,
      spread: config.spread,
      origin: { y: 0.6 },
      colors: config.colors,
      startVelocity: config.startVelocity,
      disableForReducedMotion: true
    });
  }

  const element = document.getElementById(elementId);

  if (element)
  {
    element.classList.add('achievement-highlight');
    setTimeout(() =>
    {
      element.classList.remove('achievement-highlight');
    }, 2000);
  }
}

function playMinimalCelebration(elementId)
{
  const element = document.getElementById(elementId);

  if (element)
  {
    element.classList.add('achievement-highlight-static');
    setTimeout(() =>
    {
      element.classList.remove('achievement-highlight-static');
    }, 2000);
  }
}

let notificationQueue = [];
let isShowingNotification = false;

function showAchievementNotification(achievement)
{
  notificationQueue.push(achievement);

  if (!isShowingNotification)
  {
    processNotificationQueue();
  }
}

function processNotificationQueue()
{
  if (notificationQueue.length === 0)
  {
    isShowingNotification = false;
    return;
  }

  isShowingNotification = true;
  const achievement = notificationQueue.shift();

  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');

  notification.innerHTML = `
        <div class="achievement-notification-icon">
            <img src="${achievement.iconUrl}" alt="">
        </div>
        <div class="achievement-notification-content">
            <div class="achievement-notification-title">Achievement Unlocked!</div>
            <div class="achievement-notification-name">${achievement.title}</div>
            <div class="achievement-notification-description">${achievement.description}</div>
        </div>
        <button class="achievement-notification-close" aria-label="Close notification">×</button>
    `;

  document.body.appendChild(notification);

  const closeButton = notification.querySelector('.achievement-notification-close');

  closeButton.addEventListener('click', () =>
  {
    notification.classList.add('achievement-notification-hiding');
    setTimeout(() =>
    {
      document.body.removeChild(notification);
      processNotificationQueue();
    }, 300);
  });

  setTimeout(() =>
  {
    if (document.body.contains(notification))
    {
      notification.classList.add('achievement-notification-hiding');
      setTimeout(() =>
      {
        if (document.body.contains(notification))
        {
          document.body.removeChild(notification);
        }
        processNotificationQueue();
      }, 300);
    }
  }, 5000);

  setTimeout(() =>
  {
    notification.classList.add('achievement-notification-visible');
  }, 10);

  if (achievement.level && achievement.level > 1)
  {
    celebrateAchievement('dashboard-container', achievement.level);
  }
}

document.addEventListener('DOMContentLoaded', function ()
{
  console.log("Gamification system initialized");

  const style = document.createElement('style');

  style.textContent = `
        .achievement-notification
        {
            position: fixed;
            bottom: 20px;
            right: -350px;
            width: 300px;
            background: white;
            border-left: 4px solid #4CAF50;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 4px;
            padding: 15px;
            display: flex;
            align-items: center;
            transition: right 0.3s ease;
            z-index: 9999;
        }
        
        .achievement-notification-visible
        {
            right: 20px;
        }
        
        .achievement-notification-hiding
        {
            right: -350px;
        }
        
        .achievement-notification-icon
        {
            width: 50px;
            height: 50px;
            margin-right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .achievement-notification-icon img
        {
            max-width: 100%;
            max-height: 100%;
        }
        
        .achievement-notification-content
        {
            flex: 1;
        }
        
        .achievement-notification-title
        {
            font-size: 12px;
            color: #888;
        }
        
        .achievement-notification-name
        {
            font-weight: bold;
            margin: 5px 0;
        }
        
        .achievement-notification-close
        {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
        }
        
        .achievement-highlight
        {
            animation: pulse 2s ease;
        }
        
        .achievement-highlight-static
        {
            box-shadow: 0 0 0 2px #4CAF50;
        }
        
        @keyframes pulse
        {
            0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
            100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
    `;
  document.head.appendChild(style);
});

window.gamificationInterop =
{
  showAchievementNotification: function (achievement)
  {
    showAchievementNotification(achievement);
    return true;
  },

  celebrateAchievement: function (elementId, level)
  {
    celebrateAchievement(elementId, level);
    return true;
  },

  trackUserAction: function ()
  {
    userActionTracker.trackAction();
    return true;
  }
};