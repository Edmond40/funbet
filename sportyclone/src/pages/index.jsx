import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Gamepad2, X, CircleEllipsis, Settings2, TrendingUp } from "lucide-react";
import styles from './Sports.module.css';
import { Button } from "@/components/ui/button";
import SearchModal from "@/components/SearchModal";
import Shortcuts from "@/components/Shortcuts";
import { useBets } from "@/hooks/useBets";
import MainContent from "@/components/MainContent";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SportsNavigation from "@/components/SportsNavigation";
import Footer from "@/components/Footer";
import PromotionalBanners from "@/components/PromotionalBanners";
import Banner from '../assets/sporty.jpg'
import { FaFutbol, FaBasketballBall, FaTableTennis, FaVolleyballBall, FaBaseballBall, FaFootballBall, FaHockeyPuck, FaGamepad } from "react-icons/fa";
import { GiTennisRacket, GiBoxingGlove, GiDart } from "react-icons/gi";
import { MdSportsCricket, MdSportsMma, MdLiveTv } from "react-icons/md";
import { IoMdHand } from "react-icons/io";
import { TbVectorTriangle } from 'react-icons/tb';
import { GiAirplane } from 'react-icons/gi';
//navigation images
import Bundesliga from '../assets/Bundesliga_logo.jpg'
import LaLiga from '../assets/LaLiga_logo.png'
import SerieA from '../assets/Italian-Serie-A-TIM-Logo.png'
import Ligue1 from '../assets/Ligue-1-Logo.png'
import PremierLeague from '../assets/EnglishPremierLeague.webp'
import NBA from '../assets/nba.png'
import Eredivise from '../assets/eredivise-65.png'
import Shanguai from '../assets/shangaui.webp'
// Removed unused import: Aviator
//status images
import PremiereStat from '../assets/premierestat.jpg'
import LaligaStat from '../assets/laligastat.webp'
import SerieAStat from '../assets/serieAstat.jpeg'
import AviatorStat from '../assets/aviatorstat.png'
import MobileHeader from "@/components/MobileHeader";

