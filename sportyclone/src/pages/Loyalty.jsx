import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Gift, Target, TrendingUp, Crown, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const Loyalty = () => {
  const navigate = useNavigate();
  const [currentPoints] = useState(2847);

  const loyaltyTiers= [
    {
      id: 'bronze',
      name: 'Bronze',
      icon: '🥉',
      minPoints: 0,
      maxPoints: 999,
      color: 'bg-orange-100 text-orange-800',
      benefits: ['1.5x bonus on wins', 'Priority support', 'Monthly newsletter']
    },
    {
      id: 'silver',
      name: 'Silver',
      icon: '🥈',
      minPoints: 1000,
      maxPoints: 4999,
      color: 'bg-gray-100 text-gray-800',
      benefits: ['2x bonus on wins', 'Priority support', 'Monthly newsletter', 'Exclusive promotions']
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: '🥇',
      minPoints: 5000,
      maxPoints: 9999,
      color: 'bg-yellow-100 text-yellow-800',
      current: true,
      benefits: ['2.5x bonus on wins', 'VIP support', 'Monthly newsletter', 'Exclusive promotions', 'Birthday bonus']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: '💎',
      minPoints: 10000,
      maxPoints: 999999,
      color: 'bg-purple-100 text-purple-800',
      benefits: ['3x bonus on wins', 'Dedicated manager', 'All previous benefits', 'Luxury gifts']
    }
  ];

  const achievements= [
    {
      id: 'first-bet',
      title: 'First Bet',
      description: 'Place your first bet',
      icon: '🎯',
      points: 50,
      completed: false
    },
    {
      id: 'win-streak',
      title: 'Winning Streak',
      description: 'Win 5 bets in a row',
      icon: '🔥',
      points: 200,
      completed: false
    },
    {
      id: 'high-roller',
      title: 'High Roller',
      description: 'Place a bet of GHS 1000+',
      icon: '💰',
      points: 500,
      completed: false,
      progress: 65
    },
    {
      id: 'loyal-customer',
      title: 'Loyal Customer',
      description: 'Place bets for 30 consecutive days',
      icon: '📅',
      points: 300,
      completed: false,
      progress: 80
    },
    {
      id: 'jackpot-winner',
      title: 'Jackpot Winner',
      description: 'Win any jackpot game',
      icon: '🏆',
      points: 1000,
      completed: false,
      progress: 0
    }
  ];

  const getCurrentTier = () => {
    return loyaltyTiers.find(tier => tier.current) || loyaltyTiers[0];
  };

  const getNextTier = () => {
    const current = getCurrentTier();
    return loyaltyTiers.find(tier => tier.minPoints > current.minPoints);
  };

  const getProgressToNextTier = () => {
    const current = getCurrentTier();
    const next = getNextTier();
    if (!next) return 100; // Max tier

    const progress = ((currentPoints - current.minPoints) / (next.minPoints - current.minPoints)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 lg:bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white mr-3"
            title="Back to dashboard"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-semibold">Sporty Loyalty</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 lg:p-6">
          {/* Loyalty Overview */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Trophy className={`w-8 h-8 mr-3 ${window.innerWidth < 1024 ? 'text-yellow-400' : 'text-yellow-500'}`} />
                <div>
                  <h2 className="text-2xl font-bold">Sporty Loyalty Program</h2>
                  <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Earn points and unlock exclusive rewards
                  </p>
                </div>
              </div>

              <div className={`text-right ${window.innerWidth < 1024 ? 'text-white' : 'text-gray-900'}`}>
                <div className="text-3xl font-bold">{currentPoints.toLocaleString()}</div>
                <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Loyalty Points
                </div>
              </div>
            </div>

            {/* Current Tier Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getCurrentTier().name} Tier
                </span>
                <span className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getProgressToNextTier().toFixed(0)}% to {getNextTier()?.name || 'Max'}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    getCurrentTier().id === 'bronze' ? 'bg-orange-500' :
                    getCurrentTier().id === 'silver' ? 'bg-gray-500' :
                    getCurrentTier().id === 'gold' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${getProgressToNextTier()}%` }}
                ></div>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getCurrentTier().benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-500'}`} />
                  <span className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Loyalty Tiers */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Loyalty Tiers</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loyaltyTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-lg p-4 border-2 transition-all ${
                    tier.current
                      ? `${tier.color} border-current`
                      : window.innerWidth < 1024
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {tier.current && (
                    <div className="absolute -top-2 -right-2">
                      <Crown className="w-6 h-6 text-yellow-500" />
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-3xl mb-2">{tier.icon}</div>
                    <h4 className="font-semibold">{tier.name}</h4>
                    <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} points
                    </p>
                  </div>

                  <div className="mt-3 space-y-1">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <CheckCircle className={`w-3 h-3 mr-1 ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-500'}`} />
                        <span className={window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-lg p-4 border ${
                    achievement.completed
                      ? (window.innerWidth < 1024 ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200')
                      : (window.innerWidth < 1024 ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200')
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl ${achievement.completed ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${achievement.completed ? '' : 'opacity-75'}`}>
                          {achievement.title}
                        </h4>
                        <span className={`text-sm font-medium ${
                          achievement.completed
                            ? (window.innerWidth < 1024 ? 'text-green-400' : 'text-green-600')
                            : (window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-500')
                        }`}>
                          +{achievement.points} pts
                        </span>
                      </div>

                      <p className={`text-sm mb-2 ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>

                      {!achievement.completed && achievement.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className={window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}>
                              Progress
                            </span>
                            <span className={window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}>
                              {achievement.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {achievement.completed && (
                        <div className={`inline-flex items-center text-xs font-medium ${
                          window.innerWidth < 1024 ? 'text-green-400' : 'text-green-600'
                        }`}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Earn Points */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">How to Earn Points</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Target className={`w-5 h-5 mt-0.5 ${window.innerWidth < 1024 ? 'text-blue-400' : 'text-blue-500'}`} />
                <div>
                  <div className="font-medium">Place Bets</div>
                  <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Earn 1 point for every GHS 10 wagered
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <TrendingUp className={`w-5 h-5 mt-0.5 ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-500'}`} />
                <div>
                  <div className="font-medium">Win Bets</div>
                  <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Earn bonus points for successful predictions
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Gift className={`w-5 h-5 mt-0.5 ${window.innerWidth < 1024 ? 'text-purple-400' : 'text-purple-500'}`} />
                <div>
                  <div className="font-medium">Special Promotions</div>
                  <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Participate in loyalty campaigns and events
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

            <div className="space-y-3">
              {[
                { action: 'Bet Won', details: 'Chelsea vs Liverpool', points: '+50', time: '2 hours ago' },
                { action: 'Daily Login', details: 'Daily bonus', points: '+10', time: '1 day ago' },
                { action: 'Bet Placed', details: 'Arsenal vs Manchester United', points: '+25', time: '2 days ago' },
                { action: 'Achievement Unlocked', details: 'Winning Streak completed', points: '+200', time: '3 days ago' }
              ].map((activity, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.points.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.details}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-medium ${activity.points.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {activity.points}
                    </div>
                    <div className={`text-xs ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
};

export default Loyalty;
