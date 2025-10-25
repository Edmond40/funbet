import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Target, TrendingUp, Award, BookOpen, Users, Smartphone } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const HowToPlay = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basics');

  const tabs = [
    { id: 'basics', name: 'Getting Started', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'betting', name: 'How to Bet', icon: <Target className="w-4 h-4" /> },
    { id: 'odds', name: 'Understanding Odds', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'tips', name: 'Betting Tips', icon: <Award className="w-4 h-4" /> }
  ];

  const bettingTypes = [
    {
      name: '1X2',
      description: 'Bet on home win (1), draw (X), or away win (2)',
      example: 'Arsenal vs Chelsea: 1=Arsenal win, X=Draw, 2=Chelsea win',
      popular: true
    },
    {
      name: 'Over/Under',
      description: 'Bet on total goals scored in the match',
      example: 'Over 2.5 means 3 or more goals, Under 2.5 means 2 or fewer',
      popular: true
    },
    {
      name: 'Both Teams to Score',
      description: 'Bet on whether both teams will score in the match',
      example: 'Yes = both teams score, No = at least one team doesn\'t score',
      popular: true
    },
    {
      name: 'Double Chance',
      description: 'Bet on two possible outcomes',
      example: '1X = Home win or Draw, 12 = Home or Away win, X2 = Draw or Away win',
      popular: false
    }
  ];

  const tips = [
    {
      title: 'Start Small',
      description: 'Begin with small bets to understand how betting works before increasing your stakes.',
      icon: '🎯'
    },
    {
      title: 'Research Teams',
      description: 'Study team form, injuries, and head-to-head records before placing bets.',
      icon: '📊'
    },
    {
      title: 'Manage Your Bankroll',
      description: 'Set a budget for betting and never bet more than you can afford to lose.',
      icon: '💰'
    },
    {
      title: 'Understand Odds',
      description: 'Higher odds mean higher potential returns but also higher risk. Choose wisely.',
      icon: '📈'
    },
    {
      title: 'Stay Informed',
      description: 'Follow sports news and updates to make informed betting decisions.',
      icon: '📰'
    },
    {
      title: 'Take Breaks',
      description: 'Don\'t bet continuously. Take breaks to maintain a clear mind.',
      icon: '⏰'
    }
  ];

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
          <h1 className="text-white text-lg font-semibold">How to Play</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 lg:p-6">
          {/* Hero Section */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center mb-4">
              <Play className={`w-8 h-8 mr-3 ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h2 className="text-2xl font-bold">How to Play SportyBet</h2>
                <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Learn the basics of sports betting and start winning
                </p>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Join thousands of winners</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                <span>Simple and easy to use</span>
              </div>
              <div className="flex items-center">
                <Smartphone className="w-4 h-4 mr-2" />
                <span>Bet anywhere, anytime</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`rounded-lg p-4 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className={`flex space-x-1 ${window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? (window.innerWidth < 1024 ? 'bg-gray-600 text-white' : 'bg-white text-gray-900')
                      : (window.innerWidth < 1024 ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className={`${window.innerWidth < 1024 ? 'text-white' : 'text-gray-900'}`}>
            {activeTab === 'basics' && (
              <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <h3 className="text-xl font-semibold mb-4">Getting Started</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Create Your Account</h4>
                      <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Register with your phone number and email. Verify your account to unlock all features.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Make a Deposit</h4>
                      <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Add funds using mobile money, bank transfer, or card. Minimum deposit is GHS 1.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Choose Your Sport</h4>
                      <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Select from football, basketball, tennis, and many more sports available.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Place Your Bet</h4>
                      <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Select your prediction, enter your stake, and confirm your bet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Watch & Win</h4>
                      <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Follow the match and celebrate when your prediction is correct!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'betting' && (
              <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <h3 className="text-xl font-semibold mb-4">How to Place a Bet</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bettingTypes.map((type, index) => (
                      <div
                        key={index}
                        className={`rounded-lg p-4 border ${
                          type.popular
                            ? (window.innerWidth < 1024 ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200')
                            : (window.innerWidth < 1024 ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200')
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{type.name}</h4>
                          {type.popular && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              window.innerWidth < 1024 ? 'bg-green-700 text-green-300' : 'bg-green-200 text-green-800'
                            }`}>
                              Popular
                            </span>
                          )}
                        </div>

                        <p className={`text-sm mb-2 ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                          {type.description}
                        </p>

                        <div className={`text-xs p-2 rounded ${
                          window.innerWidth < 1024 ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <strong>Example:</strong> {type.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'odds' && (
              <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <h3 className="text-xl font-semibold mb-4">Understanding Odds</h3>

                <div className="space-y-6">
                  <div className={`p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-blue-900' : 'bg-blue-50'}`}>
                    <h4 className="font-semibold mb-2">What are Odds?</h4>
                    <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
                      Odds represent the probability of an event happening and determine how much you can win.
                      Higher odds mean less likely to happen but bigger potential payout.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="text-2xl font-bold text-green-400 mb-2">1.25</div>
                      <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Low odds - High probability
                      </div>
                      <div className={`text-xs ${window.innerWidth < 1024 ? 'text-gray-500' : 'text-gray-500'}`}>
                        GHS 10 bet = GHS 12.50 return
                      </div>
                    </div>

                    <div className={`text-center p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="text-2xl font-bold text-yellow-400 mb-2">2.50</div>
                      <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        Medium odds - Medium probability
                      </div>
                      <div className={`text-xs ${window.innerWidth < 1024 ? 'text-gray-500' : 'text-gray-500'}`}>
                        GHS 10 bet = GHS 25.00 return
                      </div>
                    </div>

                    <div className={`text-center p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="text-2xl font-bold text-red-400 mb-2">5.00</div>
                      <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        High odds - Low probability
                      </div>
                      <div className={`text-xs ${window.innerWidth < 1024 ? 'text-gray-500' : 'text-gray-500'}`}>
                        GHS 10 bet = GHS 50.00 return
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-purple-900' : 'bg-purple-50'}`}>
                    <h4 className="font-semibold mb-2">Calculating Winnings</h4>
                    <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Formula:</strong> Winnings = Stake × Odds<br />
                      <strong>Example:</strong> GHS 100 stake at 2.50 odds = GHS 250 total return (GHS 150 profit)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <h3 className="text-xl font-semibold mb-4">Betting Tips for Success</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tips.map((tip, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg ${
                      window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="text-2xl">{tip.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{tip.title}</h4>
                        <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Start Guide */}
          <div className={`rounded-lg p-6 mt-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Quick Start Guide</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Ready to Start?</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/deposit')}
                    className={`w-full py-3 px-4 rounded-lg transition-colors ${
                      window.innerWidth < 1024 ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    Make Your First Deposit
                  </button>
                  <button
                    onClick={() => navigate('/football')}
                    className={`w-full py-3 px-4 rounded-lg transition-colors ${
                      window.innerWidth < 1024 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    Browse Football Matches
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/customer-service')}
                    className={`w-full py-3 px-4 rounded-lg transition-colors ${
                      window.innerWidth < 1024 ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Contact Customer Support
                  </button>
                  <button
                    onClick={() => navigate('/promotions')}
                    className={`w-full py-3 px-4 rounded-lg transition-colors ${
                      window.innerWidth < 1024 ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Check Current Promotions
                  </button>
                </div>
              </div>
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

export default HowToPlay;
