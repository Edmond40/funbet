import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Markets = () => {
  const marketCategories = [
    { name: "Football", count: 150, path: "/football" },
    { name: "Basketball", count: 45, path: "/basketball" },
    { name: "Tennis", count: 32, path: "/sports" },
    { name: "Live Betting", count: 89, path: "/live-betting" },
    { name: "Virtual Sports", count: 25, path: "/virtual" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-3 md:p-6 bg-white">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">All Markets</h1>
          
          <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {marketCategories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className="border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg font-semibold">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs">{category.count} markets</Badge>
                </div>
                <Button className="w-full bg-sporty-green hover:bg-sporty-green-light text-sm md:text-base">
                  View Markets
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <UnifiedBetslip />
      </div>
      <Footer />
    </div>
  );
};

export default Markets;
