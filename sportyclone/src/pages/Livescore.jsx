import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Star, ChevronDown, Filter, Calendar, Settings, Menu, SlidersVertical, Trophy } from "lucide-react";
import Logo from '../assets/logo-sportybet.webp'
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import { Link } from "react-router-dom";

import { FaBacon, FaBaseball, FaBasketball, FaFutbol } from "react-icons/fa6";

const Livescore = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeSport, setActiveSport] = useState('soccer');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTournamentDropdown, setShowTournamentDropdown] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState('Premier League');
  const [expandedLeagues, setExpandedLeagues] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [openFilter, setOpenFilter] = useState(false)
  const [allSport, setAllSport] = useState(false);
  const [showBetslip, setShowBetslip] = useState(false);

  const tournamentDropdownRef = useRef(null);

  // Sports navigation data
  const sports = [
    { id: 'favorites', name: 'Favorites', icon: <Star size={20} /> },
    { id: 'soccer', name: 'Soccer', icon: <FaFutbol size={20} /> },
    { id: 'tennis', name: 'Tennis', icon: <FaBaseball size={20} /> },
    { id: 'basketball', name: 'Basketball', icon: <FaBasketball size={20} /> }
  ];

  // Tournaments data
  const tournaments = ['Select Tournament', 'Premier League', 'LaLiga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europa League', 'Eredivisie', 'Primeira Liga', 'MLS', 'Süper Lig', 'Jupiler Pro League'];

  const tournamentts = ['Premier League', 'LaLiga', 'Serie A', 'Bundesliga', 'Ligue 1']

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tournamentDropdownRef.current && !tournamentDropdownRef.current.contains(event.target)) {
        setShowTournamentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample data matching the SportyBet interface
  const matches= useMemo(() => [
    {
      id: 1,
      league: 'Argentina | Primera LFP, Clausura',
      homeTeam: 'Velez Sarsfield',
      awayTeam: 'Tucuman',
      homeScore: '',
      awayScore: '',
      time: 'Postponed',
      status: 'POSTPONED',
      odds: { home: '1.85', draw: '3.20', away: '4.50' },
      isFavorite,
      ft: '-',
      ht: '-'
    },
    {
      id: 2,
      league: 'Argentina | Copa Argentina',
      homeTeam: 'Boca Juniors',
      awayTeam: 'River Plate',
      homeScore: '2',
      awayScore: '1',
      time: '87\'',
      status: 'LIVE',
      odds: { home: '2.10', draw: '3.40', away: '3.20' },
      isFavorite,
      ft: '-',
      ht: '1-0'
    }
  ], []);

  // Initialize expanded leagues on component mount
  useEffect(() => {
    const initialExpandedLeagues = {};
    const uniqueLeagues = [...new Set(matches.map(match => match.league))];
    uniqueLeagues.forEach(league => {
      initialExpandedLeagues[league] = true;
    });
    // Also initialize mobile league
    initialExpandedLeagues['Ligue 1 Algeria'] = true;
    setExpandedLeagues(initialExpandedLeagues);
  }, [matches]);

  // Filter matches based on active tab, sport, and search query
  const filteredMatches = matches.filter(match => {
    // Filter by active tab
    let statusMatch = true;
    if (activeTab === 'LIVE') {
      statusMatch = match.status === '1ST_HALF' || match.status === '2ND_HALF';
    } else if (activeTab === 'UPCOMING') {
      statusMatch = match.status === 'UPCOMING';
    } else if (activeTab === 'FINISHED') {
      statusMatch = match.status === 'FINISHED';
    }

    // Filter by selected sport
    const sportMatch = activeSport === 'all' ||
      (activeSport === 'soccer' && match.league.includes('Soccer')) ||
      (activeSport === 'tennis' && match.league.includes('Tennis')) ||
      (activeSport === 'basketball' && match.league.includes('Basketball')) ||
      (activeSport === 'favorites' && favorites.includes(match.id));

    // Filter by selected tournament
    const tournamentMatch = selectedTournament === 'All Tournaments' ||
      match.league.includes(selectedTournament);

    // Filter by selected tab
    const filterMatch = activeTab === 'All' ||
      (activeTab === 'Live' && match.status === 'LIVE');

    return statusMatch && sportMatch && tournamentMatch && filterMatch;
  });

  // Group filtered matches by league
  const filteredMatchesByLeague = filteredMatches.reduce((acc, match) => {
    if (!acc[match.league]) acc[match.league] = [];
    acc[match.league].push(match);
    return acc;
  }, {});

  const leagues = Object.keys(filteredMatchesByLeague);

  // Toggle league expansion
  const toggleLeague = (league) => {
    setExpandedLeagues(prev => ({
      ...prev,
      [league]: !prev[league]
    }));
  };

  // Toggle favorite status for a match
  const toggleFavorite = (matchId) => {
    setFavorites(prev =>
      prev.includes(matchId)
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  // Navigate to previous/next day
  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden bg-gray-900 text-white min-h-screen">
        {/* Mobile Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img src={Logo} alt="SportyBet" className="w-28 h-16" />
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Sports Navigation */}
        <div className="bg-red-600 px-4 pb-3">
          <div className="flex space-x-6 overflow-x-auto no-scrollbar">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setActiveSport(sport.id)}
                className={`flex flex-col items-center space-y-1 min-w-[70px] ${
                  activeSport === sport.id ? 'text-white' : 'text-red-200'
                }`}
              >
                <div className="text-lg">{sport.icon}</div>
                <span className="text-xs font-medium">{sport.name}</span>
                {activeSport === sport.id && (
                  <div className="w-full h-0.5 bg-white rounded mt-1"></div>
                )}
              </button>
            ))}
            <button title="View all sports" aria-label="View all sports" className="flex flex-col items-center space-y-1 min-w-[70px] text-red-200">
              <Menu className="w-5 h-5" />
              <span className="text-xs font-medium">All sports</span>
            </button>
          </div>
        </div>

        {/* Tournament Selection */}
        <div className="bg-gray-800 px-4 py-3 relative" ref={tournamentDropdownRef}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <FaFutbol className="w-4 h-4 text-white" />
              </div>
              <button
                className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded"
                onClick={() => setShowTournamentDropdown(!showTournamentDropdown)}
                aria-expanded={showTournamentDropdown}
                aria-haspopup="true"
              >
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm">{selectedTournament}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-white transition-transform ${showTournamentDropdown ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          </div>

          {/* Mobile Tournament Dropdown */}
          {showTournamentDropdown && (
            <div className="absolute left-4 right-4 top-full mt-2 bg-gray-800 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="py-1">
                {tournaments.map((tournament) => (
                  <button
                    key={tournament}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedTournament === tournament
                        ? 'bg-gray-100 text-green-600'
                        : 'text-gray-100 hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedTournament(tournament);
                      setShowTournamentDropdown(false);
                    }}
                  >
                    {tournament}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Navigation */}
        <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigateDate(-1)} aria-label="Previous day" title="Previous day">
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-medium">Today</span>
              </div>
              <button onClick={() => navigateDate(1)} aria-label="Next day" title="Next day">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-700 rounded">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`px-3 py-1 text-sm rounded ${
                    activeTab === 'All' ? 'bg-red-600 text-white' : 'text-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('Live')}
                  className={`px-3 py-1 text-sm rounded ${
                    activeTab === 'Live' ? 'bg-red-600 text-white' : 'text-gray-300'
                  }`}
                >
                  Live
                </button>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-gray-600" 
                onClick={() => setOpenFilter(prev => !prev)}
                title="Settings" 
                aria-label="Settings"
              >
                <SlidersVertical className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Section */}
        {openFilter && (
          <div className="bg-gray-700 mx-4 rounded-lg overflow-hidden">
            {/* Filter Search Bar */}
            <div className="p-4">
              <div className="flex items-center space-x-2 text-sm text-zinc-400 bg-gray-600 p-3 rounded">
                <Filter size={18} className="text-gray-200" />
                <span>Filter Country, Teams, Leagues, Players</span>
              </div>
            </div>

            {/* OTHER FILTERS Section */}
            <div className="px-4 pb-4">
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-100 uppercase tracking-wide mb-2">OTHER FILTERS</h3>
                <div className="flex flex-wrap gap-2 text-zinc-300">
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    Just Started
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    About to end
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    Finished
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    +1 hr
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    +2.5 hr
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    +6 hr
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    +12 hr
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    +1 goal
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    +2.5 goal
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    First half
                  </button>
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full hover:bg-gray-600">
                    Second half
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-100 uppercase tracking-wide mb-2">SORT BY</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-500 text-xs font-medium rounded-full text-zinc-300 hover:bg-gray-600">
                    Time
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matches Section */}
        <div className="px-4 py-3">
          <h3 className="text-white font-medium mb-3">Matches</h3>
          
          {/* Ligue 1 Algeria */}
          <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
            <div 
              className="bg-green-600 px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-green-700 transition-colors"
              onClick={() => toggleLeague('Ligue 1 Algeria')}
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs font-bold">1</span>
                </div>
                <span className="text-white font-medium text-sm">Ligue 1</span>
                <span className="text-white text-sm">Algeria</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${
                  expandedLeagues['Ligue 1 Algeria'] ? 'rotate-180' : ''
                }`} />
              </div>
            </div>

            {/* Match Cards */}
            {expandedLeagues['Ligue 1 Algeria'] && (
            <div className="divide-y divide-gray-700">
              {/* Match 1 */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">02:00 PM</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-400">FT</span>
                    <span className="text-xs text-gray-400">HT</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">El Bayadh</span>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">Aknoun</span>
                      <span className="text-gray-400">-</span>
                    </div>
                  </div>
                  <button 
                    className="ml-4 p-2 hover:bg-gray-700 rounded"
                    onClick={() => {
                      // Match 1 options menu
                      console.log('Match 1 options clicked');
                    }}
                    title="Match options"
                  >
                    <Menu className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Match 2 */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">02:00 PM</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-400">FT</span>
                    <span className="text-xs text-gray-400">HT</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">Khenchela</span>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">MC Oran</span>
                      <span className="text-gray-400">-</span>
                    </div>
                  </div>
                  <button 
                    className="ml-4 p-2 hover:bg-gray-700 rounded"
                    onClick={() => {
                      // Match 2 options menu
                      console.log('Match 2 options clicked');
                    }}
                    title="Match options"
                  >
                    <Menu className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Match 3 */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">03:00 PM</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-400">FT</span>
                    <span className="text-xs text-gray-400">HT</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">Setif</span>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">Chlef</span>
                      <span className="text-gray-400">-</span>
                    </div>
                  </div>
                  <button 
                    className="ml-4 p-2 hover:bg-gray-700 rounded"
                    onClick={() => {
                      // Match 3 options menu
                      console.log('Match 3 options clicked');
                    }}
                    title="Match options"
                  >
                    <Menu className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Match 4 - Live */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">04:00 PM</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-400">FT</span>
                    <span className="text-xs text-gray-400">HT</span>
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">Saoura</span>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">Olympique Akbou</span>
                      <span className="text-gray-400">-</span>
                    </div>
                  </div>
                  <button 
                    className="ml-4 p-2 hover:bg-gray-700 rounded"
                    onClick={() => {
                      // Match 4 options menu
                      console.log('Match 4 options clicked');
                    }}
                    title="Match options"
                  >
                    <Menu className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation 
          onOpenBetslip={() => setShowBetslip(true)}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-gray-50 pb-16 lg:pb-0">
      {/* Sports Navigation - Red Background like SportyBet */}
      <div className="bg-red-600 text-white flex flex-col justify-between px-3 md:px-10">
        <div className="flex justify-between items-center py-2">
          <Link to="/">
            <img src={Logo} alt="SportyBet" className="w-28 h-16 md:w-38 md:h-20" />
          </Link>
          <button 
            onClick={() => setOpenFilter(!openFilter)}
            className="md:hidden p-2 hover:bg-red-700 rounded"
            aria-label="Toggle menu"
          >
            <Menu className="text-zinc-300" size={20} />
          </button>
          <Settings className="hidden md:block text-zinc-300" />
        </div>

        {/* Mobile Sports Menu */}
        <div className={`md:hidden ${openFilter ? 'block' : 'hidden'} pb-4`}>
          <div className="grid grid-cols-2 gap-2">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => {
                  setActiveSport(sport.id);
                  setOpenFilter(false);
                }}
                className={`flex items-center justify-center p-3 rounded-md ${activeSport === sport.id ? 'bg-red-700 text-white font-bold' : 'text-zinc-300 hover:bg-red-700'
                  }`}
              >
                <span className="mr-2">{sport.icon}</span>
                <span className="text-sm">{sport.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Sports Navigation */}
        <div className="hidden md:flex justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setActiveSport(sport.id)}
                className={`flex flex-col gap-2 items-center justify-center mr-5 rounded-md min-w-[100px] ${activeSport === sport.id ? ' text-white-600 font-bold' : 'text-zinc-300 hover:bg-red-700'
                  }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{sport.icon}</span>
                  <span className="text-lg font-thin ">{sport.name}</span>
                </div>
                {
                  activeSport === sport.id && (
                    <hr className="w-full h-1" />
                  )
                }
              </button>
            ))}
          </div>
          <button title="Toggle all sports menu" className="flex items-center justify-center gap-2 text-zinc-300 hover:bg-red-700" onClick={() => setAllSport(prev => !prev)}>
            <Menu />
            <span className="text-sm font-medium">All sports</span>
            <ChevronDown size={16} className={`ml-1 ${allSport ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {
        allSport && (
          <div className="absolute right-8 z-10 text-gray-100 flex bg-gray-700 rounded-md w-[55%] ml-12 my-2 shadow-md overflow-hidden" >
            <div className="bg-gray-800 p-4 flex flex-col gap-2">
              <h1 className="font-semibold">POPULAR</h1>
              <div className="flex flex-col items-start gap-2">
                <Link to="/football" className="border px-2 py-1 rounded-full hover:bg-gray-600 transition-colors">Premier League</Link>
                <Link to="/basketball" className="border px-2 py-1 rounded-full hover:bg-gray-600 transition-colors">NBA</Link>
                <Link to="/sports" className="border px-2 py-1 rounded-full hover:bg-gray-600 transition-colors">Wimbledon Men Singles</Link>
              </div>
            </div>

            <div className="p-2 flex gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  <hr className="w-5 bg-zinc-400"></hr>
                  <h1>TOP SPORTS</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <button title="Select soccer" className="flex items-center gap-1">
                    <FaFutbol />
                    Soccer
                  </button>
                  <button title="Select tennis" className="flex items-center gap-1">
                    <FaBaseball />
                    Tennis
                  </button>
                  <button title="Select basketball" className="flex items-center gap-1">
                    <FaBasketball />
                    Basketball
                  </button>
                </div>
              </div>

              <div>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <hr className="w-16 bg-zinc-400"></hr>
                    <h1>R</h1>
                  </div>
                  <button className="flex items-center gap-1">
                    <FaBacon />
                    Rugby
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div className="flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="flex-1 bg-black overflow-hidden">
          {/* Tournament Selection - Green Bar */}
          <div className="bg-gray-700 text-white px-6 py-3">
            <div className="relative flex gap-10" ref={tournamentDropdownRef}>
              <div className="flex items-center gap-4">
                <FaFutbol size={36} className="bg-green-700 text-white p-2 rounded" />
                <button
                  className="flex items-center gap-2 w-50 bg-gray-500 rounded p-1.5"
                  onClick={() => setShowTournamentDropdown(!showTournamentDropdown)}
                  aria-expanded={showTournamentDropdown}
                  aria-haspopup="true"
                >
                  <Trophy size={16} className="text-white" />
                  <span className="truncate text-white font-medium">{selectedTournament}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform text-white ${showTournamentDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4">
                {tournamentts.map((tournamentt) => (
                  <button key={tournamentt} className="border border-zinc-400 rounded-full px-2 py-1">
                    {tournamentt}
                  </button>
                ))}
              </div>

              {showTournamentDropdown && (
                <div className="absolute left-0 mt-1 h-screen bg-gray-800 rounded-md shadow-lg z-10 overflow-y-auto">
                  <div className="py-1">
                    {tournaments.map((tournament) => (
                      <button
                        key={tournament}
                        className={`block w-full text-left px-4 py-2 text-sm ${selectedTournament === tournament
                          ? 'bg-gray-100 text-green-600'
                          : 'text-gray-100 hover:bg-gray-500'
                          }`}
                        onClick={() => {
                          setSelectedTournament(tournament);
                          setShowTournamentDropdown(false);
                        }}
                      >
                        {tournament}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date Navigation - Dark Bar with Today */}
          <div className="flex justify-between items-center bg-gray-800 text-white px-3 md:px-4 py-3 mx-3 md:mx-5 mt-5 rounded">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-700 rounded-full"
                aria-label="Previous day"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>

              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-white" />
                <span className="text-white font-medium">Today</span>
              </div>

              <button
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-700 rounded-full"
                aria-label="Next day"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </div>

            {/* Filter Buttons - All and Live */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-gray-700 p-1 rounded">
                <button
                  onClick={() => setActiveTab('All')}
                  className={` px-4 py-1 text-sm font-medium rounded ${activeTab === 'All'
                    ? 'bg-red-600 text-white'
                    : 'bg-transparent text-gray-100'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('Live')}
                  className={`px-4 py-1 text-sm font-medium rounded-md ${activeTab === 'Live'
                    ? 'bg-red-600 text-white'
                    : 'bg-transparent text-gray-100'
                    }`}
                >
                  Live
                </button>
              </div>

              {/* Settings Icon */}
              <button
                className="p-2 rounded-full" title="Settings" aria-label="Settings" onClick={() => setOpenFilter(prev => !prev)}>
                <SlidersVertical size={18} className="text-gray-300 hover:text-gray-50" />
              </button>
            </div>
          </div>

          {
            openFilter && (
              <div className="p-4 mx-5 bg-gray-700">
                {/* Filter Search Bar */}
                <div className="">
                  <div className="flex items-center space-x-2 text-sm text-zinc-400 bg-gray-600 p-2">
                    <Filter size={18} className="text-gray-200" />
                    <span>Filter Country, Teams, Leagues, Players</span>
                  </div>
                </div>

                {/* OTHER FILTERS Section */}
                <div className="px-4 py-3">
                  <div className="mb-3">
                    <h3 className="text-xs font-medium text-gray-100 uppercase tracking-wide mb-2">OTHER FILTERS</h3>
                    <div className="flex flex-wrap gap-2 text-zinc-300">
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        Just Started
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        About to end
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        Finished
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        +1 hr
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        +2.5 hr
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        +6 hr
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        +12 hr
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        +1 goal
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        +2.5 goal
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        First half
                      </button>
                      <button className="px-3 py-1 border text-xs font-medium rounded-full">
                        Second half
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-xs font-medium text-gray-100 uppercase tracking-wide mb-2">SORT BY</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border text-xs font-medium rounded-full text-zinc-300">
                        Time
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* Matches List */}
          <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
            {leagues.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No matches found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {leagues.map((league) => (
                  <div key={league} className="mb-2">
                    <div
                      className="bg-gray-50 px-4 py-2 text-sm font-medium flex items-center justify-between cursor-pointer border-b border-gray-100"
                      onClick={() => toggleLeague(league)}
                    >
                      <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-gray-400" />
                        <span className="text-gray-700">{league}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">{filteredMatchesByLeague[league].length} matches</span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform ${expandedLeagues[league] ? 'transform rotate-0' : '-rotate-90'}`}
                        />
                      </div>
                    </div>

                    {expandedLeagues[league] && (
                      <div className="bg-white divide-y divide-gray-100">
                        {filteredMatchesByLeague[league].map((match) => (
                          <div key={match.id} className="p-4 hover:bg-gray-50 border-b border-gray-100">
                            {/* Match Row */}
                            <div className="flex items-center justify-between">
                              {/* Teams and Status */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1">
                                    <span className="text-sm font-medium text-gray-900">{match.homeTeam}</span>
                                    {match.homeScore && (
                                      <span className="text-sm font-bold text-gray-900">{match.homeScore}</span>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500">-</span>
                                  <div className="flex items-center space-x-1">
                                    {match.awayScore && (
                                      <span className="text-sm font-bold text-gray-900">{match.awayScore}</span>
                                    )}
                                    <span className="text-sm font-medium text-gray-900">{match.awayTeam}</span>
                                  </div>
                                </div>

                                {/* Status */}
                                <div className="mt-1">
                                  {match.status === 'LIVE' ? (
                                    <div className="flex items-center">
                                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                                      <span className="text-xs text-green-600 font-medium">{match.time}</span>
                                    </div>
                                  ) : match.status === 'POSTPONED' ? (
                                    <span className="text-xs text-red-600 font-medium">{match.time}</span>
                                  ) : (
                                    <span className="text-xs text-gray-500">{match.time}</span>
                                  )}
                                </div>
                              </div>

                              {/* Betting Odds */}
                              <div className="flex items-center space-x-1">
                                <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium">
                                  {match.odds.home}
                                </button>
                                <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium">
                                  {match.odds.draw}
                                </button>
                                <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium">
                                  {match.odds.away}
                                </button>
                              </div>

                              {/* Favorite Star */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(match.id);
                                }}
                                className="ml-2 text-gray-300 hover:text-yellow-400 p-1"
                                aria-label={favorites.includes(match.id) ? 'Remove from favorites' : 'Add to favorites'}
                              >
                                <Star
                                  size={16}
                                  className={favorites.includes(match.id) ? 'fill-yellow-400 text-yellow-400' : ''}
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation 
          onOpenBetslip={() => setShowBetslip(true)}
        />
      </div>
      
      {/* Mobile Betslip Modal */}
      {showBetslip && (
        <UnifiedBetslip
          isOpen={showBetslip}
          onClose={() => setShowBetslip(false)}
          isMobile={true}
        />
      )}
      
      <div className="hidden lg:block">
        <Footer />
      </div>
      </div>
    </>
  );
};

export default Livescore;