import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromotionalBanners = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "LALIGA",
      subtitle: "Real Sociedad vs Real Mallorca",
      background: "bg-gradient-to-r from-purple-900 via-red-800 to-purple-900",
      image: "/api/placeholder/400/200", // LaLiga teams image
      buttonText: "BET NOW",
      buttonColor: "bg-green-500 hover:bg-green-600"
    },
    {
      id: 2,
      title: "SPORTYBET VIRTUAL WORLD",
      subtitle: "BET ON EVERY SECOND",
      background: "bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600",
      image: "/api/placeholder/400/200", // Virtual sports image
      buttonText: "BET NOW",
      buttonColor: "bg-green-500 hover:bg-green-600"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Banner Slides */}
      <div 
        className={`flex transition-transform duration-500 ease-in-out h-full`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`w-full h-full flex-shrink-0 ${banner.background} relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
              {/* Left Content */}
              <div className="flex-1 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg mb-4 opacity-90">
                  {banner.subtitle}
                </p>
                <Button 
                  className={`${banner.buttonColor} text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform`}
                  onClick={() => {
                    if (banner.title.includes("LALIGA")) {
                      window.open("/football");
                    } else if (banner.title.includes("VIRTUAL")) {
                      window.open("/virtuals");
                    }
                  }}
                >
                  {banner.buttonText}
                </Button>
              </div>

              {/* Right Content - Team Logos/Images */}
              <div className="flex-1 flex justify-center items-center">
                {banner.title.includes("LALIGA") ? (
                  <div className="flex items-center space-x-8">
                    {/* Real Sociedad Logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg md:text-xl">RS</span>
                    </div>
                    <span className="text-white text-2xl md:text-3xl font-bold">VS</span>
                    {/* Real Mallorca Logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg md:text-xl">RM</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    {/* Virtual Sports Icons */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🏇</span>
                      </div>
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🏎️</span>
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">⚽</span>
                      </div>
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🏀</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanners;
