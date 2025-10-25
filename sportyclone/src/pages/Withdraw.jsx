import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const Withdraw = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState('mobile-money');

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Request",
      description: "Your withdrawal request has been submitted for processing",
    });
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
        <h1 className="text-white text-lg font-semibold">Withdraw</h1>
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
            <span className="text-gray-700">Withdraw</span>
          </nav>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Withdraw Funds
            </h2>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-600 mb-6">
              <button
                onClick={() => setActiveTab('mobile-money')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'mobile-money'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Mobile Money
              </button>
              <button
                onClick={() => setActiveTab('bank')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'bank'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Bank
              </button>
            </div>

            {/* Mobile Money Tab */}
            {activeTab === 'mobile-money' && (
              <div className="space-y-4">
                <div className="mb-4">
                  <div className="text-sm mb-2 text-gray-300">
                    Withdraw To
                  </div>
                  <div className="text-lg font-medium text-white">
                    +233 20****250
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Amount (GHS)
                  </label>
                  <Input
                    placeholder="Amount (GHS)"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    type="number"
                    min="1"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) < 1}
                >
                  Withdraw
                </Button>

                <div className="bg-gray-700 p-4 rounded">
                  <h3 className="font-semibold mb-2 text-white">
                    Withdrawal Information
                  </h3>
                  <div className="text-sm space-y-1 text-gray-300">
                    <p>• Minimum withdrawal: GHS 1.00</p>
                    <p>• Maximum withdrawal: GHS 50,000.00</p>
                    <p>• Processing time: 1-24 hours</p>
                    <p>• Withdrawal fee: Free</p>
                    <p>• Available balance: GHS 850.50</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Tab */}
            {activeTab === 'bank' && (
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-4">🏦</div>
                  <h3 className="text-lg font-medium mb-2">Bank Withdrawal</h3>
                  <p className="text-sm">
                    Bank withdrawal feature is coming soon. Please use Mobile Money for now.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setActiveTab('mobile-money')}
                  >
                    Use Mobile Money
                  </Button>
                </div>
              </div>
            )}
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

export default Withdraw;
