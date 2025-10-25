import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo-sportybet.webp"
import Ghana1 from "../assets/ghana1.png"
import styles from './StickyHeader.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get navigation link classes
  const getNavLinkClasses = (path, isCompact = false) => {
    const baseClasses = isCompact
      ? "text-sm font-medium py-2 px-3 transition-all duration-200"
      : "py-3 px-2 transition-all duration-200";

    if (isActive(path)) {
      return `${baseClasses} border-b-2 border-white text-white`;
    }
    return `${baseClasses} border-b-2 border-transparent hover:text-white/80 hover:border-white/50`;
  };

  return (
    <>
      {/* Full Header - Hidden when scrolled */}
      <header className={`bg-red-600 text-white hidden md:block ${styles.smoothTransition} ${isScrolled ? styles.fullHeaderHidden : styles.fullHeaderVisible}`}>
        {/* Top Header */}
        <div className="flex items-center justify-evenly px-4 py-2 text-sm">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={Logo}
                alt="SportyBet"
                className="w-34 h-20 object-cover"
              />
            </Link>
            <div className="flex items-center gap-2">
              <img
                src={Ghana1}
                alt="Ghana Flag"
                className="w-10 h-8 obeject-cover -skew-x-6"
              />
              <span>Ghana</span>
            </div>
            <button className="text-white hover:bg-white/10">
              <Settings size={20} className="mr-1" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>+233</span>
              <input
                placeholder="Mobile Number"
                className="w-32 bg-transparent border-white/20 text-white placeholder:text-white/70"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-32 bg-transparent border-white/20 text-white placeholder:text-white/70"
              />
            </div>
            <div className="flex gap-2">
              <Link to="/login">
                <button >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border-white text-white hover:bg-white hover:text-red-500">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex items-center justify-evenly">
          <div className="flex items-center px-4">
            <div className="flex items-center text-sm font-medium">
              <Link to="/" className={getNavLinkClasses("/")}>Sports</Link>
              <Link to="/games" className={getNavLinkClasses("/games")}>Games</Link>
              <Link to="/live-betting" className={getNavLinkClasses("/live-betting")}>Live Betting</Link>
              <Link to="/scheduled-virtuals" className={getNavLinkClasses("/scheduled-virtuals")}>Scheduled Virtuals</Link>
              <Link to="/jackpot" className={getNavLinkClasses("/jackpot")}>Jackpot</Link>
              <Link to="/livescore" className={getNavLinkClasses("/livescore")}>Livescore</Link>
              <Link to="/results" className={getNavLinkClasses("/results")}>Results</Link>
              <Link to="/promotions" className={getNavLinkClasses("/promotions")}>Promotions</Link>
              <Link to="/mobile" className={getNavLinkClasses("/mobile")}>
                App
                <span className="bg-yellow-400 text-black text-xs px-1 rounded">HOT</span>
              </Link>
            </div>
          </div>
          <div className="text-sm">GMT-04:00</div>
        </nav>
      </header>

      {/* Sticky Compact Header - Shown when scrolled */}
      <header className={`fixed top-0 left-0 right-0 bg-red-500 text-white ${styles.stickyHeader} ${styles.zIndexHeader} ${isScrolled ? styles.stickyHeaderVisible : styles.stickyHeaderHidden}`}>
        {/* Compact Navigation */}
        <nav className={`flex items-center justify-evenly ${styles.compactNav}`}>
          <div className="flex items-center space-x-2">
            <Link to="/" className={getNavLinkClasses("/", true)}>Sports</Link>
            <Link to="/games" className={getNavLinkClasses("/games", true)}>Games</Link>
            <Link to="/live-betting" className={getNavLinkClasses("/live-betting", true)}>Live Betting</Link>
            <Link to="/scheduled-virtuals" className={getNavLinkClasses("/scheduled-virtuals")}>Scheduled Virtuals</Link>
            <Link to="/jackpot" className={getNavLinkClasses("/jackpot", true)}>Jackpot</Link>
            <Link to="/livescore" className={getNavLinkClasses("/livescore", true)}>Livescore</Link>
            <Link to="/results" className={getNavLinkClasses("/results", true)}>Results</Link>
            <Link to="/promotions" className={getNavLinkClasses("/promotions", true)}>Promotions</Link>
            <Link to="/mobile" className={getNavLinkClasses("/mobile")}>
              App
              <span className="bg-yellow-400 text-black text-xs px-1 rounded">HOT</span>
            </Link>
            <div className="text-sm">GMT-04:00</div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;