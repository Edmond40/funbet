import { useMemo, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  Ban, 
  CheckCircle,
  XCircle,
  MoreHorizontal,
  UserCheck,
  UserX,
  DollarSign
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVerified, setFilterVerified] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isUserModalOpen, openModal: openUserModal, closeModal: closeUserModal } = useModal();
  const { isOpen: isCreateModalOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { isOpen: isFilterModalOpen, openModal: openFilterModal, closeModal: closeFilterModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();

  const users = useMemo(() => [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1234567890',
      status: 'active',
      verified: true,
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20 14:30',
      totalBets: 45,
      totalDeposits: '$2,450',
      totalWithdrawals: '$1,200',
      balance: '$1,250',
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1234567891',
      status: 'suspended',
      verified: false,
      joinDate: '2024-01-10',
      lastLogin: '2024-01-18 09:15',
      totalBets: 23,
      totalDeposits: '$890',
      totalWithdrawals: '$450',
      balance: '$440',
      riskLevel: 'medium'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1234567892',
      status: 'active',
      verified: true,
      joinDate: '2024-01-05',
      lastLogin: '2024-01-21 16:45',
      totalBets: 78,
      totalDeposits: '$5,670',
      totalWithdrawals: '$3,200',
      balance: '$2,470',
      riskLevel: 'high'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1234567893',
      status: 'pending',
      verified: false,
      joinDate: '2024-01-20',
      lastLogin: '2024-01-21 11:20',
      totalBets: 5,
      totalDeposits: '$150',
      totalWithdrawals: '$0',
      balance: '$150',
      riskLevel: 'low'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1234567894',
      status: 'active',
      verified: true,
      joinDate: '2023-12-28',
      lastLogin: '2024-01-21 13:10',
      totalBets: 156,
      totalDeposits: '$12,340',
      totalWithdrawals: '$8,900',
      balance: '$3,440',
      riskLevel: 'medium'
    }
  ], []);

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
  };

  // User action functions
  const handleViewUser = (user) => {
    setSelectedUser(user);
    openUserModal();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    openCreateModal(); // Reuse create modal for editing
  };

  const handleSuspendUser = async (user) => {
    const confirmed = await confirm({
      title: 'Suspend User',
      message: `Are you sure you want to suspend ${user.name}? They will not be able to access their account.`,
      confirmText: 'Suspend User',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'User Suspended', `${user.name} has been suspended successfully`);
      // TODO: Update user status in the data
    }
  };

  const handleActivateUser = async (user) => {
    const confirmed = await confirm({
      title: 'Activate User',
      message: `Are you sure you want to activate ${user.name}?`,
      confirmText: 'Activate User',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'User Activated', `${user.name} has been activated successfully`);
      // TODO: Update user status in the data
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = await confirm({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      confirmText: 'Delete User',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'User Deleted', `${user.name} has been deleted successfully`);
      // TODO: Remove user from the data
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      addToast('warning', 'No Selection', 'Please select users to perform bulk actions');
      return;
    }

    const confirmed = await confirm({
      title: `Bulk ${action}`,
      message: `Are you sure you want to ${action.toLowerCase()} ${selectedUsers.length} selected users?`,
      confirmText: `${action} Users`,
      type: action === 'Delete' ? 'danger' : 'info'
    });

    if (confirmed) {
      const actionPastTense = action === 'Activate' ? 'activated' : action === 'Suspend' ? 'suspended' : 'deleted';
      addToast('success', 'Bulk Action Completed', `Successfully ${actionPastTense} ${selectedUsers.length} users`);
      setSelectedUsers([]);
      // TODO: Perform bulk action on selected users
    }
  };

  const handleExportUsers = () => {
    const csvContent = users
      .map(user => [
        user.name,
        user.email,
        user.phone,
        user.status,
        user.verified ? 'Yes' : 'No',
        user.joinDate,
        user.lastLogin,
        user.totalBets,
        user.totalDeposits,
        user.totalWithdrawals,
        user.balance,
        user.riskLevel
      ].join(','))
      .join('\n');

    downloadFile(`name,email,phone,status,verified,joinDate,lastLogin,totalBets,totalDeposits,totalWithdrawals,balance,riskLevel\n${csvContent}`, 'users-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Users data has been exported successfully');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', label: 'Suspended' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      banned: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Banned' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getRiskBadge = (risk) => {
    const riskConfig = {
      low: { bg: 'bg-green-100', text: 'text-green-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = riskConfig[risk] || riskConfig.low;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {risk.toUpperCase()}
      </span>
    );
  };

  const filteredUsers = useMemo(() => (
    users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      const matchesVerified = filterVerified === 'all' || 
                             (filterVerified === 'verified' && user.verified) ||
                             (filterVerified === 'unverified' && !user.verified);
      const matchesRisk = filterRisk === 'all' || user.riskLevel === filterRisk;
      
      return matchesSearch && matchesStatus && matchesVerified && matchesRisk;
    })
  ), [users, searchTerm, filterStatus, filterVerified, filterRisk]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Management</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage and monitor all user accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportUsers}
            title="Export Users" 
            aria-label="Export Users" 
            className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'border border-gray-300 text-gray-700'
            }`}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={openCreateModal}
            title="Add User" 
            aria-label="Add User" 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Users</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>12,847</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Users</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>9,234</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Suspended</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>156</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Balance</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>$2.4M</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
              <option value="banned">Banned</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={openFilterModal}
              title="More Filters" 
              aria-label="More Filters" 
              className={`px-4 py-2 rounded-lg transition-colors flex items-center border ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-xl shadow-sm border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Users ({filteredUsers.length})
            </h2>
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedUsers.length} selected</span>
                <button 
                  onClick={() => handleBulkAction('Activate')}
                  title="Activate Selected" 
                  aria-label="Activate Selected" 
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Activate
                </button>
                <button 
                  onClick={() => handleBulkAction('Suspend')}
                  title="Suspend Selected" 
                  aria-label="Suspend Selected" 
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                >
                  Suspend
                </button>
                <button 
                  onClick={() => handleBulkAction('Delete')}
                  title="Delete Selected" 
                  aria-label="Delete Selected" 
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left">
                  <input title="Select user" aria-label="Select user"
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAll}
                    className={`rounded ${darkMode ? 'border-gray-600 text-red-600' : 'border-gray-300 text-red-600'} focus:ring-red-500`}
                   />
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Verified
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Balance
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Total Bets
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Risk Level
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Last Login
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className={
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }>
                  <td className="px-6 py-4">
                    <input title="Select user" aria-label="Select user"
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className={`rounded ${darkMode ? 'border-gray-600 text-red-600' : 'border-gray-300 text-red-600'} focus:ring-red-500`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {user.balance}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {user.totalBets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRiskBadge(user.riskLevel)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className={`${
                          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
                        }`} 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className={`${
                          darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900'
                        }`} 
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => user.status === 'active' ? handleSuspendUser(user) : handleActivateUser(user)}
                        className={user.status === 'active' ? 
                          (darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-900") : 
                          (darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-900")
                        } 
                        title={user.status === 'active' ? "Suspend User" : "Activate User"}
                      >
                        {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className={`${
                          darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                        }`} 
                        title="Delete User"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className={`px-6 py-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Showing 1 to {filteredUsers.length} of {filteredUsers.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button title="Action button" aria-label="Action button" className={`px-3 py-1 rounded text-sm ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                Previous
              </button>
              <button title="Action button" aria-label="Action button" className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                1
              </button>
              <button title="Action button" aria-label="Action button" className={`px-3 py-1 rounded text-sm ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                2
              </button>
              <button title="Action button" aria-label="Action button" className={`px-3 py-1 rounded text-sm ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        title="User Details"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.name}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.email}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.phone}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <p className="mt-1">{getStatusBadge(selectedUser.status)}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Balance</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.balance}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Join Date</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.joinDate}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Bets</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.totalBets}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Risk Level</label>
                <p className="mt-1">{getRiskBadge(selectedUser.riskLevel)}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeUserModal}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeUserModal();
                  handleEditUser(selectedUser);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit User
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title={selectedUser ? "Edit User" : "Create New User"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
              <input
                type="text"
                defaultValue={selectedUser?.name.split(' ')[0] || ''}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
                title="First name"
                aria-label="First name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
              <input
                type="text"
                defaultValue={selectedUser?.name.split(' ')[1] || ''}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
                title="Last name"
                aria-label="Last name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                defaultValue={selectedUser?.email || ''}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
                title="Email address"
                aria-label="Email address"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
              <input
                type="tel"
                defaultValue={selectedUser?.phone || ''}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
                title="Phone number"
                aria-label="Phone number"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
              <select
                title="User Status"
                aria-label="User Status"
                defaultValue={selectedUser?.status || 'active'}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Verified</label>
              <select
                title="User Verification Status"
                aria-label="User Verification Status"
                defaultValue={selectedUser?.verified ? 'true' : 'false'}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="true">Verified</option>
                <option value="false">Not Verified</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => {
                closeCreateModal();
                setSelectedUser(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                addToast('success', selectedUser ? 'User Updated' : 'User Created', 
                  selectedUser ? 'User has been updated successfully' : 'New user has been created successfully');
                closeCreateModal();
                setSelectedUser(null);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {selectedUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        title="Advanced Filters"
        size="md"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Verification Status</label>
              <select
                title="Verification Status Filter"
                aria-label="Verification Status Filter"
                value={filterVerified}
                onChange={(e) => setFilterVerified(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="all">All Verification Status</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Risk Level</label>
              <select
                title="Risk Level Filter"
                aria-label="Risk Level Filter"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Join Date From</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
                title="Join date from"
                aria-label="Join date from"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Join Date To</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
                title="Join date to"
                aria-label="Join date to"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => {
                setFilterVerified('all');
                setFilterRisk('all');
                setDateRange({ start: '', end: '' });
                addToast('success', 'Filters Cleared', 'All filters have been reset');
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Clear Filters
            </button>
            <button 
              onClick={() => {
                closeFilterModal();
                addToast('success', 'Filters Applied', 'Advanced filters have been applied successfully');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
