import { useState, useEffect } from 'react';
import { ArrowLeft, Home, Users, Share, Copy, ChevronDown, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBets } from "@/hooks/useBets";
import BottomNavigation from '@/components/BottomNavigation';

const CodeHubFootball = () => {
  const navigate = useNavigate();
  const { addBet } = useBets();
  const [activeTab, setActiveTab] = useState('Popular Codes');
  const [bookingCode, setBookingCode] = useState('');
  const [sortBy, setSortBy] = useState('Sort');
  const [foldsFilter, setFoldsFilter] = useState('Folds');
  const [oddsFilter, setOddsFilter] = useState('Odds');
  const [timeFilter, setTimeFilter] = useState('Time');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showFoldsDropdown, setShowFoldsDropdown] = useState(false);
  const [showOddsDropdown, setShowOddsDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [customOddsRange, setCustomOddsRange] = useState({ min: 200, max: 2000 });
  const [customFoldsRange, setCustomFoldsRange] = useState({ min: 40, max: 50 });

  // Sample booking codes data
  const bookingCodes= [
    {
      id: 'D9A0UG',
      builder: 'BetBuilder',
      odds: '1.31',
      match: 'Leeds United vs Tottenham',
      time: 'Today 11:30',
      selections: [
        'Over 0.5 Tottenham Over/Under',
        'No Home Team to Win Both Halves'
      ]
    },
    {
      id: '824DPP',
      builder: 'BetBuilder',
      odds: '1.49',
      match: 'Leeds United vs Tottenham',
      time: 'Today 11:30',
      selections: [
        'Over 1.5 Over/Under',
        'Over 0.5 Leeds United Over/Under',
        'Draw or Away Double Chance',
        'Under 12.5 Corners - Over/Under',
        'Draw or Away 1st Half - Double Chance',
        'Home or Away 2nd Half - Double Chance'
      ]
    },
    {
      id: '966Y4W',
      builder: 'Accumulator',
      odds: '97.66',
      folds: 23,
      selections: [
        { team: 'Leeds United vs Tottenham', bet: 'Over 0.5 @1.30 | Tottenham Over/Under', time: 'Today 11:30' },
        { team: 'Lazio vs FC Torino', bet: 'Over 0.5 @1.22 | Lazio Over/Under', time: 'Today 13:00' },
        { team: 'Bayer Leverkusen vs Union Berlin', bet: 'Over 0.5 @1.16 | Bayer Leverkusen Over/Under', time: 'Today 13:30' },
        { team: 'Man Utd vs Arsenal', bet: 'Over 0.5 @1.12 | Man Utd Over/Under', time: 'Today 16:00' }
      ]
    },
    {
      id: 'AF5VCA',
      builder: 'Special',
      odds: '240.00',
      folds: 2,
      selections: [
        { team: 'Leeds United vs Tottenham', bet: 'None @12.00 | When will the 1st goal be scored?', time: 'Today 11:30' },
        { team: 'Arsenal vs West Ham', bet: 'None @21.00 | When will the 1st goal be scored?', time: 'Today 14:00' }
      ]
    },
    {
      id: 'AP22SE',
      builder: 'Mixed',
      odds: '15.67',
      folds: 27,
      selections: [
        { team: 'Real Oviedo vs Levante', bet: 'Over 2.5 @2.05 | Over/Under', time: 'Today 16:00' },
        { team: 'Lazio vs FC Torino', bet: 'Over 1.5 @1.36 | Over/Under', time: 'Today 13:00' }
      ]
    }
  ];

  const handleLoadCode = () => {
    if (bookingCode.trim()) {
      // Simulate loading a booking code
      console.log('Loading booking code:', bookingCode);
      // Add logic to load and display the booking code
    }
  };

  const handleAddToBetslip = (code) => {
    // Add the entire booking code to betslip
    addBet({
      id: code.id,
      event: code.match || 'Multiple Selections',
      market: code.builder,
      pick: `${code.selections?.length || 1} selections`,
      odds: code.odds
    });
  };

  const handleShareCode = (codeId) => {
    // Copy code to clipboard
    navigator.clipboard.writeText(codeId);
    console.log('Code shared:', codeId);
  };

  // Filter functions
  const closeAllDropdowns = () => {
    setShowTimeDropdown(false);
    setShowFoldsDropdown(false);
    setShowOddsDropdown(false);
    setShowSortDropdown(false);
  };

  const handleTimeFilter = (filter) => {
    setTimeFilter(filter);
    closeAllDropdowns();
  };

  const handleFoldsFilter = (filter) => {
    setFoldsFilter(filter);
    closeAllDropdowns();
  };

  const handleOddsFilter = (filter) => {
    setOddsFilter(filter);
    closeAllDropdowns();
  };

  const handleSortFilter = (filter) => {
    setSortBy(filter);
    closeAllDropdowns();
  };

  const resetCustomOddsRange = () => {
    setCustomOddsRange({ min: 200, max: 2000 });
  };

  const resetCustomFoldsRange = () => {
    setCustomFoldsRange({ min: 40, max: 50 });
  };

  // Filter booking codes based on selected filters
  const getFilteredCodes = () => {
    let filtered = [...bookingCodes];

    // Apply odds filter
    if (oddsFilter !== 'Odds' && oddsFilter !== 'All') {
      switch (oddsFilter) {
        case 'Odds 1 ~ 25':
          filtered = filtered.filter(code => {
            const odds = parseFloat(code.odds);
            return odds >= 1 && odds <= 25;
          });
          break;
        case 'Odds 26 ~ 50':
          filtered = filtered.filter(code => {
            const odds = parseFloat(code.odds);
            return odds >= 26 && odds <= 50;
          });
          break;
        case 'Odds 51 ~ 100':
          filtered = filtered.filter(code => {
            const odds = parseFloat(code.odds);
            return odds >= 51 && odds <= 100;
          });
          break;
        case 'Odds 101 ~ 200':
          filtered = filtered.filter(code => {
            const odds = parseFloat(code.odds);
            return odds >= 101 && odds <= 200;
          });
          break;
        case 'Custom Range':
          filtered = filtered.filter(code => {
            const odds = parseFloat(code.odds);
            return odds >= customOddsRange.min && odds <= customOddsRange.max;
          });
          break;
      }
    }

    // Apply folds filter
    if (foldsFilter !== 'Folds' && foldsFilter !== 'All') {
      switch (foldsFilter) {
        case 'Folds 1 ~ 10':
          filtered = filtered.filter(code => code.folds && code.folds >= 1 && code.folds <= 10);
          break;
        case 'Folds 11 ~ 20':
          filtered = filtered.filter(code => code.folds && code.folds >= 11 && code.folds <= 20);
          break;
        case 'Folds 21 ~ 30':
          filtered = filtered.filter(code => code.folds && code.folds >= 21 && code.folds <= 30);
          break;
        case 'Folds 31 ~ 40':
          filtered = filtered.filter(code => code.folds && code.folds >= 31 && code.folds <= 40);
          break;
        case 'Custom Range':
          filtered = filtered.filter(code => 
            code.folds && code.folds >= customFoldsRange.min && code.folds <= customFoldsRange.max
          );
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'Folds Descending':
        filtered.sort((a, b) => (b.folds || 0) - (a.folds || 0));
        break;
      case 'Folds Ascending':
        filtered.sort((a, b) => (a.folds || 0) - (b.folds || 0));
        break;
      case 'Odds Descending':
        filtered.sort((a, b) => parseFloat(b.odds) - parseFloat(a.odds));
        break;
      case 'Odds Ascending':
        filtered.sort((a, b) => parseFloat(a.odds) - parseFloat(b.odds));
        break;
    }

    return filtered;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.relative')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-1" title="Go back" aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Code Hub-Football</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5" />
          <Link to="/">
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          {['Popular Codes', 'Following', 'Load Code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              {tab}
              {tab === 'Load Code' && (
                <span className="ml-2 bg-green-100 text-green-600 px-2 py-1 rounded text-xs">2</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Load Code Tab */}
      {activeTab === 'Load Code' && (
        <div className="p-4 space-y-6">
          {/* Booking Code Input */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-gray-800 font-medium">Please insert booking code</h2>
              <button 
                className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
                title="Information about booking codes"
              >
                <span className="text-xs text-gray-400">i</span>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Booking Code"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleLoadCode}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400"
              >
                Load
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">*Odds or availabilities may change.</p>
          </div>

          {/* How to get booking code */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">How to get a booking code?</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Step1</h4>
                <p className="text-gray-600">Go to our website / mobile web / app</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Step2</h4>
                <p className="text-gray-600">Make the selections you want to bet on</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Step3</h4>
                <p className="text-gray-600">Click on the "Book bet" button on web website/mobile web/app</p>
              </div>
            </div>
          </div>

          {/* Sample Betslip Preview */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 relative">
            <div className="text-center">
              <div className="text-gray-600 mb-2">Gifts (3 available)</div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="text-gray-700 font-medium mb-2">Potential Win</div>
                <div className="flex items-center justify-center space-x-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 text-center w-32"
                    placeholder="0.00"
                  />
                  <button className="bg-green-600 text-white px-6 py-2 rounded font-medium">
                    Book Bet
                  </button>
                </div>
              </div>
            </div>
            
            {/* Betslip indicator */}
            <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              1
            </div>
            <div className="absolute top-8 right-2 text-xs text-gray-600">BETSLIP</div>
          </div>
        </div>
      )}

      {/* Popular Codes Tab */}
      {activeTab === 'Popular Codes' && (
        <div className="relative">
          {/* Filter Bar */}
          <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Time Filter */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    closeAllDropdowns();
                    setShowTimeDropdown(!showTimeDropdown);
                  }}
                >
                  <span className="text-sm">{timeFilter}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showTimeDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
                    <div className="py-2">
                      <button
                        onClick={() => handleTimeFilter('All')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All
                      </button>
                      <button
                        onClick={() => handleTimeFilter('Today')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Today
                      </button>
                      <button
                        onClick={() => handleTimeFilter('Yesterday')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Yesterday
                      </button>
                      <button
                        onClick={() => handleTimeFilter('This Week')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        This Week
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Folds Filter */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    closeAllDropdowns();
                    setShowFoldsDropdown(!showFoldsDropdown);
                  }}
                >
                  <span className="text-sm">{foldsFilter}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showFoldsDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="py-2">
                      <button
                        onClick={() => handleFoldsFilter('All')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All
                      </button>
                      <button
                        onClick={() => handleFoldsFilter('Folds 1 ~ 10')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Folds 1 ~ 10
                      </button>
                      <button
                        onClick={() => handleFoldsFilter('Folds 11 ~ 20')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Folds 11 ~ 20
                      </button>
                      <button
                        onClick={() => handleFoldsFilter('Folds 21 ~ 30')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Folds 21 ~ 30
                      </button>
                      <button
                        onClick={() => handleFoldsFilter('Folds 31 ~ 40')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Folds 31 ~ 40
                      </button>
                      
                      {/* Custom Range */}
                      <div className="px-4 py-3 border-t border-gray-200">
                        <div className="text-sm text-gray-700 mb-2">Custom Range</div>
                        <div className="flex items-center space-x-2 mb-3">
                          <input
                            type="number"
                            value={customFoldsRange.min}
                            onChange={(e) => setCustomFoldsRange(prev => ({...prev, min: parseInt(e.target.value) || 0}))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Min"
                            title="Minimum folds range"
                            aria-label="Minimum folds range"
                          />
                          <span className="text-gray-500">~</span>
                          <input
                            type="number"
                            value={customFoldsRange.max}
                            onChange={(e) => setCustomFoldsRange(prev => ({...prev, max: parseInt(e.target.value) || 0}))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Max"
                            title="Maximum folds range"
                            aria-label="Maximum folds range"
                          />
                        </div>
                        
                        {/* Range Slider */}
                        <div className="relative mb-3">
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={customFoldsRange.min}
                            onChange={(e) => setCustomFoldsRange(prev => ({...prev, min: parseInt(e.target.value)}))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            title="Minimum folds range"
                            aria-label="Set minimum folds range"
                          />
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={customFoldsRange.max}
                            onChange={(e) => setCustomFoldsRange(prev => ({...prev, max: parseInt(e.target.value)}))}
                            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            title="Maximum folds range"
                            aria-label="Set maximum folds range"
                          />
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">{customFoldsRange.min} ~ {customFoldsRange.max}</div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={resetCustomFoldsRange}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => handleFoldsFilter('Custom Range')}
                            className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Odds Filter */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    closeAllDropdowns();
                    setShowOddsDropdown(!showOddsDropdown);
                  }}
                >
                  <span className="text-sm">{oddsFilter}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showOddsDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="py-2">
                      <button
                        onClick={() => handleOddsFilter('All')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All
                      </button>
                      <button
                        onClick={() => handleOddsFilter('Odds 1 ~ 25')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Odds 1 ~ 25
                      </button>
                      <button
                        onClick={() => handleOddsFilter('Odds 26 ~ 50')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Odds 26 ~ 50
                      </button>
                      <button
                        onClick={() => handleOddsFilter('Odds 51 ~ 100')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Odds 51 ~ 100
                      </button>
                      <button
                        onClick={() => handleOddsFilter('Odds 101 ~ 200')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Odds 101 ~ 200
                      </button>
                      
                      {/* Custom Range */}
                      <div className="px-4 py-3 border-t border-gray-200">
                        <div className="text-sm text-gray-700 mb-2">Custom Range</div>
                        <div className="flex items-center space-x-2 mb-3">
                          <input
                            type="number"
                            value={customOddsRange.min}
                            onChange={(e) => setCustomOddsRange(prev => ({...prev, min: parseInt(e.target.value) || 0}))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Min"
                            title="Minimum odds range"
                            aria-label="Minimum odds range"
                          />
                          <span className="text-gray-500">~</span>
                          <input
                            type="number"
                            value={customOddsRange.max}
                            onChange={(e) => setCustomOddsRange(prev => ({...prev, max: parseInt(e.target.value) || 0}))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Max"
                            title="Maximum odds range"
                            aria-label="Maximum odds range"
                          />
                        </div>
                        
                        {/* Range Slider */}
                        <div className="relative mb-3">
                          <input
                            type="range"
                            min="1"
                            max="2000"
                            value={customOddsRange.min}
                            onChange={(e) => setCustomOddsRange(prev => ({...prev, min: parseInt(e.target.value)}))}
                            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            title="Minimum odds range"
                            aria-label="Minimum odds range"
                          />
                          <input
                            type="range"
                            min="1"
                            max="2000"
                            value={customOddsRange.max}
                            title="Maximum odds range"
                            aria-label="Maximum odds range"
                            onChange={(e) => setCustomOddsRange(prev => ({...prev, max: parseInt(e.target.value)}))}
                            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">{customOddsRange.min} ~ {customOddsRange.max}</div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={resetCustomOddsRange}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => handleOddsFilter('Custom Range')}
                            className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  closeAllDropdowns();
                  setShowSortDropdown(!showSortDropdown);
                }}
              >
                <span className="text-sm">{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
                  <div className="py-2">
                    <button
                      onClick={() => handleSortFilter('All')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleSortFilter('Folds Descending')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Folds Descending
                    </button>
                    <button
                      onClick={() => handleSortFilter('Folds Ascending')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Folds Ascending
                    </button>
                    <button
                      onClick={() => handleSortFilter('Odds Descending')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Odds Descending
                    </button>
                    <button
                      onClick={() => handleSortFilter('Odds Ascending')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Odds Ascending
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Codes List */}
          <div className="space-y-3 p-4">
            {getFilteredCodes().map((code) => (
              <div key={code.id} className="bg-white rounded-lg p-4 border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {code.builder}
                    </span>
                    {code.folds && (
                      <span className="text-xs text-gray-500">Folds: {code.folds}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {code.folds && (
                      <span className="text-xs text-gray-500">Odds: {code.odds}</span>
                    )}
                    <span className="text-lg font-bold text-gray-800">{code.odds}</span>
                  </div>
                </div>

                {/* Match Info */}
                {code.match && (
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xs">⚽</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{code.match}</div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <span>{code.time}</span>
                        <TrendingUp className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Selections */}
                <div className="space-y-1 mb-4">
                  {Array.isArray(code.selections) ? (
                    code.selections.slice(0, 4).map((selection, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {typeof selection === 'string' ? (
                          <span>↑ {selection}</span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-xs">⚽</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{selection.bet}</div>
                              <div className="text-xs text-gray-500">{selection.team}</div>
                            </div>
                            <div className="text-xs text-gray-500">{selection.time}</div>
                            <TrendingUp className="w-3 h-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))
                  ) : code.selections && typeof code.selections === 'object' ? (
                    Object.values(code.selections).map((selection, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        ↑ {String(selection)}
                      </div>
                    ))
                  ) : (
                    Array.isArray(code.selections) &&
                    code.selections.map((selection, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        ↑ {selection}
                      </div>
                    ))
                  )}
                </div>  

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{code.id}</span>
                    <button
                      onClick={() => handleShareCode(code.id)}
                      className="flex items-center space-x-1 text-green-600 text-sm"
                    >
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToBetslip(code)}
                    className="bg-green-600 text-white px-4 py-2 rounded font-medium text-sm hover:bg-green-700"
                  >
                    Add to Betslip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Following Tab */}
      {activeTab === 'Following' && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <div className="w-12 h-12 border-2 border-green-600 rounded flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-gray-800 font-medium mb-2">
              The people you follow, their booking code will be displayed here
            </h3>
          </div>

          <div className="w-full max-w-sm">
            <h4 className="text-gray-800 font-medium mb-6 text-center">How to follow someone</h4>
            
            <div className="space-y-3 text-gray-600 mb-8">
              <div className="flex items-start space-x-3">
                <span className="font-medium">1.</span>
                <span>Receive a Sporty Social URL</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-medium">2.</span>
                <span>Click the URL</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-medium">3.</span>
                <span>Press follow</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-medium">4.</span>
                <span>Booking codes from the people you follow will be displayed here</span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
              Login to View
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default CodeHubFootball;
