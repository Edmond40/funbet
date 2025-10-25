import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowLeft, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UnifiedBetslip from '@/components/UnifiedBetslip';
import { addBetToGlobal } from '@/utils/betUtils';

const Outrights = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSport = searchParams.get('sport') || 'football';
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);
  const [expandedCountries, setExpandedCountries] = useState(['International Clubs', 'England']);

  const addBet = addBetToGlobal;

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

  const getOutrightsForSport = (sport)=> {
    const baseOutrights = {
      football: {
        "International Clubs": [
          { name: "UEFA Europa League 25/26", count: 48, odds: [
            { team: "Manchester United", odds: "4.50" },
            { team: "Arsenal", odds: "5.20" },
            { team: "Tottenham", odds: "6.80" }
          ]},
          { name: "CONMEBOL Libertadores 2025", count: 32, odds: [
            { team: "Flamengo", odds: "3.20" },
            { team: "Palmeiras", odds: "4.10" }
          ]},
          { name: "CONMEBOL Sudamericana 2025", count: 44, odds: [
            { team: "Sao Paulo", odds: "2.80" },
            { team: "Atletico Mineiro", odds: "3.50" }
          ]},
          { name: "UEFA Champions League 25/26", count: 32, odds: [
            { team: "Real Madrid", odds: "4.20" },
            { team: "Manchester City", odds: "3.80" }
          ]},
          { name: "UEFA Conference League 25/26", count: 36, odds: [
            { team: "Chelsea", odds: "5.50" },
            { team: "Tottenham", odds: "6.80" }
          ]},
        ],
        "England": [
          { name: "EFL Cup 25/26", count: 92, odds: [
            { team: "Manchester City", odds: "2.80" },
            { team: "Liverpool", odds: "4.20" }
          ]},
          { name: "Premier League 25/26", count: 20, odds: [
            { team: "Manchester City", odds: "1.85" },
            { team: "Arsenal", odds: "3.50" },
            { team: "Liverpool", odds: "4.80" }
          ]},
          { name: "Championship 25/26", count: 24, odds: [
            { team: "Leeds United", odds: "3.20" },
            { team: "Southampton", odds: "4.50" }
          ]},
        ]
      },
      basketball: {
        "International": [
          { name: "NBA Championship 2024-25", count: 30, odds: [
            { team: "Boston Celtics", odds: "3.20" },
            { team: "Denver Nuggets", odds: "4.50" }
          ]},
          { name: "Euroleague 2024-25", count: 18, odds: [
            { team: "Real Madrid", odds: "3.50" },
            { team: "Barcelona", odds: "4.20" }
          ]},
        ],
        "USA": [
          { name: "NBA Regular Season MVP", count: 30, odds: [] }
        ]
      }
    };
    return baseOutrights[sport] || baseOutrights.football;
  };

  const outrights = getOutrightsForSport(currentSport);

  const handleSportChange = (sportId) => {
    setShowSportsDropdown(false);
    navigate(`/outrights?sport=${sportId}`);
  };

  const toggleCountry = (country) => {
    setExpandedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleLeagueClick = (leagueName) => {
    const encodedLeague = encodeURIComponent(leagueName);
    navigate(`/outrights/${currentSport}/${encodedLeague}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-red-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="text-white" aria-label="Go back" title="Go back">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowSportsDropdown(!showSportsDropdown)}
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
          className="flex items-center space-x-2 text-green-400"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Live Betting</span>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">8</span>
        </button>
        <button 
          onClick={() => navigate('/live-betting')}
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
          <button 
            onClick={() => navigate(`/matches?sport=${currentSport}`)}
            className="flex-1 py-3 text-center text-gray-400 hover:text-white"
          >
            Matches
          </button>
          <button className="flex-1 py-3 text-center text-white border-b-2 border-green-400">
            Outrights
          </button>
        </div>
      </div>

      {/* Outrights Content */}
      <div className="p-4">
        <div className="space-y-2">
          {Object.entries(outrights).map(([country, leagues]) => (
            <div key={country} className="border-b border-gray-700 last:border-b-0">
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer"
                onClick={() => toggleCountry(country)}
              >
                <div className="flex items-center gap-2">
                  {expandedCountries.includes(country) ? 
                    <ChevronDown size={16} className="text-gray-400" /> : 
                    <ChevronRight size={16} className="text-gray-400" />
                  }
                  <span className="font-medium text-green-400">{country}</span>
                </div>
              </div>
              {expandedCountries.includes(country) && (
                <div className="ml-6 space-y-1 pb-2">
                  {leagues.map((league, index) => (
                    <div key={index} className="bg-gray-800 rounded p-3 mb-2">
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded"
                        onClick={() => handleLeagueClick(league.name)}
                      >
                        <span className="text-white">{league.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{league.count}</span>
                          <ChevronRight size={14} className="text-gray-400" />
                        </div>
                      </div>
                      {league.odds.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {league.odds.map((odd, oddIndex) => (
                            <div key={oddIndex} className="flex items-center justify-between">
                              <span className="text-gray-300">{odd.team}</span>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                                onClick={() => addBet({ 
                                  id: `${league.name}-${oddIndex}`, 
                                  event: league.name, 
                                  market: 'Winner', 
                                  pick: odd.team, 
                                  odds: odd.odds 
                                })}
                              >
                                {odd.odds}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Unified Betslip */}
      <UnifiedBetslip />
    </div>
  );
};

export default Outrights;