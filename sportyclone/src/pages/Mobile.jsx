import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { QrCode, Apple, Play } from "lucide-react";
import Footer from "@/components/Footer";

const Mobile = () => {

  const handleDownload = (platform) => {
    // Handle download logic
    console.log(`Downloading ${platform}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-red-800 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-900"></div>
                  <span className="text-6xl md:text-8xl font-bold text-white relative z-10">S</span>
                  <div className="absolute inset-0 opacity-30">
                    <img src="/api/placeholder/200/200" alt="Player silhouette" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute -right-4 md:-right-8 top-4 md:top-8">
                  <div className="w-24 h-40 md:w-32 md:h-56 bg-gradient-to-b from-purple-400 to-blue-600 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-xs">03</div>
                      <div className="text-xs">25</div>
                      <div className="text-xs mt-2 md:mt-4">SPORT</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left lg:ml-16">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-green-400 mb-4">
                NEVER MISS<br />
                A WINNING
              </h1>
              <p className="text-lg md:text-xl mb-2">GET THE BEST BETTING EXPERIENCE</p>
              <p className="text-base md:text-lg mb-6 md:mb-8">WITH OUR SPORTYBET OFFICIAL APP</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => handleDownload("Android")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  Download Android for Free
                </Button>
                <Button 
                  onClick={() => handleDownload("iOS")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium flex items-center justify-center gap-2"
                >
                  <Apple className="w-4 h-4 md:w-5 md:h-5" />
                  Download iOS for Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-600 text-white py-8 md:py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-8 md:space-y-12 text-center lg:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">CASH OUT & PARTIAL CASH OUT</h2>
                <p className="text-base md:text-lg mb-1 md:mb-2">Rack up a return whatever the eventual result comes off.</p>
                <p className="text-base md:text-lg">Take full control of your bets.</p>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">WINNING NOTIFICATIONS</h2>
                <p className="text-base md:text-lg mb-1 md:mb-2">We notify you win.</p>
                <p className="text-base md:text-lg">You will never miss the good news.</p>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">FAST & LIGHT</h2>
                <p className="text-base md:text-lg mb-1 md:mb-2">We provide fast, stable, and secure performance,</p>
                <p className="text-base md:text-lg">in a compact app size, ensuring smooth operation.</p>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <img src="/api/placeholder/300/400" alt="Soccer player" className="w-64 md:w-80 lg:w-96 h-auto" />
                <div className="absolute bottom-4 right-4 md:bottom-0 md:right-8">
                  <div className="w-24 h-40 md:w-32 md:h-56 bg-gray-800 rounded-2xl flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg md:text-xl">S</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="bg-gray-800 text-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">How do I download the SportyBet App?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* QR Code Option */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Opt. 1 Scan QR Code</h3>
              <div className="bg-white p-6 md:p-8 rounded-lg mb-4 inline-block">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-black flex items-center justify-center">
                  <QrCode className="w-20 h-20 md:w-24 md:h-24 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-400">You can also download</p>
              <p className="text-sm text-gray-400">the SportyBet App via QR Code</p>
            </div>
            
            {/* Computer Download */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Opt. 2 To my computer</h3>
              <div className="space-y-3 md:space-y-4 mb-4">
                <Button 
                  onClick={() => handleDownload("Android")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  Download Android for Free
                </Button>
                <p className="text-xs md:text-sm text-gray-400">For Android 7.0 or higher</p>
                <Button 
                  onClick={() => handleDownload("iOS")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Apple className="w-4 h-4 md:w-5 md:h-5" />
                  Download iOS for Free
                </Button>
              </div>
              <p className="text-xs md:text-sm text-gray-400">Click the download button to start</p>
              <p className="text-xs md:text-sm text-gray-400">downloading the SportyBet App.</p>
            </div>
            
            {/* Phone Download */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Opt. 3 To my phone</h3>
              <div className="mb-4">
                <p className="text-xs md:text-sm text-gray-400 mb-2">Download address</p>
                <p className="text-base md:text-lg font-mono break-all">https://sporty.bet/ghapp</p>
              </div>
              <p className="text-xs md:text-sm text-gray-400">Input the address in your mobile browser</p>
              <p className="text-xs md:text-sm text-gray-400">to start download the SportyBet App</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mobile;
