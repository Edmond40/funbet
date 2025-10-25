import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopStripBanner = () => {

  const HeroCarousel = () => {
    const slides = [
      { src: "/api/placeholder/1120/260", alt: "Virtual World Banner" },
      { src: "/api/placeholder/1120/260", alt: "Crazy Rider" },
      { src: "/api/placeholder/1120/260", alt: "Promo" },
    ];
    const [idx, setIdx] = useState(0);
    const prev = () => setIdx((p) => (p - 1 + slides.length) % slides.length);
    const next = () => setIdx((p) => (p + 1) % slides.length);
    return (
      <div className="relative  overflow-hidden border py-3 md:py-7 bg-white">
        <img
          src={slides[idx].src}
          alt={slides[idx].alt}
          className="w-full h-32 md:h-48 lg:h-56 object-cover"
        />
        <button onClick={prev} aria-label="Previous slide" title="Previous slide" className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button onClick={next} aria-label="Next slide" title="Next slide" className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <div className="absolute bottom-1 md:bottom-2 left-0 right-0 flex justify-center gap-1 md:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${i === idx ? 'bg-sporty-green' : 'bg-white/70'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };    

  return (
    <div>
      <div className="mb-4 md:mb-6 grid grid-cols-12 px-3 md:px-6 lg:px-10 py-1 gap-2 bg-[#0b1114]">
        {/* Popular side block - Desktop only */}
        <div className="col-span-4 w-72 mx-auto px-5 hidden lg:block">
          <div className="rounded-lg overflow-hidden text-white">
            <div className="px-4 py-2 text-2xl font-semibold">Popular</div>
            <ul className="divide-y divide-white/40">
              {[
                { name: "Today's Football", path: "/football" },
                { name: "Upcoming Games", path: "/live-matches" },
                { name: "England Premier League", path: "/football" },
                { name: "Spain La Liga", path: "/football" },
                { name: "Italy Serie A", path: "/football" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="px-4 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer"
                  >
                    <span className="text-sm">{item.name}</span>
                    <ChevronRight size={20} className="opacity-70 text-green-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Banner carousel */}
        <div className="col-span-12 lg:col-span-6">
          <HeroCarousel />
        </div>
      </div>

      {/* Mobile Popular Links - Horizontal scroll */}
      <div className="lg:hidden mb-4 px-3 md:px-6">
        <div className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-white font-semibold mb-2 text-sm">Popular</h3>
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            {[
              { name: "Today's Football", path: "/football" },
              { name: "Upcoming Games", path: "/live-matches" },
              { name: "Premier League", path: "/football" },
              { name: "La Liga", path: "/football" },
              { name: "Serie A", path: "/football" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex-shrink-0 bg-white/10 text-white px-3 py-2 rounded-full text-xs hover:bg-white/20 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStripBanner;
