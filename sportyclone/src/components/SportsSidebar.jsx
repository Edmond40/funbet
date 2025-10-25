import { ChevronRight, Filter } from "lucide-react";
import { useState } from "react";

const SportsSidebar = ({ onSectionChange, activeSection = "Today Games"  }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const sidebarItems = [
    { name: "Today Games", count: 123 },
    { name: "Upcoming Games", count: 45 },
    { name: "Outrights", count: 6 },
  ];

  const timeFilters = ["1 h", "3 h", "6 h", "24 h", "All"];

  const topLeagues = [
    { name: "International", count: 339 },
    { name: "International Cl...", count: 71 },
    { name: "England", count: 120 },
    { name: "Spain", count: 97 },
    { name: "Germany", count: 66 },
    { name: "Italy", count: 83 },
    { name: "France", count: 54 }
  ];

  return (
    <>
      {/* Mobile: Horizontal scrollable tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-4 py-2 mr-2 text-sm font-medium rounded-full transition-colors ${
                activeSection === item.name 
                  ? 'bg-green-100 text-green-600 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => onSectionChange?.(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Full sidebar */}
      <div className="hidden lg:block w-56 bg-white border-r border-gray-200 h-full">
        {/* Sidebar Items */}
        <div className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded transition-colors ${
                activeSection === item.name ? 'bg-green-50 border-l-4 border-green-500' : ''
              }`}
              onClick={() => onSectionChange?.(item.name)}
            >
              <span className={`text-sm font-medium ${activeSection === item.name ? 'text-green-600' : ''}`}>
                {item.name}
              </span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* Filter by start time */}
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-3">Filter by start time</h3>
          <div className="relative mb-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-3/5"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mb-4">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-1 rounded ${activeFilter === filter ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Odds Filter */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Odds Filter</h3>
            <Filter size={16} className="text-gray-400" />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Top Leagues */}
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-3">Top Leagues</h3>
          <div className="space-y-1">
            {topLeagues.map((league, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded text-sm">
                <span className="truncate pr-2">{league.name}</span>
                <span className="text-gray-500 flex-shrink-0">{league.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SportsSidebar;