import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const popularLinks = [
    { name: "Today's Football", path: "/football" },
    { name: "Upcoming Games", path: "/sports" }, 
    { name: "England Premier League", path: "/football" },
    { name: "Spain La Liga", path: "/football" },
    { name: "Italy Serie A", path: "/football" }
  ];

  return (
    <div className="w-64 mx-auto text-white ">
      <div className="p-4 divide-y">
        <h2 className="text-lg font-semibold mb-4 text-sporty-green">Popular</h2>
        <div className="space-y-2">
          {popularLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center justify-between py-2 px-3 hover:bg-white/10 rounded text-sm transition-colors"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-sporty-green" />
            </Link>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default Sidebar;