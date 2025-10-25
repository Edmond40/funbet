import React, { useEffect, useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingBetslip from "./components/FloatingBetslip";
import UnifiedBetslip from "./components/UnifiedBetslip";
import BottomNavigation from "./components/BottomNavigation";
import LoadingLogo from "./assets/loadinglogo2.png"
// Import accessibility styles
import "@/styles/accessibility.css";
import './index.css'

// Lazy load all page components
const Sports = lazy(() => import("./pages"));
const Football = lazy(() => import("./pages/Football"));
const Basketball = lazy(() => import("./pages/Basketball"));
const Tennis = lazy(() => import("./pages/Tennis"));
const EFootball = lazy(() => import("./pages/EFootball"));
const TableTennis = lazy(() => import("./pages/TableTennis"));
const EBasketball = lazy(() => import("./pages/EBasketball"));
const IceHockey = lazy(() => import("./pages/IceHockey"));
const Handball = lazy(() => import("./pages/Handball"));
const Volleyball = lazy(() => import("./pages/Volleyball"));
const Baseball = lazy(() => import("./pages/Baseball"));
const AmericanFootball = lazy(() => import("./pages/AmericanFootball"));
const Rugby = lazy(() => import("./pages/Rugby"));
const Cricket = lazy(() => import("./pages/Cricket"));
const Boxing = lazy(() => import("./pages/Boxing"));
const MMA = lazy(() => import("./pages/MMA"));
const Darts = lazy(() => import("./pages/Darts"));
const Games = lazy(() => import("./pages/Games"));
const LiveBetting = lazy(() => import("./pages/LiveBetting"));
const Jackpot = lazy(() => import("./pages/Jackpot"));
const Promotions = lazy(() => import("./pages/Promotions"));
const Livescore = lazy(() => import("./pages/Livescore"));
const Results = lazy(() => import("./pages/Results"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ScheduledVirtuals = lazy(() => import("./pages/ScheduledVirtuals"));
const Virtuals = lazy(() => import("./pages/Virtuals"));
const Mobile = lazy(() => import("./pages/Mobile"));
const MobileSports = lazy(() => import("./pages/MobileSports"));
const Matches = lazy(() => import("./pages/Matches"));
const Outrights = lazy(() => import("./pages/Outrights"));
const LiveResults = lazy(() => import("./pages/LiveResults"));
const Markets = lazy(() => import("./pages/Markets"));
const LiveMatches = lazy(() => import("./pages/LiveMatches"));
const OutrightsDetail = lazy(() => import("./pages/OutrightsDetail"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Gifts = lazy(() => import("./pages/Gifts"));
const Aviator = lazy(() => import("./pages/Aviator"));
const SportyHero = lazy(() => import("./pages/SportyHero"));
const AZMenu = lazy(() => import("./pages/AZMenu"));
const More = lazy(() => import("./pages/More"));
const Live = lazy(() => import("./pages/Live"));
const VirtualsPage = lazy(() => import("./pages/VirtualsPage"));
const MatchDetails = lazy(() => import("./pages/MatchDetails"));
const CodeHubFootball = lazy(() => import("./pages/CodeHubFootball"));
const UserDashboard = lazy(() => import("./components/UserDashboard"));
const Withdraw = lazy(() => import("./pages/Withdraw"));
const BetHistory = lazy(() => import("./pages/BetHistory"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Security = lazy(() => import("./pages/Security"));
const Loyalty = lazy(() => import("./pages/Loyalty"));
const CustomerService = lazy(() => import("./pages/CustomerService"));
const HowToPlay = lazy(() => import("./pages/HowToPlay"));
const ShareIdea = lazy(() => import("./pages/ShareIdea"));

// Lazy load admin components
const AdminRoutes = lazy(() => import("./admin/AdminRoutes"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-2 animate-ping">
      <img src={LoadingLogo} alt="" className="rounded-full h-20 w-20 object-cover"/>
      <span className="text-gray-500 text-sm">Loading...</span>
    </div>
  </div>
);

const queryClient = new QueryClient();

// AppContent component that uses the bet context
const AppContent = () => {
  const [showBetslip, setShowBetslip] = useState(false);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => {
      if (window.innerWidth >= 1024 && showBetslip) {
        setShowBetslip(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showBetslip, isClient]);

  const handleOpenBetslip = () => {
    setShowBetslip(true);
  };

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Sports />} />
            <Route path="/football" element={<Football />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/tennis" element={<Tennis />} />
            <Route path="/efootball" element={<EFootball />} />
            <Route path="/table-tennis" element={<TableTennis />} />
            <Route path="/ebasketball" element={<EBasketball />} />
            <Route path="/ice-hockey" element={<IceHockey />} />
            <Route path="/handball" element={<Handball />} />
            <Route path="/volleyball" element={<Volleyball />} />
            <Route path="/baseball" element={<Baseball />} />
            <Route path="/american-football" element={<AmericanFootball />} />
            <Route path="/rugby" element={<Rugby />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/boxing" element={<Boxing />} />
            <Route path="/mma" element={<MMA />} />
            <Route path="/darts" element={<Darts />} />
            <Route path="/games" element={<Games />} />
            <Route path="/live-betting" element={<LiveBetting />} />
            <Route path="/jackpot" element={<Jackpot />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/promotions/:id" element={<Promotions />} />
            <Route path="/livescore" element={<Livescore />} />
            <Route path="/results" element={<Results />} />
            <Route path="/scheduled-virtuals" element={<ScheduledVirtuals />} />
            <Route path="/virtuals" element={<Virtuals />} />
            <Route path="/virtual" element={<Virtuals />} />
            <Route path="/virtuals-page" element={<VirtualsPage/>}/>
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/mobile-sports" element={<MobileSports />} />
            <Route path="/live-results" element={<LiveResults />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/outrights" element={<Outrights />} />
            <Route path="/live-matches" element={<LiveMatches />} />
            <Route path="/outrights/:sport/:league" element={<OutrightsDetail />} />
            <Route path="/aviator" element={<Aviator />} />
            <Route path="/sporty-hero" element={<SportyHero />} />
            <Route path="/az-menu" element={<AZMenu />} />
            <Route path="/live" element={<Live />} />
            <Route path="/more" element={<More />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            {/* <Route path="/deposit" element={<Deposit />} /> */}
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/bet-history" element={<BetHistory />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/security" element={<Security />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/share-idea" element={<ShareIdea />} />
            <Route path="/match-details/:id" element={<MatchDetails />} />
            <Route path="/code-hub-football" element={<CodeHubFootball />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        {/* Global Floating Betslip */}
        <FloatingBetslip 
          onOpenBetslip={handleOpenBetslip}
        />
        
        {/* Global Bottom Navigation */}
        <BottomNavigation 
          onOpenBetslip={handleOpenBetslip}
        />
        
        {/* Global Unified Betslip Modal */}
        {showBetslip && (
          <UnifiedBetslip
            isOpen={showBetslip}
            onClose={() => setShowBetslip(false)}
            isMobile={isClient ? window.innerWidth < 1024 : false}
          />
        )}
      </BrowserRouter>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;