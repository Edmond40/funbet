import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Results = () => {
  const [selectedDate, setSelectedDate] = useState('16/09/2025');
  const [selectedSport, setSelectedSport] = useState('Football');
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [selectedTournament, setSelectedTournament] = useState('Select Tournament');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3);

  // Sample results data matching the image
  const results= [
    {
      gameId: '27471',
      time: '19:00',
      date: '16/09/2025',
      homeTeam: 'Benfica',
      awayTeam: 'Qarabag',
      homeScore: 2,
      awayScore: 3,
      league: 'International Clubs - UEFA Champions League'
    },
    {
      gameId: '24565',
      time: '19:00',
      date: '16/09/2025',
      homeTeam: 'Juventus',
      awayTeam: 'Borussia Dortmund',
      homeScore: 4,
      awayScore: 4,
      league: 'International Clubs - UEFA Champions League'
    },
    {
      gameId: '25534',
      time: '19:00',
      date: '16/09/2025',
      homeTeam: 'Real Madrid',
      awayTeam: 'Marseille',
      homeScore: 2,
      awayScore: 1,
      league: 'International Clubs - UEFA Champions League'
    },
    {
      gameId: '26227',
      time: '19:00',
      date: '16/09/2025',
      homeTeam: 'Tottenham',
      awayTeam: 'Villarreal',
      homeScore: 1,
      awayScore: 0,
      league: 'International Clubs - UEFA Champions League'
    },
    {
      gameId: '29942',
      time: '16:45',
      date: '16/09/2025',
      homeTeam: 'Athletic Bilbao',
      awayTeam: 'Arsenal',
      homeScore: 0,
      awayScore: 2,
      league: 'International Clubs - UEFA Champions League'
    },
    // Estonia - Premium Liiga
    {
      gameId: '12391',
      time: '16:00',
      date: '16/09/2025',
      homeTeam: 'Tartu JK Tammeka',
      awayTeam: 'Parnu JK Vaprus',
      homeScore: 1,
      awayScore: 4,
      league: 'Estonia - Premium Liiga'
    },
    // Argentina - Primera Nacional Reserve
    {
      gameId: '23255',
      time: '15:00',
      date: '16/09/2025',
      homeTeam: 'CA San Telmo Reserve',
      awayTeam: 'Arsenal de Sarandi',
      homeScore: 1,
      awayScore: 1,
      league: 'Argentina - Primera Nacional Reserve'
    },
    // Ecuador - Serie B
    {
      gameId: '25395',
      time: '20:30',
      date: '16/09/2025',
      homeTeam: 'Cumbaya FC',
      awayTeam: '22 de Julio',
      homeScore: 2,
      awayScore: 0,
      league: 'Ecuador - Serie B'
    },
    {
      gameId: '24966',
      time: '20:30',
      date: '16/09/2025',
      homeTeam: 'Gualaceo SC',
      awayTeam: 'CD Independiente Juniors',
      homeScore: 1,
      awayScore: 0,
      league: 'Ecuador - Serie B'
    },
    // England Amateur - U21 Professional Development League
    {
      gameId: '39676',
      time: '13:00',
      date: '16/09/2025',
      homeTeam: 'Sheffield United U21',
      awayTeam: 'Millwall U21',
      homeScore: 2,
      awayScore: 0,
      league: 'England Amateur - U21 Professional Development League'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      
      <div className="flex flex-col lg:flex-row max-w-5xl mx-auto mt-8">
        <div className="flex-1 bg-white">
          <div className="px-3 md:px-6 py-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold">Results</h1>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Enter Game ID (4 or 5 numeric digits)"
                className="w-full md:w-80 px-4 py-2 border rounded-md text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="px-6 py-2 bg-gray-200 rounded-md">Search</button>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="px-3 md:px-6 py-4 bg-gray-50 border-b">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <button 
                onClick={() => setSelectedDate(selectedDate === '16/09/2025' ? '17/09/2025' : '16/09/2025')}
                className="flex items-center px-3 md:px-4 py-2 bg-green-600 text-white rounded-md text-sm md:text-base hover:bg-green-700 transition-colors"
              >
                {selectedDate} <ChevronDown size={16} className="ml-2" />
              </button>
              <button 
                onClick={() => setSelectedSport(selectedSport === 'Football' ? 'Basketball' : 'Football')}
                className="flex items-center px-3 md:px-4 py-2 bg-green-600 text-white rounded-md text-sm md:text-base hover:bg-green-700 transition-colors"
              >
                {selectedSport} <ChevronDown size={16} className="ml-2" />
              </button>
              <button 
                onClick={() => setSelectedCategory(selectedCategory === 'Select Category' ? 'International' : 'Select Category')}
                className="flex items-center px-3 md:px-4 py-2 bg-green-600 text-white rounded-md text-sm md:text-base hover:bg-green-700 transition-colors"
              >
                {selectedCategory} <ChevronDown size={16} className="ml-2" />
              </button>
              <button 
                onClick={() => setSelectedTournament(selectedTournament === 'Select Tournament' ? 'Champions League' : 'Select Tournament')}
                className="flex items-center px-3 md:px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm md:text-base hover:bg-gray-400 transition-colors"
              >
                {selectedTournament} <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="px-3 md:px-6 py-4">
            <div className="bg-white rounded-lg border overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div>Time</div>
                <div>Game ID</div>
                <div>Match and Result</div>
                <div></div>
              </div>
              
              {/* Mobile Header */}
              <div className="md:hidden px-4 py-3 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">Match Results</h3>
              </div>

              {/* Group matches by league */}
              {Object.entries(
                results.reduce((acc, match) => {
                  if (!acc[match.league]) acc[match.league] = [];
                  acc[match.league].push(match);
                  return acc;
                }, {})
              ).map(([league, matches]) => (
                <div key={league}>
                  {/* League Section Header */}
                  <div className="px-3 md:px-6 py-3 bg-blue-50 border-b">
                    <span className="text-sm font-medium text-blue-800">{league}</span>
                  </div>

                  {/* Match Results for this league */}
                  {matches.map((match, index) => (
                    <div key={index}>
                      {/* Desktop Layout */}
                      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition-colors">
                        {/* Time Column */}
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">{match.date}</span>
                          <span className="text-sm font-medium">{match.time}</span>
                        </div>

                        {/* Game ID Column */}
                        <div>
                          <span 
                            className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                            onClick={() => console.log('View match details:', match.gameId)}
                          >
                            {match.gameId}
                          </span>
                        </div>

                        {/* Match and Result Column */}
                        <div className="flex items-center">
                          <div className="flex items-center space-x-4 w-full">
                            <span className="text-sm font-medium min-w-0 flex-1 text-right">{match.homeTeam}</span>
                            <div className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-1 rounded">
                              <span className="font-bold">{match.homeScore}</span>
                              <span>:</span>
                              <span className="font-bold">{match.awayScore}</span>
                              <ChevronDown size={14} className="text-white ml-1" />
                            </div>
                            <span className="text-sm font-medium min-w-0 flex-1">{match.awayTeam}</span>
                          </div>
                        </div>

                        {/* Empty Column */}
                        <div></div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="md:hidden px-3 py-4 border-b hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">{match.date}</span>
                            <span className="text-xs font-medium">{match.time}</span>
                          </div>
                          <span 
                            className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                            onClick={() => console.log('View match details:', match.gameId)}
                          >
                            ID: {match.gameId}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-3">
                          <span className="text-sm font-medium text-right flex-1 truncate">{match.homeTeam}</span>
                          <div className="flex items-center space-x-1 bg-gray-800 text-white px-2 py-1 rounded">
                            <span className="font-bold text-sm">{match.homeScore}</span>
                            <span className="text-sm">:</span>
                            <span className="font-bold text-sm">{match.awayScore}</span>
                          </div>
                          <span className="text-sm font-medium flex-1 truncate">{match.awayTeam}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-6 space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'bg-green-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Results;