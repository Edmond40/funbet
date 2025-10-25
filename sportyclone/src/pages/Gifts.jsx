import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Calendar, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const Gifts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeGiftTab, setActiveGiftTab] = useState('valid');
  const [giftCode, setGiftCode] = useState('');

  // Sample gift data
  const validGifts = [
    {
      id: 'GIFT001',
      title: 'Welcome Bonus',
      description: '100% First Deposit Bonus up to GHS 200',
      value: '200.00',
      type: 'Deposit Bonus',
      expiryDate: '2024-02-15',
      status: 'Active',
      icon: '🎁'
    },
    {
      id: 'GIFT002',
      title: 'Free Bet Friday',
      description: 'Weekly free bet for loyal customers',
      value: '25.00',
      type: 'Free Bet',
      expiryDate: '2024-01-25',
      status: 'Active',
      icon: '⚽'
    }
  ];

  const handleRedeemGift = () => {
    toast({
      title: "Gift Redeemed!",
      description: "Your gift has been successfully added to your account",
    });
  };

  const handleRedeemCode = () => {
    if (!giftCode.trim()) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid gift code",
        variant: "destructive"
      });
      return;
    }

    if (giftCode.toUpperCase() === 'SPORTY2024') {
      toast({
        title: "Code Redeemed!",
        description: "GHS 50 bonus has been added to your account",
      });
      setGiftCode('');
    } else {
      toast({
        title: "Invalid Code",
        description: "The gift code you entered is not valid or has expired",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-white mr-3"
          title="Back to dashboard"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-lg font-semibold">Gifts</h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Desktop Breadcrumb */}
        <div className="hidden lg:block mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-blue-500 hover:text-blue-600"
            >
              Dashboard
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">Gifts</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Gift Center
            </h2>

            {/* Gift Code Redemption */}
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="text-green-500" size={20} />
                <h3 className="font-medium text-white">
                  Redeem Gift Code
                </h3>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter gift code"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-gray-600 border-gray-500 text-white"
                />
                <Button
                  onClick={handleRedeemCode}
                  disabled={!giftCode.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Redeem
                </Button>
              </div>
              <p className="text-xs mt-2 text-gray-400">
                Try code: SPORTY2024 for a special bonus!
              </p>
            </div>

            {/* Gift Tabs */}
            <div className="flex border-b border-gray-600 mb-6">
              <button
                onClick={() => setActiveGiftTab('valid')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeGiftTab === 'valid'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Valid ({validGifts.length})
              </button>
              <button
                onClick={() => setActiveGiftTab('expired')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeGiftTab === 'expired'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Expired (0)
              </button>
              <button
                onClick={() => setActiveGiftTab('used')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeGiftTab === 'used'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Used (0)
              </button>
            </div>

            {/* Gift Content */}
            <div className="space-y-4">
              {activeGiftTab === 'valid' && (
                <>
                  {validGifts.length > 0 ? (
                    validGifts.map((gift) => (
                      <div
                        key={gift.id}
                        className="border border-gray-600 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{gift.icon}</div>
                            <div>
                              <h3 className="font-medium text-white">
                                {gift.title}
                              </h3>
                              <p className="text-sm text-gray-300">
                                {gift.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">
                              GHS {gift.value}
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                              {gift.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-400">
                                Expires: {gift.expiryDate}
                              </span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            onClick={() => handleRedeemGift()}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Gift size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-gray-300">
                        No valid gifts
                      </h3>
                      <p className="text-sm text-gray-400">
                        Check back later for new gifts and promotions
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => navigate('/promotions')}
                      >
                        View Promotions
                      </Button>
                    </div>
                  )}
                </>
              )}

              {activeGiftTab === 'expired' && (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-300">
                    No expired gifts
                  </h3>
                  <p className="text-sm text-gray-400">
                    Great! You haven't missed any gifts
                  </p>
                </div>
              )}

              {activeGiftTab === 'used' && (
                <div className="text-center py-8">
                  <Star size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-300">
                    No used gifts
                  </h3>
                  <p className="text-sm text-gray-400">
                    Redeemed gifts will appear here
                  </p>
                </div>
              )}
            </div>

            {/* Promotional Banner */}
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold mb-1">🎉 Special Offer!</h3>
                  <p className="text-sm opacity-90">
                    Deposit GHS 100+ and get 50% bonus up to GHS 500
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/deposit')}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Claim Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Gifts;
