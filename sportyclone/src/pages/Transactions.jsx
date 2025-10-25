import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowLeft, Download, Upload, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const Transactions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample transaction data
  const transactions = [
    {
      id: 'TXN001',
      type: 'deposit',
      amount: '100.00',
      status: 'completed',
      method: 'MTN Mobile Money',
      date: '2024-01-15',
      time: '14:30',
      reference: 'DEP123456'
    },
    {
      id: 'TXN002',
      type: 'withdrawal',
      amount: '50.00',
      status: 'pending',
      method: 'AirtelTigo Mobile Money',
      date: '2024-01-14',
      time: '16:45',
      reference: 'WTH789012'
    },
    {
      id: 'TXN003',
      type: 'deposit',
      amount: '25.00',
      status: 'completed',
      method: 'Telecel Mobile Money',
      date: '2024-01-13',
      time: '10:20',
      reference: 'DEP345678'
    },
    {
      id: 'TXN004',
      type: 'withdrawal',
      amount: '75.00',
      status: 'failed',
      method: 'MTN Mobile Money',
      date: '2024-01-12',
      time: '18:15',
      reference: 'WTH901234'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.method.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'deposits') return matchesSearch && transaction.type === 'deposit';
    if (activeTab === 'withdrawals') return matchesSearch && transaction.type === 'withdrawal';
    
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <Download size={16} className="text-green-500" />;
      case 'withdrawal':
        return <Upload size={16} className="text-blue-500" />;
      default:
        return <CreditCard size={16} className="text-gray-500" />;
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
        <h1 className="text-white text-lg font-semibold">Transactions</h1>
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
            <span className="text-gray-700">Transactions</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Transaction History
            </h2>

            {/* Filter Tabs */}
            <div className="flex border-b border-gray-600 mb-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => setActiveTab('deposits')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'deposits'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Deposits
              </button>
              <button
                onClick={() => setActiveTab('withdrawals')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'withdrawals'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Withdrawals
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Transaction List */}
            <div className="space-y-4">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="border border-gray-600 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(transaction.type)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white capitalize">
                              {transaction.type}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-300">
                            {transaction.method}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          transaction.type === 'deposit' ? 'text-green-400' : 'text-blue-400'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}GHS {transaction.amount}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.reference}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-gray-400">
                          {transaction.date} at {transaction.time}
                        </span>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-300">
                    No transactions found
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {searchQuery ? 'Try adjusting your search terms' : 'Your transaction history will appear here'}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => navigate('/deposit')}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Make Deposit
                    </Button>
                    <Button
                      onClick={() => navigate('/withdraw')}
                      variant="outline"
                    >
                      Withdraw Funds
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Deposits</p>
                    <p className="text-xl font-bold text-green-400">GHS 125.00</p>
                  </div>
                  <Download className="text-green-400" size={24} />
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Withdrawals</p>
                    <p className="text-xl font-bold text-blue-400">GHS 50.00</p>
                  </div>
                  <Upload className="text-blue-400" size={24} />
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Net Balance</p>
                    <p className="text-xl font-bold text-white">GHS 75.00</p>
                  </div>
                  <CreditCard className="text-gray-400" size={24} />
                </div>
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

export default Transactions;
