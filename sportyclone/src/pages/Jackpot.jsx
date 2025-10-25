import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Trophy, ChevronDown, ChevronRight, BarChart3, HelpCircle } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Jackpot = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('sporty12');
  const [selectedBets, setSelectedBets] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 20,
    minutes: 19,
    seconds: 49
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate combinations and total stake
  const calculateCombinations = () => {
    const selectedMatches = Object.keys(selectedBets).length;
    if (selectedMatches === 0) return 0;
    
    // For jackpot, each combination costs GHS 1
    // If user selects multiple outcomes for same match, it creates multiple combinations
    
    return Math.pow(2, selectedMatches - 1) || 1;
  };

  const calculateTotalStake = () => {
    return calculateCombinations() * 1; // GHS 1 per combination
  };

  const addBet = (bet) => {
    const matchNo = bet.id.split('-')[1];
    const pick = bet.pick;
    
    setSelectedBets(prev => {
      const newBets = { ...prev };
      if (newBets[matchNo]) {
        // Toggle selection if already selected
        const currentPicks = newBets[matchNo].split(',');
        if (currentPicks.includes(pick)) {
          const updatedPicks = currentPicks.filter(p => p !== pick);
          if (updatedPicks.length === 0) {
            delete newBets[matchNo];
          } else {
            newBets[matchNo] = updatedPicks.join(',');
          }
        } else {
          newBets[matchNo] = [...currentPicks, pick].join(',');
        }
      } else {
        newBets[matchNo] = pick;
      }
      return newBets;
    });

    const event = new CustomEvent('add-bet', {
      detail: {
        id: bet.id,
        event: bet.event,
        market: bet.market,
        pick: bet.pick,
        odds: bet.odds,
        type: 'jackpot'
      }
    });
    window.dispatchEvent(event);
  };

  const clearAllBets = () => {
    setSelectedBets({});
  };

  const isSelected = (matchNo, pick) => {
    const matchKey = matchNo.toString();
    return selectedBets[matchKey]?.split(',').includes(pick) || false;
  };

  const matches = [
    { no: 1, date: "04/10/2025", time: "14:15", home: "Girona", away: "Valencia", h2h: "⚖️", odds: { "1": "2.41", "X": "3.44", "2": "3.17" } },
    { no: 2, date: "04/10/2025", time: "16:30", home: "Chelsea", away: "Liverpool", h2h: "⚖️", odds: { "1": "2.96", "X": "3.86", "2": "2.36" } },
    { no: 3, date: "04/10/2025", time: "18:45", home: "Atalanta", away: "Como 1907", h2h: "⚖️", odds: { "1": "2.41", "X": "3.47", "2": "3.16" } },
    { no: 4, date: "05/10/2025", time: "10:30", home: "Udinese", away: "Cagliari", h2h: "⚖️", odds: { "1": "2.24", "X": "3.27", "2": "3.73" } }
  ];

  const sidebarItems = [
    { name: "Sporty 12", icon: Trophy, key: 'sporty12' },
    { name: "Previous Results", icon: BarChart3, key: 'results' },
    { name: "How to play", icon: HelpCircle, key: 'howtoplay' }
  ];

  const previousResults = [
    { round: "20250920", date: "20/9/2025", winners: 3, prize: "GHS 25,000" },
    { round: "20250919", date: "19/9/2025", winners: 1, prize: "GHS 75,000" },
    { round: "20250918", date: "18/9/2025", winners: 0, prize: "GHS 0" },
    { round: "20250917", date: "17/9/2025", winners: 2, prize: "GHS 37,500" }
  ];

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden bg-gray-900 text-white min-h-screen">
        {/* Mobile Header */}
        <div className="relative bg-gradient-to-br from-yellow-600 via-orange-500 to-red-600 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[url('/api/placeholder/400/300')] bg-cover bg-center opacity-20" />
          <div className="relative z-10">
            {/* Header Bar */}
            <div className="flex items-center justify-between p-4">
              <button onClick={() => navigate(-1)} title="Go back" className="p-2">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-lg font-bold text-white">Jackpot</h1>
              <button title="Jackpot settings" className="p-2">
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Hero Content */}
            <div className="px-4 pb-6">
              <h2 className="text-xl font-bold mb-2 text-white">Predict 12 GAMES to Win</h2>
              <div className="text-4xl font-bold text-yellow-300 mb-2">GHS 75,000</div>
              <p className="text-sm mb-6 text-green-400">Prizes for 11 and 10 correct predictions too!</p>
              
              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="bg-black/50 rounded px-3 py-2 min-w-[50px]">
                    <div className="text-xl font-bold text-white">{timeLeft.days}</div>
                  </div>
                  <div className="text-xs text-white mt-1">Days</div>
                </div>
                <div className="text-center">
                  <div className="bg-black/50 rounded px-3 py-2 min-w-[50px]">
                    <div className="text-xl font-bold text-white">{timeLeft.hours}</div>
                  </div>
                  <div className="text-xs text-white mt-1">Hours</div>
                </div>
                <div className="text-center">
                  <div className="bg-black/50 rounded px-3 py-2 min-w-[50px]">
                    <div className="text-xl font-bold text-white">{timeLeft.minutes}</div>
                  </div>
                  <div className="text-xs text-white mt-1">Min.</div>
                </div>
                <div className="text-center">
                  <div className="bg-black/50 rounded px-3 py-2 min-w-[50px]">
                    <div className="text-xl font-bold text-white">{timeLeft.seconds}</div>
                  </div>
                  <div className="text-xs text-white mt-1">Sec.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-gray-800 flex">
          <button
            onClick={() => setActiveSection('sporty12')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeSection === 'sporty12' ? 'border-green-500 text-white' : 'border-transparent text-gray-400'
            }`}
          >
            Sporty 12
          </button>
          <button
            onClick={() => setActiveSection('results')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeSection === 'results' ? 'border-green-500 text-white' : 'border-transparent text-gray-400'
            }`}
          >
            Previous Results
          </button>
          <button
            onClick={() => setActiveSection('howtoplay')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeSection === 'howtoplay' ? 'border-green-500 text-white' : 'border-transparent text-gray-400'
            }`}
          >
            How to play
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeSection === 'sporty12' && (
            <div>
              <div className="text-center text-gray-400 text-sm mb-4">Round No. 20251005</div>
              
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-1 px-2 py-2 text-xs text-gray-400 border-b border-gray-700">
                <div className="col-span-1"></div>
                <div className="col-span-4">Date/Match</div>
                <div className="col-span-2 text-center">1(Home)</div>
                <div className="col-span-2 text-center">X(Draw)</div>
                <div className="col-span-2 text-center">2(Away)</div>
                <div className="col-span-1"></div>
              </div>

              {/* Matches */}
              {matches.map((match) => (
                <div key={match.no} className="grid grid-cols-12 gap-1 px-2 py-3 border-b border-gray-700 last:border-b-0">
                  <div className="col-span-1 text-white font-bold text-lg">{match.no}</div>
                  <div className="col-span-4">
                    <div className="text-xs text-gray-400 mb-1">{match.date} {match.time}</div>
                    <div className="text-white text-sm font-medium">{match.home}</div>
                    <div className="text-white text-sm font-medium">{match.away}</div>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button 
                      className={`px-3 py-2 rounded text-sm font-medium min-w-[50px] transition-colors ${
                        isSelected(match.no, '1') 
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                      onClick={() => addBet({
                        id: `jackpot-${match.no}-1`,
                        event: `${match.home} vs ${match.away}`,
                        market: 'Jackpot Prediction',
                        pick: '1',
                        odds: match.odds['1']
                      })}
                    >
                      {match.odds['1']}
                    </button>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button 
                      className={`px-3 py-2 rounded text-sm font-medium min-w-[50px] transition-colors ${
                        isSelected(match.no, 'X') 
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                      onClick={() => addBet({
                        id: `jackpot-${match.no}-X`,
                        event: `${match.home} vs ${match.away}`,
                        market: 'Jackpot Prediction',
                        pick: 'X',
                        odds: match.odds['X']
                      })}
                    >
                      {match.odds['X']}
                    </button>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button 
                      className={`px-3 py-2 rounded text-sm font-medium min-w-[50px] transition-colors ${
                        isSelected(match.no, '2') 
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                      onClick={() => addBet({
                        id: `jackpot-${match.no}-2`,
                        event: `${match.home} vs ${match.away}`,
                        market: 'Jackpot Prediction',
                        pick: '2',
                        odds: match.odds['2']
                      })}
                    >
                      {match.odds['2']}
                    </button>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              ))}

              {/* Calculations Section */}
              <div className="mt-6 space-y-4">
                {/* Combination and Total Stake */}
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg">Combination</span>
                  <span className="text-lg font-bold">{calculateCombinations()}</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg">Total Stake</span>
                  <span className="text-lg font-bold">GHS{calculateTotalStake().toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium border border-green-600"
                    disabled={calculateCombinations() === 0}
                  >
                    Jackpot Rush
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className="bg-transparent border border-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-800"
                      onClick={clearAllBets}
                    >
                      Clear All
                    </button>
                    <button 
                      className={`py-3 rounded-lg font-medium ${
                        calculateCombinations() > 0 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={calculateCombinations() === 0}
                    >
                      Place Bet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'results' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Sporty 12</h3>
                <button title="Select jackpot round" className="flex items-center text-gray-400">
                  <span className="text-sm">Round 20250928 (Sporty 12)</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Winnings Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-3">Winnings</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-400">Correct Events</div>
                    <div className="text-yellow-400 font-bold">10 out of 12</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">No. Tickets</div>
                    <div className="text-white font-bold">6</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Winning per Ticket</div>
                    <div className="text-white font-bold">GHS 126.61</div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Results</h4>
                <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 mb-2">
                  <div className="col-span-1"></div>
                  <div className="col-span-6">Date/Match</div>
                  <div className="col-span-3 text-center">Score</div>
                  <div className="col-span-2 text-center">Result</div>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-1 text-white font-bold">1</div>
                    <div className="col-span-6">
                      <div className="text-xs text-gray-400">27/09/2025 14:00</div>
                      <div className="text-white">Leeds United</div>
                      <div className="text-white">Bournemouth</div>
                    </div>
                    <div className="col-span-3 text-center">
                      <div className="text-green-400 font-bold">2</div>
                      <div className="text-green-400 font-bold">2</div>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="text-white font-bold">X</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-1 text-white font-bold">2</div>
                    <div className="col-span-6">
                      <div className="text-xs text-gray-400">27/09/2025 14:15</div>
                      <div className="text-white">Atletico Madrid</div>
                    </div>
                    <div className="col-span-3 text-center">
                      <div className="text-green-400 font-bold">5</div>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="text-white font-bold">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'howtoplay' && (
            <div className="space-y-4 text-gray-300">
              <h3 className="text-white text-lg font-semibold">How to Play "Jackpot"</h3>
              <p className="text-sm leading-relaxed">
                The Sporty 12 Competition consists of predicting the results of 12 matches, which are selected by SportyBet, every week.
              </p>
              <p className="text-sm leading-relaxed">
                To take part and have a chance to win the jackpot, you must get registered and have at least GHS 1 in your account.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation onOpenBetslip={() => {}} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-[#12171b]">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 overflow-hidden">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-[url('/api/placeholder/1200/320')] bg-cover bg-center opacity-20" />
              <div className="relative z-10 p-4 md:p-8 text-white">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2">Predict 12 GAMES to Win</h1>
                  <div className="text-3xl md:text-6xl font-bold text-yellow-300 mb-2">GHS 75,000</div>
                  <p className="text-base md:text-xl mb-4 md:mb-6">Prizes for 11 and 10 correct predictions too!</p>
                  
                  {/* Countdown Timer */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm md:text-lg">Time Left</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 md:gap-4 text-center">
                    <div className="bg-black/50 rounded-lg px-2 md:px-4 py-2 md:py-3">
                      <div className="text-xl md:text-3xl font-bold">{timeLeft.days}</div>
                      <div className="text-xs md:text-sm">Days</div>
                    </div>
                    <div className="text-lg md:text-2xl">:</div>
                    <div className="bg-black/50 rounded-lg px-2 md:px-4 py-2 md:py-3">
                      <div className="text-xl md:text-3xl font-bold">{timeLeft.hours}</div>
                      <div className="text-xs md:text-sm">Hours</div>
                    </div>
                    <div className="text-lg md:text-2xl">:</div>
                    <div className="bg-black/50 rounded-lg px-2 md:px-4 py-2 md:py-3">
                      <div className="text-xl md:text-3xl font-bold">{timeLeft.minutes}</div>
                      <div className="text-xs md:text-sm">Minutes</div>
                    </div>
                    <div className="text-lg md:text-2xl">:</div>
                    <div className="bg-black/50 rounded-lg px-2 md:px-4 py-2 md:py-3">
                      <div className="text-xl md:text-3xl font-bold">{timeLeft.seconds}</div>
                      <div className="text-xs md:text-sm">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 md:p-6">
              <div className="max-w-6xl mx-auto grid grid-cols-12 gap-3 md:gap-6">
                {/* Mobile Sidebar Selector */}
                <div className="lg:hidden col-span-12 mb-4">
                  <select 
                    value={activeSection} 
                    onChange={(e) => setActiveSection(e.target.value)}
                    className="w-full p-3 bg-[#0f1418] text-white border border-white/10 rounded"
                    aria-label="Select jackpot section"
                  >
                    {sidebarItems.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop Left Sidebar */}
                <aside className="hidden lg:block col-span-3">
                  <div className="bg-[#0f1418] rounded border border-white/10 overflow-hidden">
                    <ul className="text-sm">
                      {sidebarItems.map((item) => (
                        <li key={item.name} className="border-b border-white/10 last:border-b-0">
                          <div 
                            className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                              activeSection === item.key ? 'text-sporty-green bg-sporty-green/10' : 'text-white/80 hover:bg-white/5'
                            }`}
                            onClick={() => setActiveSection(item.key)}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 opacity-70" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                {/* Main Content */}
                <main className="col-span-12 lg:col-span-6">
                  <div className="bg-[#0f1418] rounded border border-white/10 overflow-hidden">
                    {activeSection === 'sporty12' && (
                      <>
                        <div className="px-4 py-3 border-b border-white/10 text-white">
                          <h2 className="text-lg font-semibold">Round No.20251005</h2>
                        </div>
                        
                        {/* Matches Table */}
                        <div className="text-white">
                          <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-white/70 border-b border-white/10">
                            <div className="col-span-1">No.</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-4">Match</div>
                            <div className="col-span-1">H2H</div>
                            <div className="col-span-1">1(Home)</div>
                            <div className="col-span-1">X(Draw)</div>
                            <div className="col-span-1">2(Away)</div>
                            <div className="col-span-1"></div>
                          </div>
                          
                          {matches.map((match, i) => (
                            <div key={i} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/10 last:border-b-0 hover:bg-white/5">
                              <div className="col-span-1 text-sm font-medium">{match.no}</div>
                              <div className="col-span-2 text-xs">
                                <div>{match.date}</div>
                                <div className="text-white/60">{match.time}</div>
                              </div>
                              <div className="col-span-4 text-sm">
                                <div>{match.home}</div>
                                <div className="text-white/60">{match.away}</div>
                              </div>
                              <div className="col-span-1 text-center">{match.h2h}</div>
                              <div className="col-span-1">
                                <Button 
                                  size="sm" 
                                  className={`w-full h-8 text-xs ${
                                    isSelected(match.no, '1') 
                                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                                      : 'bg-sporty-green hover:bg-sporty-green-light text-white'
                                  }`}
                                  onClick={() => addBet({
                                    id: `jackpot-${match.no}-1`,
                                    event: `${match.home} vs ${match.away}`,
                                    market: 'Jackpot Prediction',
                                    pick: '1',
                                    odds: match.odds['1']
                                  })}
                                >
                                  {match.odds['1']}
                                </Button>
                              </div>
                              <div className="col-span-1">
                                <Button 
                                  size="sm" 
                                  className={`w-full h-8 text-xs ${
                                    isSelected(match.no, 'X') 
                                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                                      : 'bg-sporty-green hover:bg-sporty-green-light text-white'
                                  }`}
                                  onClick={() => addBet({
                                    id: `jackpot-${match.no}-X`,
                                    event: `${match.home} vs ${match.away}`,
                                    market: 'Jackpot Prediction',
                                    pick: 'X',
                                    odds: match.odds['X']
                                  })}
                                >
                                  {match.odds['X']}
                                </Button>
                              </div>
                              <div className="col-span-1">
                                <Button 
                                  size="sm" 
                                  className={`w-full h-8 text-xs ${
                                    isSelected(match.no, '2') 
                                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                                      : 'bg-sporty-green hover:bg-sporty-green-light text-white'
                                  }`}
                                  onClick={() => addBet({
                                    id: `jackpot-${match.no}-2`,
                                    event: `${match.home} vs ${match.away}`,
                                    market: 'Jackpot Prediction',
                                    pick: '2',
                                    odds: match.odds['2']
                                  })}
                                >
                                  {match.odds['2']}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Calculations and Action Buttons */}
                        <div className="p-4 border-t border-white/10 space-y-4">
                          {/* Combination and Total Stake */}
                          <div className="flex justify-between items-center text-white">
                            <span className="text-sm">Combination</span>
                            <span className="font-bold">{calculateCombinations()}</span>
                          </div>
                          <div className="flex justify-between items-center text-white">
                            <span className="text-sm">Total Stake</span>
                            <span className="font-bold">GHS{calculateTotalStake().toFixed(2)}</span>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button 
                              className="bg-sporty-green hover:bg-sporty-green-light"
                              disabled={calculateCombinations() === 0}
                            >
                              Jackpot Rush
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={clearAllBets}
                            >
                              Clear All
                            </Button>
                            <Button 
                              className={`${
                                calculateCombinations() > 0 
                                  ? 'bg-sporty-green hover:bg-sporty-green-light' 
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                              disabled={calculateCombinations() === 0}
                            >
                              Place Bet
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'results' && (
                      <>
                        <div className="px-4 py-3 border-b border-white/10 text-white">
                          <h2 className="text-lg font-semibold">Previous Results</h2>
                        </div>
                        <div className="p-4 text-white">
                          <div className="space-y-4">
                            {previousResults.map((result, i) => (
                              <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-semibold">Round {result.round}</div>
                                  <div className="text-sm text-white/60">{result.date}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">
                                    <span className="text-white/70">Winners: </span>
                                    <span className="text-sporty-green font-medium">{result.winners}</span>
                                  </div>
                                  <div className="text-lg font-bold text-yellow-400">{result.prize}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'howtoplay' && (
                      <>
                        <div className="px-4 py-3 border-b border-white/10 text-white">
                          <h2 className="text-lg font-semibold">How to Play "Jackpot"</h2>
                        </div>
                        <div className="p-4 text-white space-y-6">
                          <div>
                            <p className="text-sm text-white/80 leading-relaxed">
                              The Sporty 12 Competition consists of predicting the results of 12 matches, which are selected by SportyBet, every week.
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-white/80 leading-relaxed">
                              To take part and have a chance to win the jackpot, you must get registered and have at least GHS 1 in your account. If you correctly predict 
                              all 12 match results, you win the Super Jackpot prize. The Jackpot prize pool will be split with all eligible participants, who made the same 
                              correct predictions. Consolation prizes are awarded also for correctly predicting 11 or 10 match results !!!
                            </p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-sporty-green">How to Take Part</h3>
                            <div className="space-y-3 text-sm text-white/80">
                              <p>Make your selections - On the Sporty 12 competition entry page, make your predictions for each one of the listed matches (Home win, 
                              Draw, Away win). The stake amount of each combination is GHS 1. You can make more than 1 prediction for one match. This will increase the 
                              stake amount by GHS 1 for each additional combination formed by your selections.</p>
                              
                              <p>Check and place bets - Make sure to check all of the selections before you click on the "Place Bet" button. Once submitted, the bets cannot 
                              be cancelled, amended or refunded. You may place bets until 14:00 Saturday at Ghana time. The countdown to the competition's closure 
                              time is clearly shown on the competition entry page.</p>
                              
                              <p>Check the results - on Monday Afternoon at Ghana Time, all match results and prizes will be published in the "Previous Results" on the 
                              "Jackpot" page.</p>
                              
                              <p>Special conditions - If one Jackpot match is suspended, postponed or cancelled and not resumed within 48 hours from the initial kick-off 
                              time, the match will be treated draw in the Jackpot competition.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </main>

                {/* Right Sidebar */}
                <aside className="col-span-3">
                  <div className="bg-[#0f1418] rounded border border-white/10 overflow-hidden cursor-pointer hover:border-sporty-green/50 transition-colors" onClick={() => window.open('/virtuals', '_blank')}>
                    <img src="/api/placeholder/300/200" alt="Instant Virtuals" className="w-full h-48 object-cover" />
                    <div className="p-4 text-white">
                      <h3 className="font-semibold mb-2">Instant Virtuals</h3>
                      <p className="text-sm text-white/70">Play exciting virtual sports games</p>
                      <Button size="sm" className="mt-3 bg-sporty-green hover:bg-sporty-green-light">
                        Play Now
                      </Button>
                    </div>
                  </div>
                  
                  {activeSection === 'sporty12' && (
                    <div className="mt-4 bg-[#0f1418] rounded border border-white/10 p-4">
                      <h3 className="text-white font-semibold mb-3">Jackpot Info</h3>
                      <div className="space-y-2 text-sm text-white/70">
                        <div className="flex justify-between">
                          <span>Combinations:</span>
                          <span className="text-white">{calculateCombinations()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Stake:</span>
                          <span className="text-white">GHS {calculateTotalStake().toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <Button 
                            className={`w-full ${
                              calculateCombinations() > 0 
                                ? 'bg-sporty-green hover:bg-sporty-green-light text-white' 
                                : 'bg-gray-600 hover:bg-gray-700 text-white cursor-not-allowed'
                            }`}
                            disabled={calculateCombinations() === 0}
                          >
                            Place Bet
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Jackpot;