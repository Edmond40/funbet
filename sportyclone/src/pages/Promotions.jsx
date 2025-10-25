import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";

const Promotions = () => {
  const [activeTab, setActiveTab] = useState("All");

  const promotions = [
    {
      id: 1,
      title: "SPORTY SAVIOUR",
      subtitle: "Power with a Pulse.",
      description: "UP TO 10% CASHBACK",
      image: "/api/placeholder/770/200",
      category: "All"
    },
    {
      id: 2,
      title: "BOOST YOUR WINNINGS",
      subtitle: "Live Odds Boost - Get Enhanced Odds Instantly",
      description: "",
      image: "/api/placeholder/770/200",
      category: "All"
    },
    {
      id: 3,
      title: "One Cut",
      subtitle: "1 Cut - Win Even If One Selection Loss",
      description: "",
      image: "/api/placeholder/770/200",
      category: "All"
    },
    {
      id: 4,
      title: "Aviator RAINSTORM",
      subtitle: "Trigger the Fun.",
      description: "Freebets of GHS 15,000 Distributed Daily!",
      image: "/api/placeholder/770/200",
      category: "Casino"
    },
    {
      id: 5,
      title: "Flexi",
      subtitle: "",
      description: "",
      image: "/api/placeholder/770/200",
      category: "Features"
    },
    {
      id: 6,
      title: "Win Early With 2UP!",
      subtitle: "2UP - Win Early If Two-Goal Lead",
      description: "",
      image: "/api/placeholder/770/200",
      category: "Features"
    },
    {
      id: 7,
      title: "LIVE ODDS BOOST",
      subtitle: "BOOST YOUR WINNINGS",
      description: "",
      image: "/api/placeholder/770/200",
      category: "Features"
    }
  ];

  const tabs = ["All", "Casino", "Features"];

  const getFilteredPromotions = () => {
    if (activeTab === "All") return promotions;
    return promotions.filter(promo => promo.category === activeTab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <MobileHeader/>
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {/* Page Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Promotions</h1>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="space-y-4 md:space-y-6">
          {getFilteredPromotions().map((promo) => (
            <div key={promo.id} className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={promo.image} 
                  alt={promo.title}
                  className="w-full h-32 md:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="p-3 md:p-6 text-white">
                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">{promo.title}</h3>
                    {promo.subtitle && (
                      <p className="text-sm md:text-lg mb-1 md:mb-2">{promo.subtitle}</p>
                    )}
                    {promo.description && (
                      <p className="text-yellow-300 font-semibold text-xs md:text-base">{promo.description}</p>
                    )}
                  </div>
                  <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                    <ChevronRight size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 md:mt-8 text-center text-gray-600">
          <p className="text-xs md:text-sm px-4">Terms and conditions apply to all promotions. Please read carefully before participating.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Promotions;