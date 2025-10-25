import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import BottomNavigation from "@/components/BottomNavigation";
import SportPageLayout from "@/components/SportPageLayout";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronDown, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Boxing = () => {
  const [activeSection, setActiveSection] = useState("Today Games");
  const [expandedCountries, setExpandedCountries] = useState(["International", "North America"]);
  const [leagues, setLeagues] = useState([
    { id: "all", name: "All", count: 18, checked: true },
    { id: "wbc", name: "WBC", count: 6, checked: true },
    { id: "wba", name: "WBA", count: 5, checked: true },
    { id: "ibf", name: "IBF", count: 4, checked: true },
    { id: "wbo", name: "WBO", count: 3, checked: true }
  ]);

  const [countries, setCountries] = useState([
    { id: "international", name: "International", count: 10, checked: true },
    { id: "north-america", name: "North America", count: 6, checked: true },
    { id: "europe", name: "Europe", count: 4, checked: true }
  ]);
  const navigate = useNavigate();

  const addBet = (detail) => {
    window.dispatchEvent(new CustomEvent('add-bet', { detail }));
  };

  const handleLeagueClick = (leagueName) => {
    const encodedLeague = encodeURIComponent(leagueName);
    navigate(`/outrights/boxing/${encodedLeague}`);
  };

  const handleLeagueToggle = (leagueId) => {
    setLeagues(prev => prev.map(league =>
      league.id === leagueId ? { ...league, checked: !league.checked } : league
    ));
  };

  const handleCountryToggle = (countryId) => {
    setCountries(prev => prev.map(country =>
      country.id === countryId ? { ...country, checked: !country.checked } : country
    ));
  };

  const handleClearFilters = () => {
    setLeagues(prev => prev.map(league => ({ ...league, checked: true })));
    setCountries(prev => prev.map(country => ({ ...country, checked: true })));
  };

  const handleViewResults = () => {
    const selectedLeagues = leagues.filter(l => l.checked);
    const selectedCountries = countries.filter(c => c.checked);
    console.log('Viewing results for:', { selectedLeagues, selectedCountries });
  };

  const todayMatches = [
    {
      league: "WBC Championship",
      homeTeam: "Tyson Fury",
      awayTeam: "Francis Ngannou",
      odds: { home: "1.45", away: "2.75" }
    }
  ];

  const upcomingMatches = [
    {
      league: "WBA Championship",
      homeTeam: "Gervonta Davis",
      awayTeam: "Ryan Garcia",
      odds: { home: "1.80", away: "2.00" }
    },
    {
      league: "IBF Championship",
      homeTeam: "Errol Spence Jr",
      awayTeam: "Terence Crawford",
      odds: { home: "2.10", away: "1.70" }
    }
  ];

  const outrightLeagues = {
    "International": [
      { name: "WBC Heavyweight Championship", count: 8 },
      { name: "WBA Heavyweight Championship", count: 6 },
      { name: "IBF Heavyweight Championship", count: 5 },
      { name: "WBO Heavyweight Championship", count: 7 }
    ],
    "North America": [
      { name: "WBC Welterweight Championship", count: 10 },
      { name: "WBA Lightweight Championship", count: 8 },
      { name: "IBF Middleweight Championship", count: 6 },
      { name: "WBO Super Middleweight Championship", count: 9 }
    ]
  };

  const toggleCountry = (country) => {
    setExpandedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const getCurrentMatches = () => {
    switch (activeSection) {
      case "Today Games": return todayMatches;
      case "Upcoming Games": return upcomingMatches;
      case "Outrights": return [];
      default: return todayMatches;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16 lg:pb-0">
      <Header />
      <SportsNavigation />
      <div className="flex flex-col lg:flex-row">
        <div className="w-64 bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Boxing</h2>
          </div>
          
          <div className="border-b">
            <div className="p-3">
              <div className="space-y-1">
                {["Today Games", "Upcoming Games", "Outrights"].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      activeSection === section 
                        ? "bg-green-100 text-green-700 font-medium" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeSection === "Outrights" && (
            <div className="p-3">
              <div className="space-y-2">
                {Object.entries(outrightLeagues).map(([country, leagues]) => (
                  <div key={country}>
                    <button
                      onClick={() => toggleCountry(country)}
                      className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
                    >
                      <span>{country}</span>
                      {expandedCountries.includes(country) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    {expandedCountries.includes(country) && (
                      <div className="ml-4 space-y-1">
                        {leagues.map((league) => (
                          <button
                            key={league.name}
                            onClick={() => handleLeagueClick(league.name)}
                            className="flex items-center justify-between w-full p-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded"
                          >
                            <span>{league.name}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {league.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white">
          <div className="p-3 md:p-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-xl font-semibold">
                {activeSection === "Outrights" ? "Boxing Outrights" : `Boxing - ${activeSection}`}
              </h1>
              <RotateCcw size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div className="bg-gray-800 text-white mx-3 md:mx-4 mt-4 rounded p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm md:text-base">Live Betting</span>
              <span className="bg-green-600 text-xs px-2 py-1 rounded">3</span>
            </div>
          </div>

          {activeSection === "Outrights" ? (
            <div className="mx-4 mt-6 border rounded">
              <div className="bg-gray-50 p-3 border-b">
                <span className="font-medium text-sm md:text-base">{activeSection}</span>
              </div>
              <div className="p-4">
                <div className="text-center text-gray-500 py-8">
                  <p>Select a championship from the sidebar to view outright betting markets</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-4 mt-6 border rounded">
              <div className="bg-gray-50 p-3 border-b">
                <span className="font-medium">
                  {activeSection === "Today Games" ? "Today's Boxing Fights" : "Upcoming Boxing Fights"}
                </span>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {getCurrentMatches().map((match, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">{match.league}</div>
                        <div className="text-sm text-gray-600">21:00</div>
                        <div className="font-medium text-sm">{match.homeTeam}</div>
                        <div className="font-medium text-sm">vs {match.awayTeam}</div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                          onClick={() => addBet({ id: `${index}-1`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Fight Winner', pick: match.homeTeam, odds: match.odds.home })}>
                          {match.odds.home}
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                          onClick={() => addBet({ id: `${index}-2`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Fight Winner', pick: match.awayTeam, odds: match.odds.away })}>
                          {match.odds.away}
                        </Button>
                        <span className="text-gray-400 text-xs">+12</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <UnifiedBetslip />
      </div>
      <Footer />

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <SportPageLayout
          sportName="Boxing"
          sportIcon={<span className="text-2xl">🥊</span>}
          leagues={leagues}
          countries={countries}
          onLeagueToggle={handleLeagueToggle}
          onCountryToggle={handleCountryToggle}
          onClearFilters={handleClearFilters}
          onViewResults={handleViewResults}
        >
          <div className="px-4 py-3">
            {/* Live Betting Section */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <button
                onClick={() => navigate('/live-betting')}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Live Betting</span>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-medium">All Live</span>
                  <span className="text-green-400 font-medium">6</span>
                  <ChevronRight className="w-4 h-4 text-green-400" />
                </div>
              </button>
            </div>

            {/* Today's Matches */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Today's Fights</h3>
              {todayMatches.map((match, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-400">{match.league} • 21:00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white font-medium">{match.homeTeam}</div>
                      <div className="text-gray-400 text-sm mb-1">vs</div>
                      <div className="text-white font-medium">{match.awayTeam}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ id: `${index}-home`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Fight Winner', pick: match.homeTeam, odds: match.odds.home })}
                      >
                        {match.odds.home}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ id: `${index}-away`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Fight Winner', pick: match.awayTeam, odds: match.odds.away })}
                      >
                        {match.odds.away}
                      </Button>
                      <span className="text-gray-400 text-sm self-center">+12</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SportPageLayout>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Boxing;