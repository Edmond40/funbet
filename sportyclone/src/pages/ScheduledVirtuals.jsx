import Header from "@/components/Header";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import DesktopBetslip from "@/components/DesktopBetslip";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, ChevronDown, ChevronRight, Play, Tv2, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Clock, X, Crown, Zap, Target, Shield, Flame, Trophy, Calendar, Car } from "lucide-react";
import { FaFutbol, FaTrophy, FaDog, FaHorse, FaMotorcycle } from "react-icons/fa6";
import VideoPlayer from "@/components/VideoPlayer";
import { useBets } from "@/hooks/useBets";

const ScheduledVirtuals = () => {
  const { addBet } = useBets();
  const perfWidth = (perf) => {
    if (perf >= 95) return 'w-full';
    if (perf >= 85) return 'w-5/6';
    if (perf >= 75) return 'w-4/5';
    if (perf >= 70) return 'w-3/4';
    if (perf >= 65) return 'w-2/3';
    if (perf >= 60) return 'w-3/5';
    if (perf >= 50) return 'w-1/2';
    if (perf >= 40) return 'w-2/5';
    if (perf >= 33) return 'w-1/3';
    if (perf >= 25) return 'w-1/4';
    if (perf >= 20) return 'w-1/5';
    return 'w-1/6';
  };
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState(new Set());
  const [showBetslip, setShowBetslip] = useState(false);
  const [selectedSport, setSelectedSport] = useState('Football');
  const navigate = useNavigate();

  const openModal = (title) => { setModalTitle(title); setShowModal(true); };
  const closeModal = () => setShowModal(false);
  
  const toggleDropdown = (menuItem) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(menuItem)) {
      newOpenDropdowns.delete(menuItem);
    } else {
      newOpenDropdowns.add(menuItem);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const currentRace = {
    title: "Greyhound Racing: Santa Monica",
    id: "#2849103",
    status: "NOW",
    runners: [
      { pos: 1, name: "Regia", flag: "🇺🇸", icon: <FaFutbol className="w-4 h-4" />, iconColor: "text-yellow-400", W: "6.29", P: "2.95", S: "1.84" },
      { pos: 2, name: "Pierrelao", flag: "🇬🇧", icon: <FaFutbol className="w-4 h-4" />, iconColor: "text-blue-400", W: "2.72", P: "1.49", S: "1.11" },
      { pos: 3, name: "Nando", flag: "🇮🇹", icon: <FaFutbol className="w-4 h-4" />, iconColor: "text-orange-400", W: "3.44", P: "1.76", S: "1.24" },
      { pos: 4, name: "Mambo", flag: "🇺🇸", icon: <FaFutbol className="w-4 h-4" />, iconColor: "text-green-400", W: "10.7", P: "4.87", S: "2.89" },
      { pos: 5, name: "Menelao", flag: "🇯🇵", icon: <FaFutbol className="w-4 h-4" />, iconColor: "text-red-400", W: "9.24", P: "4.23", S: "2.53" },
      { pos: 6, name: "Polifemo", flag: "🇿🇦", icon: <FaFutbol className="w-4 h-4" />, iconColor: "text-purple-400", W: "7.49", P: "3.47", S: "2.12" }
    ]
  };

  const menuItems = [
    {
      name: "Upcoming",
      icon: <Clock className="w-4 h-4" />,
      links: [
        { name: "Next 5 Minutes", path: "/virtuals/upcoming/5min" },
        { name: "Next 15 Minutes", path: "/virtuals/upcoming/15min" },
        { name: "Next Hour", path: "/virtuals/upcoming/1hour" },
        { name: "Today's Schedule", path: "/virtuals/upcoming/today" }
      ]
    },
    {
      name: "Football League",
      icon: <FaFutbol className="w-4 h-4" />,
      links: [
        { name: "Premier League", path: "/virtuals/football/premier" },
        { name: "Championship", path: "/virtuals/football/championship" },
        { name: "League One", path: "/virtuals/football/league-one" },
        { name: "International", path: "/virtuals/football/international" },
        { name: "Cup Competitions", path: "/virtuals/football/cups" }
      ]
    },
    {
      name: "Tournaments",
      icon: <Trophy className="w-4 h-4" />,
      links: [
        { name: "World Cup", path: "/virtuals/tournaments/world-cup" },
        { name: "Champions League", path: "/virtuals/tournaments/champions" },
        { name: "Europa League", path: "/virtuals/tournaments/europa" },
        { name: "Domestic Cups", path: "/virtuals/tournaments/domestic" }
      ]
    },
    {
      name: "Greyhound Racing",
      icon: <FaDog className="w-4 h-4" />,
      links: [
        { name: "Santa Monica", path: "/virtuals/greyhound/santa-monica" },
        { name: "Royal Meadow", path: "/virtuals/greyhound/royal-meadow" },
        { name: "Bristol Track", path: "/virtuals/greyhound/bristol" },
        { name: "Southern Circuit", path: "/virtuals/greyhound/southern" },
        { name: "All Tracks", path: "/virtuals/greyhound/all" }
      ]
    },
    {
      name: "Horse Racing",
      icon: <FaHorse className="w-4 h-4" />,
      links: [
        { name: "Royal Ascot", path: "/virtuals/horse/royal-ascot" },
        { name: "Churchill Downs", path: "/virtuals/horse/churchill" },
        { name: "Epsom Derby", path: "/virtuals/horse/epsom" },
        { name: "Melbourne Cup", path: "/virtuals/horse/melbourne" },
        { name: "All Races", path: "/virtuals/horse/all" }
      ]
    },
    {
      name: "Speedway Racing",
      icon: <FaMotorcycle className="w-4 h-4" />,
      links: [
        { name: "Grand Prix", path: "/virtuals/speedway/grand-prix" },
        { name: "World Championship", path: "/virtuals/speedway/world-championship" },
        { name: "Elite League", path: "/virtuals/speedway/elite" },
        { name: "National League", path: "/virtuals/speedway/national" }
      ]
    },
    {
      name: "Motorbike Racing",
      icon: <FaMotorcycle className="w-4 h-4" />,
      links: [
        { name: "MotoGP", path: "/virtuals/motorbike/motogp" },
        { name: "Superbike", path: "/virtuals/motorbike/superbike" },
        { name: "Moto2", path: "/virtuals/motorbike/moto2" },
        { name: "Moto3", path: "/virtuals/motorbike/moto3" }
      ]
    }
  ];

  const races = [
    {
      time: "00:50",
      title: "Greyhound Racing: Santa Monica",
      id: "#2847893",
      runners: [
        { no: 1, name: "Menelao", last: "2 x 3 1 x", perf: 40, rating: 3, W: "15.7", P: "7.09", S: "4.12", flag: "🇺🇸" },
        { no: 2, name: "Zombie", last: "2 x x x 1", perf: 41, rating: 3, W: "17.0", P: "7.63", S: "4.42", flag: "🇬🇧" },
        { no: 3, name: "Frasio", last: "1 1 1 3 x", perf: 57, rating: 5, W: "3.33", P: "1.72", S: "1.21", flag: "🇺🇸" },
        { no: 4, name: "Zazza", last: "2 1 2 2 2", perf: 50, rating: 4, W: "4.43", P: "2.17", S: "1.42", flag: "🇮🇹" },
        { no: 5, name: "Flying Fujur", last: "1 x x x 2", perf: 57, rating: 5, W: "3.08", P: "1.62", S: "1.16", flag: "🇯🇵" },
        { no: 6, name: "Zulu", last: "1 3 x 2 x", perf: 51, rating: 4, W: "5.60", P: "2.66", S: "1.67", flag: "🇿🇦" },
      ]
    },
    {
      time: "00:50",
      title: "Horse Racing: Royal Meadow",
      id: "#2819401",
      runners: [
        { no: 1, name: "Silver Bolt", last: "3 4 2 1 x", perf: 45, rating: 4, W: "5.20", P: "2.60", S: "1.50", flag: "🇬🇧" },
        { no: 2, name: "Red Glory", last: "x 2 1 1 3", perf: 62, rating: 5, W: "4.30", P: "2.17", S: "1.38", flag: "🇺🇸" },
      ]
    }
  ];

  // Mock games data for different sports
  const sportsGames = {
    'Football': [
      { time: "16:15", team1: "Colwyn Bay", team2: "Caernarfon Town FC", league: "Wales - Cymru Premier", id: 1 },
      { time: "16:15", team1: "Fram", team2: "UMF Tindastoll", league: "Iceland - Besta deild, Women", id: 2 },
      { time: "16:15", team1: "Hapoel Haifa FC", team2: "Hapoel Ironi Kiryat Shmona FC", league: "Israel - Premier League", id: 3 },
      { time: "16:15", team1: "Ironi Tiberias", team2: "Hapoel Jerusalem FC", league: "Israel - Premier League", id: 4 },
      { time: "16:15", team1: "RAAL La Louviere", team2: "SV Zulte Waregem", league: "Belgium - Pro League", id: 5 },
      { time: "16:15", team1: "UE Cornella", team2: "Gimnastic Manresa CF", league: "Spain - U19 Division de Honor Juvenil", id: 6 }
    ],
    'vFootball': [
      { time: "16:20", team1: "Virtual Madrid", team2: "Virtual Barcelona", league: "Virtual La Liga", id: 7 },
      { time: "16:25", team1: "Virtual Liverpool", team2: "Virtual Chelsea", league: "Virtual Premier League", id: 8 },
      { time: "16:30", team1: "Virtual Bayern", team2: "Virtual Dortmund", league: "Virtual Bundesliga", id: 9 },
      { time: "16:35", team1: "Virtual PSG", team2: "Virtual Manchester City", league: "Virtual Champions League", id: 10 }
    ],
    'Basketball': [
      { time: "17:00", team1: "Lakers", team2: "Warriors", league: "NBA", id: 11 },
      { time: "17:30", team1: "Celtics", team2: "Heat", league: "NBA", id: 12 },
      { time: "18:00", team1: "Bucks", team2: "Nets", league: "NBA", id: 13 },
      { time: "18:30", team1: "Clippers", team2: "Suns", league: "NBA", id: 14 }
    ],
    'Tennis': [
      { time: "14:00", team1: "Novak Djokovic", team2: "Rafael Nadal", league: "ATP Masters", id: 15 },
      { time: "15:30", team1: "Carlos Alcaraz", team2: "Daniil Medvedev", league: "ATP Masters", id: 16 },
      { time: "17:00", team1: "Stefanos Tsitsipas", team2: "Alexander Zverev", league: "ATP Masters", id: 17 },
      { time: "18:30", team1: "Jannik Sinner", team2: "Holger Rune", league: "ATP Masters", id: 18 }
    ],
    'eFootball': [
      { time: "15:45", team1: "Team Liquid", team2: "FaZe Clan", league: "eFootball Championship", id: 19 },
      { time: "16:15", team1: "G2 Esports", team2: "Fnatic", league: "eFootball Championship", id: 20 },
      { time: "16:45", team1: "Cloud9", team2: "TSM", league: "eFootball Championship", id: 21 },
      { time: "17:15", team1: "100 Thieves", team2: "Sentinels", league: "eFootball Championship", id: 22 }
    ],
    'Table Tennis': [
      { time: "13:00", team1: "Ma Long", team2: "Fan Zhendong", league: "WTT Champions", id: 23 },
      { time: "14:30", team1: "Wang Chuqin", team2: "Liang Jingkun", league: "WTT Champions", id: 24 },
      { time: "16:00", team1: "Tomokazu Harimoto", team2: "Hugo Calderano", league: "WTT Champions", id: 25 }
    ],
    'eBasketball': [
      { time: "19:00", team1: "Virtual Lakers", team2: "Virtual Warriors", league: "eNBA League", id: 26 },
      { time: "19:30", team1: "Virtual Celtics", team2: "Virtual Heat", league: "eNBA League", id: 27 },
      { time: "20:00", team1: "Virtual Bucks", team2: "Virtual Nets", league: "eNBA League", id: 28 }
    ]
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-gray-50 pb-16 lg:pb-0">
        <Header />
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-[#12171b] min-h-[calc(100vh-64px)]">
            <div className="p-3 md:p-6 max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
            {/* Left Menu */}
            <aside className="hidden md:block col-span-2 text-white">
              <div className="rounded border border-white/10 overflow-hidden">
                <div className="px-4 py-2 bg-[#0f1418] font-semibold">MENU</div>
                <ul className="text-sm">
                  {menuItems.map((menuItem, i) => (
                    <li key={menuItem.name} className="border-b border-white/10 last:border-b-0">
                      <div 
                        className={`px-4 py-3 flex items-center justify-between ${i===0? 'text-sporty-green': 'text-white/80 hover:bg-white/5'} cursor-pointer transition-colors`}
                        onClick={() => toggleDropdown(menuItem.name)}
                      >
                        <div className="flex items-center gap-3">
                          <menuItem.icon className="w-4 h-4" />
                          <span>{menuItem.name}</span>
                        </div>
                        {openDropdowns.has(menuItem.name) ? 
                          <ChevronDown className="w-4 h-4 opacity-70 transition-transform" /> : 
                          <ChevronRight className="w-4 h-4 opacity-70 transition-transform" />
                        }
                      </div>
                      {openDropdowns.has(menuItem.name) && (
                        <div className="bg-[#0a0f13] border-t border-white/5">
                          {menuItem.links.map((link, linkIndex) => (
                            <Link 
                              key={linkIndex}
                              to={link.path}
                              className="block px-8 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Center Content */}
            <main className="col-span-12 md:col-span-7 space-y-4">
              {/* Top Controls */}
              <div className="flex items-center justify-between text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <span>English</span>
                  <span>•</span>
                  <span>Decimal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>03:42</span>
                </div>
              </div>

              {/* Video Section with Betting */}
              <section className="rounded border border-white/10 overflow-hidden bg-[#0f1418] text-white">
                <div className="flex items-center justify-between px-4 py-2 bg-[#0a0f13] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-600 text-white px-2 py-1 text-xs font-semibold">{currentRace.status}</Badge>
                    <span className="text-sm font-medium">{currentRace.title}</span>
                    <span className="text-xs text-white/60">{currentRace.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>W</span>
                    <span>P</span>
                    <span>S</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-12 gap-4 p-4">
                  {/* Video Player */}
                  <div className="col-span-8 relative">
                    <img src="/api/placeholder/800/300" alt="Live Race Video" className="w-full h-[300px] object-cover rounded" />
                    <button 
                      aria-label="Play video" 
                      title="Play video" 
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors" 
                      onClick={() => openModal(`${currentRace.title} ${currentRace.id}`)}
                    >
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center gap-3 text-sm bg-black/60 px-3 py-1 rounded">
                      <button className="hover:text-white/80">◀</button>
                      <button className="hover:text-white/80">⏯</button>
                      <button className="hover:text-white/80">⚙</button>
                    </div>
                  </div>
                  
                  {/* Betting Table */}
                  <div className="col-span-4">
                    <div className="space-y-1">
                      {currentRace.runners.map((runner) => (
                        <div key={runner.pos} className="grid grid-cols-5 items-center gap-1 py-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-6 h-6 rounded bg-white text-black text-center text-xs font-bold flex items-center justify-center">
                              {runner.pos}
                            </span>
                            {runner.icon}
                            <span className="truncate text-xs font-medium">{runner.name}</span>
                          </div>
                          <Button 
                            size="sm" 
                            className="h-8 bg-sporty-green hover:bg-sporty-green-light text-xs px-2"
                            onClick={() => addBet({
                              id: `race-${currentRace.id}-${runner.pos}-W`,
                              event: `${currentRace.title} ${currentRace.id}`,
                              market: 'Win',
                              pick: runner.name,
                              odds: runner.W
                            })}
                          >
                            {runner.W}
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 bg-sporty-green hover:bg-sporty-green-light text-xs px-2"
                            onClick={() => addBet({
                              id: `race-${currentRace.id}-${runner.pos}-P`,
                              event: `${currentRace.title} ${currentRace.id}`,
                              market: 'Place',
                              pick: runner.name,
                              odds: runner.P
                            })}
                          >
                            {runner.P}
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 bg-sporty-green hover:bg-sporty-green-light text-xs px-2"
                            onClick={() => addBet({
                              id: `race-${currentRace.id}-${runner.pos}-S`,
                              event: `${currentRace.title} ${currentRace.id}`,
                              market: 'Show',
                              pick: runner.name,
                              odds: runner.S
                            })}
                          >
                            {runner.S}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Live Races Thumbnails */}
              <section className="rounded border border-white/10 overflow-hidden bg-[#0f1418] text-white">
                <div className="px-4 py-2 text-sm border-b border-white/10 bg-[#0a0f13] font-medium">NOW</div>
                <div className="grid grid-cols-4 gap-3 p-4">
                  {[
                    { name: "Santa Monica", id: "#2847991", image: "/api/placeholder/240/120" },
                    { name: "Royal Meadow", id: "#2819502", image: "/api/placeholder/240/120" },
                    { name: "Bristol", id: "#2820143", image: "/api/placeholder/240/120" },
                    { name: "Southern", id: "#2820144", image: "/api/placeholder/240/120" }
                  ].map((track) => (
                    <div key={track.name} className="relative group cursor-pointer" onClick={() => openModal(`${track.name} Live Race`)}>
                      <img src={track.image} alt={track.name} className="w-full h-24 object-cover rounded" />
                      <div className="absolute bottom-1 left-1 right-1 text-[11px] bg-black/70 px-2 py-1 rounded">
                        <div className="font-medium">{track.name}</div>
                        <div className="text-white/70">{track.id}</div>
                      </div>
                      <button 
                        aria-label={`Play ${track.name}`} 
                        title={`Play ${track.name}`} 
                        className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all group-hover:scale-110"
                      >
                        <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Race Sections */}
              {races.map((race, ri) => (
                <section key={ri} className="rounded border border-white/10 overflow-hidden bg-[#0f1418] text-white">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sporty-green font-semibold">{race.time}</span>
                      <span className="opacity-80">{race.title}</span>
                      <span className="text-white/60">{race.id}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/80">WATCH <Tv2 className="w-4 h-4" /></div>
                  </div>
                  <img src="/api/placeholder/1100/140" alt="banner" className="w-full h-28 object-cover" />
                  <div className="grid grid-cols-12 text-[12px] text-white/70 px-3 py-2 border-b border-white/10">
                    <div className="col-span-5">Last Results</div>
                    <div className="col-span-2">Performance</div>
                    <div className="col-span-2">Rating</div>
                    <div className="col-span-1 text-center">WIN</div>
                    <div className="col-span-1 text-center">PLACE</div>
                    <div className="col-span-1 text-center">SHOW</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    {race.runners.map((r) => (
                      <div key={r.no} className="grid grid-cols-12 items-center px-3 py-2">
                        <div className="col-span-5 flex items-center gap-3">
                          <span className="w-5 h-5 rounded text-[11px] text-black bg-white/90 text-center font-semibold">{r.no}</span>
                          <span className="w-5 h-4 text-center">{r.flag}</span>
                          <div>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-white/60">{r.last}</div>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <div className="w-24 h-2 bg-white/10 rounded overflow-hidden">
                            <div className={`h-full bg-sporty-green ${perfWidth(r.perf)}`} />
                          </div>
                          <span className="text-white/80">{r.perf}%</span>
                        </div>
                        <div className="col-span-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`inline-block w-4 h-4 ${i < r.rating ? 'text-yellow-400' : 'text-white/30'}`} fill={i < r.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                        <div className="col-span-1 text-center">
                          <Button size="sm" className="h-7 bg-sporty-green hover:bg-sporty-green-light">{r.W}</Button>
                        </div>
                        <div className="col-span-1 text-center">
                          <Button size="sm" className="h-7 bg-sporty-green hover:bg-sporty-green-light">{r.P}</Button>
                        </div>
                        <div className="col-span-1 text-center">
                          <Button size="sm" className="h-7 bg-sporty-green hover:bg-sporty-green-light">{r.S}</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-3 py-2 text-right text-xs border-t border-white/10">
                    <Link to="/markets" className="text-sporty-green hover:underline">Go to all markets</Link>
                  </div>
                </section>
              ))}
              {/* Video Modal */}
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={modalTitle} onClick={closeModal}>
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative bg-white rounded shadow-xl max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-semibold text-gray-800 truncate">{modalTitle}</h3>
                      <button aria-label="Close" className="p-1 hover:bg-gray-100 rounded" onClick={closeModal}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <VideoPlayer src="" poster="/api/placeholder/800/300" title={modalTitle} />
                    </div>
                  </div>
                </div>
              )}
            </main>

            {/* Desktop Betslip */}
            <aside className="hidden md:block col-span-3 sticky top-20 self-start">
              <DesktopBetslip />
            </aside>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="lg:hidden bg-gray-900 text-white min-h-screen">
      {/* Mobile Header */}
      <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/live-betting')} title="Go back">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Schedule</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/')} title="Go home">
            <Home className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Date and Sports Dropdowns */}
      <div className="bg-gray-800 px-4 py-4 flex items-center justify-between">
        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-white font-medium"
            onClick={() => toggleDropdown('date')}
          >
            <span>Today 04/10</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdowns.has('date') && (
            <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg shadow-lg min-w-[150px] z-50">
              {[
                { label: "Today 04/10", value: "today" },
                { label: "Tomorrow 05/10", value: "tomorrow" },
                { label: "Sunday 06/10", value: "sunday" },
                { label: "Monday 07/10", value: "monday" },
                { label: "Tuesday 08/10", value: "tuesday" },
                { label: "Wednesday 09/10", value: "wednesday" },
                { label: "Thursday 10/10", value: "thursday" }
              ].map((date) => (
                <button
                  key={date.value}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                  onClick={() => {
                    console.log(`Selected date: ${date.label}`);
                    toggleDropdown('date');
                  }}
                >
                  {date.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-white font-medium"
            onClick={() => toggleDropdown('sport')}
          >
            <span>{selectedSport}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdowns.has('sport') && (
            <div className="absolute top-full right-0 mt-1 bg-gray-700 rounded-lg shadow-lg min-w-[150px] z-50">
              {[
                "Football",
                "vFootball", 
                "Basketball",
                "Tennis",
                "eFootball",
                "Table Tennis",
                "eBasketball",
                "Ice Hockey",
                "Handball",
                "Volleyball",
                "Baseball",
                "American Football",
                "Cricket",
                "Darts",
                "MMA",
                "Badminton",
                "Beach Volleyball",
                "Futsal",
                "Rugby",
                "Snooker",
                "Basketball 3x3",
                "Counter-Strike",
                "Dota 2",
                "League of Legends"
              ].map((sport) => (
                <button
                  key={sport}
                  className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg ${
                    selectedSport === sport ? 'bg-gray-600' : ''
                  }`}
                  onClick={() => {
                    setSelectedSport(sport);
                    toggleDropdown('sport');
                  }}
                >
                  {sport}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Events Banner */}
      <div className="bg-green-600 px-4 py-2">
        <p className="text-white text-sm">
          Events yet to start. You can bet on these events in Prematch.
        </p>
      </div>

      {/* Dynamic Games Based on Selected Sport */}
      <div className="px-4 py-2 space-y-4">
        {sportsGames[selectedSport] ? (
          sportsGames[selectedSport].map((game) => (
            <button
              key={game.id}
              className="flex items-center justify-between py-3 border-b border-gray-700 w-full text-left hover:bg-gray-800 transition-colors"
              onClick={() => navigate(`/match-details/${game.id}`)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-sm font-medium">{game.time}</span>
                <div>
                  <div className="text-green-400 text-sm font-medium">{game.team1}</div>
                  <div className="text-green-400 text-sm font-medium">{game.team2}</div>
                  <div className="text-gray-400 text-xs">{game.league}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No games available for {selectedSport}</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
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

  </>
  );
};

export default ScheduledVirtuals;