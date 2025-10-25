import { useState } from "react";
import { Search, Star, ChevronRight, Trophy, Target, BarChart3, Award, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFutbol, FaBasketballBall, FaTableTennis, FaVolleyballBall, FaHockeyPuck, FaBaseballBall } from "react-icons/fa";
import { GiTennisRacket, GiBoxingGlove, GiCricketBat, GiHandBag } from "react-icons/gi";
import { MdSportsMma, MdSportsEsports } from "react-icons/md";

import BottomNavigation from "@/components/BottomNavigation";

const AZMenu = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [selectedLiveCategory, setSelectedLiveCategory] = useState("Football");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("Sports");

  // Sports categories data matching the image
  const sportsCategories = [
    {
      name: "Popular",
      icon: <Star className="w-5 h-5" />,
      items: [
        "My Favourites",
        "Today's Football", 
        "Football In Next 3 Hours",
        "Premier League",
        "La Liga",
        "Serie A",
        "Bundesliga",
        "Ligue 1",
        "Laver Cup",
        "ATP/WTA"
      ]
    },
    {
      name: "Football",
      icon: <FaFutbol className="w-5 h-5" />,
      items: [
        "All Football",
        "Premier League",
        "La Liga", 
        "Serie A",
        "Bundesliga",
        "Ligue 1",
        "Champions League",
        "Europa League",
        "World Cup Qualifiers",
        "International Friendlies"
      ]
    },
    {
      name: "vFootball", 
      icon: <FaFutbol className="w-5 h-5" />,
      items: [
        "Virtual Premier League",
        "Virtual Champions League",
        "Virtual World Cup",
        "Virtual La Liga",
        "Virtual Serie A"
      ]
    },
    {
      name: "Basketball",
      icon: <FaBasketballBall className="w-5 h-5" />,
      items: [
        "NBA",
        "EuroLeague", 
        "NCAA",
        "FIBA World Cup",
        "Olympic Basketball"
      ]
    },
    {
      name: "Tennis",
      icon: <GiTennisRacket className="w-5 h-5" />,
      items: [
        "ATP Tour",
        "WTA Tour",
        "Grand Slams",
        "Davis Cup",
        "Fed Cup",
        "Laver Cup"
      ]
    },
    {
      name: "eFootball",
      icon: <MdSportsEsports className="w-5 h-5" />,
      items: [
        "FIFA eWorld Cup",
        "eChampions League",
        "ePremier League",
        "Virtual Bundesliga"
      ]
    },
    {
      name: "Table Tennis",
      icon: <FaTableTennis className="w-5 h-5" />,
      items: [
        "ITTF World Tour",
        "World Championships",
        "Olympic Table Tennis"
      ]
    },
    {
      name: "eBasketball",
      icon: <FaBasketballBall className="w-5 h-5" />,
      items: [
        "NBA 2K League",
        "Virtual NBA",
        "eEuroLeague"
      ]
    },
    {
      name: "Ice Hockey",
      icon: <FaHockeyPuck className="w-5 h-5" />,
      items: [
        "NHL",
        "KHL",
        "IIHF World Championship",
        "Olympic Hockey"
      ]
    },
    {
      name: "Handball",
      icon: <GiHandBag className="w-5 h-5" />,
      items: [
        "EHF Champions League",
        "World Championship",
        "European Championship"
      ]
    },
    {
      name: "Volleyball",
      icon: <FaVolleyballBall className="w-5 h-5" />,
      items: [
        "FIVB World Championship",
        "Olympic Volleyball",
        "CEV Champions League"
      ]
    },
    {
      name: "Baseball",
      icon: <FaBaseballBall className="w-5 h-5" />,
      items: [
        "MLB",
        "World Series",
        "World Baseball Classic"
      ]
    },
    {
      name: "Boxing",
      icon: <GiBoxingGlove className="w-5 h-5" />,
      items: [
        "World Championship",
        "Olympic Boxing",
        "Professional Boxing"
      ]
    },
    {
      name: "MMA",
      icon: <MdSportsMma className="w-5 h-5" />,
      items: [
        "UFC",
        "Bellator",
        "ONE Championship"
      ]
    },
    {
      name: "Cricket",
      icon: <GiCricketBat className="w-5 h-5" />,
      items: [
        "ICC World Cup",
        "IPL",
        "The Ashes",
        "T20 World Cup"
      ]
    }
  ];

  const [selectedPromotionCategory, setSelectedPromotionCategory] = useState("All");

  const filteredCategories = sportsCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleLiveCategoryClick = (categoryId) => {
    setSelectedLiveCategory(categoryId);
  };

  const handleItemClick = (item) => {
    const routeMap = {
      "My Favourites": "/favourites",
      "Today's Football": "/football",
      "Football In Next 3 Hours": "/football",
      "Premier League": "/football",
      "La Liga": "/football",
      "Serie A": "/football",
      "Bundesliga": "/football",
      "Ligue 1": "/football",
      "Champions League": "/football",
      "Europa League": "/football",
      "All Football": "/football",
      "ATP Tour": "/tennis",
      "WTA Tour": "/tennis", 
      "ATP/WTA": "/tennis",
      "Laver Cup": "/tennis",
      "Grand Slams": "/tennis",
      "NBA": "/basketball",
      "EuroLeague": "/basketball",
      "NCAA": "/basketball",
      "Virtual Premier League": "/scheduled-virtuals",
      "Virtual Champions League": "/scheduled-virtuals",
      "Virtual World Cup": "/scheduled-virtuals",
      "FIFA eWorld Cup": "/efootball",
      "eChampions League": "/efootball",
      "ePremier League": "/efootball",
      "NBA 2K League": "/ebasketball",
      "Virtual NBA": "/ebasketball",
      "NHL": "/ice-hockey",
      "KHL": "/ice-hockey",
      "ITTF World Tour": "/table-tennis",
      "World Championships": "/table-tennis",
      "EHF Champions League": "/handball",
      "FIVB World Championship": "/volleyball",
      "MLB": "/baseball",
      "World Series": "/baseball",
      "UFC": "/mma",
      "Bellator": "/mma",
      "ICC World Cup": "/cricket",
      "IPL": "/cricket",
      "World Championship": "/boxing"
    };
    
    const route = routeMap[item] || "/";
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Search Bar */}
      <div className="bg-red-600 px-4 py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Teams/Players, League, Game ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg bg-white text-gray-900 placeholder-gray-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Red Banner with Icons */}
      <div className="bg-red-600 px-4 py-3">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/virtuals')}
            className="flex flex-col items-center text-white hover:text-red-200 transition-colors"
          >
            <Trophy className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Virtuals</span>
          </button>
          <button 
            onClick={() => navigate('/jackpot')}
            className="flex flex-col items-center text-white hover:text-red-200 transition-colors"
          >
            <Award className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Jackpot</span>
          </button>
          <button 
            onClick={() => navigate('/livescore')}
            className="flex flex-col items-center text-white hover:text-red-200 transition-colors"
          >
            <Target className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Livescore</span>
          </button>
          <button 
            onClick={() => navigate('/results')}
            className="flex flex-col items-center text-white hover:text-red-200 transition-colors"
          >
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Results</span>
          </button>
          <button 
            onClick={() => navigate('/mobile')}
            className="flex flex-col items-center text-white hover:text-red-200 transition-colors"
          >
            <Smartphone className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">App</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-red-600 px-4 pb-3">
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveNavTab("Sports")}
            className={`font-medium pb-2 transition-colors ${
              activeNavTab === "Sports" 
                ? "text-white border-b-2 border-white" 
                : "text-red-200 hover:text-white"
            }`}
          >
            Sports
          </button>
          <button 
            onClick={() => setActiveNavTab("Live")}
            className={`font-medium pb-2 transition-colors ${
              activeNavTab === "Live" 
                ? "text-white border-b-2 border-white" 
                : "text-red-200 hover:text-white"
            }`}
          >
            Live (112)
          </button>
          <button 
            onClick={() => setActiveNavTab("Promotions")}
            className={`font-medium pb-2 transition-colors ${
              activeNavTab === "Promotions" 
                ? "text-white border-b-2 border-white" 
                : "text-red-200 hover:text-white"
            }`}
          >
            Promotions (15)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen bg-gray-50">
        {activeNavTab === "Sports" && (
          <>
            {/* Left Sidebar - Sports Categories */}
            <div className="w-1/2 bg-white border-r border-gray-200">
              <div className="p-4">
                {filteredCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full flex items-center justify-between p-3 mb-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={selectedCategory === category.name ? "text-green-600" : "text-gray-500"}>
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${selectedCategory === category.name ? "text-green-600" : "text-gray-400"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content - League/Competition Items */}
            <div className="w-1/2 bg-gray-50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {selectedCategory === "Popular" ? "My Favourites" : selectedCategory}
                </h3>
                <div className="space-y-1">
                  {sportsCategories
                    .find(cat => cat.name === selectedCategory)
                    ?.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center justify-between group"
                    >
                      <span className="text-gray-700 font-medium">{item}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeNavTab === "Live" && (
          <>
            {/* Left Sidebar - Live Sports with Counts */}
            <div className="w-1/2 bg-white border-r border-gray-200">
              <div className="p-4">
                <button
                  onClick={() => handleLiveCategoryClick("Football")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "Football"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Football</span>
                  <span className="text-sm font-bold">112</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("vFootball")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "vFootball"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>vFootball</span>
                  <span className="text-sm font-bold">48</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("Basketball")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "Basketball"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Basketball</span>
                  <span className="text-sm font-bold">15</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("Tennis")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "Tennis"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Tennis</span>
                  <span className="text-sm font-bold">29</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("eFootball")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "eFootball"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>eFootball</span>
                  <span className="text-sm font-bold">17</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("Table Tennis")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "Table Tennis"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Table Tennis</span>
                  <span className="text-sm font-bold">18</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("eBasketball")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "eBasketball"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>eBasketball</span>
                  <span className="text-sm font-bold">5</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("Ice Hockey")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "Ice Hockey"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Ice Hockey</span>
                  <span className="text-sm font-bold">8</span>
                </button>
                <button
                  onClick={() => handleLiveCategoryClick("Handball")}
                  className={`w-full flex items-center justify-between p-3 mb-2 transition-colors ${
                    selectedLiveCategory === "Handball"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Handball</span>
                  <span className="text-sm font-bold">4</span>
                </button>
              </div>
            </div>

            {/* Right Content - Countries/Leagues */}
            <div className="w-1/2 bg-gray-50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedLiveCategory || "Football"}
                  </h3>
                  <button 
                    onClick={() => navigate('/live-betting')}
                    className="text-sm text-gray-600 flex items-center space-x-1 hover:text-gray-800 transition-colors"
                  >
                    <span>All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  <button 
                    onClick={() => navigate('/live-betting?country=algeria')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Algeria</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=australia')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Australia</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=austria')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Austria Amateur</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=belarus')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Belarus</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=cambodia')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Cambodia</span>
                    <span className="text-sm font-bold text-gray-600">2</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=china')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">China</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=croatia')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Croatia</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=denmark')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-gray-700">Denmark</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                  <button 
                    onClick={() => navigate('/live-betting?country=england')}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-700">England Amateur</span>
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeNavTab === "Promotions" && (
          <div className="w-full bg-white">
            {/* Category Filter Tabs */}
            <div className="bg-white border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setSelectedPromotionCategory("All")}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    selectedPromotionCategory === "All"
                      ? "text-gray-800 border-green-500"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedPromotionCategory("Features")}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    selectedPromotionCategory === "Features"
                      ? "text-gray-800 border-green-500"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setSelectedPromotionCategory("Casino")}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    selectedPromotionCategory === "Casino"
                      ? "text-gray-800 border-green-500"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  Casino
                </button>
              </div>
            </div>

            {/* Promotional Banners */}
            <div className="p-4 space-y-4">
              {/* Win Early With 1UP Banner */}
              <button 
                onClick={() => navigate('/promotions/1up-win-early')}
                className="relative bg-gradient-to-r from-green-600 to-green-800 rounded-lg overflow-hidden h-48 w-full hover:from-green-700 hover:to-green-900 transition-colors"
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative h-full flex items-center justify-between p-6">
                  <div className="text-white text-left">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1UP</span>
                      </div>
                      <span className="text-sm font-medium">1-0</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Win Early With 1UP</h3>
                    <p className="text-sm opacity-90">1UP - Win Early If One-Goal Lead</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">$</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Sporty Rain Banner */}
              <button 
                onClick={() => navigate('/promotions/sporty-rain')}
                className="relative bg-gradient-to-r from-blue-900 via-red-800 to-blue-900 rounded-lg overflow-hidden h-48 w-full hover:from-blue-800 hover:via-red-700 hover:to-blue-800 transition-colors"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative h-full flex items-center justify-between p-6">
                  <div className="text-white text-left">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-blue-600 px-2 py-1 rounded">Sporty</span>
                      <span className="text-xs bg-red-600 px-2 py-1 rounded">RAIN</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm">Claim up to</span>
                      <div className="text-2xl font-bold">GHS 35,000</div>
                      <span className="text-sm">Free Bets Daily</span>
                    </div>
                    <h3 className="text-xl font-bold">Rain of thrill. Flight of skill</h3>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">$</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Additional Promotional Cards */}
              <button 
                onClick={() => navigate('/promotions/weekend-accumulator')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden h-32 w-full hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                <div className="relative h-full flex items-center justify-between p-4">
                  <div className="text-white text-left">
                    <h4 className="text-lg font-bold mb-1">Weekend Accumulator</h4>
                    <p className="text-sm opacity-90">Boost your weekend winnings up to 70%</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </button>

              <button 
                onClick={() => navigate('/promotions/cashback-monday')}
                className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg overflow-hidden h-32 w-full hover:from-orange-600 hover:to-red-700 transition-colors"
              >
                <div className="relative h-full flex items-center justify-between p-4">
                  <div className="text-white text-left">
                    <h4 className="text-lg font-bold mb-1">Cashback Monday</h4>
                    <p className="text-sm opacity-90">Get 10% cashback on all your losses</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation onOpenBetslip={() => {}} />
    </div>
  );
};

export default AZMenu;