import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile, formatCurrency } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';

const FinancialManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAmount, setFilterAmount] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTab, setSelectedTab] = useState('transactions');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Hooks
  const { addToast } = useToast();
  const { isOpen: isTransactionModalOpen, openModal: openTransactionModal, closeModal: closeTransactionModal } = useModal();
  const { isOpen: isFilterModalOpen, openModal: openFilterModal, closeModal: closeFilterModal } = useModal();
  const { isOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { darkMode } = useAdmin();

  const transactions = useMemo(() => [
    {
      id: 'TXN001',
      type: 'deposit',
      user: 'John Doe',
      amount: 500.00,
      currency: 'USD',
      method: 'Credit Card',
      status: 'completed',
      timestamp: '2024-01-21 14:30:25',
      reference: 'REF123456789',
      fee: 15.00
    },
    {
      id: 'TXN002',
      type: 'withdrawal',
      user: 'Jane Smith',
      amount: 1200.00,
      currency: 'USD',
      method: 'Bank Transfer',
      status: 'pending',
      timestamp: '2024-01-21 13:45:12',
      reference: 'REF987654321',
      fee: 25.00
    },
    {
      id: 'TXN003',
      type: 'deposit',
      user: 'Mike Johnson',
      amount: 2500.00,
      currency: 'USD',
      method: 'Cryptocurrency',
      status: 'completed',
      timestamp: '2024-01-21 12:20:08',
      reference: 'REF456789123',
      fee: 50.00
    },
    {
      id: 'TXN004',
      type: 'withdrawal',
      user: 'Sarah Wilson',
      amount: 750.00,
      currency: 'USD',
      method: 'E-Wallet',
      status: 'failed',
      timestamp: '2024-01-21 11:15:33',
      reference: 'REF789123456',
      fee: 20.00
    },
    {
      id: 'TXN005',
      type: 'deposit',
      user: 'David Brown',
      amount: 10000.00,
      currency: 'USD',
      method: 'Wire Transfer',
      status: 'review',
      timestamp: '2024-01-21 10:30:45',
      reference: 'REF321654987',
      fee: 100.00
    }
  ], []);

  const bettingOperations = useMemo(() => [
    {
      id: 'BET001',
      user: 'John Doe',
      sport: 'Football',
      match: 'Manchester United vs Arsenal',
      betType: 'Single',
      stake: 100.00,
      odds: 2.50,
      potentialWin: 250.00,
      status: 'won',
      placedAt: '2024-01-21 15:00:00',
      settledAt: '2024-01-21 17:30:00'
    },
    {
      id: 'BET002',
      user: 'Jane Smith',
      sport: 'Basketball',
      match: 'Lakers vs Warriors',
      betType: 'Multiple',
      stake: 50.00,
      odds: 4.20,
      potentialWin: 210.00,
      status: 'lost',
      placedAt: '2024-01-21 14:30:00',
      settledAt: '2024-01-21 16:45:00'
    },
    {
      id: 'BET003',
      user: 'Mike Johnson',
      sport: 'Tennis',
      match: 'Djokovic vs Nadal',
      betType: 'Single',
      stake: 500.00,
      odds: 1.80,
      potentialWin: 900.00,
      status: 'pending',
      placedAt: '2024-01-21 16:15:00',
      settledAt: '-'
    }
  ], []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      review: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      won: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      lost: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" aria-hidden="true" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    return type === 'deposit' ? (
      <ArrowDownRight className="w-4 h-4 text-green-500" aria-hidden="true" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-red-500" aria-hidden="true" />
    );
  };

  const filteredTransactions = useMemo(() => (
    transactions.filter(transaction => {
      const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
  ), [transactions, searchTerm, filterType, filterStatus]);

  // Action functions
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    openTransactionModal();
  };

  const handleApproveTransaction = async (transaction) => {
    const confirmed = await confirm({
      title: 'Approve Transaction',
      message: `Are you sure you want to approve transaction ${transaction.id}?`,
      confirmText: 'Approve',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'Transaction Approved', `Transaction ${transaction.id} has been approved successfully`);
      // TODO: Update transaction status
    }
  };

  const handleRejectTransaction = async (transaction) => {
    const confirmed = await confirm({
      title: 'Reject Transaction',
      message: `Are you sure you want to reject transaction ${transaction.id}?`,
      confirmText: 'Reject',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'Transaction Rejected', `Transaction ${transaction.id} has been rejected`);
      // TODO: Update transaction status
    }
  };

  const handleExportTransactions = () => {
    const csvContent = transactions
      .map(txn => [
        txn.id,
        txn.type,
        txn.user,
        txn.amount,
        txn.currency,
        txn.method,
        txn.status,
        txn.timestamp,
        txn.reference,
        txn.fee
      ].join(','))
      .join('\n');

    downloadFile(`id,type,user,amount,currency,method,status,timestamp,reference,fee\n${csvContent}`, 'transactions-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Transactions data has been exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Financial Management</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monitor transactions, betting operations, and financial reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportTransactions}
            title="Export Report" 
            aria-label="Export Report"
            className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'border border-gray-300 text-gray-700'
            }`}>
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            Export Report
          </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Revenue</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>$2,847,392</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" aria-hidden="true" />
                <span className="text-sm font-medium text-green-600 ml-1">+8.2%</span>
                <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Deposits</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>$1,456,789</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" aria-hidden="true" />
                <span className="text-sm font-medium text-green-600 ml-1">+12.5%</span>
                <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Withdrawals</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>$892,456</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-500" aria-hidden="true" />
                <span className="text-sm font-medium text-red-600 ml-1">-3.1%</span>
                <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending Reviews</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>23</p>
              <div className="flex items-center mt-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                <span className="text-sm font-medium text-yellow-600 ml-1">Requires attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`rounded-xl shadow-sm border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <nav className="flex space-x-8 px-6">
            <button title="Transactions tab" aria-label="Transactions tab"
              onClick={() => setSelectedTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === 'transactions'
                  ? 'border-red-500 text-red-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                }`}
            >
              Transactions
            </button>
            <button title="Betting operations tab" aria-label="Betting operations tab"
              onClick={() => setSelectedTab('betting')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === 'betting'
                  ? 'border-red-500 text-red-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                }`}
            >
              Betting Operations
            </button>
            <button title="Financial reports tab" aria-label="Financial reports tab"
              onClick={() => setSelectedTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === 'reports'
                  ? 'border-red-500 text-red-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                }`}
            >
              Financial Reports
            </button>
          </nav>
        </div>

        {/* Transactions Tab */}
        {selectedTab === 'transactions' && (
          <div className="p-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} aria-hidden="true" />
                  <input title="Input field" aria-label="Input field" placeholder="Search transactions..."
                    type="text"

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300'
                    }`}
                  />
                </div>

                <select title="Filter by transaction type" aria-label="Filter by transaction type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                </select>

                <select title="Filter by transaction status" aria-label="Filter by transaction status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="review">Under Review</option>
                </select>

                {/* Amount Filter */}
                <select title="Filter by amount range" aria-label="Filter by amount range"
                  value={filterAmount}
                  onChange={(e) => setFilterAmount(e.target.value)}
                  className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="all">All Amounts</option>
                  <option value="gt">Above GH₵ 1,000</option>
                  <option value="lt">Below GH₵ 100</option>
                </select>

                {/* Advanced Filter Button */}
                <button
                  onClick={openFilterModal}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  title="Open advanced filters"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button title="More filter options" aria-label="More filter options"
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                  <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
                  More Filters
                </button>
                
                <button
                  onClick={openReportModal}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  title="Generate financial report"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Transaction
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      User
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Amount
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Method
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Date
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
                }`}>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className={
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(transaction.type)}
                          <div className="ml-3">
                            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{transaction.id}</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{transaction.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {transaction.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${transaction.amount.toFixed(2)}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Fee: ${transaction.fee.toFixed(2)}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {transaction.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {transaction.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewTransaction(transaction)}
                            className={`${
                              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
                            }`} 
                            title="View Details" 
                            aria-label="View Details"
                          >
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          </button>
                          {transaction.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleApproveTransaction(transaction)}
                                className={`${
                                  darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900'
                                }`} 
                                title="Approve" 
                                aria-label="Approve"
                              >
                                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                              </button>
                              <button 
                                onClick={() => handleRejectTransaction(transaction)}
                                className={`${
                                  darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'
                                }`} 
                                title="Reject" 
                                aria-label="Reject"
                              >
                                <XCircle className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Betting Operations Tab */}
        {selectedTab === 'betting' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Bet ID
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      User
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Match
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Stake
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Odds
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Potential Win
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
                }`}>
                  {bettingOperations.map((bet) => (
                    <tr key={bet.id} className={
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bet.id}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{bet.betType}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {bet.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bet.match}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{bet.sport}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        ${bet.stake.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {bet.odds.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        ${bet.potentialWin.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(bet.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => navigate(`/admin/financial/reports?bet=${bet.id}`)}
                          className={`${
                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
                          }`} 
                          title={`View details for bet ${bet.id}`} 
                          aria-label={`View details for bet ${bet.id}`}
                        >
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {selectedTab === 'reports' && (
          <div className="p-6">
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <TrendingUp className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} aria-hidden="true" />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Financial Reports</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Detailed financial reports and analytics will be displayed here.</p>
              <button 
                onClick={() => navigate('/admin/financial/reports')}
                title="Generate financial report" 
                aria-label="Generate financial report"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <Modal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
        title="Transaction Details"
        size="lg"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Transaction ID</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTransaction.id}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                <p className="mt-1 flex items-center">
                  {getTypeIcon(selectedTransaction.type)}
                  <span className={`ml-2 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>{selectedTransaction.type}</span>
                </p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTransaction.user}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(selectedTransaction.amount)}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Method</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTransaction.method}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <p className="mt-1">{getStatusBadge(selectedTransaction.status)}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reference</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTransaction.reference}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fee</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(selectedTransaction.fee)}</p>
              </div>
              <div className="col-span-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timestamp</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTransaction.timestamp}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeTransactionModal}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Close
              </button>
              {selectedTransaction.status === 'pending' && (
                <>
                  <button 
                    onClick={() => {
                      handleApproveTransaction(selectedTransaction);
                      closeTransactionModal();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => {
                      handleRejectTransaction(selectedTransaction);
                      closeTransactionModal();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Advanced Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        title="Advanced Filters"
        size="md"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                  placeholder="End Date"
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Minimum Amount"
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                />
                <input
                  type="number"
                  placeholder="Maximum Amount"
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Payment Method
              </label>
              <select 
                title="Select payment method"
                aria-label="Payment method filter"
                className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}>
                <option value="">All Methods</option>
                <option value="momo">Mobile Money</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                User Type
              </label>
              <select 
                title="Select user type"
                aria-label="User type filter"
                className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}>
                <option value="">All Users</option>
                <option value="new">New Users</option>
                <option value="regular">Regular Users</option>
                <option value="vip">VIP Users</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                // Reset filters
                setDateRange({ start: '', end: '' });
                closeFilterModal();
                addToast('info', 'Filters Reset', 'All filters have been cleared');
              }}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => {
                closeFilterModal();
                addToast('success', 'Filters Applied', 'Advanced filters have been applied to the transaction list');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>

      {/* Financial Reports Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        title="Generate Financial Report"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Report Configuration
              </h4>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Report Type
                  </label>
                  <select 
                    title="Select report type"
                    aria-label="Report type selection"
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}>
                    <option value="transactions">Transaction Summary</option>
                    <option value="revenue">Revenue Analysis</option>
                    <option value="user-activity">User Activity</option>
                    <option value="payment-methods">Payment Methods</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      title="Start date"
                      placeholder="Select start date"
                      aria-label="Report start date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                    <input
                      type="date"
                      title="End date"
                      placeholder="Select end date"
                      aria-label="Report end date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Report Type
                  </label>
                  <select 
                    title="Select report type"
                    aria-label="Report type selection"
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}>
                    <option value="pdf">PDF Report</option>
                    <option value="excel">Excel Spreadsheet</option>
                    <option value="csv">CSV Data</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Report Preview
              </h4>
              <div className={`p-4 rounded-lg border-2 border-dashed ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-center">
                  <BarChart3 className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Report preview will appear here
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Select date range to generate preview
                  </p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Estimated Records:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>File Size:</span>
                  <span className="font-medium">~2.3 MB</span>
                </div>
                <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Generation Time:</span>
                  <span className="font-medium">~30 seconds</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeReportModal}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                closeReportModal();
                addToast('success', 'Report Generated', 'Financial report is being generated and will be emailed to you shortly');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinancialManagement;