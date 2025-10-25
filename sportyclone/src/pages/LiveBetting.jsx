import Header from "@/components/Header";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import DesktopBetslip from "@/components/DesktopBetslip";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import { Tv2, Gamepad2, CircleDot, Trophy, X, ArrowLeft, House, TrendingUp, LayoutGrid } from "lucide-react";
import { FaFutbol, FaGamepad, FaBasketball, FaTableTennisPaddleBall, FaHockeyPuck, FaVolleyball, FaFootball, FaBaseball, FaBullseye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import MiniGames from "@/components/MiniGames";
import { useBets } from "@/hooks/useBets";

const LiveBetting = () => {
  const { addBet } = useBets();
  const navigate = useNavigate();
  // State for active sport and day
  const [activeSport, setActiveSport] = useState('Cricket');
  const [activeDay, setActiveDay] = useState('today');
  const [showBetslip, setShowBetslip] = useState(false);
  const [showMarketFilter, setShowMarketFilter] = useState(false);
  const [selectedMarkets, setSelectedMarkets] = useState(['1X2']);
  const [activeOddsFormat, setActiveOddsFormat] = useState("1X2");
  const [collapsedLeagues, setCollapsedLeagues] = useState(new Set());
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showMarketSidebar, setShowMarketSidebar] = useState(false);
  const [oddsDisplay, setOddsDisplay] = useState('1up');
  const [sortBy, setSortBy] = useState('leagues');
  const [selectedMarketTypes, setSelectedMarketTypes] = useState(['1X2']);
  const [showSportyTV, setShowSportyTV] = useState(true);
  const [showSportyFM, setShowSportyFM] = useState(false);

  // Handle market type selection
  const handleMarketTypeToggle = (marketType) => {
    setSelectedMarketTypes(prev => {
      if (prev.includes(marketType)) {
        return prev.filter(m => m !== marketType);
      } else {
        return [...prev, marketType];
      }
    });
  };

  // Handle sort option change
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setShowSortModal(false);
  };

  // Ensure DOM is ready before any potential DOM operations
  useEffect(() => {
    const timer = setTimeout(() => {
      // Any DOM-dependent operations can go here if needed
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Sports data with matches
  const sports= [
    {
      name: "Football", count: 62, icon: <FaFutbol className="w-4 h-4" />, match: { title: "Kaizer Chiefs vs Sekhukhune Utd", odds: [{ pick: "Home", v: "2.05" }, { pick: "Draw", v: "3.10" }, { pick: "Away", v: "3.25" }] }, matches: [
        { title: "Kaizer Chiefs vs Sekhukhune Utd", time: "2nd 89:43", score: "1 - 3", odds: [{ pick: "Home", v: "2.05" }, { pick: "Away", v: "1.75" }] },
        { title: "Hearts vs Kotoko", time: "1st 30:12", score: "0 - 0", odds: [{ pick: "Home", v: "1.90" }, { pick: "Away", v: "2.05" }] },
        { title: "Chelsea vs Spurs", time: "2nd 75:10", score: "2 - 1", odds: [{ pick: "Home", v: "1.65" }, { pick: "Away", v: "2.40" }] },
      ]
    },
    {
      name: "vFootball", count: 29, icon: <FaGamepad className="w-4 h-4" />, match: { title: "Sporty Cup Final", odds: [{ pick: "Team A", v: "1.85" }, { pick: "Team B", v: "2.00" }] }, matches: [
        { title: "Sporty Cup Final", time: "2nd 65:20", score: "1 - 0", odds: [{ pick: "Team A", v: "1.85" }, { pick: "Team B", v: "2.00" }] },
        { title: "Sporty Semifinal", time: "1st 22:10", score: "0 - 1", odds: [{ pick: "Team A", v: "2.10" }, { pick: "Team B", v: "1.75" }] },
        { title: "Sporty League", time: "2nd 80:02", score: "2 - 2", odds: [{ pick: "Team A", v: "1.95" }, { pick: "Team B", v: "1.95" }] },
      ]
    },
    { name: "Basketball", count: 33, icon: <FaBasketball className="w-4 h-4" />, match: { title: "Lakers vs Celtics", odds: [{ pick: "Lakers", v: "1.70" }, { pick: "Celtics", v: "2.10" }] } },
    {
      name: "Tennis", count: 26, icon: <FaTableTennisPaddleBall className="w-4 h-4" />, match: { title: "Ogura K. vs Yoshimoto A.", odds: [{ pick: "Ogura", v: "1.57" }, { pick: "Yoshimoto", v: "2.35" }] }, matches: [
        { title: "WTA 125K Tolentino", time: "set 2 03:30", score: "1 - 0", odds: [{ pick: "Home", v: "2.05" }, { pick: "Away", v: "1.70" }] },
        { title: "Challenger Columbus", time: "set 2 10:20", score: "0 - 1", odds: [{ pick: "Home", v: "1.95" }, { pick: "Away", v: "1.85" }] },
        { title: "ATP Challenger Lima", time: "set 1 05:12", score: "0 - 0", odds: [{ pick: "Home", v: "2.25" }, { pick: "Away", v: "1.66" }] },
      ]
    },
    {
      name: "eFootball", count: 12, icon: <FaGamepad className="w-4 h-4" />, match: { title: "eLiga Finals", odds: [{ pick: "Home", v: "1.90" }, { pick: "Away", v: "1.90" }] }, matches: [
        { title: "eLiga Finals", time: "2nd 50:43", score: "3 - 3", odds: [{ pick: "Home", v: "1.90" }, { pick: "Away", v: "1.90" }] },
        { title: "eLiga Semis", time: "1st 30:01", score: "0 - 0", odds: [{ pick: "Home", v: "2.05" }, { pick: "Away", v: "1.80" }] },
      ]
    },
    {
      name: "Table Tennis", count: 16, icon: <FaTableTennisPaddleBall className="w-4 h-4" />, match: { title: "International TT Cup", odds: [{ pick: "Home", v: "2.00" }, { pick: "Away", v: "1.70" }] }, matches: [
        { title: "International TT Cup", time: "set 3 04:21", score: "1 - 1", odds: [{ pick: "Home", v: "2.00" }, { pick: "Away", v: "1.70" }] },
        { title: "National Series", time: "set 1 02:18", score: "0 - 0", odds: [{ pick: "Home", v: "1.85" }, { pick: "Away", v: "2.05" }] },
      ]
    },
    {
      name: "eBasketball", count: 11, icon: <FaGamepad className="w-4 h-4" />, match: { title: "eHoops Grand", odds: [{ pick: "Team A", v: "1.65" }, { pick: "Team B", v: "2.20" }] }, matches: [
        { title: "eHoops Grand", time: "Q4 03:45", score: "88 - 90", odds: [{ pick: "Team A", v: "2.10" }, { pick: "Team B", v: "1.75" }] },
        { title: "eHoops League", time: "Q2 07:12", score: "42 - 39", odds: [{ pick: "Team A", v: "1.80" }, { pick: "Team B", v: "2.05" }] },
      ]
    },
    {
      name: "Ice Hockey", count: 9, icon: <FaHockeyPuck className="w-4 h-4" />, match: { title: "Jokers vs Blades", odds: [{ pick: "Home", v: "2.40" }, { pick: "Away", v: "1.55" }] }, matches: [
        { title: "Jokers vs Blades", time: "P3 05:20", score: "2 - 3", odds: [{ pick: "Home", v: "2.40" }, { pick: "Away", v: "1.55" }] },
        { title: "Bears vs Wolves", time: "P2 12:10", score: "1 - 1", odds: [{ pick: "Home", v: "1.95" }, { pick: "Away", v: "1.90" }] },
      ]
    },
    {
      name: "Handball", count: 21, icon: <CircleDot className="w-4 h-4" />, match: { title: "Berlin vs Kiel", odds: [{ pick: "Home", v: "1.90" }, { pick: "Away", v: "1.90" }] }, matches: [
        { title: "Berlin vs Kiel", time: "2nd 20:55", score: "26 - 26", odds: [{ pick: "Home", v: "1.90" }, { pick: "Away", v: "1.90" }] },
        { title: "Veszprem vs Paris", time: "1st 18:02", score: "12 - 10", odds: [{ pick: "Home", v: "1.70" }, { pick: "Away", v: "2.20" }] },
      ]
    },
    {
      name: "Volleyball", count: 14, icon: <FaVolleyball className="w-4 h-4" />, match: { title: "Zenit vs Perugia", odds: [{ pick: "Home", v: "2.35" }, { pick: "Away", v: "1.60" }] }, matches: [
        { title: "Zenit vs Perugia", time: "set 4", score: "2 - 1", odds: [{ pick: "Zenit", v: "2.35" }, { pick: "Perugia", v: "1.60" }] },
        { title: "Modena vs Trentino", time: "set 2", score: "1 - 0", odds: [{ pick: "Modena", v: "1.85" }, { pick: "Trentino", v: "2.05" }] },
      ]
    },
    {
      name: "Baseball", count: 5, icon: <FaBaseball className="w-4 h-4" />, match: { title: "Yankees vs Red Sox", odds: [{ pick: "Home", v: "1.85" }, { pick: "Away", v: "2.05" }] }, matches: [
        { title: "Yankees vs Red Sox", time: "B8", score: "5 - 4", odds: [{ pick: "Yankees", v: "1.85" }, { pick: "Red Sox", v: "2.05" }] },
        { title: "Dodgers vs Giants", time: "T6", score: "1 - 1", odds: [{ pick: "Dodgers", v: "1.90" }, { pick: "Giants", v: "1.90" }] },
      ]
    },
    {
      name: "American Football", count: 7, icon: <FaFootball className="w-4 h-4" />, match: { title: "Giants vs Eagles", odds: [{ pick: "Giants", v: "2.20" }, { pick: "Eagles", v: "1.65" }] }, matches: [
        { title: "Giants vs Eagles", time: "Q4 02:11", score: "21 - 24", odds: [{ pick: "Giants", v: "2.20" }, { pick: "Eagles", v: "1.65" }] },
        { title: "Cowboys vs 49ers", time: "Q2 07:45", score: "10 - 13", odds: [{ pick: "Cowboys", v: "2.05" }, { pick: "49ers", v: "1.80" }] },
      ]
    },
    {
      name: "Cricket", count: 9, icon: <Trophy className="w-4 h-4" />, match: { title: "India vs Australia", odds: [{ pick: "India", v: "1.75" }, { pick: "Australia", v: "2.05" }] }, matches: [
        { title: "India vs Australia", time: "Ov 42.3", score: "245/6", odds: [{ pick: "India", v: "1.75" }, { pick: "Australia", v: "2.05" }] },
        { title: "England vs SA", time: "Ov 18.1", score: "132/2", odds: [{ pick: "England", v: "1.60" }, { pick: "SA", v: "2.30" }] },
      ]
    },
    {
      name: "Darts", count: 6, icon: <FaBullseye className="w-4 h-4" />, match: { title: "Premier League Night", odds: [{ pick: "Player A", v: "1.95" }, { pick: "Player B", v: "1.85" }] }, matches: [
        { title: "Premier League Night", time: "Leg 7", score: "3 - 3", odds: [{ pick: "A", v: "1.95" }, { pick: "B", v: "1.85" }] },
        { title: "Masters", time: "Leg 3", score: "2 - 1", odds: [{ pick: "A", v: "1.80" }, { pick: "B", v: "2.00" }] },
      ]
    },
    {
      name: "MMA", count: 4, icon: <CircleDot className="w-4 h-4" />, match: { title: "UFC Main Card", odds: [{ pick: "Fighter A", v: "1.60" }, { pick: "Fighter B", v: "2.40" }] }, matches: [
        { title: "UFC Main Card", time: "Rd 3 02:12", score: "F1 vs F2", odds: [{ pick: "F1", v: "1.60" }, { pick: "F2", v: "2.40" }] },
        { title: "UFC Prelims", time: "Rd 2 04:50", score: "F3 vs F4", odds: [{ pick: "F3", v: "1.95" }, { pick: "F4", v: "1.85" }] },
      ]
    },
    {
      name: "Badminton", count: 5, icon: <Trophy className="w-4 h-4" />, match: { title: "Super Series", odds: [{ pick: "Home", v: "1.70" }, { pick: "Away", v: "2.10" }] }, matches: [
        { title: "Super Series", time: "G2", score: "1 - 0", odds: [{ pick: "Home", v: "1.70" }, { pick: "Away", v: "2.10" }] },
        { title: "Open", time: "G1", score: "0 - 0", odds: [{ pick: "Home", v: "1.85" }, { pick: "Away", v: "2.00" }] },
      ]
    },
    {
      name: "Beach Volleyball", count: 3, icon: <FaVolleyball className="w-4 h-4" />, match: { title: "FIVB Finals", odds: [{ pick: "Home", v: "2.15" }, { pick: "Away", v: "1.72" }] }, matches: [
        { title: "FIVB Finals", time: "set 3", score: "1 - 1", odds: [{ pick: "Home", v: "2.15" }, { pick: "Away", v: "1.72" }] },
        { title: "FIVB Bronze", time: "set 1", score: "0 - 0", odds: [{ pick: "Home", v: "1.90" }, { pick: "Away", v: "1.90" }] },
      ]
    },
    {
      name: "Futsal", count: 8, icon: <FaFootball className="w-4 h-4" />, match: { title: "Porto vs Benfica", odds: [{ pick: "Home", v: "2.10" }, { pick: "Away", v: "1.75" }] }, matches: [
        { title: "Porto vs Benfica", time: "2nd 10:55", score: "2 - 3", odds: [{ pick: "Home", v: "2.10" }, { pick: "Away", v: "1.75" }] },
        { title: "Sporting vs Braga", time: "1st 14:20", score: "1 - 0", odds: [{ pick: "Home", v: "1.85" }, { pick: "Away", v: "2.05" }] },
      ]
    },
    {
      name: "Rugby", count: 4, icon: <CircleDot className="w-4 h-4" />, match: { title: "Stormers vs Bulls", odds: [{ pick: "Home", v: "1.80" }, { pick: "Away", v: "2.05" }] }, matches: [
        { title: "Stormers vs Bulls", time: "2nd 55:33", score: "19 - 20", odds: [{ pick: "Home", v: "1.95" }, { pick: "Away", v: "1.90" }] },
        { title: "Leinster vs Munster", time: "1st 20:11", score: "7 - 6", odds: [{ pick: "Home", v: "1.80" }, { pick: "Away", v: "2.10" }] },
      ]
    },
    {
      name: "Snooker", count: 7, icon: <CircleDot className="w-4 h-4" />, match: { title: "Masters QF", odds: [{ pick: "Player A", v: "1.90" }, { pick: "Player B", v: "1.90" }] }, matches: [
        { title: "Masters QF", time: "Frame 5", score: "3 - 1", odds: [{ pick: "A", v: "1.70" }, { pick: "B", v: "2.10" }] },
        { title: "Open R16", time: "Frame 2", score: "1 - 1", odds: [{ pick: "A", v: "1.90" }, { pick: "B", v: "1.90" }] },
      ]
    },
    {
      name: "Basketball 3x3", count: 3, icon: <FaBasketball className="w-4 h-4" />, match: { title: "World Tour", odds: [{ pick: "Home", v: "1.75" }, { pick: "Away", v: "2.05" }] }, matches: [
        { title: "World Tour", time: "3:25", score: "17 - 18", odds: [{ pick: "Home", v: "2.05" }, { pick: "Away", v: "1.75" }] },
        { title: "Qualifier", time: "5:40", score: "9 - 7", odds: [{ pick: "Home", v: "1.85" }, { pick: "Away", v: "2.00" }] },
      ]
    },
    {
      name: "Counter-Strike", count: 12, icon: <Gamepad2 className="w-4 h-4" />, match: { title: "CS Major", odds: [{ pick: "Team A", v: "1.80" }, { pick: "Team B", v: "1.95" }] }, matches: [
        { title: "CS Major", time: "Map 3 R12", score: "13 - 10", odds: [{ pick: "A", v: "1.80" }, { pick: "B", v: "1.95" }] },
        { title: "CS Open", time: "Map 1 R5", score: "4 - 7", odds: [{ pick: "A", v: "2.10" }, { pick: "B", v: "1.75" }] },
      ]
    },
    {
      name: "Dota 2", count: 9, icon: <Gamepad2 className="w-4 h-4" />, match: { title: "The Grand", odds: [{ pick: "Radiant", v: "1.85" }, { pick: "Dire", v: "1.90" }] }, matches: [
        { title: "The Grand", time: "38:12", score: "R 24 - 19 D", odds: [{ pick: "Radiant", v: "1.85" }, { pick: "Dire", v: "1.90" }] },
        { title: "Regional", time: "22:40", score: "R 12 - 10 D", odds: [{ pick: "Radiant", v: "1.70" }, { pick: "Dire", v: "2.10" }] },
      ]
    },
    {
      name: "League of Legends", count: 14, icon: <Gamepad2 className="w-4 h-4" />, match: { title: "LCS Finals", odds: [{ pick: "Blue", v: "1.70" }, { pick: "Red", v: "2.10" }] }, matches: [
        { title: "LCS Finals", time: "Game 4", score: "Blue 1 - 2 Red", odds: [{ pick: "Blue", v: "1.70" }, { pick: "Red", v: "2.10" }] },
        { title: "LEC", time: "Game 2", score: "Blue 1 - 0 Red", odds: [{ pick: "Blue", v: "1.80" }, { pick: "Red", v: "2.00" }] },
      ]
    },
  ];

  const markets = [
    { name: "2nd set - winner", left: "Home", lOdds: "1.29", right: "Away", rOdds: "3.25" },
    { name: "3rd set - winner", left: "Home", lOdds: "1.57", right: "Away", rOdds: "2.25" },
    { name: "set 2 game 8 - winner", left: "Home", lOdds: "3.05", right: "Away", rOdds: "1.31" },
    { name: "set 2 game 9 - winner", left: "Home", lOdds: "2.22", right: "Away", rOdds: "1.56" },
    { name: "Total games 22.5", left: "Over 22.5", lOdds: "2.62", right: "Under 22.5", rOdds: "1.41" },
  ];

  // Market filter data based on images
  const marketCategories = {
    Main: [
      { name: "1X2", active: false },
      { name: "Over/Under", active: false },
      { name: "1st Goal", active: false },
      { name: "Double Chance", active: false },
      { name: "Handicap", active: false },
      { name: "GG/NG", active: false },
      { name: "GG/NG 2+", active: false },
      { name: "Draw No Bet", active: false },
      { name: "Home No Bet", active: false },
      { name: "Away No Bet", active: false },
      { name: "Odd/Even", active: false }
    ],
    Goals: [
      { name: "Home Over/Under", active: false },
      { name: "1st Half - Home O/U", active: false },
      { name: "Home Team Odd/Even", active: false },
      { name: "Away Over/Under", active: false },
      { name: "1st Half - Away O/U", active: false },
      { name: "Away Team Odd/Even", active: false }
    ],
    Half: [
      { name: "1st Half - 1X2", active: false },
      { name: "1st Half - Over/Under", active: false },
      { name: "1st Half - Next Goal", active: false },
      { name: "1st Half - Double Chance", active: false },
      { name: "1st Half Handicap", active: false },
      { name: "1st Half - Draw No Bet", active: false }
    ],
    Bookings: [
      { name: "Bookings 1X2", active: false },
      { name: "Bookings - Over/Under", active: false }
    ],
    Corners: [
      { name: "Corners 1X2", active: false },
      { name: "Corners - Over/Under", active: false }
    ]
  };

  const handleMarketToggle = (marketName) => {
    setSelectedMarkets(prev =>
      prev.includes(marketName)
        ? prev.filter(name => name !== marketName)
        : [...prev, marketName]
    );
  };

  const toggleLeague = (leagueName) => {
    setCollapsedLeagues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leagueName)) {
        newSet.delete(leagueName);
      } else {
        newSet.add(leagueName);
      }
      return newSet;
    });
  };

  const toggleAllLeagues = () => {
    if (allCollapsed) {
      setCollapsedLeagues(new Set());
      setAllCollapsed(false);
    } else {
      setCollapsedLeagues(new Set(['International Clubs - CONMEBOL Libertadores', 'Brazil - Brasileiro Serie B']));
      setAllCollapsed(true);
    }
  };

  // Dynamic match data based on active sport and odds format
  const getDynamicMatches = () => {
    const allSportsMatches = {
      'Cricket': {
        'International - ICC World Cup': [
          {
            id: 'cricket-1',
            homeTeam: 'India',
            awayTeam: 'Australia',
            time: '45:12 1st Innings',
            odds: activeOddsFormat === '1X2' ? ['2.10', '3.20', '2.80'] : activeOddsFormat === 'O/U' ? ['1.90', '1.90'] : ['2.00', '1.80'],
            badges: ['HOT 🔥']
          }
        ],
        'England - County Championship': [
          {
            id: 'cricket-2',
            homeTeam: 'Yorkshire',
            awayTeam: 'Lancashire',
            time: '23:45 2nd Innings',
            odds: activeOddsFormat === '1X2' ? ['1.85', '3.50', '3.20'] : activeOddsFormat === 'O/U' ? ['1.75', '2.05'] : ['1.95', '1.85'],
            badges: ['HOT 🔥'],
          },
        ],
      },
      'Darts': {
        'PDC - Premier League': [
          {
            id: 'darts-1',
            homeTeam: 'Michael Smith',
            awayTeam: 'Gerwyn Price',
            time: 'Set 3 - Leg 2',
            odds: activeOddsFormat === '1X2' ? ['2.45', '3.10', '2.65'] : activeOddsFormat === 'O/U' ? ['1.80', '2.00'] : ['2.20', '1.70'],
            badges: ['HOT 🔥'],
          },
        ],
      },
      'MMA': {
        'UFC - Main Event': [
          {
            id: 'mma-1',
            homeTeam: 'Jon Jones',
            awayTeam: 'Stipe Miocic',
            time: 'Round 2 - 3:45',
            odds: activeOddsFormat === '1X2' ? ['1.65', '4.20', '4.80'] : activeOddsFormat === 'O/U' ? ['2.10', '1.75'] : ['1.90', '1.90'],
            badges: ['HOT 🔥']
          }
        ]
      },

      'Badminton': {
        'BWF - World Championships': [
          {
            id: 'badminton-1',
            homeTeam: 'Viktor Axelsen',
            awayTeam: 'Kento Momota',
            time: 'Set 2 - 15:12',
            odds: activeOddsFormat === '1X2' ? ['1.95', '3.40', '3.10'] : activeOddsFormat === 'O/U' ? ['1.85', '1.95'] : ['2.05', '1.75'],
            badges: ['HOT 🔥'],
          },
        ],
      },
      'Futsal': {
        'FIFA - Futsal World Cup': [
          {
            id: 'futsal-1',
            homeTeam: 'Brazil',
            awayTeam: 'Argentina',
            time: '28:15 1st Half',
            odds: activeOddsFormat === '1X2' ? ['2.20', '2.90', '2.70'] : activeOddsFormat === 'O/U' ? ['1.90', '1.90'] : ['2.15', '1.70'],
            badges: ['HOT 🔥']
          }
        ],
      },
      'Rugby': {
        'Six Nations Championship': [
          {
            id: 'rugby-1',
            homeTeam: 'England',
            awayTeam: 'Wales',
            time: '52:30 2nd Half',
            odds: activeOddsFormat === '1X2' ? ['1.75', '3.80', '3.50'] : activeOddsFormat === 'O/U' ? ['1.80', '2.00'] : ['2.00', '1.80'],
            badges: ['HOT 🔥'],
          },
        ],
      },
      'Football': {
        'International Clubs - CONMEBOL Libertadores': [
          {
            id: 'lib-1',
            homeTeam: 'Estudiantes de La Pl...',
            awayTeam: 'CR Flamengo RJ',
            time: '34:48 H1',
            odds: activeOddsFormat === '1X2' ? ['3.70', '2.45', '2.70'] : activeOddsFormat === 'O/U' ? ['1.85', '1.95'] : ['2.10', '1.75'],
            badges: ['HOT 🔥']
          }
        ],
        'Brazil - Brasileiro Serie B': [
          {
            id: 'bra-1',
            homeTeam: 'AC Goianiense GO',
            awayTeam: 'America FC MG',
            time: '34:34 H1',
            odds: activeOddsFormat === '1X2' ? ['2.20', '2.50', '4.80'] : activeOddsFormat === 'O/U' ? ['1.90', '1.90'] : ['2.30', '1.65'],
            badges: []
          },
          {
            id: 'bra-2',
            homeTeam: 'Chapecoense SC',
            awayTeam: 'Avai FC SC',
            time: '29:47 H1',
            odds: activeOddsFormat === '1X2' ? ['2.35', '2.65', '3.90'] : activeOddsFormat === 'O/U' ? ['1.75', '2.05'] : ['2.15', '1.70'],
            badges: []
          }
        ]
      }
    };

    return allSportsMatches[activeSport] || {};
  };

  // Filter and sort matches based on selected options
  const getFilteredAndSortedMatches = () => {
    const matches = getDynamicMatches();
    let filteredMatches = {};

    // Apply market filtering - for now, we'll show all matches but this can be extended
    // to filter based on available markets in each match
    Object.entries(matches).forEach(([leagueName, leagueMatches]) => {
      // Filter matches that have the selected market types
      const matchesWithSelectedMarkets = leagueMatches.filter(() => {
        // For now, assume all matches have 1X2, O/U, and other basic markets
        // In a real app, you'd check match.availableMarkets
        return selectedMarketTypes.length === 0 || selectedMarketTypes.includes('1X2');
      });

      if (matchesWithSelectedMarkets.length > 0) {
        filteredMatches[leagueName] = matchesWithSelectedMarkets;
      }
    });

    // Apply sorting
    if (sortBy === 'startTime') {
      // Sort leagues by earliest match time
      const sortedEntries = Object.entries(filteredMatches).sort(([, matchesA], [, matchesB]) => {
        const earliestA = Math.min(...matchesA.map(m => {
          // Extract time for sorting (simplified)
          const timeStr = m.time.split(' ')[0];
          return timeStr.includes(':') ? parseInt(timeStr.split(':')[0]) : 0;
        }));
        const earliestB = Math.min(...matchesB.map(m => {
          const timeStr = m.time.split(' ')[0];
          return timeStr.includes(':') ? parseInt(timeStr.split(':')[0]) : 0;
        }));
        return earliestA - earliestB;
      });
      filteredMatches = Object.fromEntries(sortedEntries);
    } else {
      // Sort by leagues alphabetically (default)
      const sortedEntries = Object.entries(filteredMatches).sort(([a], [b]) => a.localeCompare(b));
      filteredMatches = Object.fromEntries(sortedEntries);
    }

    // Apply SportyTV/SportyFM filtering
    if (showSportyTV || showSportyFM) {
      Object.keys(filteredMatches).forEach(leagueName => {
        filteredMatches[leagueName] = filteredMatches[leagueName].filter(match => {
          // Simulate some matches having SportyTV/SportyFM availability
          const hasSportyTV = match.id.includes('1') || match.badges.length > 0;
          const hasSportyFM = match.id.includes('2');
          
          return (showSportyTV && hasSportyTV) || (showSportyFM && hasSportyFM) || (!hasSportyTV && !hasSportyFM);
        });
      });
    }

    return filteredMatches;
  };

  const [activeTab, setActiveTab] = useState('single');
  const dayTabs = useMemo(() => [
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'thu', label: 'Thursday' },
    { key: 'fri', label: 'Friday' },
    { key: 'sat', label: 'Saturday' },
  ], []);

  // Filter matches based on active sport
  const filteredMatches = useMemo(()=> {
    if (activeSport === 'Football') {
      return [
        { name: 'Kaizer Chiefs vs Sekhukhune Utd', time: '20:00', league: 'Premier League', left: 'Kaizer Chiefs', right: 'Sekhukhune Utd', lOdds: '1.85', rOdds: '3.75', draw: '3.20' },
        { name: 'Orlando Pirates vs Mamelodi', time: '20:30', league: 'Premier League', left: 'Orlando Pirates', right: 'Mamelodi', lOdds: '2.10', rOdds: '3.30', draw: '3.00' },
      ];
    } else if (activeSport === 'vFootball') {
      return [
        { name: 'Sporty FC vs Virtual United', time: '21:00', league: 'Virtual League', left: 'Sporty FC', right: 'Virtual Utd', lOdds: '2.00', rOdds: '3.50', draw: '3.25' },
      ];
    } else if (activeSport === 'Basketball') {
      return [
        { name: 'Lakers vs Celtics', time: '22:00', league: 'NBA', left: 'Lakers', right: 'Celtics', lOdds: '1.95', rOdds: '1.85' },
      ];
    }
    return [];
  }, [activeSport]);

  // Handle navigation to match details
  const navigateToMatch = (matchId) => {
    // In a real app, this would navigate to match details
    console.log('Navigating to match:', matchId);
    // Example: router.push(`/match/${matchId}`);
  };

  // initialize tab from URL query
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get('tab');
    if (qp === 'multi' || qp === 'single' || qp === 'schedule') {
      setActiveTab(qp);
    }
  }, []);
  // write tab to URL (no navigation)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', activeTab);
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [activeTab]);

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col">
          <div className="flex bg-[#12171b] min-h-screen px-10">
            <div className="p-3 md:p-6">
              <div className="flex max-w-7xl gap-2 md:gap-4">

                {/* Left Sports Menu - Desktop Only */}
                <aside className="hidden md:block col-span-2 text-white sticky top-20 self-start">
                  <div className="rounded border border-white/10 overflow-visible">
                    <div className="px-4 py-2 bg-[#0f1418] font-semibold">SPORTS</div>
                    <ul className="divide-y divide-white/10 text-sm">
                      {sports.map((s, i) => (
                        <li
                          key={s.name}
                          tabIndex={0}
                          className={`relative px-4 py-3 flex items-center justify-between ${i === 3 ? 'bg-sporty-green text-white' : 'text-white/80 hover:bg-white/5'} cursor-pointer group focus:outline-none focus:bg-white/10`}
                        >
                          <span className="flex items-center gap-2">
                            {s.icon || <CircleDot className="w-4 h-4" />}
                            {s.name}
                          </span>
                          <span className="opacity-80">{s.count ?? ''}</span>
                          {/* Hover popup */}
                          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block group-focus-within:block z-50">
                            <div className="w-80 rounded border border-white/10 bg-[#0f1418] text-white shadow-lg">
                              <div className="px-3 py-2 border-b border-white/10 text-sm font-medium flex items-center justify-between">
                                <span>Current {s.name} Matches</span>
                                <span className="text-xs text-white/60">Live</span>
                              </div>
                              <div className="max-h-72 overflow-auto p-2 space-y-2">
                                {(s.matches ?? []).slice(0, 6).map((m, mi) => (
                                  <div key={mi} className="rounded border border-white/10 p-2 bg-[#12171b]">
                                    <div className="text-xs text-white/80 mb-1">{m.title}</div>
                                    <div className="flex items-center justify-between text-[11px] text-white/60 mb-2">
                                      <span>{m.time}</span>
                                      <span className="text-white">{m.score}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {m.odds.map((o, oi) => (
                                        <Button key={oi} size="sm" className="h-7 bg-sporty-green hover:bg-sporty-green-light justify-between" onClick={() => addBet({ id: `hover-${s.name}-${mi}-${oi}`, event: m.title, market: 'Live', pick: o.pick, odds: o.v })}>
                                          <span>{o.pick}</span>
                                          <span className="ml-2">{o.v}</span>
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                {/* Fallback to single match odds if no list */}
                                {!s.matches && s.match && (
                                  <div className="p-2">
                                    <div className="text-xs text-white/80 mb-2">{s.match.title}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {s.match.odds.map((o, oi) => (
                                        <Button key={oi} size="sm" className="h-7 bg-sporty-green hover:bg-sporty-green-light justify-between" onClick={() => addBet({ id: `hover-${s.name}-${oi}`, event: s.match?.title || '', market: 'Winner', pick: o.pick, odds: o.v })}>
                                          <span>{o.pick}</span>
                                          <span className="ml-2">{o.v}</span>
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                {/* Center Content */}
                <main className=" w-full space-y-4">
                  {/* Tabs */}
                  <div className="text-white flex items-center gap-3 md:gap-6 border-b border-white/10 overflow-x-auto">
                    <button onClick={() => setActiveTab('multi')} className={`py-2 px-1 whitespace-nowrap text-sm md:text-base ${activeTab === 'multi' ? 'border-b-2 border-sporty-green text-sporty-green' : 'text-white/60'}`} title="Multi View">Multi View</button>
                    <button onClick={() => setActiveTab('single')} className={`py-2 px-1 whitespace-nowrap text-sm md:text-base ${activeTab === 'single' ? 'border-b-2 border-sporty-green text-sporty-green' : 'text-white/60'}`} title="Single View">Single View</button>
                    <button onClick={() => setActiveTab('schedule')} className={`py-2 px-1 whitespace-nowrap text-sm md:text-base ${activeTab === 'schedule' ? 'border-b-2 border-sporty-green text-sporty-green' : 'text-white/60'}`} title="Schedule">Schedule</button>
                  </div>

                  {/* Header banner */}
                  <div className="rounded bg-gradient-to-r from-[#0f2a22] to-[#0c1f19] text-white p-3 md:p-4">
                    <h1 className="text-xl md:text-2xl font-bold">{activeTab === 'multi' ? 'Multi View' : activeTab === 'schedule' ? 'Schedule' : 'Single View'}
                    </h1>
                  </div>

                  {activeTab === 'multi' && (
                    <section className="rounded border border-white/10 bg-[#0f1418] text-white">
                      {/* sport filter row */}
                      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2 md:gap-4 text-xs md:text-sm overflow-x-auto">
                        {['Football', 'vFootball', 'Basketball', 'Tennis', 'eFootball', 'More Sports'].map((t, i) => (
                          <span key={t} className={`${i === 0 ? 'text-white' : 'text-white/70'} whitespace-nowrap cursor-pointer hover:text-white`}>{t}</span>
                        ))}
                      </div>
                      {/* Table Header - Desktop Only */}
                      <div className="hidden md:block bg-[#0a0f13] px-3 py-2 border-b border-white/10">
                        <div className="grid grid-cols-12 items-center gap-2 text-xs text-white/60">
                          <div className="col-span-6">Match</div>
                          <div className="col-span-2 text-center">1</div>
                          <div className="col-span-2 text-center">X</div>
                          <div className="col-span-2 text-center">2</div>
                        </div>
                      </div>

                      {/* Matches List */}
                      <div className="text-xs">
                        {sports[0]?.matches?.slice(0, 6).map((m, i) => (
                          <div key={i} className={`${i !== 0 ? 'border-t border-white/10' : ''}`}>
                            {/* Desktop Layout */}
                            <div className="hidden md:grid grid-cols-12 items-center gap-2 px-3 py-3">
                              <div className="col-span-6">
                                <div className="text-white/80 truncate">{m.title}</div>
                                <div className="text-white/50 text-xs">{m.time} • {m.score}</div>
                              </div>
                              <div className="col-span-2 text-center">
                                <Button size="sm" className="w-full bg-sporty-green hover:bg-sporty-green-light" onClick={() => addBet({ id: `multi-${i}-1`, event: m.title, market: '1X2', pick: 'Home', odds: m.odds[0]?.v || '1.50' })} title={`Bet on ${m.title} - Home win`} aria-label={`Bet on ${m.title} - Home win`}>
                                  {m.odds[0]?.v || '1.50'}
                                </Button>
                              </div>
                              <div className="col-span-2 text-center">
                                <Button size="sm" className="w-full bg-sporty-green hover:bg-sporty-green-light" onClick={() => addBet({ id: `multi-${i}-x`, event: m.title, market: '1X2', pick: 'Draw', odds: '3.20' })} title={`Bet on ${m.title} - Draw`} aria-label={`Bet on ${m.title} - Draw`}>
                                  3.20
                                </Button>
                              </div>
                              <div className="col-span-2 text-center">
                                <Button size="sm" className="w-full bg-sporty-green hover:bg-sporty-green-light" onClick={() => addBet({ id: `multi-${i}-2`, event: m.title, market: '1X2', pick: 'Away', odds: m.odds[1]?.v || '2.10' })} title={`Bet on ${m.title} - Away win`} aria-label={`Bet on ${m.title} - Away win`}>
                                  {m.odds[1]?.v || '2.10'}
                                </Button>
                              </div>
                            </div>

                            {/* Mobile Layout */}
                            <div className="md:hidden p-3 border-b border-white/10">
                              <div className="mb-3 flex items-center justify-between">
                                <div>
                                  <div className="text-white/80 font-medium text-sm">{m.title}</div>
                                  <div className="text-white/50 text-xs">{m.time} • {m.score}</div>
                                </div>
                                <button
                                  onClick={() => setShowMarketFilter(true)}
                                  className="text-gray-400 hover:text-white"
                                  title="Open market filter"
                                  aria-label="Open market filter"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                  </svg>
                                </button>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <Button size="sm" className="bg-sporty-green hover:bg-sporty-green-light flex flex-col h-12" onClick={() => addBet({ id: `multi-${i}-1`, event: m.title, market: '1X2', pick: 'Home', odds: m.odds[0]?.v || '1.50' })} title={`Bet on ${m.title} - Home win`} aria-label={`Bet on ${m.title} - Home win`}>
                                  <span className="text-xs">1</span>
                                  <span className="font-bold">{m.odds[0]?.v || '1.50'}</span>
                                </Button>
                                <Button size="sm" className="bg-sporty-green hover:bg-sporty-green-light flex flex-col h-12" onClick={() => addBet({ id: `multi-${i}-x`, event: m.title, market: '1X2', pick: 'Draw', odds: '3.20' })} title={`Bet on ${m.title} - Draw`} aria-label={`Bet on ${m.title} - Draw`}>
                                  <span className="text-xs">X</span>
                                  <span className="font-bold">3.20</span>
                                </Button>
                                <Button size="sm" className="bg-sporty-green hover:bg-sporty-green-light flex flex-col h-12" onClick={() => addBet({ id: `multi-${i}-2`, event: m.title, market: '1X2', pick: 'Away', odds: m.odds[1]?.v || '2.10' })} title={`Bet on ${m.title} - Away win`} aria-label={`Bet on ${m.title} - Away win`}>
                                  <span className="text-xs">2</span>
                                  <span className="font-bold">{m.odds[1]?.v || '2.10'}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {activeTab === 'single' && (
                    <>
                      {/* Video / Tracker panel */}
                      <section className="rounded border border-white/10 bg-[#0f1418] text-white p-4">
                        <div className="text-lg font-semibold mb-3">Ogura, K vs YOSHIMOTO, Akaru</div>
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <span className="text-sporty-red">SportyTV</span>
                          <span className="text-white/60">Match Tracker</span>
                        </div>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-8">
                            <div className="h-64 bg-[#151b20] rounded flex items-center justify-center text-white/60 border border-white/10">
                              <div className="text-center">
                                <div className="mb-2">Live Stream Available</div>
                                <Button variant="outline" className="border-sporty-green text-sporty-green">Login</Button>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div className="rounded bg-[#151b20] border border-white/10 p-3 h-64 flex flex-col">
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <Tv2 className="w-4 h-4" />
                                <span>Discover more games</span>
                              </div>
                              <img src="/api/placeholder/260/140" alt="Instant Virtuals promo" className="w-full h-36 object-cover rounded" />
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Markets list */}
                      <section className="rounded border border-white/10 bg-[#0f1418] text-white">
                        {/* Table Header - Desktop Only */}
                        <div className="hidden md:block bg-[#0a0f13] px-3 py-2 border-b border-white/10">
                          <div className="grid grid-cols-12 items-center gap-2 text-xs text-white/60">
                            <div className="col-span-6">Market</div>
                            <div className="col-span-3 text-center">Option 1</div>
                            <div className="col-span-3 text-center">Option 2</div>
                          </div>
                        </div>

                        {markets.map((m, i) => (
                          <div key={i} className={`${i !== 0 ? 'border-t border-white/10' : ''}`}>
                            {/* Desktop Layout */}
                            <div className="hidden md:grid grid-cols-12 items-center gap-2 px-3 py-3">
                              <div className="col-span-6 text-sm">
                                <div className="text-white/80">{m.name}</div>
                              </div>
                              <div className="col-span-3">
                                <Button className="w-full bg-sporty-green hover:bg-sporty-green-light" onClick={() => addBet({ id: `live-${i}-L`, event: m.name, market: m.name, pick: m.left, odds: m.lOdds })} title={`Bet on ${m.name} - ${m.left}`} aria-label={`Bet on ${m.name} - ${m.left}`}>
                                  {m.left} <span className="ml-1">{m.lOdds}</span>
                                </Button>
                              </div>
                              <div className="col-span-3">
                                <Button className="w-full bg-sporty-green hover:bg-sporty-green-light" onClick={() => addBet({ id: `live-${i}-R`, event: m.name, market: m.name, pick: m.right, odds: m.rOdds })} title={`Bet on ${m.name} - ${m.right}`} aria-label={`Bet on ${m.name} - ${m.right}`}>
                                  {m.right} <span className="ml-1">{m.rOdds}</span>
                                </Button>
                              </div>
                            </div>

                            {/* Mobile Layout */}
                            <div className="md:hidden p-3">
                              <div className="text-white/80 text-sm mb-3 font-medium">{m.name}</div>
                              <div className="grid grid-cols-2 gap-2">
                                <Button className="bg-sporty-green hover:bg-sporty-green-light flex flex-col h-12 text-xs" onClick={() => addBet({ id: `live-${i}-L`, event: m.name, market: m.name, pick: m.left, odds: m.lOdds })} title={`Bet on ${m.name} - ${m.left}`} aria-label={`Bet on ${m.name} - ${m.left}`}>
                                  <span>{m.left}</span>
                                  <span className="font-bold">{m.lOdds}</span>
                                </Button>
                                <Button className="bg-sporty-green hover:bg-sporty-green-light flex flex-col h-12 text-xs" onClick={() => addBet({ id: `live-${i}-R`, event: m.name, market: m.name, pick: m.right, odds: m.rOdds })} title={`Bet on ${m.name} - ${m.right}`} aria-label={`Bet on ${m.name} - ${m.right}`}>
                                  <span>{m.right}</span>
                                  <span className="font-bold">{m.rOdds}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </section>
                    </>
                  )}

                  {activeTab === 'schedule' && (
                    <section className="col-span-7">
                      {/* Sports Navigation */}
                      <div className="bg-[#0f1418] rounded-t-lg border border-white/10 px-6 py-2 mb-4">
                        <div className="flex items-center space-x-6 overflow-x-auto hide-scrollbar">
                          {['Football', 'vFootball', 'Basketball', 'Tennis', 'eFootball', 'More Sports'].map((sport) => (
                            <button
                              key={sport}
                              onClick={() => setActiveSport(sport)}
                              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${sport === activeSport
                                ? 'text-sporty-green border-b-2 border-sporty-green'
                                : 'text-white/60 hover:text-white/90'
                                }`}
                              title={`Switch to ${sport}`}
                            >
                              {sport}
                            </button>
                          ))}
                        </div>
                      </div>
                      <h2 className="text-white text-lg font-semibold mb-4">Schedule</h2>
                      <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
                        <div className="flex items-center gap-2 text-sm">
                          {dayTabs.map((day) => (
                            <button
                              key={day.key}
                              onClick={() => setActiveDay(day.key)}
                              className={`px-3 py-1 rounded transition-colors ${day.key === activeDay
                                ? 'bg-sporty-green text-white'
                                : 'bg-white/5 text-white/70 hover:bg-white/10'
                                }`}
                              title={`View ${day.label} matches`}
                            >
                              {day.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm">
                        {filteredMatches.map((match, i) => (
                          <div key={i} className={`grid grid-cols-12 items-center gap-2 px-3 py-3 ${i !== 0 ? 'border-t border-white/10' : ''}`}>
                            <div className="col-span-2 text-white/70">{match.time}</div>
                            <div className="col-span-7 text-white/90">
                              <div>{match.name}</div>
                              <div className="text-xs text-white/60">{match.league}</div>
                            </div>
                            <div className="col-span-3 flex justify-end gap-2">
                              <button
                                onClick={() => addBet({
                                  id: `schedule-${i}-1`,
                                  event: match.name,
                                  market: 'Match Odds',
                                  pick: '1',
                                  odds: match.lOdds
                                })}
                                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors"
                                title={`Bet on ${match.name} - Home win`}
                                aria-label={`Bet on ${match.name} - Home win`}
                              >
                                {match.lOdds}
                              </button>
                              {match.draw  && (
                                <button
                                  onClick={() => addBet({
                                    id: `schedule-${i}-X`,
                                    event: match.name,
                                    market: 'Match Odds',
                                    pick: 'X',
                                    odds: match.draw || '0.00'
                                  })}
                                  className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors"
                                  title={`Bet on ${match.name} - Draw`}
                                  aria-label={`Bet on ${match.name} - Draw`}
                                >
                                  {match.draw}
                                </button>
                              )}
                              <button
                                onClick={() => addBet({
                                  id: `schedule-${i}-2`,
                                  event: match.name,
                                  market: 'Match Odds',
                                  pick: '2',
                                  odds: match.rOdds
                                })}
                                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors"
                                title={`Bet on ${match.name} - Away win`}
                                aria-label={`Bet on ${match.name} - Away win`}
                              >
                                {match.rOdds}
                              </button>
                            </div>
                            <div className="col-span-12 mt-2 flex justify-end">
                              <button
                                onClick={() => navigateToMatch(`match-${i}`)}
                                className="text-sporty-green text-sm hover:underline"
                                title={`View details for ${match.name}`}
                              >
                                Details ›
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </main>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex flex-col gap-7">
                <DesktopBetslip />
                <UnifiedBetslip />
                <MiniGames />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Footer />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-gray-900 text-white min-h-screen relative pb-16">
        {/* Mobile Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <button onClick={() => window.history.back()} title="Go back" aria-label="Go back">
              <ArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-white">Live</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/scheduled-virtuals" className="text-white text-sm font-medium">
              Schedule
            </Link>
            <button onClick={() => navigate('/')} title="Go to home" aria-label="Go to home">
              <House />
            </button>
          </div>
        </div>

        {/* Sports Navigation */}
        <div className="bg-gray-900 px-4 py-4 sticky top-10 z-40">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
            {[
              { name: 'Cricket', icon: <Trophy size={23} />, count: 9 },
              { name: 'Darts', icon: <FaBullseye size={23} />, count: 6 },
              { name: 'MMA', icon: <CircleDot size={23} />, count: 4 },
              { name: 'Badminton', icon: <Trophy size={23} />, count: 5 },
              { name: 'Futsal', icon: <FaFootball size={23} />, count: 8 },
              { name: 'Rugby', icon: <CircleDot size={23} />, count: 4 }
            ].map((sport) => (
              <button
                key={sport.name}
                onClick={() => {
                  setActiveSport(sport.name);
                }}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors flex-shrink-0 min-w-[70px] relative ${activeSport === sport.name
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
                  }`}
                title={`Switch to ${sport.name}`}
                aria-label={`Switch to ${sport.name}`}
              >
                <span >{sport.icon}</span>
                <span className="text-xs font-medium text-center">{sport.name}</span>
                <span className="text-xs text-green-400 absolute -top-0.5 right-3 bg-gray-600 px-2">{sport.count}</span>
                {activeSport === sport.name && (
                  <div className="w-full h-0.5 bg-green-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Odds Format Tabs */}
        <div className="px-4 py-3">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {["1X2", "O/U", "1st Half O/U", "Next Goal"].map((format) => (
              <button
                key={format}
                onClick={() => setActiveOddsFormat(format)}
                className={`px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap ${activeOddsFormat === format
                  ? " border-b-2 border-green-400"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {format}
              </button>
            ))}
            <div className="flex items-center gap-1 ml-auto">
              {/* 1up/2up Toggle */}
              <div className="flex items-center bg-gray-700 rounded-full p-1">
                <button
                  onClick={() => setOddsDisplay('1up')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    oddsDisplay === '1up' 
                      ? 'bg-white text-black' 
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  1up
                </button>
                <button
                  onClick={() => setOddsDisplay('2up')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    oddsDisplay === '2up' 
                      ? 'bg-white text-black' 
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  2up
                </button>
              </div>
              <button 
                className="p-2 hover:bg-gray-700 rounded" 
                title="View market options"
                aria-label="View market options"
                onClick={() => setShowMarketSidebar(true)}
              >
                <LayoutGrid className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapse All and Sort */}
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            className="flex items-center  text-base font-medium"
            onClick={toggleAllLeagues}
          >
            <svg className={`w-4 h-4 mr-1 transition-transform text-green-400 ${allCollapsed ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {allCollapsed ? 'Expand All' : 'Collapse All'}
          </button>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-2">Sort by</span>
            <button 
              className="flex items-center border border-gray-100 rounded px-3 py-1 hover:bg-gray-700 transition-colors"
              onClick={() => setShowSortModal(true)}
            >
              <span className="text-white">Leagues</span>
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Match Headers */}
        <div className="px-4 py-2 flex items-center justify-between text-gray-400 text-sm">
          <div className="flex-1 gap-10"></div>
          <div className="w-20 text-center">1</div>
          <div className="w-20 text-center">X</div>
          <div className="w-20 text-center">2</div>
        </div>
        <hr className="text-gray-500" />
        {/* Live Matches */}
        <div className="divide-y divide-gray-500">
          {Object.entries(getFilteredAndSortedMatches()).map(([leagueName, matches]) => (
            <div key={leagueName} className="mb-4 divide-y divide-gray-500 py-1">
              <button
                className="flex items-center w-full px-4 py-2  text-base font-medium"
                onClick={() => toggleLeague(leagueName)}
              >
                <svg
                  className={`w-4 h-4 mr-2 transition-transform text-green-400 ${collapsedLeagues.has(leagueName) ? '-rotate-90' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {leagueName}
              </button>

              {!collapsedLeagues.has(leagueName) && (
                <div className="space-y-3 py-3">
                  {matches.map((match) => (
                    <div key={match.id} className="">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {match.badges.map((badge, badgeIndex) => (
                            <span key={badgeIndex} className="bg-red-600 text-white text-xs font-medium px-2 skew-8 italic -rotate-8">
                              {badge}
                            </span>
                          ))}
                          <span className="text-green-400 text-xs font-bold">{match.time}</span>
                        </div>
                        <button className="text-gray-400 pr-2" title="Match options">
                          <TrendingUp />
                        </button>
                      </div>

                      <div className="flex  items-center justify-between mb-3 px-4">
                        <div className="flex items-center gap-5 justify-between">
                          <div>
                            <div className="text-white text-sm">{match.homeTeam}</div>
                            <div className="text-white text-sm">{match.awayTeam}</div>
                          </div>
                          <div className="flex flex-col font-medium">
                            <span className="text-gray-400 text-base">0</span>
                            <span className="text-gray-400 text-base">0</span>
                          </div>
                        </div>

                          {match.odds.map((odd, oddIndex) => {
                            const labels = activeOddsFormat === '1X2' ? ['1', 'X', '2'] :
                              activeOddsFormat === 'O/U' ? ['Over', 'Under'] :
                                ['1st Half Over', '1st Half Under'];
                            return (
                              <button
                                key={oddIndex}
                                className="bg-gray-700 flex items-center justify-evenly text-green-400 font-medium hover:bg-gray-700 px-5 py-2"
                                onClick={() => addBet({
                                  id: `${match.id}-${oddIndex}`,
                                  event: `${match.homeTeam} vs ${match.awayTeam}`,
                                  market: activeOddsFormat,
                                  pick: labels[oddIndex] || 'Option',
                                  odds: odd
                                })}
                              >
                                {odd}
                              </button>
                            );
                          })}
                      </div>

                      <div className="flex items-center space-x-2 text-xs px-4">
                        <span className="text-gray-400">+{Math.floor(Math.random() * 300) + 100}</span>
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">📊</span>
                        </div>
                        {match.badges.length > 0 && (
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🔥</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Betslip Modal */}
        {showBetslip && (
          <UnifiedBetslip
            isOpen={showBetslip}
            onClose={() => setShowBetslip(false)}
            isMobile={true}
          />
        )}

        {/* Market Filter Modal */}
        {showMarketFilter && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden">
            <div className="bg-gray-900 h-full overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <h2 className="text-lg font-bold text-white">Market</h2>
                <button
                  onClick={() => setShowMarketFilter(false)}
                  className="p-1 text-white"
                  title="Close market filter"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Market Categories */}
              <div className="p-4 space-y-6">
                {Object.entries(marketCategories).map(([category, markets]) => (
                  <div key={category}>
                    <h3 className="text-white font-semibold mb-3">{category}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {markets.map((market) => (
                        <button
                          key={market.name}
                          onClick={() => handleMarketToggle(market.name)}
                          className={`p-3 rounded text-sm font-medium transition-colors ${selectedMarkets.includes(market.name) || market.active
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                          {market.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sort Modal */}
        {showSortModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl max-h-[70vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="px-4 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Sort by</h2>
                  <button
                    onClick={() => setShowSortModal(false)}
                    className="p-1 text-gray-400 hover:text-white"
                    aria-label="Close sort modal"
                    title="Close sort modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Sort Options */}
              <div className="p-4 space-y-4">
                <button 
                  className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => handleSortChange('leagues')}
                >
                  <span className={`font-medium ${sortBy === 'leagues' ? 'text-green-400' : 'text-white'}`}>Leagues</span>
                  {sortBy === 'leagues' && (
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs">✓</span>
                    </div>
                  )}
                </button>
                
                <button 
                  className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => handleSortChange('startTime')}
                >
                  <span className={`font-medium ${sortBy === 'startTime' ? 'text-green-400' : 'text-white'}`}>Start time</span>
                  {sortBy === 'startTime' && (
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Show at Top Section */}
              <div className="px-4 pb-6">
                <h3 className="text-white font-bold text-lg mb-4">Show at Top</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full flex items-center justify-between py-2 hover:bg-gray-800 rounded px-2 transition-colors"
                    onClick={() => setShowSportyTV(!showSportyTV)}
                  >
                    <span className={showSportyTV ? "text-white" : "text-gray-400"}>SportyTV (3)</span>
                    {showSportyTV && (
                      <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs">✓</span>
                      </div>
                    )}
                  </button>
                  <button 
                    className="w-full flex items-center justify-between py-2 hover:bg-gray-800 rounded px-2 transition-colors"
                    onClick={() => setShowSportyFM(!showSportyFM)}
                  >
                    <span className={showSportyFM ? "text-white" : "text-gray-400"}>SportyFM (0)</span>
                    {showSportyFM && (
                      <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs">✓</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Market Sidebar */}
        {showMarketSidebar && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden">
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-900 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <h2 className="text-lg font-bold text-white">Market</h2>
                <button
                  onClick={() => setShowMarketSidebar(false)}
                  className="p-1 text-white hover:bg-red-700 rounded"
                  aria-label="Close market sidebar"
                  title="Close market sidebar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Market Categories */}
              <div className="p-4">
                {/* Main Markets */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-lg">Main</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['1X2', 'Over/Under', '1st Goal', 'Double Chance', 'Handicap', 'GG/NG', 'GG/NG 2+', 'Draw No Bet', 'Home No Bet', 'Away No Bet', 'Odd/Even'].map((market) => (
                      <button 
                        key={market}
                        onClick={() => handleMarketTypeToggle(market)}
                        className={`p-3 rounded text-sm font-medium transition-colors ${
                          selectedMarketTypes.includes(market)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {market}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goals Markets */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-lg">Goals</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['Home Over/Under', '1st Half - Home O/U', 'Home Team Odd/Even', 'Away Over/Under', '1st Half - Away O/U', 'Away Team Odd/Even'].map((market) => (
                      <button 
                        key={market}
                        onClick={() => handleMarketTypeToggle(market)}
                        className={`p-3 rounded text-sm font-medium transition-colors ${
                          selectedMarketTypes.includes(market)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {market}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Half Markets */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-lg">Half</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['1st Half - 1X2', '1st Half - Over/Under', '1st Half - Next Goal', '1st Half - Double Chance', '1st Half Handicap', '1st Half - Draw No Bet'].map((market) => (
                      <button 
                        key={market}
                        onClick={() => handleMarketTypeToggle(market)}
                        className={`p-3 rounded text-sm font-medium transition-colors ${
                          selectedMarketTypes.includes(market)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {market}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookings Markets */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-lg">Bookings</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['Bookings 1X2', 'Bookings - Over/Under'].map((market) => (
                      <button 
                        key={market}
                        onClick={() => handleMarketTypeToggle(market)}
                        className={`p-3 rounded text-sm font-medium transition-colors ${
                          selectedMarketTypes.includes(market)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {market}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Corners Markets */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-lg">Corners</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['Corners 1X2', 'Corners - Over/Under'].map((market) => (
                      <button 
                        key={market}
                        onClick={() => handleMarketTypeToggle(market)}
                        className={`p-3 rounded text-sm font-medium transition-colors ${
                          selectedMarketTypes.includes(market)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {market}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <BottomNavigation onOpenBetslip={() => setShowBetslip(true)} />
      </div>
    </>
  );

};

export default LiveBetting;