const Sports = () => {
  const { addBet } = useBets();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");
  const [activeSection, setActiveSection] = useState("favourites");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Removed unused variables, setShowPromoModal] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [progressWidth, setProgressWidth] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeLiveSport, setActiveLiveSport] = useState("Football");
  const [activeOddsFormat, setActiveOddsFormat] = useState("1X2");
  const [showOddsFilter, setShowOddsFilter] = useState(false);
  const [oddsDisplay, setOddsDisplay] = useState("1up"); // "1up" or "2up"
  const [activeLeague, setActiveLeague] = useState("LaLiga");
  // Removed unused variable, setActiveSportDropdown
  const featuredCarouselRef = useRef(null);
  const grandPrizeCarouselRef = useRef(null);
  const leagueCarouselRef = useRef(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  // Removed unused variables, setSelectedSport

  // Sports Section States
  const [activeSportsTab, setActiveSportsTab] = useState("Football");
  const [activeSectionTab, setActiveSectionTab] = useState("Highlights");
  const [activeOddsTab, setActiveOddsTab] = useState("1X2");
  const [expandedLeagues, setExpandedLeagues] = useState({});

  // Toggle league expansion
  const toggleLeague = (leagueName) => {
    setExpandedLeagues(prev => ({
      ...prev,
      [leagueName]: !prev[leagueName]
    }));
  };

  // Handle odds button click
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

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (showPromoModal) {
      setProgressWidth(0);
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgressWidth(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setShowPromoModal(false);
              return 100;
            }
            return prev + 2;
          });
        }, 100);
        return () => clearInterval(interval);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showPromoModal]);

  const handleLeagueClick = (leagueName) => {
    setSelectedLeague(leagueName);
    setShowPromoModal(true);
  };

  // Grand Prize carousel autoplay
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (grandPrizeCarouselRef.current) {
        const carousel = grandPrizeCarouselRef.current;
        const cardWidth = 192; // w-48 = 192px
        const gap = 12; // space-x-3 = 12px
        const scrollAmount = cardWidth + gap;

        // Check if we've reached the end
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
          // Reset to beginning
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next item
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(autoplayInterval);
  }, []);

  // All sports data from SportsNavigation
  const allSports = [
    { name: "Football", icon: <FaFutbol className="w-5 h-5" />, color: "text-green-400" },
    { name: "vFootball", icon: <FaGamepad className="w-5 h-5" />, color: "text-purple-400" },
    { name: "Basketball", icon: <FaBasketballBall className="w-5 h-5" />, color: "text-orange-400" },
    { name: "Tennis", icon: <GiTennisRacket className="w-5 h-5" />, color: "text-yellow-400" },
    { name: "eFootball", icon: <FaGamepad className="w-5 h-5" />, color: "text-blue-400" },
    { name: "Table Tennis", icon: <FaTableTennis className="w-5 h-5" />, color: "text-red-400" },
    { name: "Ice Hockey", icon: <FaHockeyPuck className="w-5 h-5" />, color: "text-cyan-400" },
    { name: "Handball", icon: <IoMdHand className="w-5 h-5" />, color: "text-pink-400" },
    { name: "Volleyball", icon: <FaVolleyballBall className="w-5 h-5" />, color: "text-indigo-400" },
    { name: "Baseball", icon: <FaBaseballBall className="w-5 h-5" />, color: "text-green-500" },
    { name: "American Football", icon: <FaFootballBall className="w-5 h-5" />, color: "text-brown-400" },
    { name: "Cricket", icon: <MdSportsCricket className="w-5 h-5" />, color: "text-teal-400" },
    { name: "Darts", icon: <GiDart className="w-5 h-5" />, color: "text-gray-400" },
    { name: "MMA", icon: <MdSportsMma className="w-5 h-5" />, color: "text-red-500" },
    { name: "Boxing", icon: <GiBoxingGlove className="w-5 h-5" />, color: "text-yellow-500" },
    { name: "Rugby", icon: <FaFootballBall className="w-5 h-5" />, color: "text-green-600" }
  ];

  // League matches data
  const leagueMatches = {
    "LaLiga": [
      {
        id: 'laliga-1',
        homeTeam: 'Barcelona',
        awayTeam: 'Real Sociedad',
        homeTeamShort: 'FCB',
        awayTeamShort: 'RS',
        time: '16:30',
        date: 'Today',
        path: '/',
        league: 'Spain - LaLiga',
        odds: { home: '1.33', draw: '6.37', away: '8.87' }
      },
      {
        id: 'laliga-2',
        homeTeam: 'Real Madrid',
        awayTeam: 'Atletico Madrid',
        homeTeamShort: 'RMA',
        awayTeamShort: 'ATM',
        time: '19:00',
        date: 'Today',
        path: '/',
        league: 'Spain - LaLiga',
        odds: { home: '2.10', draw: '3.40', away: '3.20' }
      }
    ],
    "Premier League": [
      {
        id: 'epl-1',
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        homeTeamShort: 'MCI',
        awayTeamShort: 'LIV',
        time: '17:30',
        date: 'Today',
        path: '/',
        league: 'England - Premier League',
        odds: { home: '2.25', draw: '3.60', away: '2.90' }
      },
      {
        id: 'epl-2',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeTeamShort: 'ARS',
        awayTeamShort: 'CHE',
        time: '20:00',
        date: 'Today',
        path: '/',
        league: 'England - Premier League',
        odds: { home: '1.95', draw: '3.80', away: '3.70' }
      }
    ],
    "Serie A": [
      {
        id: 'seria-1',
        homeTeam: 'Juventus',
        awayTeam: 'AC Milan',
        homeTeamShort: 'JUV',
        awayTeamShort: 'MIL',
        time: '18:45',
        date: 'Today',
        path: '/',
        league: 'Italy - Serie A',
        odds: { home: '2.40', draw: '3.20', away: '2.80' }
      }
    ],
    "Bundesliga": [
      {
        id: 'bundes-1',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        homeTeamShort: 'BAY',
        awayTeamShort: 'BVB',
        time: '16:30',
        date: 'Today',
        path: '/',
        league: 'Germany - Bundesliga',
        odds: { home: '1.80', draw: '4.20', away: '4.00' }
      }
    ],
    "Ligue 1": [
      {
        id: 'ligue1-1',
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        homeTeamShort: 'PSG',
        awayTeamShort: 'OM',
        time: '21:00',
        date: 'Today',
        path: '/',
        league: 'France - Ligue 1',
        odds: { home: '1.50', draw: '4.50', away: '6.00' }
      }
    ],
    "Champions League": [
      {
        id: 'ucl-1',
        homeTeam: 'Real Madrid',
        awayTeam: 'Manchester City',
        homeTeamShort: 'RMA',
        awayTeamShort: 'MCI',
        time: '20:00',
        date: 'Tomorrow',
        path: '/',
        league: 'UEFA Champions League',
        odds: { home: '2.60', draw: '3.40', away: '2.50' }
      }
    ]
  };

  const handleQuickNavigation = (destination) => {
    switch (destination) {
      case 'all-sports':
        // Already on sports page
        break;
      case 'live':
        navigate('/live-betting');
        break;
      case 'schedule':
        navigate('/scheduled-virtuals');
        break;
      case 'sporty-hero':
        navigate('/promotions');
        break;
      case 'aviator':
        navigate('/aviator');
        break;
      case 'load-code':
        navigate('/code-hub-football');
        break;
      case 'virtuals':
        navigate('/virtuals-page');
        break;
      case 'more':
        setShowShortcuts(true);
        break;
    }
  };

  return (
    <>
      {/* Desktop Layout */}
      <div
        className="hidden lg:flex flex-col bg-white min-h-screen overflow-x-hidden  text-gray-900"
      >
        {/* Spacer for sticky header when scrolled */}
        {isScrolled && <div className="h-20"></div>}
        {/* Desktop Header */}
        <div className="flex-shrink-0">
          <Header />
          <SportsNavigation />
        </div>

        <div className="flex-1 flex">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="md:grid grid-cols-3 py-1 bg-gray-800">
              <Sidebar />
              <PromotionalBanners />
            </div>
            <div className="flex flex-col xl:p-4">
              <img src={Banner} alt="Sporty Banner" className="w-full h-20 object-cover" />
              <MainContent />
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-100 text-black">
        {/* Mobile Header */}
        <MobileHeader/>

        {/* Stats */}
        <div className="">
          <div className="grid grid-cols-5 gap-2 p-3">
            {[
              { name: 'Premier League', image: '/api/placeholder/64/64' },
              { name: 'La Liga', image: '/api/placeholder/64/64' },
              { name: 'Serie A', image: '/api/placeholder/64/64' },
              { name: 'Aviator', image: '/api/placeholder/64/64' },
              { name: 'NBA', image: '/api/placeholder/64/64' }
            ].map((item, index) => (
              <button
                key={index}
                className="rounded-lg flex flex-col justify-between overflow-hidden relative w-16 h-16"
                onClick={() => handleLeagueClick(item.name)}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent ">
                  <h1 className="absolute bottom-1 left-1 text-xs text-white font-semibold drop-shadow-lg">{item.name}</h1>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between gap-2 ">
            {[
              { name: "All Sports", icon: <FaFutbol size={20}/>, key: "all-sports" },
              { name: "Live", icon: <FaFutbol size={20}/>, key: "live" },
              { name: "Load code", icon: <FaFutbol size={20}/>, key: "load-code" },
              { name: "Aviator", icon: <FaFutbol size={20}/>, key: "aviator" },
              { name: "Virtuals", icon: <Gamepad2 size={20}/>, key: "virtuals" },
              { name: "More", icon: <FaFutbol size={20}/>, key: "more" }
            ].map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center space-y-2  transition-colors"
                onClick={() => handleQuickNavigation(item.key)}
                title={item.name}
              >
                {item.icon}
                <span className="text-xs text-gray-700 text-center">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-4">
            {[
              { id: "favourites", label: "MY FAVOURITES", color: "bg-red-500" },
              { id: "today", label: "TODAY'S FOOTBALL", color: "bg-gray-600" },
              { id: "next3h", label: "FOOTBALL IN NEXT 3 HOURS", color: "bg-green-500" },
              { id: "tomorrow", label: "FOOTBALL TOMORROW", color: "bg-blue-500" },
            ].map((section) => (
              <div key={section.id} className="shadow-md">
                <div className={`${activeSection === section.id ? section.color : "bg-gray-500"}  px-3 py-0.5 rounded-t`}>
                </div>
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 py-2 text-gray-700`}
                >
                  <p className="text-sm font-semibold">{section.label}</p>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-4 py-2 flex items-center gap-2 ">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Featured</h1>
            <hr className="w-5 h-0.5 rotate-90" />
          </div>
          <div className="flex space-x-6">
            {[
              { id: "matches", label: "Matches" },
              { id: "games", label: "Games" },
              { id: "codes", label: "Codes" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` text-sm font-medium ${activeTab === tab.id ? "text-green-400 border-b-2 border-green-400" : "text-gray-400"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Show League Carousel only for Matches tab */}
        {activeTab === "matches" && (
          <div className="px-1 py-2">
            <div className="relative">
              <div
                ref={leagueCarouselRef}
                className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-6"
              >
                {[
                  { name: "LaLiga", image: LaLiga },
                  { name: "Premier League", image: PremierLeague },
                  { name: "Serie A", image: SerieA },
                  { name: "Bundesliga", image: Bundesliga },
                  { name: "Ligue 1", image: Ligue1 },
                  { name: "NBA", image: NBA },
                  { name: "Eredivise", image: Eredivise },
                  { name: "ATP shanghai china men singles ", image: Shanguai }
                ].map((league) => (
                  <button
                    key={league.name}
                    className={`flex items-center  flex-shrink-0 text-lg font-semibold px-3 py-1 border border-gray-600  rounded-2xl transition-all duration-300 ${activeLeague === league.name
                      ? 'bg-green-100 text-green-700 border-green-500'
                      : 'text-gray-600 hover:bg-gray-100 opacity-45'
                      }`}
                    onClick={() => setActiveLeague(league.name)}
                  >
                    <span className={`transition-all duration-300 ${activeLeague === league.name ? 'mr-2' : 'mr-0'}`}>
                      <img
                        src={league.image}
                        alt={league.name}
                        className="w-6 h-6"
                      />
                    </span>
                    <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${activeLeague === league.name
                      ? 'max-w-xs opacity-100 translate-x-0'
                      : 'max-w-0 opacity-0 translate-x-2'
                      }`}>
                      {league.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Featured Match Carousel - Only show for Matches tab */}
        {activeTab === "matches" && leagueMatches[activeLeague] && (
          <div className="px-1 mb-4">
            <div className="relative">
              <div
                ref={featuredCarouselRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
              >
                {leagueMatches[activeLeague].map((match) => (
                  <div key={match.id} className="flex-shrink-0 w-full bg-gray-800 px-2 py-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                        <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                        <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                      </div>
                      <div className="absolute top-0 right-2 flex items-center ">
                        <Link to={match.path} className="text-xs text-green-500 line-clamp-2">Football - {match.league}</Link>
                        <TrendingUp size={13} className="text-gray-100" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-3 mb-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{match.homeTeamShort}</span>
                        </div>
                        <span className="text-white text-sm">{match.homeTeam}</span>
                      </div>

                      <div className="text-center">
                        <div className="text-white font-bold">{match.time}</div>
                        <div className="text-xs text-gray-400">{match.date}</div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className="text-white text-sm text-right">{match.awayTeam}</span>
                        <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{match.awayTeamShort}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        className="bg-gray-700 flex items-center justify-evenly text-green-500 hover:bg-gray-700 py-1"
                        onClick={() => addBet({
                          id: `${match.id}-1`,
                          event: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: '1X2',
                          pick: '1',
                          odds: match.odds.home
                        })}
                        title={`Bet on ${match.homeTeam} to win`}
                      >
                        <div className="text-base">1</div>
                        <div className="font-bold">{match.odds.home}</div>
                      </button>
                      <button
                        className="bg-gray-700 flex items-center justify-evenly text-green-500 hover:bg-gray-700 py-1"
                        onClick={() => addBet({
                          id: `${match.id}-x`,
                          event: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: '1X2',
                          pick: 'X',
                          odds: match.odds.draw
                        })}
                        title="Bet on draw"
                      >
                        <div className="text-base">X</div>
                        <div className="font-bold">{match.odds.draw}</div>
                      </button>
                      <button
                        className="bg-gray-700 flex items-center justify-evenly text-green-500 hover:bg-gray-700 py-1"
                        onClick={() => addBet({
                          id: `${match.id}-2`,
                          event: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: '1X2',
                          pick: '2',
                          odds: match.odds.away
                        })}
                        title={`Bet on ${match.awayTeam} to win`}
                      >
                        <div className="text-base">2</div>
                        <div className="font-bold">{match.odds.away}</div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "games" && (
          <div className="px-4 mb-4">
            <h3 className="font-semibold mb-3 text-white">Games</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">Aviator</div>
                <div className="font-medium text-white">Crash Game</div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white mt-2 w-full" onClick={() => navigate('/aviator')}>
                  Play Now
                </Button>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">Sporty Hero</div>
                <div className="font-medium text-white">Arcade Game</div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white mt-2 w-full" onClick={() => navigate('/promotions')}>
                  Play Now
                </Button>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">Virtual Sports</div>
                <div className="font-medium text-white">Virtual Games</div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white mt-2 w-full" onClick={() => navigate('/virtuals')}>
                  Play Now
                </Button>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">Casino</div>
                <div className="font-medium text-white">Table Games</div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white mt-2 w-full" onClick={() => navigate('/casino')}>
                  Play Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "codes" && (
          <div className="px-4 mb-4">
            <h3 className="font-semibold mb-3 text-white">Booking Codes</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded p-3">
                <div className="font-medium mb-2 text-white">Enter Booking Code</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code here"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400"
                  />
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Load
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="font-medium mb-2 text-white">Popular Codes</div>
                <div className="space-y-2 text-xs">
                  {[
                    { name: "Weekend Special", code: "F2QM6T" },
                    { name: "High Odds Mix", code: "EQMXFR" },
                    { name: "Live Special", code: "DXQDXY" },
                    { name: "Champions League", code: "UCL2024" },
                    { name: "LaLiga Special", code: "LALIGA" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="font-mono text-green-400">{item.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Section */}
        <div className="bg-gray-900 text-white mb-4">
          <div className="">
            <div className="flex items-center space-x-2 px-2 py-2">
              <h1 className="text-xl font-bold">Live</h1>
              <hr className="w-5 h-0.5 rotate-90" />
              <div className="flex space-x-4 overflow-x-auto ">
                {allSports.slice(0, 5).map((sport) => (
                  <button
                    key={sport.name}
                    onClick={() => setActiveLiveSport(sport.name)}
                    className={`text-sm transition-colors flex items-center space-x-1 ${activeLiveSport === sport.name ? "text-green-400" : "text-gray-400 hover:text-gray-300"}`}
                  >
                    <span>{sport.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Match Tabs with 1up/2up Toggle - Show high odds live games */}
            <div className="flex items-center justify-between px-2 py-2 w-full">
              <div className="flex space-x-4 text-sm overflow-x-auto">
                <button
                  onClick={() => setActiveOddsFormat("1X2")}
                  className={`transition-colors ${activeOddsFormat === "1X2" ? "text-green-400 border-b border-green-400 pb-1" : "text-gray-400"}`}
                >
                  1X2
                </button>
                <button
                  onClick={() => setActiveOddsFormat("O/U")}
                  className={`transition-colors ${activeOddsFormat === "O/U" ? "text-green-400 border-b border-green-400 pb-1" : "text-gray-400"}`}
                >
                  O/U
                </button>
                <button
                  onClick={() => setActiveOddsFormat("DC")}
                  className={`transition-colors ${activeOddsFormat === "DC" ? "text-green-400 border-b border-green-400 pb-1" : "text-gray-400"}`}
                >
                  DC
                </button>
                <button
                  onClick={() => setActiveOddsFormat("High Odds")}
                  className={`transition-colors ${activeOddsFormat === "High Odds" ? "text-green-400 border-b border-green-400 pb-1" : "text-gray-400"}`}
                >
                  High Odds
                </button>
                <button
                  onClick={() => setActiveOddsFormat("Handicap")}
                  className={`transition-colors ${activeOddsFormat === "Handicap" ? "text-green-400 border-b border-green-400 pb-1" : "text-gray-400"}`}
                >
                  Handicap
                </button>
              </div>

              {/* 1up/2up Toggle */}
              <div className="flex items-center p-1">
                <hr className="w-5 h-0.5 rotate-90" />
                <button
                  onClick={() => setOddsDisplay("1up")}
                  className={`p-1 text-xs rounded-full transition-colors ${oddsDisplay === "1up" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  title="Show single odds format"
                >
                  1up
                </button>
                <button
                  onClick={() => setOddsDisplay("2up")}
                  className={`p-1 text-xs rounded-full transition-colors ${oddsDisplay === "2up" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  title="Show dual odds format"
                >
                  2up
                </button>
              </div>
            </div>
            <div className="bg-gray-700 grid grid-cols-3 pl-64 py-1">
              <p>1</p>
              <p>X</p>
              <p>2</p>
            </div>
            {/* Live Matches - Show high odds games when High Odds tab is selected */}
            <div className="space-y-3 divide-y divide-gray-600">
              {(activeOddsFormat === "High Odds" ? [
                {
                  id: 1,
                  homeTeam: "Underdog United",
                  awayTeam: "Favorites FC",
                  homeScore: 0,
                  awayScore: 1,
                  time: "65:12 H2",
                  league: "Championship League",
                  odds: { home: "8.50", draw: "5.20", away: "1.25" }
                },
                {
                  id: 2,
                  homeTeam: "Minnows FC",
                  awayTeam: "Giants United",
                  homeScore: 2,
                  awayScore: 0,
                  time: "78:45 H2",
                  league: "Premier Division",
                  odds: { home: "12.00", draw: "7.50", away: "1.15" }
                },
                {
                  id: 3,
                  homeTeam: "Outsiders FC",
                  awayTeam: "Champions City",
                  homeScore: 1,
                  awayScore: 1,
                  time: "55:30 H2",
                  league: "Elite League",
                  odds: { home: "6.75", draw: "4.20", away: "1.45" }
                }
              ] : [
                {
                  id: 1,
                  homeTeam: "Chile",
                  awayTeam: "New Zealand",
                  homeScore: 0,
                  awayScore: 0,
                  time: "52:36 H2",
                  league: "International Youth - U20 World Cup",
                  odds: { home: "1.80", draw: "2.45", away: "7.50" }
                },
                {
                  id: 2,
                  homeTeam: "Paraguay",
                  awayTeam: "Panama",
                  homeScore: 1,
                  awayScore: 1,
                  time: "53:10 H2",
                  league: "International Youth - U20 World Cup",
                  odds: { home: "2.35", draw: "2.20", away: "4.80" }
                },
                {
                  id: 3,
                  homeTeam: "Charlotte FC",
                  awayTeam: "CF Montreal",
                  homeScore: 1,
                  awayScore: 0,
                  time: "30:26 H1",
                  league: "USA - MLS",
                  odds: { home: "1.70", draw: "3.70", away: "5.20" }
                }
              ]).map((match) => (
                <div key={match.id} className="bg-gray-900  p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-green-500">{match.time}</span>
                      <span className="text-xs text-gray-400">{match.league}</span>
                    </div>
                    <TrendingUp size={14} className="text-gray-100" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">{match.homeTeam}</span>
                        <span className="text-white font-bold">{match.homeScore}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-white">{match.awayTeam}</span>
                        <span className="text-white font-bold">{match.awayScore}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 justify-end items-center gap-0.5">
                      <button
                        className="bg-gray-700 flex items-center justify-evenly text-green-500 font-medium hover:bg-gray-700 px-4 py-2"
                        onClick={() => addBet({
                          id: `live-${match.id}-1`,
                          event: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: '1X2',
                          pick: '1',
                          odds: match.odds.home
                        })}
                        title={`Bet on ${match.homeTeam} to win`}
                      >
                        <div className="text-base">1</div>
                        <div>{match.odds.home}</div>
                      </button>
                      <button
                        className="bg-gray-700 flex items-center justify-evenly text-green-500 font-medium hover:bg-gray-700 px-4 py-2"
                        onClick={() => addBet({
                          id: `live-${match.id}-x`,
                          event: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: '1X2',
                          pick: 'X',
                          odds: match.odds.draw
                        })}
                        title="Bet on draw"
                      >
                        <div className="text-base">X</div>
                        <div>{match.odds.draw}</div>
                      </button>
                      <button
                        className="bg-gray-700 flex items-center justify-evenly text-green-500 font-medium hover:bg-gray-700 px-4 py-2"
                        onClick={() => addBet({
                          id: `live-${match.id}-2`,
                          event: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: '1X2',
                          pick: '2',
                          odds: match.odds.away
                        })}
                        title={`Bet on ${match.awayTeam} to win`}
                      >
                        <div className="text-base">2</div>
                        <div>{match.odds.away}</div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="px-4 py-4 text-right">
              <Link to="/live-betting" className="text-green-600 text-sm font-medium hover:text-green-700">
                All live matches ›
              </Link>
            </div>
          </div>
        </div>

        {/* Sports Section */}
        <div className="bg-white">
          {/* Sports Navigation */}
          <div className="flex items-center justify-between px-2 gap-2 py-2 border-b border-gray-200">
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
              className="text-gray-400 hover:text-gray-600 border"
              onClick={() => setShowOddsFilter(!showOddsFilter)}
              title="Filter options"
            >
              <Settings2 size={20} className="" />
            </button>
          </div>

          {/* Section Tabs */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
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
          <div className="flex items-center justify-between px-4  bg-gray-50 border-b border-gray-200 ">
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

            {/* 1up/2up Toggle */}
            <div className="flex items-center p-1">
              <hr className="w-5 h-0.5 rotate-90" />
              <button
                onClick={() => setOddsDisplay("1up")}
                className={`p-1 text-xs rounded-full transition-colors ${oddsDisplay === "1up" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                title="Show single odds format"
              >
                1up
              </button>
              <button
                onClick={() => setOddsDisplay("2up")}
                className={`p-1 text-xs rounded-full transition-colors ${oddsDisplay === "2up" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                title="Show dual odds format"
              >
                2up
              </button>
            </div>
          </div>

          {/* Date Header */}
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">04/10 Saturday</span>
              <div className="grid grid-cols-3 w-40 -mr-2 gap-5 py-1">
                <p>1</p>
                <p>X</p>
                <p>2</p>
              </div>
            </div>
          </div>

          {/* Match Listings */}
          <div className="divide-y divide-gray-200">
            {/* Match 1 - Inter vs US Cremonese */}
            <div className="px-4 py-3 ">
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center justify-between mb-2 ">
                  <div className="flex items-center absolute top-0 -left-4 w-36 z-10">
                    <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                    <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs line-clamp-4">
                  <span>16:00</span>
                  <span>ID 28111</span>
                  <span>Italy - Serie A</span>
                  <TrendingUp size={13} className="text-gray-800" />
                </div>
              </div>
              <div className="flex items-center justify-between">
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
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center justify-between mb-2 ">
                  <div className="flex items-center absolute top-0 -left-4 w-36 z-10">
                    <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                    <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs line-clamp-2">
                  <span>16:00</span>
                  <span>ID 28111</span>
                  <span>English - Premier League</span>
                  <TrendingUp size={13} className="text-gray-800" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-gray-800 text-sm font-medium">Chelsea</div>
                  <div className="text-gray-800 text-sm">Liverpool</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-red-500 text-xs">+1315</span>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">📊</span>
                    </div>

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
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center justify-between mb-2 ">
                  <div className="flex items-center absolute top-0 -left-4 w-36 z-10">
                    <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                    <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs">
                  <span>16:30</span>
                  <span>ID 45639</span>
                  <span>Spain - LaLiga</span>
                  <TrendingUp size={13} className="text-gray-800" />
                </div>
              </div>
              <div className="flex items-center justify-between">
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

            {/* Match 4 - Eintracht Frankfurt vs Bayern Munich */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center justify-between mb-2 ">
                  <div className="flex items-center absolute top-0 -left-4 w-36 z-10">
                    <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                    <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs">
                  <span>16:30</span>
                  <span>ID 25918</span>
                  <span>Germany - Bundesl...</span>
                  <TrendingUp size={13} className="text-gray-800" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-gray-800 text-sm font-medium">Eintracht Frankfurt</div>
                  <div className="text-gray-800 text-sm">Bayern Munich</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-red-500 text-xs">+1225</span>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🔥</span>
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">📊</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium flex items-center hover:bg-green-200 transition-colors"
                    onClick={() => handleOddsClick("frankfurt-bayern", "1", "6.65", "Eintracht Frankfurt", "Bayern Munich")}
                  >
                    6.65
                    <span className="text-green-600 ml-1">↓</span>
                  </button>
                  <button
                    className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium flex items-center hover:bg-green-200 transition-colors"
                    onClick={() => handleOddsClick("frankfurt-bayern", "X", "6.04", "Eintracht Frankfurt", "Bayern Munich")}
                  >
                    6.04
                    <span className="text-green-600 ml-1">↓</span>
                  </button>
                  <button
                    className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium flex items-center hover:bg-green-200 transition-colors"
                    onClick={() => handleOddsClick("frankfurt-bayern", "2", "1.42", "Eintracht Frankfurt", "Bayern Munich")}
                  >
                    1.42
                    <span className="text-red-500 ml-1">↑</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Match 5 - Atalanta */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center justify-between mb-2 ">
                  <div className="flex items-center absolute top-0 -left-4 w-36 z-10">
                    <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                    <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs">
                  <span>18:45</span>
                  <span>ID 27661</span>
                  <span>Italy - Serie A</span>
                  <TrendingUp size={13} className="text-gray-800" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-gray-800 text-sm font-medium">Atalanta</div>
                  <div className="text-gray-800 text-sm">Genoa</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                    onClick={() => handleOddsClick("atalanta-genoa", "1", "1.33", "Atalanta", "Genoa")}
                  >
                    1.33
                  </button>
                  <button
                    className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                    onClick={() => handleOddsClick("atalanta-genoa", "X", "5.25", "Atalanta", "Genoa")}
                  >
                    5.25
                  </button>
                  <button
                    className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                    onClick={() => handleOddsClick("atalanta-genoa", "2", "9.25", "Atalanta", "Genoa")}
                  >
                    9.25
                  </button>
                </div>
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
                  <div className="border-l-2 border-green-500">
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

            {/* International Clubs - UEFA Champions League */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("International Clubs - UEFA Champions League")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["International Clubs - UEFA Champions League"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">International Clubs - UEFA Champions League</span>
                </div>
                <span className="text-gray-400 text-sm">18</span>
              </button>

              {expandedLeagues["International Clubs - UEFA Champions League"] && (
                <div className="mt-3 ml-2 space-y-3">
                  {/* Sample match 1 in Champions League */}
                  <div className="border-l-2 border-blue-500">
                    <div className="flex items-center justify-between mb-2 overflow-hidden relative">
                      <div className="flex items-center justify-between mb-2 ">
                        <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                          <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                          <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs">
                        <span>20:00</span>
                        <span>ID 28456</span>
                        <span>UEFA Champions League</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4">
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">Real Madrid</div>
                        <div className="text-gray-800 text-sm">Barcelona</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-red-500 text-xs">+2100</span>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🔥</span>
                          </div>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📊</span>
                          </div>
                          <span className="text-gray-400 text-xs ml-auto">Comments 45</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("real-barca", "1", "2.80", "Real Madrid", "Barcelona")}
                        >
                          2.80
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("real-barca", "X", "3.20", "Real Madrid", "Barcelona")}
                        >
                          3.20
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("real-barca", "2", "2.65", "Real Madrid", "Barcelona")}
                        >
                          2.65
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sample match 2 in Champions League */}
                  <div className="border-l-2 border-blue-500">
                    <div className="flex items-center justify-between mb-2 overflow-hidden relative">
                      <div className="flex items-center justify-between mb-2 ">
                        <div className="flex items-center absolute top-0 left-0 w-36 z-10">
                          <span className="bg-red-500 italic text-white text-xs font-medium px-1  skew-8 -rotate-8">HOT 🔥</span>
                          <span className="bg-green-500 italic text-white text-xs font-medium px-1 skew-8 -rotate-8">BEST ODDS 💰</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs">
                        <span>20:00</span>
                        <span>ID 28789</span>
                        <span>UEFA Champions League</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4">
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">Manchester City</div>
                        <div className="text-gray-800 text-sm">PSG</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-red-500 text-xs">+1890</span>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🔥</span>
                          </div>
                          <span className="text-gray-400 text-xs ml-auto">Comments 28</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("city-psg", "1", "1.95", "Manchester City", "PSG")}
                        >
                          1.95
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("city-psg", "X", "3.60", "Manchester City", "PSG")}
                        >
                          3.60
                        </button>
                        <button
                          className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                          onClick={() => handleOddsClick("city-psg", "2", "3.85", "Manchester City", "PSG")}
                        >
                          3.85
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* International - World Cup Qualification UEFA */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("International - World Cup Qualification UEFA")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["International - World Cup Qualification UEFA"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">International - World Cup Qualification UEFA</span>
                </div>
                <span className="text-gray-400 text-sm">19</span>
              </button>
            </div>

            {/* England - EFL Cup */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("England - EFL Cup")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["England - EFL Cup"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">England - EFL Cup</span>
                </div>
                <span className="text-gray-400 text-sm">8</span>
              </button>
            </div>

            {/* Spain - LaLiga */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("Spain - LaLiga")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["Spain - LaLiga"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">Spain - LaLiga</span>
                </div>
                <span className="text-gray-400 text-sm">17</span>
              </button>
            </div>

            {/* Germany - Bundesliga */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("Germany - Bundesliga")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["Germany - Bundesliga"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">Germany - Bundesliga</span>
                </div>
                <span className="text-gray-400 text-sm">13</span>
              </button>
            </div>

            {/* Italy - Serie A */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("Italy - Serie A")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["Italy - Serie A"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">Italy - Serie A</span>
                </div>
                <span className="text-gray-400 text-sm">17</span>
              </button>
            </div>

            {/* France - Ligue 1 */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("France - Ligue 1")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["France - Ligue 1"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">France - Ligue 1</span>
                </div>
                <span className="text-gray-400 text-sm">16</span>
              </button>
            </div>

            {/* International Clubs - UEFA Europa League */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("International Clubs - UEFA Europa League")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["International Clubs - UEFA Europa League"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">International Clubs - UEFA Europa League</span>
                </div>
                <span className="text-gray-400 text-sm">18</span>
              </button>
            </div>

            {/* Spain - Copa del Rey */}
            <div className="px-4 py-3">
              <button
                onClick={() => toggleLeague("Spain - Copa del Rey")}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedLeagues["Spain - Copa del Rey"] ? "rotate-90" : ""
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">Spain - Copa del Rey</span>
                </div>
                <span className="text-gray-400 text-sm">7</span>
              </button>
            </div>
          </div>

          {/* View More Button */}
          <div className="px-4 py-4 text-center border-t border-gray-200">
            <Link to="/virtuals" className="text-green-600 text-sm font-medium hover:text-green-700">
              View More ›
            </Link>
          </div>
        </div>

        {/* Grand Prize Winners */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Grand Prize Winners</h2>
            <Link to="/live" className="text-green-400 text-sm">View More ›</Link>
          </div>
          <div ref={grandPrizeCarouselRef} className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {[
              { amount: "GHS7,236.76", winner: "20****774 won", time: "4 min ago", game: "in Sports" },
              { amount: "GHS3,306.00", winner: "24****346 won", time: "4 min ago", game: "in Sports" },
              { amount: "GHS3,800.50", winner: "55****288 won", time: "4 min ago", game: "in Sports" }
            ].map((prize, index) => (
              <div key={index} className="flex-shrink-0 w-48 bg-gray-800 rounded-lg p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent"></div>
                <div className="relative z-10">
                  <div className="text-green-400 font-bold text-lg">{prize.amount}</div>
                  <div className="text-gray-300 text-sm">{prize.winner}</div>
                  <div className="text-gray-400 text-xs">{prize.game}</div>
                  <div className="text-gray-500 text-xs mt-1">{prize.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Odds Filter Popup */}
        {showOddsFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Filter Odds</h3>
                <button
                  onClick={() => setShowOddsFilter(false)}
                  title="Close odds filter"
                  aria-label="Close odds filter"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Odds Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["1X2", "O/U", "DC", "Handicap", "GG/NG", "Both Teams to Score"].map((format) => (
                      <button
                        key={format}
                        className={`p-2 text-sm rounded ${activeOddsFormat === format ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        onClick={() => setActiveOddsFormat(format)}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Odds</label>
                  <input
                    type="range"
                    min="1.01"
                    max="10.00"
                    step="0.01"
                    className="w-full"
                    title="Minimum odds range"
                    aria-label="Minimum odds range"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1.01</span>
                    <span>10.00</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Odds</label>
                  <input
                    type="range"
                    min="1.01"
                    max="50.00"
                    step="0.01"
                    className="w-full"
                    title="Maximum odds range"
                    aria-label="Maximum odds range"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1.01</span>
                    <span>50.00</span>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-500"
                    onClick={() => setShowOddsFilter(false)}
                  >
                    Clear
                  </button>
                  <button
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    onClick={() => setShowOddsFilter(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
      {/* Modals - Shared between desktop and mobile */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      <Shortcuts
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* Promotional Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm mx-auto">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 rounded-t-lg overflow-hidden z-10">
              <div
                className={`h-full bg-white ${styles.progressBarDynamic}`}
                style={{ '--progress-width': `${progressWidth}%` }.CSSProperties}
              ></div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPromoModal(false)}
              title="Close promotional modal"
              aria-label="Close promotional modal"
              className="absolute top-4 right-4 z-20 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="bg-gradient-to-b from-blue-600 via-blue-700 to-red-600 rounded-lg overflow-hidden relative">
              {/* Header Text */}
              <div className="absolute top-6 left-4 z-10">
                <h2 className="text-white text-lg font-bold">
                  {selectedLeague === 'Premier League' ? 'Ligue 1' : selectedLeague}
                </h2>
              </div>

              {/* Player Images */}
              <div className="relative h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-600 opacity-80"></div>

                {/* Left Player */}
                <div className="absolute left-8 top-16 z-10">
                  <div className="w-32 h-40 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-32 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">RC</span>
                    </div>
                  </div>
                </div>

                {/* Right Player */}
                <div className="absolute right-8 top-16 z-10">
                  <div className="w-32 h-40 bg-cyan-400 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-32 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">OM</span>
                    </div>
                  </div>
                </div>

                {/* Center Logo Text */}
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10">
                  <h1 className="text-white text-3xl font-bold tracking-wider">
                    {selectedLeague === 'Premier League' ? 'LIGUE 1' : selectedLeague.toUpperCase()}
                  </h1>
                </div>

                {/* Team Logos */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
                  {/* Left Team Logo */}
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                    <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">RC</span>
                    </div>
                  </div>

                  {/* VS Divider */}
                  <div className="w-1 h-12 bg-white"></div>

                  {/* Right Team Logo */}
                  <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center border-2 border-white">
                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">OM</span>
                    </div>
                  </div>
                </div>

                {/* Star Icon */}
                <div className="absolute top-20 right-20 z-10">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bet Now Button */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg transition-colors"
                  onClick={() => {
                    setShowPromoModal(false);
                    // Navigate to the specific league or betting page
                  }}
                >
                  BET NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sports;