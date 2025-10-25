import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowLeft, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UnifiedBetslip from '@/components/UnifiedBetslip';
import { useState } from 'react';

const Matches = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSport = searchParams.get('sport') || 'football';
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);

  const addBet = (detail) => {
    window.dispatchEvent(new CustomEvent('add-bet', { detail }));
  };

  const sports = [
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'vfootball', name: 'vFootball', icon: '🎮' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'efootball', name: 'eFootball', icon: '⚡' },
    { id: 'table-tennis', name: 'Table Tennis', icon: '🏓' },
    { id: 'ebasketball', name: 'eBasketball', icon: '🏀' },
    { id: 'ice-hockey', name: 'Ice Hockey', icon: '🏒' },
    { id: 'handball', name: 'Handball', icon: '🤾' },
    { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
    { id: 'baseball', name: 'Baseball', icon: '⚾' },
    { id: 'american-football', name: 'American Football', icon: '🏈' },
    { id: 'cricket', name: 'Cricket', icon: '🏏' },
    { id: 'darts', name: 'Darts', icon: '🎯' },
    { id: 'mma', name: 'MMA', icon: '🥊' }
  ];

  const currentSportData = sports.find(s => s.id === currentSport) || sports[0];

  // Sample matches data - this would come from your existing sport pages
  const getMatchesForSport = (sport) => {
    const baseMatches = {
      football: [
        { id: 1, league: 'Premier League', homeTeam: 'Manchester United', awayTeam: 'Liverpool', time: '15:30', odds: { home: '2.10', away: '1.85', draw: '3.20' } },
        { id: 2, league: 'La Liga', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', time: '18:00', odds: { home: '1.95', away: '2.05', draw: '3.40' } }
      ],
      basketball: [
        { id: 1, league: 'NBA', homeTeam: 'Lakers', awayTeam: 'Warriors', time: '20:00', odds: { home: '1.90', away: '1.90' } },
        { id: 2, league: 'Euroleague', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', time: '19:30', odds: { home: '1.75', away: '2.05' } }
      ],
      tennis: [
        { id: 1, league: 'ATP Masters', homeTeam: 'Djokovic', awayTeam: 'Nadal', time: '14:00', odds: { home: '1.65', away: '2.20' } }
      ]
    };
    return baseMatches[sport] || baseMatches.football;
  };

  const matches = getMatchesForSport(currentSport);

  const handleSportChange = (sportId) => {
    setShowSportsDropdown(false);
    navigate(`/matches?sport=${sportId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-red-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} title="Go back" aria-label="Go back" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowSportsDropdown(!showSportsDropdown)}
                title="Select sport"
                aria-label="Select sport"
                className="flex items-center space-x-2 text-white text-lg font-medium"
              >
                <span>{currentSportData.name}</span>
                <ChevronDown className="w-5 h-5" />
              </button>
              
              {/* Sports Dropdown */}
              {showSportsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {sports.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => handleSportChange(sport.id)}
                      title={`Switch to ${sport.name}`}
                      aria-label={`Switch to ${sport.name}`}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center space-x-3 ${
                        sport.id === currentSport ? 'text-green-400' : 'text-white'
                      }`}
                    >
                      <span className="text-xl">{sport.icon}</span>
                      <span>{sport.name}</span>
                      {sport.id === currentSport && <span className="ml-auto text-green-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-white" />
            <Home className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Live Betting Bar */}
      <div className="bg-gray-800 p-3 flex items-center justify-between">
        <button 
          onClick={() => navigate('/live-betting')}
          title="Go to live betting"
          aria-label="Go to live betting"
          className="flex items-center space-x-2 text-green-400"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Live Betting</span>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">8</span>
        </button>
        <button 
          onClick={() => navigate('/live-betting')}
          title="View all live matches"
          aria-label="View all live matches"
          className="flex items-center space-x-2 text-green-400"
        >
          <span>All Live</span>
          <span>113</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex">
          <button title="View matches" aria-label="View matches" className="flex-1 py-3 text-center text-white border-b-2 border-white">
            Matches
          </button>
          <button 
            onClick={() => navigate(`/outrights?sport=${currentSport}`)}
            title="View outrights"
            aria-label="View outrights"
            className="flex-1 py-3 text-center text-gray-400 hover:text-white"
          >
            Outrights
          </button>
        </div>
      </div>

      {/* Matches Content */}
      <div className="p-4">
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-400">{match.league} • {match.time}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white font-medium">{match.homeTeam}</div>
                  <div className="text-white font-medium">{match.awayTeam}</div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                    onClick={() => addBet({ 
                      id: `${match.id}-home`, 
                      event: `${match.homeTeam} vs ${match.awayTeam}`, 
                      market: 'Match Winner', 
                      pick: match.homeTeam, 
                      odds: match.odds.home 
                    })}
                  >
                    {match.odds.home}
                  </Button>
                  {match.odds.draw && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                      onClick={() => addBet({ 
                        id: `${match.id}-draw`, 
                        event: `${match.homeTeam} vs ${match.awayTeam}`, 
                        market: 'Match Winner', 
                        pick: 'Draw', 
                        odds: match.odds.draw 
                      })}
                    >
                      {match.odds.draw}
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                    onClick={() => addBet({ 
                      id: `${match.id}-away`, 
                      event: `${match.homeTeam} vs ${match.awayTeam}`, 
                      market: 'Match Winner', 
                      pick: match.awayTeam, 
                      odds: match.odds.away 
                    })}
                  >
                    {match.odds.away}
                  </Button>
                  <span className="text-gray-400 text-sm self-center">+25</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unified Betslip */}
      <UnifiedBetslip />
    </div>
  );
};

export default Matches;