import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Home, Search, Star, Info, TrendingUp, MessageCircle, List } from 'lucide-react';
import { useBets } from '@/hooks/useBets';
import BottomNavigation from '@/components/BottomNavigation';
import { RiMenuSearchLine } from 'react-icons/ri';

const MatchDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addBet } = useBets();
  const [activeTab, setActiveTab] = useState('Markets');
  const [activeMarketTab, setActiveMarketTab] = useState('Main');
  const [expandedMarkets, setExpandedMarkets] = useState(new Set(['1X2']));

  const toggleMarket = (marketName) => {
    setExpandedMarkets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(marketName)) {
        newSet.delete(marketName);
      } else {
        newSet.add(marketName);
      }
      return newSet;
    });
  };

  // All games data from ScheduledVirtuals
  const allGamesData = {
    'Football': [
      { 
        time: "16:15", 
        team1: "Colwyn Bay", 
        team2: "Caernarfon Town FC", 
        league: "Wales - Cymru Premier", 
        id: 1,
        sport: 'Football',
        details: {
          form: { team1: "W-L-W-D-L", team2: "D-W-W-L-D" },
          stats: { team1: { goals: 12, conceded: 8 }, team2: { goals: 15, conceded: 6 } },
          odds: { home: "2.40", draw: "3.10", away: "2.90" },
          headToHead: "Last 5: Colwyn Bay 2-3 Caernarfon Town FC"
        }
      },
      { 
        time: "16:15", 
        team1: "Fram", 
        team2: "UMF Tindastoll", 
        league: "Iceland - Besta deild, Women", 
        id: 2,
        sport: 'Football',
        details: {
          form: { team1: "W-W-L-W-D", team2: "L-D-W-W-L" },
          stats: { team1: { goals: 18, conceded: 10 }, team2: { goals: 14, conceded: 12 } },
          odds: { home: "1.85", draw: "3.40", away: "4.20" },
          headToHead: "Last 5: Fram 3-2 UMF Tindastoll"
        }
      },
      { 
        time: "16:15", 
        team1: "Hapoel Haifa FC", 
        team2: "Hapoel Ironi Kiryat Shmona FC", 
        league: "Israel - Premier League", 
        id: 3,
        sport: 'Football',
        details: {
          form: { team1: "W-W-L-D-W", team2: "L-W-D-L-W" },
          stats: { team1: { goals: 22, conceded: 14 }, team2: { goals: 19, conceded: 18 } },
          odds: { home: "2.10", draw: "3.20", away: "3.40" },
          headToHead: "Last 5: Hapoel Haifa 1-2 Kiryat Shmona"
        }
      }
    ],
    'Basketball': [
      { 
        time: "17:00", 
        team1: "Lakers", 
        team2: "Warriors", 
        league: "NBA", 
        id: 11,
        sport: 'Basketball',
        details: {
          stats: { 
            team1: { points: 112.5, rebounds: 45.2, assists: 28.1, record: "15-8" }, 
            team2: { points: 118.3, rebounds: 42.8, assists: 30.5, record: "18-5" } 
          },
          odds: { home: "2.10", away: "1.75" },
          spread: "+3.5",
          total: "230.5",
          keyPlayers: { team1: "LeBron James", team2: "Stephen Curry" }
        }
      },
      { 
        time: "17:30", 
        team1: "Celtics", 
        team2: "Heat", 
        league: "NBA", 
        id: 12,
        sport: 'Basketball',
        details: {
          stats: { 
            team1: { points: 108.7, rebounds: 48.1, assists: 25.9, record: "16-7" }, 
            team2: { points: 105.2, rebounds: 44.3, assists: 26.8, record: "12-11" } 
          },
          odds: { home: "1.65", away: "2.25" },
          spread: "-4.5",
          total: "214.5",
          keyPlayers: { team1: "Jayson Tatum", team2: "Jimmy Butler" }
        }
      }
    ],
    'Tennis': [
      { 
        time: "14:00", 
        team1: "Novak Djokovic", 
        team2: "Rafael Nadal", 
        league: "ATP Masters", 
        id: 15,
        sport: 'Tennis',
        details: {
          ranking: { team1: 1, team2: 2 },
          headToHead: "Djokovic leads 30-29",
          surface: "Hard Court",
          odds: { team1: "1.45", team2: "2.75" },
          recentForm: { team1: "W-W-L-W-W", team2: "W-W-W-L-W" },
          titles: { team1: 98, team2: 92 }
        }
      }
    ],
    'eFootball': [
      { 
        time: "15:45", 
        team1: "Team Liquid", 
        team2: "FaZe Clan", 
        league: "eFootball Championship", 
        id: 19,
        sport: 'eFootball',
        details: {
          teamRating: { team1: 2150, team2: 2080 },
          recentMatches: { team1: "W-W-L-W-D", team2: "L-W-W-W-L" },
          odds: { team1: "1.90", team2: "1.90" },
          platform: "PlayStation 5",
          prize: "$50,000",
          bestOf: "3 matches"
        }
      }
    ],
    'Table Tennis': [
      { 
        time: "13:00", 
        team1: "Ma Long", 
        team2: "Fan Zhendong", 
        league: "WTT Champions", 
        id: 23,
        sport: 'Table Tennis',
        details: {
          worldRanking: { team1: 1, team2: 2 },
          headToHead: "Ma Long leads 15-12",
          odds: { team1: "2.20", team2: "1.65" },
          recentForm: { team1: "W-W-L-W-W", team2: "W-W-W-W-L" },
          playingStyle: { team1: "All-round", team2: "Offensive" },
          bestOf: "7 games"
        }
      }
    ]
  };

  // Find the current game based on ID
  const findGameById = (gameId) => {
    for (const sport in allGamesData) {
      const game = allGamesData[sport].find(g => g.id.toString() === gameId);
      if (game) return game;
    }
    return null;
  };

  const currentGame = findGameById(id || '1');

  // Define missing variables
  const liveInPlay = true;
  const details = currentGame?.details || {};
  const info = "Additional betting market";
  const trending = false;

  // Default to football data if game not found
  const matchData = currentGame ? {
    league: `${currentGame.sport} - ${currentGame.league}`,
    homeTeam: currentGame.team1,
    awayTeam: currentGame.team2,
    homeIcon: "🏠",
    awayIcon: "🏛️", 
    date: "05/10",
    day: "Sunday",
    time: currentGame.time,
    gameId: currentGame.id.toString(),
    liveInPlay,
    sport: currentGame.sport,
    details: currentGame.details,
    htScore: "0%",
    winProbability: { home: 40, draw: 23, away: 37 }
  } : {
    league: "Football - New Zealand - National League",
    homeTeam: "Birkenhead United AFC",
    awayTeam: "Auckland City FC",
    homeIcon: "🏠",
    awayIcon: "🏛️",
    date: "05/10",
    day: "Sunday", 
    time: "03:00",
    gameId: "24520",
    liveInPlay,
    sport: 'Football',
    details,
    htScore: "0%",
    winProbability: { home: 40, draw: 23, away: 37 }
  };

  // Generate sport-specific markets based on current game
  // eslint-disable @typescript-eslint/no-explicit-any
  const getMainMarkets = () => {
    const sport = matchData.sport;
    const details = matchData.details; // Use any for dynamic access

    if (sport === 'Football') {
      return [
        {
          name: "1X2",
          type: "main",
          info,
          trending,
          odds: [
            { label: "Home", value: details?.odds?.home || "2.25", pick: "1" },
            { label: "Draw", value: details?.odds?.draw || "3.90", pick: "X" },
            { label: "Away", value: details?.odds?.away || "2.45", pick: "2" }
          ]
        }
      ];
    } else if (sport === 'Basketball') {
      return [
        {
          name: "Moneyline",
          type: "main",
          info,
          trending,
          odds: [
            { label: matchData.homeTeam, value: details?.odds?.home || "2.10", pick: "1" },
            { label: matchData.awayTeam, value: details?.odds?.away || "1.75", pick: "2" }
          ]
        }
      ];
    } else if (sport === 'Tennis') {
      return [
        {
          name: "Match Winner",
          type: "main",
          info,
          trending,
          odds: [
            { label: matchData.homeTeam, value: details?.odds?.team1 || "1.45", pick: "1" },
            { label: matchData.awayTeam, value: details?.odds?.team2 || "2.75", pick: "2" }
          ]
        }
      ];
    } else if (sport === 'eFootball') {
      return [
        {
          name: "Match Winner",
          type: "main",
          info,
          trending,
          odds: [
            { label: matchData.homeTeam, value: details?.odds?.team1 || "1.90", pick: "1" },
            { label: matchData.awayTeam, value: details?.odds?.team2 || "1.90", pick: "2" }
          ]
        }
      ];
    } else if (sport === 'Table Tennis') {
      return [
        {
          name: "Match Winner",
          type: "main",
          info,
          trending,
          odds: [
            { label: matchData.homeTeam, value: details?.odds?.team1 || "2.20", pick: "1" },
            { label: matchData.awayTeam, value: details?.odds?.team2 || "1.65", pick: "2" }
          ]
        }
      ];
    }

    // Default football markets
    return [
      {
        name: "1X2",
        type: "main",
        info,
        trending,
        odds: [
          { label: "Home", value: "2.25", pick: "1" },
          { label: "Draw", value: "3.90", pick: "X" },
          { label: "Away", value: "2.45", pick: "2" }
        ]
      }
    ];
  };

  const mainMarkets = getMainMarkets();

  const goalsMarkets = [
    {
      name: "Correct Score",
      type: "expandable",
      info,
      badge: "Bore Draw 0:0"
    },
    {
      name: "Half Time/Full Time",
      type: "expandable",
      info,
      badge: "Bore Draw 0:0"
    },
    {
      name: "Both Halves Over 1.5",
      type: "yesno",
      info,
      odds: [
        { label: "Yes", value: "3.25", pick: "Yes" },
        { label: "No", value: "1.28", pick: "No" }
      ]
    },
    {
      name: "Both Halves Under 1.5",
      type: "yesno",
      info,
      odds: [
        { label: "Yes", value: "3.50", pick: "Yes" },
        { label: "No", value: "1.24", pick: "No" }
      ]
    },
    {
      name: "Home Team to Score In Both Halves",
      type: "yesno",
      info,
      odds: [
        { label: "Yes", value: "2.60", pick: "Yes" },
        { label: "No", value: "1.42", pick: "No" }
      ]
    },
    {
      name: "Away Team to Score In Both Halves",
      type: "yesno",
      info,
      odds: [
        { label: "Yes", value: "2.75", pick: "Yes" },
        { label: "No", value: "1.38", pick: "No" }
      ]
    },
    {
      name: "Odd/Even",
      type: "oddeven",
      info,
      odds: [
        { label: "Odd", value: "1.85", pick: "Odd" },
        { label: "Even", value: "1.82", pick: "Even" }
      ]
    },
    {
      name: "Goal Bounds",
      type: "bounds",
      info,
      range: { min: 0, max: 5, selected: [1, 2] },
      odds: "5.34"
    },
    {
      name: "Goal Bounds - Home",
      type: "bounds",
      info,
      range: { min: 0, max: 3, selected: [0, 1] },
      odds: "1.95"
    },
    {
      name: "Goal Bounds - Away",
      type: "bounds",
      info,
      range: { min: 0, max: 3, selected: [0, 1] },
      odds: "1.85"
    },
    {
      name: "Excluded Number of Goals",
      type: "expandable",
      info: "Additional betting market"
    },
    {
      name: "Excluded Number of Goals - Home",
      type: "grid",
      info: "Additional betting market",
      options: [
        { label: "0", value: "1.16" },
        { label: "1", value: "1.39" },
        { label: "2", value: "1.30" },
        { label: "3+", value: "1.29" }
      ]
    }
  ];

  return (
    <div className="lg:hidden bg-gray-100 text-gray-900 min-h-screen relative pb-16">
      {/* Header */}
      <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} title="Go back">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Details</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Search">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => navigate('/')} title="Go home">
            <Home className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Switch Match Button */}
      <div className="px-4 py-2 flex justify-end">
        <button className="flex items-center space-x-1 text-gray-600 text-sm">
          <span>Switch match</span>
          <List className="w-4 h-4" />
        </button>
      </div>

      {/* League Info */}
      <div className="px-4 pb-2">
        <p className="text-green-600 text-sm font-medium underline">{matchData.league}</p>
      </div>

      {/* Match Header */}
      <div className="bg-white px-4 py-4 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="text-gray-400" title="Previous match">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-red-600 font-bold text-lg">S</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{matchData.homeTeam}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">{matchData.date}</p>
            <p className="text-gray-500 text-sm">{matchData.day}</p>
            <p className="text-xl font-bold text-gray-900">{matchData.time}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-blue-600 font-bold text-lg">A</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{matchData.awayTeam}</p>
            </div>
            <button className="text-gray-400" title="Next match">
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-gray-500 text-xs">Game ID {matchData.gameId} • Live In-Play Available</p>
        </div>
      </div>

      {/* NEW Badge and BB */}
      <div className="px-4 mb-2">
        <div className="flex items-center space-x-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">NEW</span>
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold">BB</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          {['Markets', 'Stats', 'Comments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === tab
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Markets' && (
        <>
          {/* Market Filter Tabs */}
          <div className="bg-white border-b">
            <div className="flex items-center px-4 py-2">
              <button className="mr-4" title="Filter markets">
                <RiMenuSearchLine className="w-4 h-4 text-gray-600"/>
              </button>
              <button className="mr-4" title="Favorite markets">
                <Star className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex space-x-4 overflow-x-auto">
                {['All', 'Main', 'Goals', 'Corners', 'Half', 'Player'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMarketTab(tab)}
                    className={`py-2 px-1 text-sm font-medium whitespace-nowrap border-b-2 ${
                      activeMarketTab === tab
                        ? 'text-green-600 border-green-600'
                        : 'text-gray-600 border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Markets Content */}
          <div className="bg-white">
            {activeMarketTab === 'Main' && (
              <>
                {/* Win Probability Section */}
                <div className="px-4 py-4 bg-gray-900 text-white">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">🏠 {matchData.homeTeam}</span>
                      <span className="text-sm">{matchData.awayTeam} 🏛️</span>
                    </div>
                    
                    <h3 className="text-green-400 text-center text-lg font-bold mb-4">WIN PROBABILITY</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-green-400">BIR</span>
                          <span className="text-gray-400">Draw</span>
                          <span className="text-red-400">ACI</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-green-400 font-bold">40%</span>
                          <span className="text-gray-400">23%</span>
                          <span className="text-red-400 font-bold">37%</span>
                        </div>
                        
                        <div className="flex h-6 rounded overflow-hidden">
                          <div className="bg-green-500 flex-[40] flex items-center justify-center text-xs font-bold">
                            END
                          </div>
                          <div className="bg-gray-600 flex-[23]"></div>
                          <div className="bg-red-500 flex-[37]"></div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0%</span>
                          <span>20%</span>
                          <span>40%</span>
                          <span>60%</span>
                          <span>80%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm">HT</span>
                      <span className="text-green-400 text-sm">{matchData.htScore}</span>
                    </div>
                  </div>

                  {/* Main 1X2 Odds */}
                  <div className="grid grid-cols-3 gap-2">
                    {mainMarkets[0]?.odds?.map((odd, index) => (
                      <button
                        key={index}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded text-sm font-bold"
                        onClick={() => addBet({
                          id: `main-${index}`,
                          event: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
                          market: '1X2',
                          pick: odd.label,
                          odds: odd.value
                        })}
                      >
                        <div>{odd.label}</div>
                        <div className="text-lg">{odd.value}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Main Markets */}
                <div className="px-4 py-2">
                  {mainMarkets.slice(1).map((market, marketIndex) => (
                    <div key={marketIndex} className="mb-4">
                      <button
                        onClick={() => toggleMarket(market.name)}
                        className="flex items-center justify-between w-full py-3 text-left"
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`transform transition-transform ${expandedMarkets.has(market.name) ? 'rotate-90' : ''}`}>
                            ▶
                          </span>
                          <span className="font-medium">{market.name}</span>
                          {market.info && <Info className="w-4 h-4 text-gray-400" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          {market.trending && <TrendingUp className="w-4 h-4 text-green-600" />}
                          <Star className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>

                      {expandedMarkets.has(market.name) && (
                        <div className="pl-6">
                          {market.type === 'variant' && (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {market.odds?.map((odd, index) => (
                                <button
                                  key={index}
                                  className="bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded text-sm font-medium"
                                  onClick={() => addBet({
                                    id: `${market.name}-${index}`,
                                    event: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
                                    market: market.name,
                                    pick: odd.label,
                                    odds: odd.value
                                  })}
                                >
                                  <div>{odd.label}</div>
                                  <div>{odd.value}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeMarketTab === 'Goals' && (
              <div className="px-4 py-2">
                {goalsMarkets.map((market, marketIndex) => (
                  <div key={marketIndex} className="mb-4">
                    <button
                      onClick={() => toggleMarket(market.name)}
                      className="flex items-center justify-between w-full py-3 text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`transform transition-transform ${expandedMarkets.has(market.name) ? 'rotate-90' : ''}`}>
                          ▶
                        </span>
                        <span className="font-medium">{market.name}</span>
                        {market.info && <Info className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div className="flex items-center space-x-2">
                        {market.badge && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {market.badge}
                          </span>
                        )}
                        <Star className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>

                    {expandedMarkets.has(market.name) && (
                      <div className="pl-6">
                        {market.type === 'yesno' && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {Array.isArray(market.odds) && market.odds.map((odd, index) => (
                              <button
                                key={index}
                                className="bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded font-medium"
                                onClick={() => addBet({
                                  id: `${market.name}-${index}`,
                                  event: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
                                  market: market.name,
                                  pick: odd.label,
                                  odds: odd.value
                                })}
                              >
                                <div>{odd.label}</div>
                                <div className="text-lg font-bold">{odd.value}</div>
                              </button>
                            ))}
                          </div>
                        )}

                        {market.type === 'oddeven' && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {Array.isArray(market.odds) && market.odds.map((odd, index) => (
                              <button
                                key={index}
                                className="bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded font-medium"
                                onClick={() => addBet({
                                  id: `oddeven-${index}`,
                                  event: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
                                  market: 'Odd/Even',
                                  pick: odd.label,
                                  odds: odd.value
                                })}
                              >
                                <div>{odd.label}</div>
                                <div className="text-lg font-bold">{odd.value}</div>
                              </button>
                            ))}
                          </div>
                        )}

                        {market.type === 'bounds' && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-4">
                                {Array.from({ length: (market.range?.max ?? 5) + 1 }, (_, i) => (
                                  <div key={i} className="text-center">
                                    <span className="text-sm text-gray-600">{i === (market.range?.max || 5) ? '5+' : i}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="relative mb-3">
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full w-2/5 ml-1/5"></div>
                              </div>
                              <div className="absolute -top-2 left-1/5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              <div className="absolute -top-2 right-2/5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="text-right">
                              <button
                                className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded font-bold"
                                onClick={() => addBet({
                                  id: `bounds-${marketIndex}`,
                                  event: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
                                  market: market.name,
                                  pick: `${market.range?.selected[0]}-${market.range?.selected[1]} Goals`,
                                  odds: typeof market.odds === 'string' ? market.odds : '1.00'
                                })}
                              >
                                {typeof market.odds === 'string' ? market.odds : '1.00'}
                              </button>
                            </div>
                          </div>
                        )}

                        {market.type === 'grid' && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {market.options?.map((option, index) => (
                              <button
                                key={index}
                                className="bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded font-medium"
                                onClick={() => addBet({
                                  id: `grid-${marketIndex}-${index}`,
                                  event: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
                                  market: market.name,
                                  pick: option.label,
                                  odds: option.value
                                })}
                              >
                                <div>{option.label}</div>
                                <div className="text-lg font-bold">{option.value}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'Stats' && (
        <div className="bg-white p-4">
    
          {matchData.sport === 'Football' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Statistics</h3>
              
              {/* Team Form */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Recent Form</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{matchData.homeTeam}:</span>
                    <span className="font-mono">{matchData.details?.form?.team1 || 'W-L-W-D-L'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{matchData.awayTeam}:</span>
                    <span className="font-mono">{matchData.details?.form?.team2 || 'D-W-W-L-D'}</span>
                  </div>
                </div>
              </div>

              {/* Season Stats */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Season Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{matchData.details?.stats?.team1?.goals || 12}</div>
                    <div className="text-sm text-gray-600">Goals Scored</div>
                    <div className="text-xs text-gray-500">{matchData.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{matchData.details?.stats?.team2?.goals || 15}</div>
                    <div className="text-sm text-gray-600">Goals Scored</div>
                    <div className="text-xs text-gray-500">{matchData.awayTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{((matchData.details)?.stats)?.team1?.conceded || 8}</div>
                    <div className="text-sm text-gray-600">Goals Conceded</div>
                    <div className="text-xs text-gray-500">{matchData.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{matchData.details?.stats?.team2?.conceded || 6}</div>
                    <div className="text-sm text-gray-600">Goals Conceded</div>
                    <div className="text-xs text-gray-500">{matchData.awayTeam}</div>
                  </div>
                </div>
              </div>

              {/* Head to Head */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Head to Head</h4>
                <p className="text-gray-700">{matchData.details?.headToHead || 'No recent meetings'}</p>
              </div>
            </div>
          )}

          {matchData.sport === 'Basketball' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Statistics</h3>
              
              {/* Season Averages */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Season Averages</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">{matchData.homeTeam} ({(matchData.details)?.stats?.team1?.record})</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Points:</span>
                        <span className="font-bold">{(matchData.details)?.stats?.team1?.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rebounds:</span>
                        <span className="font-bold">{(matchData.details)?.stats?.team1?.rebounds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assists:</span>
                        <span className="font-bold">{(matchData.details)?.stats?.team1?.assists}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">{matchData.awayTeam} ({(matchData.details)?.stats?.team2?.record})</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Points:</span>
                        <span className="font-bold">{(matchData.details)?.stats?.team2?.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rebounds:</span>
                        <span className="font-bold">{(matchData.details)?.stats?.team2?.rebounds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assists:</span>
                        <span className="font-bold">{(matchData.details)?.stats?.team2?.assists}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Players */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Key Players</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{(matchData.details)?.keyPlayers?.team1}</div>
                    <div className="text-sm text-gray-600">{matchData.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{(matchData.details)?.keyPlayers?.team2}</div>
                    <div className="text-sm text-gray-600">{matchData.awayTeam}</div>
                  </div>
                </div>
              </div>

              {/* Betting Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Betting Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Spread:</span>
                    <span className="font-bold">{(matchData.details)?.spread}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold">{(matchData.details)?.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {matchData.sport === 'Tennis' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Player Statistics</h3>
              
              {/* Rankings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">World Rankings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">#{(matchData.details)?.ranking?.team1}</div>
                    <div className="text-sm font-medium">{matchData.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">#{(matchData.details)?.ranking?.team2}</div>
                    <div className="text-sm font-medium">{matchData.awayTeam}</div>
                  </div>
                </div>
              </div>

              {/* Career Stats */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Career Statistics</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">{matchData.homeTeam}</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Titles:</span>
                        <span className="font-bold">{(matchData.details)?.titles?.team1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recent Form:</span>
                        <span className="font-mono">{(matchData.details)?.recentForm?.team1}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">{matchData.awayTeam}</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Titles:</span>
                        <span className="font-bold">{(matchData.details)?.titles?.team2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recent Form:</span>
                        <span className="font-mono">{(matchData.details)?.recentForm?.team2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Match Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Surface:</span>
                    <span className="font-bold">{(matchData.details)?.surface}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Head to Head:</span>
                    <span className="font-bold">{(matchData.details)?.headToHead}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {matchData.sport === 'eFootball' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Information</h3>
              
              {/* Team Ratings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Team Ratings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{(matchData.details)?.teamRating?.team1}</div>
                    <div className="text-sm text-gray-600">{matchData.homeTeam}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{(matchData.details)?.teamRating?.team2}</div>
                    <div className="text-sm text-gray-600">{matchData.awayTeam}</div>
                  </div>
                </div>
              </div>

              {/* Tournament Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Tournament Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="font-bold">{(matchData.details)?.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prize Pool:</span>
                    <span className="font-bold text-yellow-600">{(matchData.details)?.prize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-bold">{(matchData.details)?.bestOf}</span>
                  </div>
                </div>
              </div>

              {/* Recent Matches */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Recent Form</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{matchData.homeTeam}:</span>
                    <span className="font-mono">{(matchData.details)?.recentMatches?.team1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{matchData.awayTeam}:</span>
                    <span className="font-mono">{(matchData.details)?.recentMatches?.team2}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {matchData.sport === 'Table Tennis' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Player Information</h3>
              
              {/* World Rankings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">World Rankings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">#{(matchData.details)?.worldRanking?.team1}</div>
                    <div className="text-sm font-medium">{matchData.homeTeam}</div>
                    <div className="text-xs text-gray-500">{(matchData.details)?.playingStyle?.team1} Style</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">#{(matchData.details)?.worldRanking?.team2}</div>
                    <div className="text-sm font-medium">{matchData.awayTeam}</div>
                    <div className="text-xs text-gray-500">{(matchData.details)?.playingStyle?.team2} Style</div>
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Match Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-bold">{(matchData.details)?.bestOf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Head to Head:</span>
                    <span className="font-bold">{(matchData.details)?.headToHead}</span>
                  </div>
                </div>
              </div>

              {/* Recent Form */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Recent Form</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{matchData.homeTeam}:</span>
                    <span className="font-mono">{(matchData.details)?.recentForm?.team1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{matchData.awayTeam}:</span>
                    <span className="font-mono">{(matchData.details)?.recentForm?.team2}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Default fallback */}
          {!['Football', 'Basketball', 'Tennis', 'eFootball', 'Table Tennis'].includes(matchData.sport) && (
            <div className="text-center text-gray-500 py-8">
              <p>Statistics for {matchData.sport} will be available here</p>
            </div>
          )}

        </div>
      )}

      {activeTab === 'Comments' && (
        <div className="bg-white p-4">
          <div className="text-center text-gray-500 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No comments yet</p>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default MatchDetails;