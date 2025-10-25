import { useState } from "react";
import { ArrowLeft, Trophy, Target, Gift, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import UnifiedBetslip from "@/components/UnifiedBetslip";

const SportyHero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("challenges");
  const [showBetslip, setShowBetslip] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Weekend Warrior",
      description: "Place 5 bets this weekend",
      progress: 3,
      total: 5,
      reward: "₵500 Bonus",
      difficulty: "Easy",
      timeLeft: "2 days",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "High Roller",
      description: "Win a bet with odds above 5.0",
      progress: 0,
      total: 1,
      reward: "₵1,000 Bonus",
      difficulty: "Hard",
      timeLeft: "5 days",
      icon: <Target className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Win 3 bets in a row",
      progress: 1,
      total: 3,
      reward: "₵750 Bonus",
      difficulty: "Medium",
      timeLeft: "1 week",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-yellow-500"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Win",
      description: "Won your first bet",
      earned: true,
      date: "2024-01-15",
      points: 100
    },
    {
      id: 2,
      title: "Lucky Seven",
      description: "Win 7 bets in a day",
      earned: false,
      points: 500
    },
    {
      id: 3,
      title: "Big Winner",
      description: "Win over ₵10,000 in a single bet",
      earned: true,
      date: "2024-01-20",
      points: 1000
    }
  ];

  const leaderboard = [
    { rank: 1, name: "ProBetter123", points: 15420, badge: "👑" },
    { rank: 2, name: "LuckyWinner", points: 12890, badge: "🥈" },
    { rank: 3, name: "SportsFan99", points: 11250, badge: "🥉" },
    { rank: 4, name: "BetMaster", points: 9870, badge: "" },
    { rank: 5, name: "You", points: 7650, badge: "⭐" }
  ];

  const rewards = [
    {
      id: 1,
      title: "Free Bet",
      description: "₵500 free bet voucher",
      cost: 1000,
      available: true,
    },
    {
      id: 2,
      title: "Cashback Bonus",
      description: "10% cashback on next 5 bets",
      cost: 1500,
      available: true,
    },
    {
      id: 3,
      title: "VIP Status",
      description: "1 month VIP membership",
      cost: 5000,
      available: false
    }
  ];

  const userStats = {
    level: 12,
    points: 7650,
    nextLevelPoints: 8000,
    totalBets: 156,
    winRate: 68,
    totalWinnings: "₵45,670"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Go back"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h1 className="text-lg font-bold">Sporty Hero</h1>
          </div>
        </div>
        <Badge className="bg-yellow-500 text-black font-bold">
          Level {userStats.level}
        </Badge>
      </header>

      {/* User Stats */}
      <div className="p-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Your Progress</h2>
              <p className="text-gray-300">Level {userStats.level} Hero</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{userStats.points}</div>
              <div className="text-sm text-gray-300">Hero Points</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{userStats.points}/{userStats.nextLevelPoints}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`bg-yellow-400 h-2 rounded-full transition-all duration-300`}
                style={{ width: `${(userStats.points / userStats.nextLevelPoints) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-400">{userStats.totalBets}</div>
              <div className="text-xs text-gray-400">Total Bets</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">{userStats.winRate}%</div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{userStats.totalWinnings}</div>
              <div className="text-xs text-gray-400">Total Winnings</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-4 bg-black/40 backdrop-blur-sm rounded-lg p-1">
          {[
            { id: "challenges", label: "Challenges" },
            { id: "achievements", label: "Achievements" },
            { id: "leaderboard", label: "Leaderboard" },
            { id: "rewards", label: "Rewards" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-yellow-500 text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "challenges" && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${challenge.color}`}>
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-gray-300">{challenge.description}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    challenge.difficulty === 'Easy' ? 'bg-green-500' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-yellow-400 font-medium">{challenge.reward}</div>
                    <div className="text-xs text-gray-400">Expires in {challenge.timeLeft}</div>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={challenge.progress < challenge.total}
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    {challenge.progress >= challenge.total ? 'Claim' : 'In Progress'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 ${
                achievement.earned ? 'border border-yellow-400' : 'opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-yellow-500' : 'bg-gray-600'}`}>
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-yellow-400">Earned on {achievement.date}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">+{achievement.points}</div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-400" />
              Top Heroes This Month
            </h3>
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div key={player.rank} className={`flex items-center justify-between p-3 rounded-lg ${
                  player.name === 'You' ? 'bg-yellow-500/20 border border-yellow-400' : 'bg-gray-800'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold">
                      {player.rank}
                    </div>
                    <div>
                      <div className="font-medium">{player.name} {player.badge}</div>
                      <div className="text-sm text-gray-400">{player.points} points</div>
                    </div>
                  </div>
                  {player.name === 'You' && (
                    <Badge className="bg-yellow-500 text-black">You</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rewards" && (
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{reward.title}</h3>
                      <p className="text-sm text-gray-300">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{reward.cost}</div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  disabled={!reward.available || userStats.points < reward.cost}
                  className="w-full bg-purple-500 hover:bg-purple-400 text-white"
                >
                  {userStats.points < reward.cost ? 'Not Enough Points' : 
                   !reward.available ? 'Coming Soon' : 'Redeem'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        onOpenBetslip={() => setShowBetslip(true)}
      />

      {/* Betslip Modal */}
      {showBetslip && (
        <UnifiedBetslip
          isOpen={showBetslip}
          onClose={() => setShowBetslip(false)}
          isMobile={true}
        />
      )}
    </div>
  );
};

export default SportyHero;
