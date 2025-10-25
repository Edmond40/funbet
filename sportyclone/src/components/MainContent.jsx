import { Printer, RotateCcw, ChevronDown, Lock, Settings2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FaPrint } from "react-icons/fa6";
import MiniGames from "./MiniGames";
import UnifiedBetslip from "./UnifiedBetslip";
import DesktopBetslip from "./DesktopBetslip";
import { useBets } from "@/hooks/useBets";

const MainContent = () => {
  const chipsRef = useRef(null);
  const grandWinnersRef = useRef(null);
  const navigate = useNavigate();
  const { addBet } = useBets();
  const [selectedCountry, setSelectedCountry] = useState("Russia");
  const [activeLiveSport, setActiveLiveSport] = useState("Football");
  // const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Sports section state variables
  const [activeSportsTab, setActiveSportsTab] = useState("Football");
  const [activeSectionTab, setActiveSectionTab] = useState("Highlights");
  const [activeOddsTab, setActiveOddsTab] = useState("1X2");
  const [showOddsFilter, setShowOddsFilter] = useState(false);
  const [expandedLeagues, setExpandedLeagues] = useState({});
  const matches = [
    {
      date: "15/09 Monday",
      time: "12:30",
      homeTeam: "Rodina Moscow",
      awayTeam: "FC Fakel Voronezh",
      odds: {
        home: "2.20",
        draw: "2.95",
        away: "3.60",
        over: "2.00",
        under: "1.77"
      },
      additionalOdds: "+174"
    },
    {
      date: "20/09 Saturday",
      time: "05:00",
      homeTeam: "FK Ural Yekaterinburg",
      awayTeam: "SK Rostov-Volgograd",
      odds: {
        home: "1.76",
        draw: "3.25",
        away: "4.90",
        over: "1.84",
        under: "1.90"
      },
      additionalOdds: "+167"
    },
    {
      date: "20/09 Saturday",
      time: "09:00",
      homeTeam: "FC Sokol Saratov",
      awayTeam: "Torpedo Moscow",
      odds: {
        home: "3.60",
        draw: "3.10",
        away: "2.10",
        over: "1.91",
        under: "1.83"
      },
      additionalOdds: "+168"
    }
  ];

  const liveSections = [
    {
      tournament: "Malaysia FA Cup",
      subheader: { threeWay: true, nextGoals: true },
      delta: "+2",
      matches: [
        {
          time: "Upcoming",
          period: "",
          home: "Penang FA",
          away: "Melaka FC",
          locked: false,
          odds: { one: "1.50", x: "3.00", two: "2.50", ng: { noGoal: "2.00", goal: "1.80", noGoal2: "" } }
        }
      ]
    },
    {
      tournament: "Turkiye Amateur U19 PAF Ligi",
      subheader: { threeWay: true, nextGoals: true },
      delta: "+48",
      matches: [
        {
          time: "45:00",
          period: "HT",
          home: "Caykur Rizespor",
          away: "Genclerbirligi Ankara",
          locked: false,
          odds: { one: "2.95", x: "2.35", two: "2.95", ng: { noGoal: "2.45", goal: "3.50", noGoal2: "2.35" } },
        },
      ],
    },
    {
      tournament: "Egypt Egypt Second Division B",
      subheader: { threeWay: true, nextGoals: true },
      delta: "+27",
      matches: [
        {
          time: "41:17",
          period: "H1",
          home: "Al Madina Al Monawara SC",
          away: "Lofu Center",
          locked: false,
          odds: { one: "1.11", x: "7.10", two: "17.00", ng: { noGoal: "1.50", goal: "2.10", noGoal2: "" } },
        },
        {
          time: "42:09",
          period: "H1",
          home: "Fayoum FC",
          away: "Cascada SC",
          locked: false,
          odds: { one: "7.25", x: "3.80", two: "1.43", ng: { noGoal: "4.70", goal: "2.35", noGoal2: "" } },
        },
      ],
    },
  ];

  const countries = [
    { name: "Russia", league: "1. Liga", active: true },
    { name: "Italy", league: "Serie A", active: false },
    { name: "Iceland", league: "Besta deild", active: false },
    { name: "Norway", league: "3rd Division G...", active: false },
    { name: "Sweden", league: "Allsvenskan", active: false }
  ];

  const grandWinners = [
    {
      id: 1,
      amount: "GH₵6,350.00",
      timeAgo: "7 min ago",
      category: "Sports Betting",
      userId: "5****97"
    },
    {
      id: 2,
      amount: "GH₵6,686.15",
      timeAgo: "13 min ago",
      category: "Sports Betting",
      userId: "24****03"
    },
    {
      id: 3,
      amount: "GH₵14,414.40",
      timeAgo: "13 min ago",
      category: "Sports Betting",
      userId: "24****03"
    },
    {
      id: 4,
      amount: "GH₵5,985.00",
      timeAgo: "1 min ago",
      category: "Sports Betting",
      userId: "5****25"
    },
    {
      id: 5,
      amount: "GH₵3,726.00",
      timeAgo: "1 min ago",
      category: "Sports Betting",
      userId: "63****16"
    },
    {
      id: 6,
      amount: "GH₵3,540.18",
      timeAgo: "2 min ago",
      category: "Sports Betting",
      userId: "54****35"
    },
    {
      id: 7,
      amount: "GH₵8,250.75",
      timeAgo: "5 min ago",
      category: "Sports Betting",
      userId: "12****89"
    },
    {
      id: 8,
      amount: "GH₵2,180.50",
      timeAgo: "8 min ago",
      category: "Sports Betting",
      userId: "78****42"
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
    // Filter matches based on selected country and navigate to sports page
    navigate('/sports', { state: { selectedCountry } });
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleLiveSportChange = (sport) => {
    setActiveLiveSport(sport);
    // Filter live matches based on selected sport
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   // Load matches for the selected page
  // };

  const handleViewAllHighlights = () => {
    navigate('/sports');
  };

  const handleViewAllLive = () => {
    navigate('/live-betting');
  };

  const handleSportNavigation = (sport) => {
    switch (sport.toLowerCase()) {
      case 'football':
        navigate('/sports');
        break;
      case 'basketball':
        navigate('/sports');
        break;
      case 'tennis':
        navigate('/sports');
        break;
      case 'mma':
        navigate('/mma');
        break;
      case 'virtuals':
        navigate('/virtuals');
        break;
      default:
        navigate('/sports');
    }
  };

  const handleGoalsDropdown = (matchId) => {
    // Show goals dropdown for specific match
    console.log(`Opening goals dropdown for match: ${matchId}`);
    // Navigate to detailed match page
    navigate(`/sports/match/${matchId.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const handleAdditionalOdds = (matchId) => {
    // Show additional odds for specific match
    console.log(`Opening additional odds for match: ${matchId}`);
    // Navigate to detailed match page with more odds
    navigate(`/sports/match/${matchId.replace(/\s+/g, '-').toLowerCase()}?tab=odds`);
  };

  const scrollGrandWinners = (direction) => {
    if (grandWinnersRef.current) {
      const scrollAmount = 120; // Height of one winner item
      const currentScroll = grandWinnersRef.current.scrollTop;
      const newScroll = direction === 'up'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      grandWinnersRef.current.scrollTo({
        top: newScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const autoScroll = () => {
      if (grandWinnersRef.current && !isCarouselPaused) {
        const container = grandWinnersRef.current;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const currentScroll = container.scrollTop;

        if (currentScroll >= maxScroll) {
          // Reset to top when reached bottom
          container.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Scroll down by one item
          container.scrollTo({
            top: currentScroll + 120,
            behavior: 'smooth'
          });
        }
      }
    };

    const interval = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // Sports section functions
  const toggleLeague = (leagueName) => {
    setExpandedLeagues(prev => ({
      ...prev,
      [leagueName]: !prev[leagueName]
    }));
  };

  const handleOddsClick = (matchId, oddType, oddValue, homeTeam, awayTeam) => {
    const bet = {
      id: `${matchId}-${oddType}`,
      event: `${homeTeam} vs ${awayTeam}`,
      market: oddType === '1' ? 'Home Win' : oddType === 'X' ? 'Draw' : 'Away Win',
      pick: oddType === '1' ? homeTeam : oddType === 'X' ? 'Draw' : awayTeam,
      odds: oddValue
    };

    addBet(bet);
    console.log(`Bet added: ${bet.pick} @ ${oddValue}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full px-10 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm">
          <div className="p-4 lg:p-6">
            <div>
              {/* Highlights Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-sporty-green rounded-full"></div>
                  <h1 className="text-3xl font-semibold">Highlights</h1>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 text-gray-600 hover:text-sporty-green transition-colors cursor-pointer"
                  >
                    <FaPrint className="w-4 h-4" />
                    Print
                  </button>

                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1 text-gray-600 hover:text-sporty-green transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Filter Section */}
              <div className="flex justify-end mb-6">
                <button className="flex items-center gap-1" onClick={handleFilterToggle}>
                  Filter
                  <Settings2 size={20} className="rotate-180" />
                </button>
              </div>

              {/* Filter Panel */}
              {showFilter && (
                <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Filter Options</h3>
                    <button
                      onClick={handleFilterToggle}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="date-range" className="block text-sm font-medium mb-2">Date Range</label>
                      <select id="date-range" className="w-full p-2 border rounded">
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This Week</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="market-type" className="block text-sm font-medium mb-2">Market Type</label>
                      <select id="market-type" className="w-full p-2 border rounded">
                        <option>All Markets</option>
                        <option>1X2</option>
                        <option>Over/Under</option>
                        <option>Both Teams to Score</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="odds-range" className="block text-sm font-medium mb-2">Odds Range</label>
                      <select id="odds-range" className="w-full p-2 border rounded">
                        <option>All Odds</option>
                        <option>1.00 - 2.00</option>
                        <option>2.00 - 5.00</option>
                        <option>5.00+</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-sporty-green text-white">Apply Filters</Button>
                    <Button size="sm" variant="outline">Clear All</Button>
                  </div>
                </div>
              )}

              {/* Country/League Chips Carousel with Arrows */}
              <div className="relative mb-6">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={() => chipsRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                    className="w-8 h-8 rounded-full bg-white border shadow hover:bg-gray-50"
                  >
                    ‹
                  </button>
                </div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={() => chipsRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                    className="w-8 h-8 rounded-full bg-white border shadow hover:bg-gray-50"
                  >
                    ›
                  </button>
                </div>
                <div ref={chipsRef} className="flex gap-2 overflow-x-auto px-2">
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      onClick={() => handleCountrySelect(country.name)}
                      className={`w-full px-4 py-2 bg-gray-200 rounded border-2 text-center cursor-pointer transition-colors ${selectedCountry === country.name
                        ? "bg-white text-sporty-green border-sporty-green"
                        : "bg-white text-gray-700 border-gray-300 hover:border-sporty-green"
                        }`}
                    >
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-xs">{country.league}</div>
                      {selectedCountry === country.name && (
                        <div className="mt-1 h-0.5 w-10 mx-auto bg-sporty-green rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights Grid */}
              <div className="bg-white border border-gray-200 overflow-hidden">
                {/* Table Header - Desktop Only */}
                <div className="hidden lg:block bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="grid grid-cols-12 items-center gap-2 text-xs text-gray-600 font-medium">
                    <div className="col-span-5">
                      {matches[0].date}
                    </div>
                    <div className="col-span-7 grid grid-cols-7 gap-1 text-center">
                      <div>1</div>
                      <div>X</div>
                      <div>2</div>
                      <div>Goals</div>
                      <div>Over</div>
                      <div>Under</div>
                      <div></div>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {matches.map((match, index) => (
                    <div key={index} className="hover:bg-gray-50 transition-colors">
                      {/* Desktop Layout */}
                      <div className="hidden lg:grid grid-cols-12 items-center gap-2 px-4 py-3">
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded min-w-[40px] text-center">
                            {match.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div>
                              <div className="font-medium text-sm text-gray-900 leading-tight">{match.homeTeam}</div>
                              <div className="font-medium text-sm text-gray-900 leading-tight">{match.awayTeam}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-7 grid grid-cols-7 gap-2">
                          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-3 py-2 rounded transition-colors" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '1', odds: match.odds.home })}>{match.odds.home}</button>
                          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-3 py-2 rounded transition-colors" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: 'X', odds: match.odds.draw })}>{match.odds.draw}</button>
                          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-3 py-2 rounded transition-colors" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '2', odds: match.odds.away })}>{match.odds.away}</button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-sporty-green font-semibold text-sm px-3 py-2 rounded border border-sporty-green transition-colors flex items-center justify-center gap-1" onClick={() => handleGoalsDropdown(`${match.homeTeam}-${match.awayTeam}`)}>
                            3.5 <ChevronDown className="w-3 h-3" />
                          </button>
                          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-3 py-2 rounded transition-colors" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'O/U', pick: 'Over', odds: match.odds.over })}>{match.odds.over}</button>
                          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-3 py-2 rounded transition-colors" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'O/U', pick: 'Under', odds: match.odds.under })}>{match.odds.under}</button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-3 py-2 rounded transition-colors" onClick={() => handleAdditionalOdds(`${match.homeTeam}-${match.awayTeam}`)}>{match.additionalOdds}</button>
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="lg:hidden p-4 bg-white">
                        <div className="flex flex-col space-y-3">
                          {/* Match Info */}
                          <div className="flex items-center gap-3">
                            <div className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded min-w-[40px] text-center">
                              {match.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div>
                                <div className="font-medium text-sm text-gray-900 leading-tight">{match.homeTeam}</div>
                                <div className="font-medium text-sm text-gray-900 leading-tight">{match.awayTeam}</div>
                              </div>
                            </div>
                          </div>

                          {/* Mobile Betting Grid */}
                          <div className="space-y-3">
                            <div className="text-xs text-gray-500 font-medium">1X2 Betting</div>
                            <div className="grid grid-cols-3 gap-2">
                              <button className="bg-sporty-green hover:bg-green-600 text-white font-semibold text-sm px-3 py-3 rounded transition-colors flex flex-col items-center gap-1" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '1', odds: match.odds.home })}>
                                <span>1</span>
                                <span className="font-bold">{match.odds.home}</span>
                              </button>
                              <button className="bg-sporty-green hover:bg-green-600 text-white font-semibold text-sm px-3 py-3 rounded transition-colors flex flex-col items-center gap-1" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: 'X', odds: match.odds.draw })}>
                                <span>X</span>
                                <span className="font-bold">{match.odds.draw}</span>
                              </button>
                              <button className="bg-sporty-green hover:bg-green-600 text-white font-semibold text-sm px-3 py-3 rounded transition-colors flex flex-col items-center gap-1" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '2', odds: match.odds.away })}>
                                <span>2</span>
                                <span className="font-bold">{match.odds.away}</span>
                              </button>
                            </div>

                            <div className="text-xs text-gray-500 font-medium">Over/Under</div>
                            <div className="grid grid-cols-3 gap-2">
                              <button className="bg-sporty-green hover:bg-green-600 text-white font-semibold text-sm px-3 py-3 rounded transition-colors flex flex-col items-center gap-1" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'O/U', pick: 'Over', odds: match.odds.over })}>
                                <span>Over</span>
                                <span className="font-bold">{match.odds.over}</span>
                              </button>
                              <button className="bg-sporty-green hover:bg-green-600 text-white font-semibold text-sm px-3 py-3 rounded transition-colors flex flex-col items-center gap-1" onClick={() => addBet({ id: `${match.homeTeam}-${match.awayTeam}-${match.time}`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'O/U', pick: 'Under', odds: match.odds.under })}>
                                <span>Under</span>
                                <span className="font-bold">{match.odds.under}</span>
                              </button>
                              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-3 py-3 rounded transition-colors flex flex-col items-center gap-1" onClick={() => handleAdditionalOdds(`${match.homeTeam}-${match.awayTeam}`)}>
                                <span>More</span>
                                <span className="font-bold">{match.additionalOdds}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* View All Highlights */}
                <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
                  <button onClick={handleViewAllHighlights} className="inline-flex items-center gap-2 text-sporty-green hover:text-green-600 font-medium transition-colors">
                    View All
                    <span>››</span>
                  </button>
                </div>
              </div>

              {/* Live Betting Board */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-semibold text-gray-900">Live Betting</h2>
                  <Badge className="bg-green-600 text-white text-xs px-2 py-1">LIVE</Badge>
                </div>
                <div className="bg-gray-900  overflow-hidden">
                  <div className="bg-gray-800 text-white p-3 text-sm flex items-center gap-4 overflow-x-auto border-b border-gray-700">
                    <button
                      onClick={() => {
                        handleLiveSportChange('Football');
                        handleSportNavigation('Football');
                      }}
                      className={`font-medium pb-2 px-1 transition-colors ${activeLiveSport === 'Football' ? 'text-white border-b-2 border-sporty-green' : 'text-gray-300 hover:text-white'}`}
                    >
                      Football
                    </button>
                    <button
                      onClick={() => {
                        handleLiveSportChange('vFootball');
                        handleSportNavigation('Virtuals');
                      }}
                      className={`font-medium pb-2 px-1 transition-colors ${activeLiveSport === 'vFootball' ? 'text-white border-b-2 border-sporty-green' : 'text-gray-300 hover:text-white'}`}
                    >
                      vFootball
                    </button>
                    <button
                      onClick={() => {
                        handleLiveSportChange('Basketball');
                        handleSportNavigation('Basketball');
                      }}
                      className={`font-medium pb-2 px-1 transition-colors ${activeLiveSport === 'Basketball' ? 'text-white border-b-2 border-sporty-green' : 'text-gray-300 hover:text-white'}`}
                    >
                      Basketball
                    </button>
                    <button
                      onClick={() => {
                        handleLiveSportChange('Tennis');
                        handleSportNavigation('Tennis');
                      }}
                      className={`font-medium pb-2 px-1 transition-colors ${activeLiveSport === 'Tennis' ? 'text-white border-b-2 border-sporty-green' : 'text-gray-300 hover:text-white'}`}
                    >
                      Tennis
                    </button>
                    <button
                      onClick={() => {
                        handleLiveSportChange('eFootball');
                        handleSportNavigation('Football');
                      }}
                      className={`font-medium pb-2 px-1 transition-colors ${activeLiveSport === 'eFootball' ? 'text-white border-b-2 border-sporty-green' : 'text-gray-300 hover:text-white'}`}
                    >
                      eFootball
                    </button>
                    <button
                      onClick={() => {
                        handleLiveSportChange('More Sports');
                        navigate('/sports');
                      }}
                      className={`font-medium pb-2 px-1 transition-colors ${activeLiveSport === 'More Sports' ? 'text-white border-b-2 border-sporty-green' : 'text-gray-300 hover:text-white'} flex items-center gap-1`}
                    >
                      More Sports <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="ml-auto flex items-center gap-4 text-xs">
                      <button onClick={handlePrint} className="flex items-center gap-1 hover:text-sporty-green transition-colors"><Printer className="w-4 h-4" /> Print</button>
                      <button onClick={handleRefresh} className="flex items-center gap-1 hover:text-sporty-green transition-colors"><RotateCcw className="w-4 h-4" /> Refresh</button>
                    </div>
                  </div>
                  <div className="bg-gray-900 text-white">
                    <div className="space-y-4">
                      {liveSections.map((sec, si) => (
                        <div key={si} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                          {/* Tournament Header */}
                          <div className="flex items-center justify-between px-4 py-3 bg-gray-700 border-b border-gray-600">
                            <div className="font-semibold text-white text-sm">{sec.tournament}</div>
                            <div className="text-sporty-green text-sm font-medium">{sec.delta}</div>
                          </div>
                          {/* Subheader */}
                          <div className="bg-gray-750 border-b border-gray-600">
                            <div className="grid grid-cols-12 items-center px-4 py-2 text-xs text-gray-300">
                              <div className="col-span-4"></div>
                              <div className="col-span-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-6 h-px bg-gray-500" />
                                  <span className="font-medium text-white">3 Way</span>
                                  <div className="w-6 h-px bg-gray-500" />
                                </div>
                                <div className="grid grid-cols-3 gap-1 mt-1 text-center">
                                  <span>1</span>
                                  <span>X</span>
                                  <span>2</span>
                                </div>
                              </div>
                              <div className="col-span-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-6 h-px bg-gray-500" />
                                  <span className="font-medium text-white">Over/Under</span>
                                  <div className="w-6 h-px bg-gray-500" />
                                </div>
                                <div className="grid grid-cols-3 gap-1 mt-1 text-center">
                                  <span>Goals</span>
                                  <span>Over</span>
                                  <span>Under</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Matches */}
                          <div className="divide-y divide-gray-600">
                            {sec.matches.map((m, mi) => (
                              <div key={mi} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-750 transition-colors">
                                {/* Match Info - 4 columns */}
                                <div className="col-span-4 flex items-center gap-3">
                                  <div className="flex flex-col items-center">
                                    <span className={`text-xs px-2 py-1 rounded font-medium ${m.time === 'Upcoming' ? 'bg-gray-600 text-gray-300' : 'bg-green-800 text-green-300'}`}>
                                      {m.time === 'Upcoming' ? 'Upcoming' : m.time}
                                    </span>
                                    {m.period && <span className="text-xs text-gray-400 mt-1">{m.period}</span>}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                      <div className="text-sm font-medium text-white">{m.home}</div>
                                      <div className="text-sm font-medium text-white">{m.away}</div>
                                    </div>
                                    <div className="flex flex-col text-xs text-gray-400">
                                      <span>0</span>
                                      <span>0</span>
                                    </div>
                                  </div>
                                </div>

                                {/* 3 Way Betting - 4 columns */}
                                <div className="col-span-4 grid grid-cols-3 gap-2">
                                  {m.locked ? (
                                    <>
                                      <button aria-label="Betting locked" className="bg-gray-600 border border-gray-500 text-gray-400 px-3 py-2 rounded text-sm font-medium cursor-not-allowed"><Lock className="w-3 h-3" /></button>
                                      <button aria-label="Betting locked" className="bg-gray-600 border border-gray-500 text-gray-400 px-3 py-2 rounded text-sm font-medium cursor-not-allowed"><Lock className="w-3 h-3" /></button>
                                      <button aria-label="Betting locked" className="bg-gray-600 border border-gray-500 text-gray-400 px-3 py-2 rounded text-sm font-medium cursor-not-allowed"><Lock className="w-3 h-3" /></button>
                                    </>
                                  ) : (
                                    <>
                                      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors" onClick={() => addBet({ id: `${m.home}-${m.away}-${m.time}`, event: `${m.home} vs ${m.away}`, market: '1X2', pick: '1', odds: (m).odds?.one || '0.00' })}>{(m).odds?.one || '0.00'}</button>
                                      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors" onClick={() => addBet({ id: `${m.home}-${m.away}-${m.time}`, event: `${m.home} vs ${m.away}`, market: '1X2', pick: 'X', odds: (m).odds?.x || '0.00' })}>{(m).odds?.x || '0.00'}</button>
                                      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors" onClick={() => addBet({ id: `${m.home}-${m.away}-${m.time}`, event: `${m.home} vs ${m.away}`, market: '1X2', pick: '2', odds: (m).odds?.two || '0.00' })}>{(m).odds?.two || '0.00'}</button>
                                    </>
                                  )}
                                </div>

                                {/* Over/Under Betting - 4 columns */}
                                <div className="col-span-4 grid grid-cols-3 gap-2">
                                  {m.locked ? (
                                    <>
                                      <button aria-label="Betting locked" className="bg-gray-600 border border-gray-500 text-gray-400 px-3 py-2 rounded text-sm font-medium cursor-not-allowed"><Lock className="w-3 h-3" /></button>
                                      <button aria-label="Betting locked" className="bg-gray-600 border border-gray-500 text-gray-400 px-3 py-2 rounded text-sm font-medium cursor-not-allowed"><Lock className="w-3 h-3" /></button>
                                      <button aria-label="Betting locked" className="bg-gray-600 border border-gray-500 text-gray-400 px-3 py-2 rounded text-sm font-medium cursor-not-allowed"><Lock className="w-3 h-3" /></button>
                                    </>
                                  ) : (
                                    <>
                                      <button className="bg-gray-100 hover:bg-gray-200 text-sporty-green px-3 py-2 rounded text-sm font-semibold border border-sporty-green transition-colors flex items-center justify-center gap-1">
                                        2.5 <ChevronDown className="w-3 h-3" />
                                      </button>
                                      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors" onClick={() => addBet({ id: `${m.home}-${m.away}-${m.time}`, event: `${m.home} vs ${m.away}`, market: 'O/U', pick: 'Over', odds: '1.75' })}>1.75</button>
                                      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors" onClick={() => addBet({ id: `${m.home}-${m.away}-${m.time}`, event: `${m.home} vs ${m.away}`, market: 'O/U', pick: 'Under', odds: '2.14' })}>2.14</button>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Footer Row */}
                  <div className="bg-gray-800 text-white p-3 border-t border-gray-700">
                    <button onClick={handleViewAllLive} className="w-full text-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center gap-2 transition-colors">
                      <span className="font-medium">View All</span>
                      <span className="text-sporty-green">››</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Sports Section */}
              <div className="bg-white mt-4 rounded-lg shadow-sm">
                {/* Sports Navigation */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-2 overflow-x-auto">
                    <div className="flex items-center space-x-2">
                      <h1 className="text-xl font-bold text-gray-600">Sports</h1>
                      <hr className="w-5 h-0.5 rotate-90" />
                    </div>
                    <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
                      {["Football", "vFootball", "Basketball", "Tennis", "Handball", "Hockey"].map((sport) => (
                        <button
                          key={sport}
                          onClick={() => {
                            setActiveSportsTab(sport);
                            console.log(`Switched to ${sport}`);
                          }}
                          className={`text-sm transition-colors ${activeSportsTab === sport
                            ? "text-green-600 font-medium border-b-2 border-green-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                          {sport}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowOddsFilter(!showOddsFilter)}
                    title="Filter options"
                  >
                    <Settings2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Section Tabs */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200">
                  {["Highlights", "Today", "Countries"].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSectionTab(section)}
                      className={`text-sm mr-8 pb-1 ${activeSectionTab === section
                        ? "text-green-600 font-medium border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>

                {/* Odds Format Tabs */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  {["1X2", "O/U", "DC", "1st Half O/U"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setActiveOddsTab(format)}
                      className={`text-sm pb-1 ${activeOddsTab === format
                        ? "text-green-600 font-medium border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>

                {/* Date Header */}
                <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">04/10 Saturday</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm">1</span>
                      <span className="text-gray-400 text-sm">X</span>
                      <span className="text-gray-400 text-sm">2</span>
                    </div>
                  </div>
                </div>

                {/* Match Listings */}
                <div className="divide-y divide-gray-200">
                  {/* Match 1 - Inter vs US Cremonese */}
                  <div className="py-5">
                    <div className="flex items-center justify-between mb-2 overflow-hidden relative">
                      <div className="flex items-center justify-between mb-2 ">
                        <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                          <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                          <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs">
                        <span>16:00</span>
                        <span>ID 28111</span>
                        <span>Italy - Serie A</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4">
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">Inter</div>
                        <div className="text-gray-800 text-sm">US Cremonese</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-red-500 text-xs">+1070</span>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🔥</span>
                          </div>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📊</span>
                          </div>
                          <span className="text-gray-400 text-xs ml-auto">Comments 1</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("inter-cremonese", "1", "1.20", "Inter", "US Cremonese")}
                        >
                          1.20
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("inter-cremonese", "X", "7.70", "Inter", "US Cremonese")}
                        >
                          7.70
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("inter-cremonese", "2", "16.87", "Inter", "US Cremonese")}
                        >
                          16.87
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Match 2 - Chelsea vs Liverpool */}
                  <div className="py-5">
                    <div className="flex items-center justify-between mb-2 overflow-hidden relative">
                      <div className="flex items-center justify-between mb-2 ">
                        <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                          <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                          <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs">
                        <span>16:30</span>
                        <span>ID 30072</span>
                        <span>England - Premier</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4">
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">Chelsea</div>
                        <div className="text-gray-800 text-sm">Liverpool</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-red-500 text-xs">+1315</span>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📊</span>
                          </div>
                          <span className="text-gray-400 text-xs ml-auto">Comments 5</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("chelsea-liverpool", "1", "2.93", "Chelsea", "Liverpool")}
                        >
                          2.93
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("chelsea-liverpool", "X", "3.83", "Chelsea", "Liverpool")}
                        >
                          3.83
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("chelsea-liverpool", "2", "2.40", "Chelsea", "Liverpool")}
                        >
                          2.40
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Match 3 - Athletic Bilbao vs Mallorca */}
                  <div className="py-3">
                    <div className="flex items-center justify-between mb-2 overflow-hidden relative">
                      <div className="flex items-center justify-between mb-2 ">
                        <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                          <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                          <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs">
                        <span>16:30</span>
                        <span>ID 45639</span>
                        <span>Spain - LaLiga</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4">
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">Athletic Bilbao</div>
                        <div className="text-gray-800 text-sm">Mallorca</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-red-500 text-xs">+1152</span>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🔥</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("bilbao-mallorca", "1", "1.65", "Athletic Bilbao", "Mallorca")}
                        >
                          1.65
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("bilbao-mallorca", "X", "3.86", "Athletic Bilbao", "Mallorca")}
                        >
                          3.86
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("bilbao-mallorca", "2", "6.44", "Athletic Bilbao", "Mallorca")}
                        >
                          6.44
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* League Dropdown Sections */}
                  <div className="divide-y divide-gray-200">
                    {/* England - Premier League */}
                    <div className="px-4 py-3">
                      <button
                        onClick={() => toggleLeague("England - Premier League")}
                        className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <ChevronRight
                            className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["England - Premier League"] ? "rotate-90" : ""
                              }`}
                          />
                          <span className="text-gray-800 text-sm font-medium">England - Premier League</span>
                        </div>
                        <span className="text-gray-400 text-sm">23</span>
                      </button>

                      {expandedLeagues["England - Premier League"] && (
                        <div className="mt-3 ml-2 space-y-3">
                          {/* Sample match in Premier League */}
                          <div className="border-l-2 border-green-500 ">
                            <div className="flex items-center justify-between mb-2 overflow-hidden relative">
                              <div className="flex items-center justify-between mb-2 ">
                                <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                                  <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                                  <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-400 text-xs">
                                <span>17:30</span>
                                <span>ID 30145</span>
                                <span>England - Premier</span>
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between px-4">
                              <div className="flex-1">
                                <div className="text-gray-800 text-sm font-medium">Manchester United</div>
                                <div className="text-gray-800 text-sm">Arsenal</div>
                                <div className="flex items-center space-x-1 mt-1">
                                  <span className="text-red-500 text-xs">+1450</span>
                                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">🔥</span>
                                  </div>
                                  <span className="text-gray-400 text-xs ml-auto">Comments 12</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                                  onClick={() => handleOddsClick("united-arsenal", "1", "2.15", "Manchester United", "Arsenal")}
                                >
                                  2.15
                                </button>
                                <button
                                  className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                                  onClick={() => handleOddsClick("united-arsenal", "X", "3.40", "Manchester United", "Arsenal")}
                                >
                                  3.40
                                </button>
                                <button
                                  className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                                  onClick={() => handleOddsClick("united-arsenal", "2", "3.25", "Manchester United", "Arsenal")}
                                >
                                  3.25
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* View More Button */}
                    <div className="px-4 py-4 text-center border-t border-gray-200">
                      <Link to="/virtuals" className="text-green-600 text-sm font-medium hover:text-green-700">
                        View More ›
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <DesktopBetslip />
        <UnifiedBetslip />
        <MiniGames />
        {/* Grand Winners Section */}
        <div className="w-full lg:w-80 bg-white rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Grand Prize Winners</h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => scrollGrandWinners('up')}
                  className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                >
                  ↑
                </button>
                <button
                  onClick={() => scrollGrandWinners('down')}
                  className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                >
                  ↓
                </button>
              </div>
            </div>

            <div
              ref={grandWinnersRef}
              className="h-64 lg:h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div className="space-y-3">
                {grandWinners.map((winner) => (
                  <div
                    key={winner.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-bold text-sporty-green">
                          {winner.amount}
                        </span>
                        <span className="text-xs text-gray-500">
                          {winner.timeAgo}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {winner.category}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {winner.userId}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;