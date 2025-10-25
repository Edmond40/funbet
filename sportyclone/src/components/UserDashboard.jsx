import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Wallet, Download, Upload, Gift, Shield, Bell, History, TrendingUp, ChevronRight, Eye, EyeOff, X, Menu, Loader2, Search, Settings, Moon, Sun, HelpCircle, Lightbulb, Trophy, Headphones, House } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BottomNavigation from "./BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { useDarkMode } from "@/hooks/useDarkMode";

const UserDashboard = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle this to test logged in/out states
  const [balance, setBalance] = useState(0.00);
  const [withdrawableBalance, setWithdrawableBalance] = useState(0.00);
  const [showBalance, setShowBalance] = useState(false);
  const [activeSection, setActiveSection] = useState('deposit');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('telecel');
  const [activeTab, setActiveTab] = useState('mobile-money');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+233 20****250');
  const [activeGiftTab, setActiveGiftTab] = useState('valid');
  const [activeSecurityTab, setActiveSecurityTab] = useState('change-password');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [giftCode, setGiftCode] = useState('');
  const [showSelfExclusionModal, setShowSelfExclusionModal] = useState(false);
  const [showSelfExclusionPeriodModal, setShowSelfExclusionPeriodModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [showSettings, setShowSettings] = useState(false);

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionSearchQuery, setTransactionSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Notification states
  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(1);

  // Color constants for consistency
  const colors = {
    primary: {
      green: 'bg-sporty-green hover:bg-sporty-green-light',
      greenLight: 'bg-sporty-green-light',
      blue: 'bg-blue-500 hover:bg-blue-600',
      red: 'bg-red-500 hover:bg-red-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
    },
    text: {
      white: 'text-white',
      black: 'text-gray-900',
      gray: 'text-gray-600',
      lightGray: 'text-gray-400',
      darkGray: 'text-gray-800',
    },
    border: {
      gray: 'border-gray-200',
      lightGray: 'border-gray-300',
      darkGray: 'border-gray-800',
    },
    background: {
      white: 'bg-white',
      gray: 'bg-gray-50',
      lightGray: 'bg-gray-100',
      darkGray: 'bg-gray-200',
      success: 'bg-green-50',
      warning: 'bg-yellow-50',
      error: 'bg-red-50',
      info: 'bg-blue-50',
    }
  };

  // Loading states for better UX
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);

  // Skeleton loading components
  const BalanceSkeleton = () => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-32 animate-pulse mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-40 animate-pulse"></div>
    </div>
  );

  // Simulated data loading effect
  useEffect(() => {
    const loadData = async () => {
      // Simulate loading balance
      setTimeout(() => {
        setBalance(0.00); // Set to 0.00 to match the images
        setWithdrawableBalance(0.00);
        setIsLoadingBalance(false);
      }, 1000);
    };

    loadData();
  }, []);

  // Handle login toggle for testing
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    toast({ 
      title: isLoggedIn ? "Logged Out" : "Logged In", 
      description: isLoggedIn ? "You have been logged out" : "Welcome back!" 
    });
  };

  const handleDeposit = async () => {
    setIsSubmittingDeposit(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingDeposit(false);
      toast({ title: "Deposit Successful", description: `GHS ${depositAmount} deposited successfully!` });
      setDepositAmount('');
    }, 2000);
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setSearchQuery(query);
      setIsSearching(false);
      if (query.trim()) {
        toast({ title: "Search", description: `Searching for: "${query}"` });
      }
    }, 500);
  };

  const handleTransactionSearch = async (query) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setTransactionSearchQuery(query);
      setIsSearching(false);
      if (query.trim()) {
        toast({ title: "Transaction Search", description: `Searching transactions for: "${query}"` });
      }
    }, 500);
  };

  const menuItems = [
    { id: 'account', icon: <User size={20} />, label: 'My Account Info' },
    { id: 'deposit', icon: <Download size={20} />, label: 'Deposit', badge: 'Free' },
    { id: 'withdraw', icon: <Upload size={20} />, label: 'Withdraw' },
    { id: 'history', icon: <History size={20} />, label: 'Bet History' },
    { id: 'transactions', icon: <Download size={20} />, label: 'Transactions' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notification Center' },
    { id: 'gifts', icon: <Gift size={20} />, label: 'Gifts' },
    { id: 'security', icon: <Shield size={20} />, label: 'Safety & Security' }
  ];

  // Mobile-specific menu items
  const mobileMenuItems = [
    { id: 'history', icon: <History size={20} />, label: 'Sports Bet History', subtitle: '' },
    { id: 'transactions', icon: <Download size={20} />, label: 'Transactions', subtitle: '' },
    { id: 'gifts', icon: <Gift size={20} />, label: 'Gifts', subtitle: '(0)', badge: '' },
    { id: 'loyalty', icon: <Trophy size={20} />, label: 'Sporty Loyalty', subtitle: '', badge: 'NEW' },
    { id: 'customer-service', icon: <HelpCircle size={20} />, label: 'Customer Service', subtitle: 'Online 24/7' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notification Center', subtitle: '' },
    { id: 'how-to-play', icon: <House size={20} />, label: 'How to play', subtitle: '' },
    { id: 'share-idea', icon: <House size={20} />, label: 'Share an Idea', subtitle: '' }
  ];

  // Mobile view component
  const MobileView = () => (
    <div className={`h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col`}>
      {/* Mobile Header - Fixed */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0`}>
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">20</span>
              </div>
              <div>
                <div className="font-semibold text-sm">20******0</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLoginToggle}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                aria-label="Logout from account"
                title="Logout from account"
              >
                Logout
              </button>
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setShowSettings(true)}
                title="Open settings"
                aria-label="Open settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <User size={24} className="text-gray-500" aria-hidden="true" />
              <span className="font-semibold">Login to View</span>
              <button 
                onClick={handleLoginToggle}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded ml-2"
                aria-label="Login to account"
                title="Login to account"
              >
                Login
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Dark Mode</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Balance Section */}
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} px-4 py-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-gray-500" aria-hidden="true" />
            <span className="text-sm text-gray-500">Total Balance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold">
              {isLoggedIn ? (showBalance ? `GHS ${balance.toFixed(2)}` : 'GHS 0.00') : 'GHS –'}
            </div>
            {isLoggedIn && (
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                title={showBalance ? "Hide balance" : "Show balance"}
                aria-label={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>
        </div>
        
        {/* Deposit/Withdraw Buttons */}
        <div className="flex gap-3">
          <button 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium"
            onClick={() => {
              setActiveSection('deposit');
              toast({ title: "Deposit", description: "Redirecting to deposit page..." });
            }}
            title="Deposit funds"
            aria-label="Deposit funds"
          >
            <Download size={16} aria-hidden="true" />
            Deposit
          </button>
          <button 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium"
            onClick={() => {
              setActiveSection('withdraw');
              toast({ title: "Withdraw", description: "Redirecting to withdraw page..." });
            }}
            title="Withdraw funds"
            aria-label="Withdraw funds"
          >
            <Upload size={16} aria-hidden="true" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} mx-4 mt-4 rounded-lg p-4`}>
        <div className="grid grid-cols-3 gap-4">
          <button 
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setActiveSection('history')}
            title="View sports bet history"
            aria-label="View sports bet history"
          >
            <History size={24} className="text-gray-600" aria-hidden="true" />
            <div className="text-center">
              <div className="text-sm font-medium">Sports Bet</div>
              <div className="text-xs text-gray-500">History</div>
            </div>
          </button>
          <button 
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setActiveSection('transactions')}
            title="View transactions"
            aria-label="View transactions"
          >
            <TrendingUp size={24} className="text-gray-600" aria-hidden="true" />
            <div className="text-center">
              <div className="text-sm font-medium">Transactions</div>
            </div>
          </button>
          <button 
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setActiveSection('gifts')}
            title="View gifts"
            aria-label="View gifts"
          >
            <Gift size={24} className="text-gray-600" aria-hidden="true" />
            <div className="text-center">
              <div className="text-sm font-medium">Gifts (0)</div>
            </div>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} mx-4 mt-4 rounded-lg overflow-hidden`}>
        {mobileMenuItems.map((item, index) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between p-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${index !== mobileMenuItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
            onClick={() => {
              setActiveSection(item.id);
            }}
            title={`Open ${item.label}`}
            aria-label={`Open ${item.label}`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-gray-600" />
              <div className="text-left">
                <div className="text-sm font-medium">{item.label}</div>
                {item.subtitle && (
                  <div className="text-xs text-gray-500">{item.subtitle}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={16} className="text-gray-400" aria-hidden="true" />
            </div>
          </button>
        ))}
      </div>

        {/* Footer Info */}
        <div className="px-4 mt-6 mb-20">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-xs font-bold">18+</span>
            </div>
            <span className="text-xs">© 2025 SportyBet. All rights reserved.</span>
          </div>
          
          {/* Promotional Footer - Only show when not in dark mode or when logged in */}
          {(!isDarkMode || isLoggedIn) && (
            <div className="mt-4 bg-gray-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="text-red-500 font-bold text-lg">SportyBet</div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">⚽</span>
                  </div>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">LL</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-1">#2 Worldwide in Traffic.</div>
              <div className="text-xs text-gray-400">#1 in Putting Users First.</div>
              <div className="text-xs text-gray-500 mt-2">Paybill:</div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Content Area - Show when a section is active */}
      {activeSection && (
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} fixed inset-0 z-50 overflow-y-auto`}>
          {/* Header */}
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} px-4 py-3 flex items-center gap-3 shadow-sm`}>
            <button
              onClick={() => setActiveSection('')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Close section"
              aria-label="Close current section"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <h1 className="text-lg font-semibold capitalize">
              {activeSection === 'history' ? 'Sports Bet History' : 
               activeSection === 'transactions' ? 'Transactions' :
               activeSection === 'gifts' ? 'Gifts' :
               activeSection === 'notifications' ? 'Notification Center' :
               activeSection === 'security' ? 'Safety & Security' :
               activeSection === 'account' ? 'My Account Info' :
               activeSection === 'deposit' ? 'Deposit' :
               activeSection === 'withdraw' ? 'Withdraw' :
               activeSection === 'loyalty' ? 'Sporty Loyalty' :
               activeSection === 'customer-service' ? 'Customer Service' :
               activeSection === 'how-to-play' ? 'How to Play' :
               activeSection === 'share-idea' ? 'Share an Idea' : activeSection}
            </h1>
          </div>

          {/* Content */}
          <div className="p-4 pb-20">
            {/* Deposit Section */}
            {activeSection === 'deposit' && (
              <div className="space-y-4">
                {/* Payment Method Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === 'mobile-money'
                        ? 'border-blue-500 text-gray-800 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('mobile-money')}
                    aria-label="Select mobile money payment method"
                    title="Select mobile money payment method"
                  >
                    Mobile Money
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === 'paybill'
                        ? 'border-blue-500 text-gray-800 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('paybill')}
                    aria-label="Select paybill payment method"
                    title="Select paybill payment method"
                  >
                    Paybill
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === 'card'
                        ? 'border-blue-500 text-gray-800 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('card')}
                    aria-label="Select card payment method"
                    title="Select card payment method"
                  >
                    Card
                  </button>
                </div>

                {/* Mobile Money Tab */}
                {activeTab === 'mobile-money' && (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-yellow-800">
                        <span>⚠️</span>
                        <span className="text-sm">This payment method is not stable at the moment. Please use another method for depositing.</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Info</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={selectedPaymentMethod}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        aria-label="Select payment method"
                        title="Select payment method"
                      >
                        <option value="telecel">Telecel</option>
                        <option value="mtn">MTN</option>
                        <option value="airtel">AirtelTigo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mobile Number</label>
                      <div className="flex gap-2">
                        <Input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1"
                        />
                        <button 
                          className="px-3 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50"
                          title="Switch mobile number"
                          aria-label="Switch mobile number"
                        >
                          Switch
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Amount (GHS)</label>
                      <Input
                        placeholder="min. 1.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      disabled={!depositAmount || parseFloat(depositAmount) < 1 || isSubmittingDeposit}
                      onClick={handleDeposit}
                    >
                      {isSubmittingDeposit ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Top Up Now'
                      )}
                    </Button>

                    <div className="bg-gray-50 p-4 rounded">
                      <h3 className="font-semibold mb-2">Note</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>1. Maximum per transaction is GHS 20,000.00</p>
                        <p>2. Minimum per transaction is GHS 1.00</p>
                        <p>3. Deposit is free, no transaction fees.</p>
                        <p>4. Your balance can only be withdrawn to the mobile number that you registered with.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paybill Tab */}
                {activeTab === 'paybill' && (
                  <div className="space-y-3">
                    <div
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toast({ title: "MTN Mobile Money", description: "Redirecting to MTN payment..." })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">📱</span>
                        </div>
                        <span className="font-medium">MTN Mobile Money</span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                    </div>

                    <div
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toast({ title: "AirtelTigo", description: "Redirecting to AirtelTigo payment..." })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">📱</span>
                        </div>
                        <span className="font-medium">AirtelTigo</span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                    </div>

                    <div
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toast({ title: "Telecel", description: "Redirecting to Telecel payment..." })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">📱</span>
                        </div>
                        <span className="font-medium">Telecel</span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* Card Tab */}
                {activeTab === 'card' && (
                  <div className="space-y-4">
                    <div className="flex gap-4 mb-6">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💳</span>
                      </div>
                      <div className="w-12 h-8 bg-yellow-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💳</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry</label>
                        <Input
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Amount (GHS)</label>
                      <Input
                        placeholder="min. 1.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="saveCard"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded"
                      />
                      <label htmlFor="saveCard" className="text-sm">Save card</label>
                    </div>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      disabled={!cardNumber || !expiryDate || !cvv || !depositAmount}
                    >
                      Top Up Now
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Withdraw Section */}
            {activeSection === 'withdraw' && (
              <div className="space-y-4">
                <div className="flex border-b mb-6">
                  <button title="Mobile Money withdrawal" className="px-4 py-2 border-b-2 border-green-500 text-green-500">Mobile Money</button>
                  <button title="Bank withdrawal" className="px-4 py-2 text-gray-500">Bank</button>
                </div>
                <div className="mb-4">
                  <div className="text-sm mb-2">Withdraw To</div>
                  <div className="text-lg">+233 20****250</div>
                </div>
                <div className="mb-4">
                  <Input placeholder="Amount (GHS)" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                </div>
                <Button className="w-full bg-gray-400" disabled>Withdraw</Button>
              </div>
            )}

            {/* History Section */}
            {activeSection === 'history' && (
              <div className="space-y-4">
                <div className="flex border-b border-gray-200 mb-6">
                  <button title="View sport bets history" className="px-4 py-2 text-sm font-medium border-b-2 border-gray-800 text-gray-800">
                    Sport Bets
                  </button>
                  <button title="View jackpot history" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Jackpot
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button className="bg-green-500 text-white text-sm px-4 py-2">All</Button>
                  <Button variant="outline" className="text-gray-600 text-sm px-4 py-2">Settled</Button>
                  <Button variant="outline" className="text-gray-600 text-sm px-4 py-2">Unsettled</Button>
                </div>

                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <Input
                    placeholder="Search bet history..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="text-center py-16">
                  <div className="mb-4">
                    <History size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Bets Available</h3>
                  <p className="text-gray-400 text-sm">Your betting history will appear here once you place your first bet</p>
                </div>
              </div>
            )}

            {/* Transactions Section */}
            {activeSection === 'transactions' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 text-sm">Deposit status incorrect?</span>
                    <Button className="bg-green-500 text-white text-sm px-4 py-1">Fix Status</Button>
                  </div>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto">
                  <Button className="bg-green-500 text-white text-sm px-4 py-2 whitespace-nowrap">All Categories</Button>
                  <Button variant="outline" className="text-gray-600 text-sm px-4 py-2 whitespace-nowrap">Deposits</Button>
                  <Button variant="outline" className="text-gray-600 text-sm px-4 py-2 whitespace-nowrap">Withdrawals</Button>
                  <Button variant="outline" className="text-gray-600 text-sm px-4 py-2 whitespace-nowrap">Bets</Button>
                </div>

                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <Input
                    placeholder="Search transactions..."
                    value={transactionSearchQuery}
                    onChange={(e) => handleTransactionSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="text-center py-16">
                  <div className="mb-4">
                    <TrendingUp size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Records Found.</h3>
                  <p className="text-gray-400 text-sm">Your transaction history will appear here</p>
                </div>
              </div>
            )}

            {/* Gifts Section */}
            {activeSection === 'gifts' && (
              <div className="space-y-4">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${activeGiftTab === 'valid'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveGiftTab('valid')}
                    aria-label="View valid gifts"
                    title="View valid gifts"
                  >
                    Valid
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${activeGiftTab === 'used-expired'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveGiftTab('used-expired')}
                    aria-label="View used and expired gifts"
                    title="View used and expired gifts"
                  >
                    Used/Expired
                  </button>
                </div>

                <div className="mb-6">
                  <Input
                    placeholder="Enter gift code here..."
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                  />
                  <Button
                    className="w-full mt-2 bg-green-500 text-white"
                    onClick={() => {
                      if (giftCode.trim()) {
                        toast({ title: "Gift Code", description: `Attempting to redeem: ${giftCode}` });
                        setGiftCode('');
                      } else {
                        toast({ title: "Error", description: "Please enter a gift code", variant: "destructive" });
                      }
                    }}
                  >
                    🎁 Redeem your code
                  </Button>
                </div>

                <div className="text-center py-16">
                  <div className="mb-4">
                    <Gift size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Currently no available gifts.</h3>
                  <p className="text-gray-400 text-sm">Valid gift codes will appear here when available</p>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="space-y-4">
                <div className="flex border-b border-gray-200 mb-6">
                  <button title="System notifications" className="px-4 py-2 text-sm font-medium border-b-2 border-gray-800 text-gray-800">
                    System
                  </button>
                  <button title="Promotion notifications" className="px-4 py-2 text-sm font-medium text-gray-500">
                    Promotion
                  </button>
                  <button title="Message notifications" className="px-4 py-2 text-sm font-medium text-gray-500">
                    Message
                  </button>
                </div>

                <div className="text-center py-20">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell size={32} className="text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Messages available</h3>
                  <p className="text-gray-400 text-sm">System notifications and messages will appear here</p>
                </div>
              </div>
            )}

            {/* Account Section */}
            {activeSection === 'account' && (
              <div className="space-y-4">
                <div className="bg-white border rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">20</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">20******0</h2>
                      <p className="text-gray-600">Phone: 20******0</p>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 text-white">Update Profile</Button>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-4">
                {/* Security Tabs */}
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${activeSecurityTab === 'change-password'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveSecurityTab('change-password')}
                    aria-label="Change password settings"
                    title="Change password settings"
                  >
                    Change Password
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${activeSecurityTab === 'multifactor'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveSecurityTab('multifactor')}
                    aria-label="Multifactor authentication settings"
                    title="Multifactor authentication settings"
                  >
                    Multifactor Authentication
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${activeSecurityTab === 'self-exclusion'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setActiveSecurityTab('self-exclusion')}
                    aria-label="Self exclusion settings"
                    title="Self exclusion settings"
                  >
                    Self Exclusion
                  </button>
                </div>

                {/* Change Password Content */}
                {activeSecurityTab === 'change-password' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Old Password</label>
                      <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter old password"
                      />
                      <button title="Reset password" className="mt-2 text-green-500 text-sm">Forgot Password?</button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
                      <p>Your password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter and one number.</p>
                    </div>
                    <Button
                      className="w-full bg-green-500 text-white"
                      disabled={!oldPassword || !newPassword}
                      onClick={() => {
                        toast({ title: "Password Changed", description: "Your password has been updated successfully!" });
                        setOldPassword('');
                        setNewPassword('');
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                )}

                {/* Multifactor Authentication Tab */}
                {activeSecurityTab === 'multifactor' && (
                  <div className="space-y-4">
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Sporty PIN</h3>
                          <p className="text-sm text-gray-500">Set up a PIN for additional security</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email 2-Step Verification</h3>
                          <p className="text-sm text-gray-500">Receive verification codes via email</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Off</span>
                          <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email <span className="text-red-500">*</span></h3>
                          <p className="text-sm text-gray-500">Update your email address</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Self Exclusion Tab */}
                {activeSecurityTab === 'self-exclusion' && (
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-green-500 text-white"
                      onClick={() => setShowSelfExclusionModal(true)}
                    >
                      Set up Self-Exclusion
                    </Button>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2">What is Self-Exclusion?</h3>
                      <p className="text-sm text-yellow-700">
                        Self-Exclusion allows you to close your account for a specified time period. During this period, you won't be able to bet or play games.
                      </p>
                    </div>
                  </div>
                )}

                {/* Self Exclusion Modal */}
                {showSelfExclusionModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Self-Exclusion</h2>
                        <button
                          onClick={() => setShowSelfExclusionModal(false)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Close self-exclusion modal"
                          title="Close self-exclusion modal"
                        >
                          <X size={20} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="space-y-4 text-sm text-gray-600">
                        <p>SportyBet's Self Exclusion option allows players to close their accounts for a specified time period. During this period, players will not be able to bet or play games, although players can still login to withdraw funds.</p>
                        <p>Users who opt for self-exclusion are prohibited from creating new Sporty accounts during the self-exclusion period.</p>
                        <p className="font-medium">Once you self exclude your account, it cannot be re-enabled until the time period has concluded or by contacting customer service</p>
                      </div>

                      <Button
                        className="w-full mt-6 bg-green-500 text-white"
                        onClick={() => {
                          setShowSelfExclusionModal(false);
                          setShowSelfExclusionPeriodModal(true);
                        }}
                      >
                        Set up Self-Exclusion
                      </Button>
                    </div>
                  </div>
                )}

                {/* Self Exclusion Period Modal */}
                {showSelfExclusionPeriodModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Self-Exclusion Period</h2>
                        <button
                          onClick={() => setShowSelfExclusionPeriodModal(false)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Close self-exclusion period modal"
                          title="Close self-exclusion period modal"
                        >
                          <X size={20} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mb-4">
                        <select 
                          className="w-full p-3 border border-gray-300 rounded"
                          aria-label="Select self-exclusion period"
                          title="Select self-exclusion period"
                        >
                          <option>Select</option>
                          <option>24 hours</option>
                          <option>1 week</option>
                          <option>1 month</option>
                          <option>3 months</option>
                          <option>6 months</option>
                          <option>1 year</option>
                        </select>
                      </div>

                      <Button
                        className="w-full bg-gray-400 text-gray-600"
                        disabled
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sporty Loyalty Section */}
            {activeSection === 'loyalty' && (
              <div className="space-y-4">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h2 className="text-xl font-bold mb-2">Welcome to Sporty Loyalty!</h2>
                  <p className="text-sm opacity-90">Earn points, unlock rewards, and enjoy exclusive benefits</p>
                </div>

                {/* Quick Help Topics */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Help Topics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button title="Get help with deposits" className={`p-3 rounded-lg text-center ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-blue-50 hover:bg-blue-100'
                    }`}>
                      <div className="text-2xl mb-1">💰</div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-800'
                      }`}>Deposits</div>
                    </button>
                    <button title="Get help with withdrawals" className={`p-3 rounded-lg text-center ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-green-50 hover:bg-green-100'
                    }`}>
                      <div className="text-2xl mb-1">💸</div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-green-400' : 'text-green-800'
                      }`}>Withdrawals</div>
                    </button>
                    <button title="Get help with betting" className={`p-3 rounded-lg text-center ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-purple-50 hover:bg-purple-100'
                    }`}>
                      <div className="text-2xl mb-1">🎯</div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-purple-400' : 'text-purple-800'
                      }`}>Betting</div>
                    </button>
                    <button title="Get help with account" className={`p-3 rounded-lg text-center ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-orange-50 hover:bg-orange-100'
                    }`}>
                      <div className="text-2xl mb-1">👤</div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-800'
                      }`}>Account</div>
                    </button>
                  </div>
                </div>

                {/* How to Earn Points */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Earn Points</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">💰</span>
                      </div>
                      <div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Place Bets</div>
                        <div className="text-sm text-gray-500">Earn 1 point for every GHS 10 wagered</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600">📅</span>
                      </div>
                      <div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Daily Login</div>
                        <div className="text-sm text-gray-500">Get 5 points for logging in daily</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Service Section */}
            {activeSection === 'customer-service' && (
              <div className="space-y-4">
                {/* Status Banner */}
                <div className="bg-green-500 text-white rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📞</div>
                  <h2 className="text-lg font-bold mb-1">We're Here to Help!</h2>
                  <p className="text-sm opacity-90">Our support team is available 24/7</p>
                </div>

                {/* Contact Options */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden`}>
                  <button 
                    className={`w-full flex items-center gap-4 p-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    onClick={() => toast({ title: "Live Chat", description: "Opening live chat... 💬" })}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Live Chat</div>
                      <div className="text-sm text-gray-500">Chat with our support team instantly</div>
                      <div className="text-xs text-green-500 font-medium">● Online Now</div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                  </button>

                  <button 
                    className={`w-full flex items-center gap-4 p-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    onClick={() => toast({ title: "WhatsApp", description: "Opening WhatsApp support... 📱" })}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>WhatsApp</div>
                      <div className="text-sm text-gray-500">Message us on WhatsApp</div>
                      <div className="text-xs text-blue-500">+233 XX XXX XXXX</div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                  </button>

                  <button 
                    className={`w-full flex items-center gap-4 p-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    onClick={() => toast({ title: "Email Support", description: "Opening email client... ✉️" })}
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Support</div>
                      <div className="text-sm text-gray-500">Send us an email</div>
                      <div className="text-xs text-blue-500">support@sportybet.com</div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* How to Play Section */}
            {activeSection === 'how-to-play' && (
              <div className="space-y-4">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
                  <div className="text-3xl mb-2">📖</div>
                  <h2 className="text-xl font-bold mb-2">Learn How to Play</h2>
                  <p className="text-sm opacity-90">Master the art of sports betting with our guides</p>
                </div>

                {/* Betting Basics */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Betting Basics</h3>
                  <div className="space-y-3">
                    <button 
                      className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                      onClick={() => toast({ title: "Getting Started", description: "Opening beginner's guide... 🚀" })}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚀</span>
                        <div className="text-left">
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Getting Started</div>
                          <div className="text-sm text-gray-500">Your first steps in sports betting</div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                    </button>

                    <button 
                      className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                      onClick={() => toast({ title: "Understanding Odds", description: "Learning about betting odds... 🔢" })}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔢</span>
                        <div className="text-left">
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Understanding Odds</div>
                          <div className="text-sm text-gray-500">Learn how odds work and what they mean</div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Sports Guides */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sports Guides</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className={`p-4 rounded-lg text-center ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-green-50 hover:bg-green-100'
                      }`}
                      onClick={() => toast({ title: "Football Guide", description: "Opening football betting guide... ⚽" })}
                    >
                      <div className="text-3xl mb-2">⚽</div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-green-400' : 'text-green-800'
                      }`}>Football</div>
                    </button>
                    <button 
                      className={`p-4 rounded-lg text-center ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-orange-50 hover:bg-orange-100'
                      }`}
                      onClick={() => toast({ title: "Basketball Guide", description: "Opening basketball betting guide... 🏀" })}
                    >
                      <div className="text-3xl mb-2">🏀</div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-800'
                      }`}>Basketball</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Share an Idea Section */}
            {activeSection === 'share-idea' && (
              <div className="space-y-4">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
                  <div className="text-3xl mb-2">💡</div>
                  <h2 className="text-xl font-bold mb-2">Share Your Ideas</h2>
                  <p className="text-sm opacity-90">Help us improve SportyBet with your suggestions</p>
                </div>

                {/* Feedback Form */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tell us your idea</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Category
                      </label>
                      <select 
                        className={`w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        aria-label="Select idea category"
                        title="Select idea category"
                      >
                        <option>Select a category</option>
                        <option>App Features</option>
                        <option>Sports & Markets</option>
                        <option>User Experience</option>
                        <option>Payment Methods</option>
                        <option>Customer Service</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Your Idea
                      </label>
                      <textarea 
                        className={`w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Describe your idea in detail..."
                      ></textarea>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Email (Optional)
                      </label>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com"
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <p className="text-xs text-gray-500 mt-1">We'll contact you if we need more details</p>
                    </div>

                    <Button 
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3"
                      onClick={() => toast({ title: "Idea Submitted!", description: "Thank you for your suggestion! 🎉" })}
                    >
                      Submit Idea
                    </Button>
                  </div>
                </div>

                {/* Popular Ideas */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popular Ideas</h3>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                    }`}>
                      <span className="text-2xl">📱</span>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-800'
                        }`}>Dark Mode for Mobile</div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-blue-300' : 'text-blue-600'
                        }`}>Requested by 234 users</div>
                      </div>
                      <div className="text-green-600 font-medium text-sm">✓ Implemented</div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'
                    }`}>
                      <span className="text-2xl">⚽</span>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isDarkMode ? 'text-yellow-400' : 'text-yellow-800'
                        }`}>More Live Betting Options</div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                        }`}>Requested by 189 users</div>
                      </div>
                      <div className="text-orange-600 font-medium text-sm">In Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Page */}
      {showSettings && (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} fixed inset-0 z-50 overflow-y-auto`}>
          {/* Settings Header */}
          <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-red-600 rounded-lg"
                title="Go back"
                aria-label="Go back to dashboard"
              >
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <h1 className="text-lg font-semibold">Settings</h1>
            </div>
            <Link 
              to="/" 
              className="p-2 hover:bg-red-600 rounded-lg"
              title="Go to home"
              aria-label="Go to home page"
            >
              <House size={20}/>
            </Link>
          </div>

          {/* Settings Content */}
          <div className="p-0">
            {/* Profile Section */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
              <button 
                className={`w-full flex items-center justify-between p-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  setActiveSection('account');
                  setShowSettings(false);
                }}
              >
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile</span>
                <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>

            {/* Dark Mode Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</h3>
              
              <div className="space-y-3">
                <button
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    !isDarkMode ? 'bg-green-50 border border-green-200' : 'bg-gray-700'
                  }`}
                  onClick={() => setIsDarkMode(false)}
                >
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>On</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    !isDarkMode ? 'border-green-500 bg-green-500' : 'border-gray-400'
                  }`}>
                    {!isDarkMode && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>

                <button
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}
                  onClick={() => setIsDarkMode(true)}
                >
                  <span className={`${isDarkMode ? 'text-gray-900' : 'text-gray-900'}`}>Off</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isDarkMode ? 'border-green-500 bg-green-500' : 'border-gray-400'
                  }`}>
                    {isDarkMode && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>

                <button title="Follow system theme settings" className={`w-full flex items-center justify-between p-3 rounded-lg bg-gray-50`}>
                  <span className="text-gray-900">Follow System Settings</span>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                </button>
              </div>
            </div>

            {/* Preference Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Preference</h3>
              
              <div className="space-y-1">
                <button 
                  className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                  onClick={() => toast({ title: "Popovers", description: "Popover settings coming soon! 🎯" })}
                >
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popovers</span>
                  <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>

                <button 
                  className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                  onClick={() => toast({ title: "My Stakes", description: "Stake management settings coming soon! 💰" })}
                >
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Stakes</span>
                  <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>

                <button 
                  className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                  onClick={() => toast({ title: "My Favourites", description: "Favourites settings coming soon! ⭐" })}
                >
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Favourites Settings</span>
                  <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>

                <button 
                  className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                  onClick={() => toast({ title: "Odds Format", description: "Odds format settings - Currently set to Decimal 🔢" })}
                >
                  <div className="flex items-center gap-2">
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Odds Format</span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 text-sm">Decimal</span>
                    <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button 
                className={`w-full text-left ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} p-2 rounded-lg`}
                onClick={() => {
                  setActiveSection('notifications');
                  setShowSettings(false);
                }}
              >
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
              </button>
            </div>

            {/* Others Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Others</h3>
              
              <button 
                className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-lg`}
                onClick={() => toast({ title: "Change Region", description: "Region settings coming soon! 🌍" })}
              >
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Change Region</span>
                <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>

            {/* Footer Section */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4`}>
              {/* Age Restriction */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">18+</span>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2025 SportyBet. All rights reserved.</span>
              </div>

              {/* Promotional Section */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="text-red-500 font-bold text-lg">SportyBet</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Official Sports Betting Partner</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">⚽</span>
                    </div>
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">LL</span>
                    </div>
                  </div>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>#2 Worldwide in Traffic.</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>#1 in Putting Users First.</div>
                
                <div className="mt-4">
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Paybill:</div>
                  <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>*711*222#</div>
                </div>

                <div className="mt-6">
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Payment methods</div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">at</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-yellow-500 rounded flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">MTN</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">telecel</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">MC</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">GTBank</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <button 
                      className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} underline hover:text-blue-500`}
                      onClick={() => toast({ title: "SportyBet ZA", description: "Redirecting to SportyBet South Africa... 🇿🇦" })}
                    >
                      SportyBet ZA
                    </button>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
                    <button 
                      className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} underline hover:text-blue-500`}
                      onClick={() => toast({ title: "SportyBet BR", description: "Redirecting to SportyBet Brazil... 🇧🇷" })}
                    >
                      SportyBet BR
                    </button>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
                    <button 
                      className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} underline hover:text-blue-500`}
                      onClick={() => toast({ title: "SportyBet MX", description: "Redirecting to SportyBet Mexico... 🇲🇽" })}
                    >
                      SportyBet MX
                    </button>
                  </div>
                </div>

                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 px-4`}>
                  Age 18 and above only. Play Responsibly. Betting is addictive and can be psychologically harmful. SportyBet Ghana is licensed by the Gaming Commission of Ghana.
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <button 
                    className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} underline hover:text-blue-500`}
                    onClick={() => toast({ title: "Terms & Conditions", description: "Opening Terms & Conditions... 📋" })}
                  >
                    Terms & Conditions
                  </button>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
                  <button 
                    className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} underline hover:text-blue-500`}
                    onClick={() => toast({ title: "About Us", description: "Opening About Us page... ℹ️" })}
                  >
                    About Us
                  </button>
                </div>

                <Button 
                  className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white'} py-3`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    toast({ title: "Back to Top", description: "Scrolled to top of page" });
                  }}
                >
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );

  // Desktop view (existing implementation)
  const DesktopView = () => (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b px-4 py-3 sm:px-6 flex items-center justify-between shadow-sm">
        <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          title={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-0 top-0 z-50 lg:z-auto lg:w-64 xl:w-72 bg-gray-200 lg:min-h-screen w-80 sm:w-96 overflow-y-auto shadow-lg lg:shadow-none`}>
            {/* Mobile Close Button */}
            <div className="lg:hidden p-4 border-b flex justify-end bg-white">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-300 rounded-lg transition-all duration-200"
                aria-label="Close mobile menu"
                title="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* User Profile Section */}
            <div className="bg-gray-800 text-white p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ED</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">EDMUND O...</div>
                  <div className="text-xs text-gray-300">207*39*50</div>
                </div>
              </div>

              {/* Balance Section */}
              <div className="mb-4">
                {isLoadingBalance ? (
                  <BalanceSkeleton />
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Total Balance</span>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="text-lg font-bold">
                      {showBalance ? 'GHS ' + balance.toFixed(2) : 'GHS --'}
                    </div>
                    {showBalance && (
                      <div className="text-xs text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>Withdrawable Balance</span>
                        </div>
                        <div className="text-sm">GHS {withdrawableBalance.toFixed(2)}</div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Deposit/Withdraw Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-sporty-green hover:bg-sporty-green-light text-white text-xs py-2"
                  onClick={() => {
                    setActiveSection('deposit');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Download size={14} className="mr-1" />
                  Deposit
                </Button>
                <Button
                  className="flex-1 bg-sporty-green hover:bg-sporty-green-light text-white text-xs py-2"
                  onClick={() => {
                    setActiveSection('withdraw');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Upload size={14} className="mr-1" />
                  Withdraw
                </Button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? `${colors.primary.green} ${colors.text.white} shadow-md`
                        : `${colors.text.gray} hover:bg-gray-300 hover:text-gray-800`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={16} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">{item.badge}</span>
                      )}
                      {item.id === 'notifications' && unreadNotifications > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                      {item.id === 'notifications' && unreadMessages > 0 && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {unreadMessages}
                        </span>
                      )}
                      <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Made responsive */}
          <div className="flex-1 p-3 sm:p-4 lg:p-6 bg-white min-h-screen transition-all duration-200">
            <div className="max-w-6xl mx-auto">
              {activeSection === 'deposit' && (
                <div className="max-w-4xl">
                  {/* Payment Method Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'mobile-money'
                          ? `border-blue-500 ${colors.text.darkGray} bg-blue-50`
                          : `border-transparent ${colors.text.gray} hover:${colors.text.darkGray} hover:bg-gray-50`
                      }`}
                      onClick={() => setActiveTab('mobile-money')}
                    >
                      Mobile Money
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'paybill'
                          ? `border-blue-500 ${colors.text.darkGray} bg-blue-50`
                          : `border-transparent ${colors.text.gray} hover:${colors.text.darkGray} hover:bg-gray-50`
                      }`}
                      onClick={() => setActiveTab('paybill')}
                    >
                      Paybill
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === 'card'
                          ? `border-blue-500 ${colors.text.darkGray} bg-blue-50`
                          : `border-transparent ${colors.text.gray} hover:${colors.text.darkGray} hover:bg-gray-50`
                      }`}
                      onClick={() => setActiveTab('card')}
                    >
                      Card
                    </button>
                  </div>

                  {/* Mobile Money Tab Content */}
                  {activeTab === 'mobile-money' && (
                    <>
                      {/* Warning Message */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <span>⚠️</span>
                          <span className="text-sm">This payment method is not stable at the moment. Please use another method for depositing.</span>
                        </div>
                      </div>

                      {/* Payment Form */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Payment Info</label>
                          <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-gray-400"
                            value={selectedPaymentMethod}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            aria-label="Select payment method"
                            title="Select payment method"
                          >
                            <option value="telecel">Telecel</option>
                            <option value="mtn">MTN</option>
                            <option value="airtel">AirtelTigo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Mobile Number</label>
                          <div className="flex gap-2">
                            <Input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-gray-400"
                            />
                            <button className="px-3 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 hover:border-blue-600 transition-all duration-200 whitespace-nowrap" aria-label="Switch mobile number" title="Switch mobile number">
                              Switch
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Amount (GHS)</label>
                        <Input
                          placeholder="min. 1.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="max-w-xs border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-gray-400"
                        />
                      </div>

                      <Button
                        className="bg-gray-400 text-gray-600 mb-6"
                        disabled={!depositAmount || parseFloat(depositAmount) < 1 || isSubmittingDeposit}
                        onClick={handleDeposit}
                      >
                        {isSubmittingDeposit ? (
                          <>
                            <Loader2 size={16} className="mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Top Up Now'
                        )}
                      </Button>

                      {/* Notes */}
                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold mb-2">Note</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>1. Maximum per transaction is GHS 20,000.00</p>
                          <p>2. Minimum per transaction is GHS 1.00</p>
                          <p>3. Deposit is free, no transaction fees.</p>
                          <p>4. Your balance can only be withdrawn to the mobile number that you registered with.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Paybill Tab Content */}
                  {activeTab === 'paybill' && (
                    <>
                      {/* Mobile Money Providers List */}
                      <div className="space-y-3 mb-6">
                        <div
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                          onClick={() => toast({ title: "MTN Mobile Money", description: "Redirecting to MTN payment..." })}
                          role="button"
                          tabIndex={0}
                          aria-label="Select MTN Mobile Money"
                          title="Select MTN Mobile Money"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center shadow-sm">
                              <span className="text-white text-xs font-bold">📱</span>
                            </div>
                            <span className="font-medium">MTN Mobile Money</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </div>

                        <div
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                          onClick={() => toast({ title: "AirtelTigo", description: "Redirecting to AirtelTigo payment..." })}
                          role="button"
                          tabIndex={0}
                          aria-label="Select AirtelTigo"
                          title="Select AirtelTigo"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center shadow-sm">
                              <span className="text-white text-xs font-bold">📱</span>
                            </div>
                            <span className="font-medium">AirtelTigo</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </div>

                        <div
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                          onClick={() => toast({ title: "Telecel", description: "Redirecting to Telecel payment..." })}
                          role="button"
                          tabIndex={0}
                          aria-label="Select Telecel"
                          title="Select Telecel"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center shadow-sm">
                              <span className="text-white text-xs font-bold">📱</span>
                            </div>
                            <span className="font-medium">Telecel</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold mb-2">Note</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>1. Maximum per transaction is GHS 20,000.00</p>
                          <p>2. Minimum per transaction is GHS 1.00</p>
                          <p>3. Deposit is free, no transaction fees.</p>
                          <p>4. Your balance can only be withdrawn to the mobile number that you registered with.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Card Tab Content */}
                  {activeTab === 'card' && (
                    <>
                      {/* Card Logos */}
                      <div className="flex gap-4 mb-6">
                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                          <span className="text-white text-xs font-bold">💳</span>
                        </div>
                        <div className="w-12 h-8 bg-yellow-500 rounded flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                          <span className="text-white text-xs font-bold">💳</span>
                        </div>
                      </div>

                      {/* Card Form */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Info</label>
                          <div className="grid grid-cols-3 gap-4">
                            <Input
                              placeholder="Card Number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="col-span-1"
                            />
                            <Input
                              placeholder="Expiry"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="col-span-1"
                            />
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="flex-1"
                              />
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs">?</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Amount (GHS)</label>
                          <Input
                            placeholder="min. 1.00"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="max-w-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="saveCard"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded"
                          />
                          <label htmlFor="saveCard" className="text-sm">Save card</label>
                        </div>
                      </div>

                      <Button
                        className="bg-gray-400 text-gray-600 mb-6"
                        disabled={!cardNumber || !expiryDate || !cvv || !depositAmount}
                      >
                        Top Up Now
                      </Button>

                      {/* Notes */}
                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold mb-2">Note</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>1. Minimum per transaction is GHS 1.00</p>
                          <p>2. Maximum per transaction is GHS 20,000.00</p>
                          <p>3. Any card details you choose to save are encrypted. We do not store your CVV.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeSection === 'withdraw' && (
                <div className="max-w-4xl">
                  <div className="flex border-b mb-6">
                    <button title="Mobile Money withdrawal" className="px-4 py-2 border-b-2 border-green-500 text-green-500">Mobile Money</button>
                    <button title="Bank withdrawal" className="px-4 py-2 text-gray-500">Bank</button>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm mb-2">Withdraw To</div>
                    <div className="text-lg">+233 20****250</div>
                  </div>
                  <div className="mb-4">
                    <Input placeholder="Amount (GHS)" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                  </div>
                  <Button className="bg-gray-400" disabled>Withdraw</Button>
                </div>
              )}

              {activeSection === 'account' && (
                <div className="max-w-4xl">
                  <h1 className="text-2xl font-bold mb-6">My Account Info</h1>
                  <div className="bg-white border rounded p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">ED</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">EDMUND O...</h2>
                        <p className="text-gray-600">Phone: 207*39*50</p>
                      </div>
                    </div>
                    <Button className="bg-sporty-green text-white">Update Profile</Button>
                  </div>
                </div>
              )}

              {activeSection === 'history' && (
                <div className="max-w-6xl">
                  {/* Header Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button title="View sport bets history" className="px-4 py-2 text-sm font-medium border-b-2 border-gray-800 text-gray-800">
                      Sport Bets
                    </button>
                    <button title="View jackpot history" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Jackpot
                    </button>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
                    <div className="flex gap-2">
                      <Button className={`${colors.primary.green} ${colors.text.white} text-sm px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200`}>
                        All
                      </Button>
                      <Button variant="outline" className={`${colors.text.gray} text-sm px-4 py-2 border-gray-300 hover:bg-gray-50 transition-all duration-200`}>
                        Settled
                      </Button>
                      <Button variant="outline" className={`${colors.text.gray} text-sm px-4 py-2 border-gray-300 hover:bg-gray-50 transition-all duration-200`}>
                        Unsettled
                      </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                        <Input
                          placeholder="Search bet history..."
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                        {isSearching && (
                          <Loader2 size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-16">
                    <div className="mb-4">
                      <History size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No Bets Available</h3>
                    <p className="text-gray-400 text-sm">Your betting history will appear here once you place your first bet</p>
                  </div>

                  {/* Promotional Banner */}
                  <div className="mt-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">ODDS BOOST</h3>
                        <p className="text-sm opacity-90">BEST BEST ODDS IN GHANA!</p>
                        <p className="text-xs opacity-75">ENGLAND PREMIER LEAGUE</p>
                      </div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
                          <span className="text-2xl">⚽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'transactions' && (
                <div className="max-w-6xl">
                  {/* Status Banner */}
                  <div className={`${colors.background.info} ${colors.border.lightGray} rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition-all duration-200`}>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800 text-sm">Deposit status incorrect?</span>
                      <Button className={`${colors.primary.green} ${colors.text.white} text-sm px-4 py-1 shadow-sm hover:shadow-md transition-all duration-200`}>
                        Fix Status
                      </Button>
                    </div>
                    <div className="mt-2 text-right">
                      <a href="#" className="text-blue-600 text-xs hover:underline transition-colors duration-200">
                        View the transaction history for the past six months »
                      </a>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
                    <div className="flex gap-2">
                      <Button className={`${colors.primary.green} ${colors.text.white} text-sm px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200`}>
                        All Categories
                      </Button>
                      <Button variant="outline" className={`${colors.text.gray} text-sm px-4 py-2 border-gray-300 hover:bg-gray-50 transition-all duration-200`}>
                        Deposits
                      </Button>
                      <Button variant="outline" className={`${colors.text.gray} text-sm px-4 py-2 border-gray-300 hover:bg-gray-50 transition-all duration-200`}>
                        Withdrawals
                      </Button>
                      <Button variant="outline" className={`${colors.text.gray} text-sm px-4 py-2 border-gray-300 hover:bg-gray-50 transition-all duration-200`}>
                        Bets
                      </Button>
                      <Button variant="outline" className={`${colors.text.gray} text-sm px-4 py-2 border-gray-300 hover:bg-gray-50 transition-all duration-200`}>
                        Winnings
                      </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                        <Input
                          placeholder="Search transactions..."
                          value={transactionSearchQuery}
                          onChange={(e) => handleTransactionSearch(e.target.value)}
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                        {isSearching && (
                          <Loader2 size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Table Header */}
                  <div className="bg-gray-800 text-white rounded-t-lg">
                    <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium">
                      <div>Time</div>
                      <div>Type</div>
                      <div>Trade No.</div>
                      <div>Amount</div>
                      <div>Status</div>
                      <div>After Balance</div>
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="bg-white border border-gray-200 rounded-b-lg">
                    <div className="text-center py-16">
                      <div className="mb-4">
                        <TrendingUp size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No Records Found.</h3>
                      <p className="text-gray-400 text-sm">Your transaction history will appear here</p>
                    </div>
                  </div>

                  {/* Help Section */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 text-green-600">💡 Transaction Status Guide:</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span><strong>1. Closed</strong> - Your transaction is expired, please try again.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span><strong>2. Pending</strong> - Your transaction is waiting for confirmation from SportyBet Staff. Please patiently wait for the confirmation.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span><strong>3. Failed</strong> - Your transaction failed for some reason. Please contact SportyBet customer service for more information.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="max-w-6xl">
                  {/* Notification Tabs */}
                  <div className="flex items-center justify-between border-b border-gray-200 mb-6">
                    <div className="flex">
                      <button title="System notifications" className="px-4 py-2 text-sm font-medium border-b-2 border-gray-800 text-gray-800">
                        System
                      </button>
                      <button title="Promotion notifications" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Promotion
                      </button>
                      <button title="Message notifications" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Message
                      </button>
                    </div>
                    {(unreadNotifications > 0 || unreadMessages > 0) && (
                      <div className="flex gap-1">
                        {unreadNotifications > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {unreadNotifications}
                          </span>
                        )}
                        {unreadMessages > 0 && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {unreadMessages}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-20">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell size={32} className="text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-gray-400 text-xl">!</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No Messages available</h3>
                    <p className="text-gray-400 text-sm">System notifications and messages will appear here</p>
                  </div>

                  {/* Info Section */}
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">i</span>
                      </div>
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Notification Settings</p>
                        <p>You can manage your notification preferences in the Settings section. Enable or disable different types of notifications based on your preferences.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'gifts' && (
                <div className="max-w-6xl">
                  {/* Gift Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeGiftTab === 'valid'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => setActiveGiftTab('valid')}
                    >
                      Valid
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeGiftTab === 'used-expired'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => setActiveGiftTab('used-expired')}
                    >
                      Used/Expired
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeGiftTab === 'how-to-use'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => setActiveGiftTab('how-to-use')}
                    >
                      How To Use
                    </button>

                    {/* Redeem Button */}
                    <div className="ml-auto">
                      <Button
                        className="bg-green-500 text-white text-sm px-4 py-1"
                        onClick={() => {
                          if (giftCode.trim()) {
                            toast({ title: "Gift Code", description: `Attempting to redeem: ${giftCode}` });
                            setGiftCode('');
                          } else {
                            toast({ title: "Error", description: "Please enter a gift code", variant: "destructive" });
                          }
                        }}
                      >
                        🎁 Redeem your code
                      </Button>
                    </div>
                  </div>

                  {/* Gift Code Input */}
                  <div className="mb-6">
                    <Input
                      placeholder="Enter gift code here..."
                      value={giftCode}
                      onChange={(e) => setGiftCode(e.target.value)}
                      className="max-w-md"
                    />
                  </div>

                  {/* Content based on active tab */}
                  {activeGiftTab === 'valid' && (
                    <div className="text-center py-16">
                      <div className="mb-4">
                        <Gift size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Currently no available gifts.</h3>
                      <p className="text-gray-400 text-sm">Valid gift codes will appear here when available</p>
                    </div>
                  )}

                  {activeGiftTab === 'used-expired' && (
                    <div className="text-center py-16">
                      <div className="mb-4">
                        <Gift size={64} className="mx-auto text-gray-300" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No used or expired gifts</h3>
                      <p className="text-gray-400 text-sm">Your gift history will appear here</p>
                    </div>
                  )}

                  {activeGiftTab === 'how-to-use' && (
                    <div className="space-y-8">
                      {/* Visual Guide */}
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 flex items-center justify-center">
                            <div className="bg-green-500 text-white p-4 rounded">
                              <Gift size={32} />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                            <p className="text-sm text-gray-600">Available Gifts will be displayed in your betslip, select a Gift to continue.</p>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 flex items-center justify-center">
                            <div className="bg-blue-500 text-white p-4 rounded">
                              <TrendingUp size={32} />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                            <p className="text-sm text-gray-600">Gifts can be used for sports and live betting. Gifts can have usage conditions, please ensure your selected Gift meets the usage conditions.</p>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-4 mb-4 h-48 flex items-center justify-center">
                            <div className="bg-orange-500 text-white p-4 rounded">
                              <Wallet size={32} />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                            <p className="text-sm text-gray-600">The amount of your selected Gift will be automatically deducted from the order when you place an order.</p>
                          </div>
                        </div>
                      </div>

                      {/* FAQ Section */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6">FAQ</h3>
                        <div className="space-y-4">
                          <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-start gap-2">
                              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">How many different types of "Gifts" are there?</h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p>a) Cash Gift: These can be used without any spending condition.</p>
                                  <p>b) Discount Gift: These offer discounts when spending a given amount of a stake.</p>
                                  <p>c) Free Bet Gift: These can be used without any spending condition. The amount of Free Gift used will be deducted from any potential winnings. For example, if you have 4.0 odds and use 50 Free Bet Gift, your potential win is 150 instead of 200.</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-start gap-2">
                              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">What constraints/conditions for Gifts are there? Do "Gifts" expire?</h4>
                                <p className="text-sm text-gray-600">Gifts can be exchanged for Balance after a Winning Bet which was placed with a Gift. Besides the amount of Free Bet Gift will be deducted. Gifts may have a period during which they are valid and after which the Gifts will expire. Read through a Gift's information to view all details concerning usage conditions and the valid period.</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-start gap-2">
                              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Can I simultaneously use different "Gifts"?</h4>
                                <p className="text-sm text-gray-600">Only 1 "Gift" can be used per transaction.</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-start gap-2">
                              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Is it possible to cashout a "Gift"?</h4>
                                <p className="text-sm text-gray-600">Yes, it is possible.</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-start gap-2">
                              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">How can I get gifts?</h4>
                                <p className="text-sm text-gray-600">Players can get Gifts from promotions provided by SportyBet. If you are interested in the latest promotions, please go to "Promotions" page to view more campaigns.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'security' && (
                <div className="max-w-6xl">
                  {/* Security Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSecurityTab === 'change-password'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500'
                        }`}
                      onClick={() => setActiveSecurityTab('change-password')}
                    >
                      Change Password
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSecurityTab === 'multifactor'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500'
                        }`}
                      onClick={() => setActiveSecurityTab('multifactor')}
                    >
                      Multifactor Authentication
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSecurityTab === 'self-exclusion'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500'
                        }`}
                      onClick={() => setActiveSecurityTab('self-exclusion')}
                    >
                      Self Exclusion
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSecurityTab === 'deactivate'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500'
                        }`}
                      onClick={() => setActiveSecurityTab('deactivate')}
                    >
                      Deactivate
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSecurityTab === 'device-management'
                        ? 'border-gray-800 text-gray-800'
                        : 'border-transparent text-gray-500'
                        }`}
                      onClick={() => setActiveSecurityTab('device-management')}
                    >
                      Device Management
                    </button>
                  </div>

                  {/* Change Password Content */}
                  {activeSecurityTab === 'change-password' && (
                    <div className="max-w-2xl space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Old Password</label>
                        <div className="flex">
                          <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="flex-1"
                          />
                          <button className="ml-4 text-green-500 text-sm" aria-label="Forgot password" title="Forgot password">Forgot Password?</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
                        <p>Your password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter and one number.</p>
                      </div>
                      <Button
                        className="bg-gray-400 text-gray-600"
                        disabled={!oldPassword || !newPassword}
                      >
                        Confirm
                      </Button>
                    </div>
                  )}

                  {/* Multifactor Authentication Tab */}
                  {activeSecurityTab === 'multifactor' && (
                    <div className="max-w-2xl space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Sporty PIN</h3>
                          <p className="text-sm text-gray-500">Set up a PIN for additional security</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Email 2-Step Verification</h3>
                          <p className="text-sm text-gray-500">Receive verification codes via email</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Off</span>
                          <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Email <span className="text-red-500">*</span></h3>
                          <p className="text-sm text-gray-500">Update your email address</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  {/* Self Exclusion Tab */}
                  {activeSecurityTab === 'self-exclusion' && (
                    <div className="max-w-4xl">
                      <Button
                        className="bg-green-500 text-white"
                        onClick={() => setShowSelfExclusionModal(true)}
                      >
                        Set up Self-Exclusion
                      </Button>

                      {/* Self Exclusion Modal */}
                      {showSelfExclusionModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold">Self-Exclusion</h2>
                              <button
                                onClick={() => setShowSelfExclusionModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Close self-exclusion modal"
                                title="Close self-exclusion modal"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="space-y-4 text-sm text-gray-600">
                              <p>SportyBet's Self Exclusion option allows players to close their accounts for a specified time period. During this period, players will not be able to bet or play games, although players can still login to withdraw funds. SportyBet's risk management procedures, balance will not be withdrawable if it has not been previously staked.</p>

                              <p>Users who opt for self-exclusion are prohibited from creating new Sporty accounts during the self-exclusion period.</p>

                              <p className="font-medium">Once you self exclude your account, it cannot be re-enabled until the time period has concluded or by contacting customer service</p>
                            </div>

                            <Button
                              className="w-full mt-6 bg-green-500 text-white"
                              onClick={() => {
                                setShowSelfExclusionModal(false);
                                setShowSelfExclusionPeriodModal(true);
                              }}
                            >
                              Set up Self-Exclusion
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Self Exclusion Period Modal */}
                      {showSelfExclusionPeriodModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold">Self-Exclusion Period</h2>
                              <button
                                onClick={() => setShowSelfExclusionPeriodModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Close self-exclusion period modal"
                                title="Close self-exclusion period modal"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="mb-4">
                              <select
                                className="w-full p-3 border border-gray-300 rounded"
                                aria-label="Select time period"
                                title="Select time period"
                              >
                                <option>Select</option>
                                <option>24 hours</option>
                                <option>1 week</option>
                                <option>1 month</option>
                                <option>3 months</option>
                                <option>6 months</option>
                                <option>1 year</option>
                              </select>
                            </div>

                            <Button
                              className="w-full bg-gray-400 text-gray-600"
                              disabled
                            >
                              Continue
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Deactivate Tab */}
                  {activeSecurityTab === 'deactivate' && (
                    <div className="max-w-2xl">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-800 mb-4">Account Deactivation</h3>
                        <div className="space-y-3 text-sm text-red-700">
                          <p>⚠️ Deactivating your account will:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Permanently close your SportyBet account</li>
                            <li>Cancel all pending bets and transactions</li>
                            <li>Make your account balance non-withdrawable</li>
                            <li>Prevent you from creating new accounts</li>
                          </ul>
                          <p className="font-medium">This action cannot be undone. Please contact customer service if you need assistance.</p>
                        </div>
                        <Button
                          className="mt-6 bg-red-500 text-white"
                          onClick={() => toast({ title: "Account Deactivation", description: "Please contact customer service to proceed", variant: "destructive" })}
                        >
                          Request Account Deactivation
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Device Management Tab */}
                  {activeSecurityTab === 'device-management' && (
                    <div className="max-w-4xl">
                      <div className="text-center py-16">
                        <div className="mb-4">
                          <Shield size={64} className="mx-auto text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Device Management</h3>
                        <p className="text-gray-400 text-sm">Manage your trusted devices and login sessions</p>
                        <p className="text-gray-400 text-sm mt-2">No active devices to display</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  );

  // Determine which view to show based on screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default UserDashboard;