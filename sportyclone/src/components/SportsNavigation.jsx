import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Home, Search, ArrowLeft, X } from "lucide-react";
import styles from './StickyHeader.module.css';
import { FaFutbol, FaBasketballBall, FaTableTennis, FaVolleyballBall, FaBaseballBall, FaFootballBall, FaHockeyPuck, FaGamepad } from "react-icons/fa";
import { GiTennisRacket, GiBoxingGlove, GiDart } from "react-icons/gi";
import { MdSportsCricket, MdSportsMma } from "react-icons/md";
import { IoMdHand } from "react-icons/io";
const SportsNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showMoreSports, setShowMoreSports] = useState(false);
  const [activeTab, setActiveTab] = useState("Top Leagues");
  const [activeTimeRange, setActiveTimeRange] = useState("Daily");
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const mobileScrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreSports(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const allSports = [
    { name: "Football", path: "/football", icon: <FaFutbol className="w-5 h-5" /> },
    { name: "vFootball", path: "/virtuals", icon: <FaGamepad className="w-5 h-5" /> },
    { name: "Basketball", path: "/basketball", icon: <FaBasketballBall className="w-5 h-5" /> },
    { name: "Tennis", path: "/tennis", icon: <GiTennisRacket className="w-5 h-5" /> },
    { name: "eFootball", path: "/efootball", icon: <FaGamepad className="w-5 h-5" /> },
    { name: "Table Tennis", path: "/table-tennis", icon: <FaTableTennis className="w-5 h-5" /> },
    { name: "eBasketball", path: "/ebasketball", icon: <FaGamepad className="w-5 h-5" /> },
    { name: "Ice Hockey", path: "/ice-hockey", icon: <FaHockeyPuck className="w-5 h-5" /> },
    { name: "Handball", path: "/handball", icon: <IoMdHand className="w-5 h-5" /> },
    { name: "Volleyball", path: "/volleyball", icon: <FaVolleyballBall className="w-5 h-5" /> },
    { name: "Baseball", path: "/baseball", icon: <FaBaseballBall className="w-5 h-5" /> },
    { name: "American Football", path: "/american-football", icon: <FaFootballBall className="w-5 h-5" /> },
    { name: "Cricket", path: "/cricket", icon: <MdSportsCricket className="w-5 h-5" /> },
    { name: "Darts", path: "/darts", icon: <GiDart className="w-5 h-5" /> },
    { name: "MMA", path: "/mma", icon: <MdSportsMma className="w-5 h-5" /> },
    { name: "Boxing", path: "/boxing", icon: <GiBoxingGlove className="w-5 h-5" /> },
    { name: "Rugby", path: "/rugby", icon: <FaFootballBall className="w-5 h-5" /> },
  ];

  // Removed unused variables, moreSports

  // Get current sport from path
  const getCurrentSport = () => {
    const currentPath = location.pathname;
    const sport = allSports.find(s => s.path === currentPath);
    return sport ? sport.name : "Sports";
  };

  // Sport-specific data
  const getSportData = (sportName)=> {
    const sportData = {
      "Basketball": {
        todayGames: 23,
        live: 2,
        allCount: 93,
        outrights: 17,
        topLeagues: [
          { name: "All", count: 55, checked: true },
          { name: "WNBA", count: 3, checked: true },
          { name: "NBA", count: 30, checked: true },
          { name: "Euroleague", count: 11, checked: true },
          { name: "Champions League", count: 1, checked: true },
          { name: "Basketball League 25/26", count: 1, checked: true },
        ],
        topCountries: [
          { name: "All", count: 55, checked: true },
          { name: "United States", count: 33, checked: true },
          { name: "Spain", count: 8, checked: true },
          { name: "Turkey", count: 6, checked: true },
          { name: "Greece", count: 4, checked: true },
          { name: "Italy", count: 4, checked: true },
        ]
      },
      "Football": {
        todayGames: 45,
        live: 8,
        allCount: 120,
        outrights: 25,
        topLeagues: [
          { name: "All", count: 120, checked: true },
          { name: "Premier League", count: 20, checked: true },
          { name: "La Liga", count: 20, checked: true },
          { name: "Serie A", count: 20, checked: true },
          { name: "Bundesliga", count: 18, checked: true },
          { name: "Champions League", count: 32, checked: true },
        ],
        topCountries: [
          { name: "All", count: 120, checked: true },
          { name: "England", count: 45, checked: true },
          { name: "Spain", count: 30, checked: true },
          { name: "Italy", count: 25, checked: true },
          { name: "Germany", count: 20, checked: true },
          { name: "France", count: 18, checked: true },
        ]
      },
      "Tennis": {
        todayGames: 15,
        live: 3,
        allCount: 45,
        outrights: 8,
        topLeagues: [
          { name: "All", count: 45, checked: true },
          { name: "ATP Tour", count: 25, checked: true },
          { name: "WTA Tour", count: 20, checked: true },
          { name: "Grand Slam", count: 4, checked: true },
          { name: "Davis Cup", count: 3, checked: true },
        ],
        topCountries: [
          { name: "All", count: 45, checked: true },
          { name: "United States", count: 12, checked: true },
          { name: "France", count: 8, checked: true },
          { name: "United Kingdom", count: 6, checked: true },
          { name: "Spain", count: 5, checked: false }
        ]
      }
    };

    return sportData[sportName] || sportData["Basketball"];
  };

  const currentSport = getCurrentSport();
  const sportData = getSportData(currentSport);

  // Handle checkbox selection
  const handleLeagueToggle = (leagueName) => {
    setSelectedLeagues(prev => 
      prev.includes(leagueName) 
        ? prev.filter(name => name !== leagueName)
        : [...prev, leagueName]
    );
  };

  // Handle Clear button
  const handleClear = () => {
    setSelectedLeagues([]);
  };

  // Handle View button
  const handleView = () => {
    if (selectedLeagues.length > 0 || sportData.topLeagues.some(l => l.checked)) {
      const allSelected = [...selectedLeagues, ...sportData.topLeagues.filter(l => l.checked).map(l => l.name)];
      // Navigate to matches/outrights with selected leagues
      navigate(`/${currentSport.toLowerCase()}/matches?leagues=${allSelected.join(',')}`);
    } else {
      // If no selections, navigate to general matches page
      navigate(`/${currentSport.toLowerCase()}/matches`);
    }
  };

  // Handle search
  const handleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <div className={`hidden lg:block bg-white border-b border-gray-200 ${styles.sportsNavSticky} ${isScrolled ? `fixed top-12 left-0 right-0 ${styles.zIndexSportsNav}` : 'sticky top-0 z-40'}`}>
        <div className="flex justify-evenly w-[75%] mx-auto items-center overflow-x-auto scrollbar-hide">
          <Link
            to="/"
            className={`flex items-center py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
              isActive("/")
                ? "border-sporty-red text-sporty-red"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            <span>Home</span>
          </Link>
          {allSports.slice(0, 8).map((sport) => (
            <Link
              key={sport.name}
              to={sport.path}
              className={`flex items-center py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                isActive(sport.path)
                  ? "border-sporty-red text-sporty-red"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <span>{sport.name}</span>
            </Link>
          ))}
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMoreSports(!showMoreSports)}
              className="flex items-center space-x-2 py-4 px-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all duration-300"
            >
              <span>More Sports</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMoreSports ? 'rotate-180' : ''}`} />
            </button>
            
            {showMoreSports && (
              <div className={`absolute top-0 right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50 mt-1 ${styles.sportsDropdown}`}>
                <div className="py-2">
                  {allSports.slice(8).map((sport) => (
                    <Link
                      key={sport.name}
                      to={sport.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 ${styles.dropdownItem}`}
                      onClick={() => setShowMoreSports(false)}
                    >
                      {sport.icon}
                      <span>{sport.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only visible on mobile */}
      <div className="lg:hidden bg-gray-900 text-white min-h-screen">
        {/* Mobile Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} title="Go back">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">{currentSport}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={handleSearch} title="Search">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => navigate('/')} title="Go home">
              <Home className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="bg-red-500 px-4 py-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search leagues, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white text-black px-3 py-2 rounded"
                autoFocus
              />
              <button onClick={() => setShowSearch(false)} title="Close search">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Sports Icons Navigation - Scrollable */}
        <div className="bg-gray-800 px-4 py-3 sticky top-14 z-40">
          <div 
            ref={mobileScrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {allSports.map((sport) => (
              <Link
                key={sport.name}
                to={sport.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors flex-shrink-0 min-w-[70px] ${
                  isActive(sport.path)
                    ? "text-green-400"
                    : "text-white hover:text-green-400"
                }`}
              >
                {sport.icon}
                <span className="text-xs font-medium text-center">{sport.name}</span>
                {isActive(sport.path) && (
                  <div className="w-full h-0.5 bg-green-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Game Status Cards */}
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate(`/${currentSport.toLowerCase()}/matches`)}
              className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors min-h-[80px] flex flex-col justify-center"
            >
              <div className="text-sm text-gray-300 mb-1">Today Games</div>
              <div className="text-lg font-bold text-white">({sportData.todayGames})</div>
            </button>
            <button 
              onClick={() => navigate(`/${currentSport.toLowerCase()}/live`)}
              className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors min-h-[80px] flex flex-col justify-center"
            >
              <div className="text-sm text-gray-300 mb-1">Live</div>
              <div className="text-lg font-bold text-white">({sportData.live})</div>
            </button>
            <button 
              onClick={() => navigate(`/${currentSport.toLowerCase()}/all`)}
              className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors min-h-[80px] flex flex-col justify-center"
            >
              <div className="text-sm text-gray-300 mb-1">All {currentSport}</div>
              <div className="text-lg font-bold text-white">({sportData.allCount})</div>
            </button>
            <button 
              onClick={() => navigate(`/${currentSport.toLowerCase()}/outrights`)}
              className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors min-h-[80px] flex flex-col justify-center"
            >
              <div className="text-sm text-gray-300 mb-1">Outrights</div>
              <div className="text-lg font-bold text-white">({sportData.outrights})</div>
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="px-4 py-3">
          <div className="flex space-x-4 mb-4">
            <button 
              className={`font-medium border-b-2 pb-1 ${
                activeTimeRange === "Daily" 
                  ? "text-green-400 border-green-400" 
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
              onClick={() => setActiveTimeRange("Daily")}
            >
              Daily
            </button>
            <button 
              className={`font-medium border-b-2 pb-1 ${
                activeTimeRange === "Range" 
                  ? "text-green-400 border-green-400" 
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
              onClick={() => setActiveTimeRange("Range")}
            >
              Range
            </button>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {["Tuesday", "Wednesday", "Weekend"].map((day) => (
              <button 
                key={day}
                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors flex-shrink-0 border border-green-400"
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="px-4 py-3">
          <div className="flex space-x-6 mb-4 overflow-x-auto scrollbar-hide">
            <button 
              className={`font-medium border-b-2 pb-1 whitespace-nowrap ${
                activeTab === "My Favourites" 
                  ? "text-green-400 border-green-400" 
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
              onClick={() => setActiveTab("My Favourites")}
            >
              My Favourites
            </button>
            <button 
              className={`font-medium border-b-2 pb-1 whitespace-nowrap ${
                activeTab === "Top Leagues" 
                  ? "text-green-400 border-green-400" 
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
              onClick={() => setActiveTab("Top Leagues")}
            >
              Top Leagues
            </button>
            <button 
              className={`font-medium border-b-2 pb-1 whitespace-nowrap ${
                activeTab === "Top Countries" 
                  ? "text-green-400 border-green-400" 
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
              onClick={() => setActiveTab("Top Countries")}
            >
              Top Countries
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="space-y-3">
            {activeTab === "My Favourites" && (
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-between">
                <span>View your favourites here</span>
                <button className="text-white hover:text-gray-200" title="Close">✕</button>
              </div>
            )}
            
            {activeTab === "Top Leagues" && (
              <>
                {sportData.topLeagues.map((league, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between py-3 hover:bg-gray-800 rounded-lg px-3 transition-colors min-h-[48px]"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => handleLeagueToggle(league.name)}
                        className={`w-5 h-5 border rounded transition-colors flex items-center justify-center ${
                          selectedLeagues.includes(league.name) || league.checked
                            ? "bg-green-400 border-green-400" 
                            : "border-gray-600 hover:border-green-400"
                        }`}
                        title={`Toggle ${league.name}`}
                      >
                        {(selectedLeagues.includes(league.name) || league.checked) && (
                          <span className="text-black text-xs">✓</span>
                        )}
                      </button>
                      <span className="text-gray-300 flex-1">{league.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{league.count}</span>
                  </div>
                ))}
              </>
            )}

            {activeTab === "Top Countries" && (
              <>
                {sportData.topCountries.map((country, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between py-3 hover:bg-gray-800 rounded-lg px-3 transition-colors min-h-[48px]"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => handleLeagueToggle(country.name)}
                        className={`w-5 h-5 border rounded transition-colors flex items-center justify-center ${
                          selectedLeagues.includes(country.name) || country.checked
                            ? "bg-green-400 border-green-400" 
                            : "border-gray-600 hover:border-green-400"
                        }`}
                        title={`Toggle ${country.name}`}
                      >
                        {(selectedLeagues.includes(country.name) || country.checked) && (
                          <span className="text-black text-xs">✓</span>
                        )}
                      </button>
                      <span className="text-gray-300 flex-1">{country.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{country.count}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6 px-2">
            <button 
              onClick={handleClear}
              className="flex-1 bg-gray-700 text-gray-300 py-4 rounded-lg font-medium hover:bg-gray-600 transition-colors min-h-[48px] text-base"
            >
              Clear
            </button>
            <button 
              onClick={handleView}
              className={`flex-1 py-4 rounded-lg font-medium transition-colors min-h-[48px] text-base ${
                selectedLeagues.length > 0 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              View ({selectedLeagues.length > 0 ? selectedLeagues.length : sportData.topLeagues.filter(l => l.checked).length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SportsNavigation;