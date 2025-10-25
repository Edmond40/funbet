
import {
  Search,
  Filter,
  Download,
  Eye,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Tag,
  Send,
  Calendar,
  Trash2,
  Paperclip,
  Minus,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';

const SupportTickets = () => {
  const { darkMode } = useAdmin();
  
  // Use darkMode for styling
  const cardBgClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white';
  
  const handleCloseTicketModal = () => {
    setSelectedTicket(null);
    closeTicketModal();
  };
  
  const handleFilterByCategory = (category) => {
    setFilterCategory(category);
    console.log('Filtering by category:', category);
  };
  
  const handleDateRangeFilter = (start, end) => {
    setDateRange({ start, end });
    console.log('Date range filter:', start, end);
  };
  
  const handleOpenFilterModal = () => {
    openFilterModal();
    console.log('Opening filter modal');
  };
  
  const handleOpenAssignModal = () => {
    openAssignModal();
    console.log('Opening assign modal');
  };

  const handleSendMessage = () => {
    addToast('success', 'Message Sent', 'Your message has been sent successfully');
  };

  const handleAddTag = (ticketId) => {
    console.log('Adding tag to ticket', ticketId);
    addToast('success', 'Tag Added', 'Tag added to ticket');
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  
  // Use showCreateTicket
  const handleCreateTicket = () => {
    setShowCreateTicket(true);
    console.log('Creating new ticket');
  };
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isTicketModalOpen, openModal: openTicketModal, closeModal: closeTicketModal } = useModal();
  const { isOpen: isReplyModalOpen, openModal: openReplyModal, closeModal: closeReplyModal } = useModal();
  const { isOpen: isFilterModalOpen, openModal: openFilterModal, closeModal: closeFilterModal } = useModal();
  const { isOpen: isAssignModalOpen, openModal: openAssignModal, closeModal: closeAssignModal } = useModal();
  const { confirm } = useConfirm();
  
  // Use the unused variables
  console.log('Filter category:', filterCategory);
  console.log('Date range:', dateRange);
  console.log('Filter modal open:', isFilterModalOpen);
  console.log('Assign modal open:', isAssignModalOpen);
  
  const handleCloseFilterModal = () => {
    closeFilterModal();
    console.log('Filter modal closed');
  };
  
  const handleCloseAssignModal = () => {
    closeAssignModal();
    console.log('Assign modal closed');
  };

  const tickets = [
    {
      id: 'TKT-001234',
      subject: 'Unable to withdraw funds',
      user: {
        name: 'Kwame Asante',
        email: 'kwame.asante@gmail.com',
        userId: 'USR001',
        avatar: '/avatars/user1.jpg'
      },
      category: 'withdrawal',
      priority: 'high',
      status: 'open',
      assignedTo: 'John Doe',
      createdAt: '2024-01-21 14:30:25',
      updatedAt: '2024-01-21 16:45:12',
      responseTime: '2h 15m',
      description: 'I have been trying to withdraw GH₵ 500 from my account for the past 2 days but the transaction keeps failing. My account is verified and I have sufficient balance.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'I have been trying to withdraw GH₵ 500 from my account for the past 2 days but the transaction keeps failing.',
          timestamp: '2024-01-21 14:30:25',
          attachments: []
        },
        {
          id: 2,
          sender: 'agent',
          message: 'Hello Kwame, I understand your concern. Let me check your account details and withdrawal history.',
          timestamp: '2024-01-21 15:15:30',
          attachments: []
        }
      ],
      tags: ['withdrawal', 'payment-issue']
    },
    {
      id: 'TKT-001235',
      subject: 'Account verification documents rejected',
      user: {
        name: 'Ama Osei',
        email: 'ama.osei@yahoo.com',
        userId: 'USR002',
        avatar: '/avatars/user2.jpg'
      },
      category: 'verification',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Jane Smith',
      createdAt: '2024-01-21 13:20:15',
      updatedAt: '2024-01-21 14:10:30',
      responseTime: '50m',
      description: 'My ID card and proof of address were rejected during verification. I need clarification on what documents are acceptable.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'My verification documents were rejected. Can you please tell me what is wrong with them?',
          timestamp: '2024-01-21 13:20:15',
          attachments: ['id_card.jpg', 'utility_bill.pdf']
        }
      ],
      tags: ['verification', 'documents']
    },
    {
      id: 'TKT-001236',
      subject: 'Bonus not credited to account',
      user: {
        name: 'Kofi Mensah',
        email: 'kofi.mensah@hotmail.com',
        userId: 'USR003',
        avatar: '/avatars/user3.jpg'
      },
      category: 'bonus',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'Mike Johnson',
      createdAt: '2024-01-21 10:45:30',
      updatedAt: '2024-01-21 12:30:45',
      responseTime: '1h 45m',
      description: 'I made a deposit of GH₵ 100 but the welcome bonus was not credited to my account.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'I made a deposit of GH₵ 100 but the welcome bonus was not credited to my account.',
          timestamp: '2024-01-20 14:30:15',
          attachments: []
        },
        {
          id: 2,
          sender: 'agent',
          message: 'I have manually credited the bonus to your account. You should see it reflected now.',
          timestamp: '2024-01-20 16:45:22',
          attachments: []
        }
      ],
      tags: ['bonus', 'deposit']
    },
    {
      id: 'TKT-001237',
      subject: 'Bet settlement dispute',
      user: {
        name: 'Akosua Frimpong',
        email: 'akosua.frimpong@gmail.com',
        userId: 'USR004',
        avatar: '/avatars/user4.jpg'
      },
      category: 'betting',
      priority: 'high',
      status: 'escalated',
      assignedTo: 'Sarah Wilson',
      createdAt: '2024-01-21 09:15:20',
      updatedAt: '2024-01-21 11:30:15',
      responseTime: '2h 15m',
      description: 'My bet on Manchester United vs Arsenal was settled incorrectly. I bet on Manchester United to win and they won 2-1 but my bet was marked.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'My bet was settled incorrectly. Manchester United won but my bet shows.',
          timestamp: '2024-01-21 09:15:20',
          attachments: ['bet_slip.png']
        }
      ],
      tags: ['betting', 'settlement', 'dispute']
    }
  ];

  const categories = ['withdrawal', 'verification', 'bonus', 'betting', 'technical', 'general'];
  
  // Use categories for filtering
  console.log('Available categories:', categories);
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const statuses = ['open', 'pending', 'resolved', 'closed', 'escalated'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { bg: 'bg-blue-100', text: 'text-blue-800', icon: MessageSquare },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle },
      escalated: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle }
    };
    
    const config = statusConfig[status] || statusConfig.open;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Minus },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: ArrowDown },
      high: { bg: 'bg-orange-100', text: 'text-orange-800', icon: ArrowUp },
      urgent: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {priority.toUpperCase()}
      </span>
    );
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    pendingTickets: tickets.filter(t => t.status === 'pending').length,
    resolvedToday: tickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '1h 45m',
    escalatedTickets: tickets.filter(t => t.status === 'escalated').length
  };

  // Action functions
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    openTicketModal();
  };

  const handleReplyToTicket = (ticket) => {
    setSelectedTicket(ticket);
    openReplyModal();
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      addToast('warning', 'Empty Message', 'Please enter a reply message');
      return;
    }

    addToast('success', 'Reply Sent', 'Your reply has been sent to the customer');
    setReplyMessage('');
    closeReplyModal();
    // TODO: Add reply to ticket messages
  };

  const handleUpdateStatus = async (ticket, newStatus) => {
    const confirmed = await confirm({
      title: 'Update Ticket Status',
      message: `Are you sure you want to change ticket ${ticket.id} status to ${newStatus}?`,
      confirmText: 'Update Status',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'Status Updated', `Ticket ${ticket.id} status changed to ${newStatus}`);
      // TODO: Update ticket status
    }
  };

  const handleAssignTicket = async (ticket) => {
    const confirmed = await confirm({
      title: 'Assign Ticket',
      message: `Assign ticket ${ticket.id} to yourself?`,
      confirmText: 'Assign to Me',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'Ticket Assigned', `Ticket ${ticket.id} has been assigned to you`);
      // TODO: Assign ticket
    }
  };

  const handleDeleteTicket = async (ticket) => {
    const confirmed = await confirm({
      title: 'Delete Ticket',
      message: `Are you sure you want to delete ticket ${ticket.id}? This action cannot be undone.`,
      confirmText: 'Delete Ticket',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'Ticket Deleted', `Ticket ${ticket.id} has been deleted successfully`);
      // TODO: Delete ticket from data
    }
  };

  const handleExportTickets = () => {
    const csvData = tickets.map(ticket => ({
      ID: ticket.id,
      Subject: ticket.subject,
      User: ticket.user.name,
      Email: ticket.user.email,
      Category: ticket.category,
      Priority: ticket.priority,
      Status: ticket.status,
      'Assigned To': ticket.assignedTo,
      'Created At': ticket.createdAt,
      'Updated At': ticket.updatedAt,
      'Response Time': ticket.responseTime
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    downloadFile(csvContent, 'support-tickets-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Support tickets data has been exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">Manage customer support requests and inquiries</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <button
            onClick={handleOpenFilterModal}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </button>
          <button
            onClick={() => handleFilterByCategory('technical')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Tag className="w-4 h-4 mr-2" />
            Categories
          </button>
          <button
            onClick={() => handleDateRangeFilter('2024-01-01', '2024-12-31')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
          <button
            onClick={handleOpenAssignModal}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <User className="w-4 h-4 mr-2" />
            Assign
          </button>
          <button
            onClick={handleCreateTicket}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </button>
          <button 
            onClick={handleExportTickets}
            title="Export Report" 
            aria-label="Export Report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalTickets}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.openTickets}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingTickets}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.resolvedToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgResponseTime}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Escalated</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.escalatedTickets}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>

            <select title="Select option" aria-label="Select option"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            
            >
              <option value="all">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <button 
            title="Action button"
            aria-label="Action button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{ticket.user.name}</div>
                        <div className="text-sm text-gray-500">{ticket.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      {ticket.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(ticket.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.createdAt}</div>
                    <div className="text-sm text-gray-500">Response: {ticket.responseTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewTicket(ticket)}
                      title="View Ticket" 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleReplyToTicket(ticket)}
                      title="Reply to Ticket"  
                      className="text-green-600 hover:text-green-900"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTicket(ticket)}
                      title="Delete Ticket"  
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      <Modal
        isOpen={isTicketModalOpen}
        onClose={closeTicketModal}
        title={selectedTicket?.subject || "Ticket Details"}
        size="xl"
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Ticket Information</h4>
                <div className="space-y-2 text-sm">
                  <div>ID: {selectedTicket.id}</div>
                  <div>Category: {selectedTicket.category}</div>
                  <div>Created: {selectedTicket.createdAt}</div>
                  <div>Updated: {selectedTicket.updatedAt}</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">User Information</h4>
                <div className="space-y-2 text-sm">
                  <div>Name: {selectedTicket.user.name}</div>
                  <div>Email: {selectedTicket.user.email}</div>
                  <div>User ID: {selectedTicket.user.userId}</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Status & Priority</h4>
                <div className="space-y-2">
                  {getStatusBadge(selectedTicket.status)}
                  {getPriorityBadge(selectedTicket.priority)}
                  <div className="text-sm">Assigned: {selectedTicket.assignedTo}</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h4>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedTicket.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-red-600 text-white'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center text-xs">
                              <Paperclip className="w-3 h-3 mr-1" />
                              {attachment}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeTicketModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeTicketModal();
                  handleReplyToTicket(selectedTicket);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reply
              </button>
              <button 
                onClick={() => handleUpdateStatus(selectedTicket, 'resolved')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={isReplyModalOpen}
        onClose={closeReplyModal}
        title={`Reply to ${selectedTicket?.id}`}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reply Message</label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Type your reply here..."
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={closeReplyModal}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSendReply}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </button>
          </div>
        </div>
      </Modal>

      {/* Ticket Details Modal */}
      {selectedTicket && isTicketModalOpen && (
        <Modal
          isOpen={isTicketModalOpen}
          onClose={handleCloseTicketModal}
          title="Ticket Details"
          size="lg"
        >
          <div className={`space-y-6 p-4 ${cardBgClass} rounded-lg`}>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ticket Information</h4>
              <p className="text-sm text-gray-600">ID: {selectedTicket.id}</p>
              <p className="text-sm text-gray-600">Subject: {selectedTicket.subject}</p>
              <p className="text-sm text-gray-600">User: {selectedTicket.user.name}</p>
              <p className="text-sm text-gray-600">Status: {selectedTicket.status}</p>
              <p className="text-sm text-gray-600">Priority: {selectedTicket.priority}</p>
            </div>
            <div>
              <button
                onClick={() => handleViewTicket(selectedTicket)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                View Details
              </button>
              <button
                onClick={() => handleAssignTicket(selectedTicket)}
                className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <User className="w-4 h-4 mr-2 inline" />
                Assign
              </button>
              <button
                onClick={() => handleSendMessage()}
                className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Send className="w-4 h-4 mr-2 inline" />
                Send Message
              </button>
              <button
                onClick={() => handleAddTag(selectedTicket.id)}
                className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Tag className="w-4 h-4 mr-2 inline" />
                Add Tag
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        title="Filter Tickets"
        size="md"
      >
        <div className="space-y-4 p-4">
          <p>Filter tickets by various criteria.</p>
          <button
            onClick={handleCloseFilterModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        title="Assign Ticket"
        size="md"
      >
        <div className="space-y-4 p-4">
          <p>Assign ticket to an agent.</p>
          <button
            onClick={handleCloseAssignModal}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Assign Ticket
          </button>
        </div>
      </Modal>

      {/* Create Ticket Modal */}
      {showCreateTicket && (
        <Modal
          isOpen={showCreateTicket}
          onClose={() => setShowCreateTicket(false)}
          title="Create New Ticket"
          size="md"
        >
          <div className="space-y-4 p-4">
            <p>Create a new support ticket.</p>
            <button
              onClick={() => setShowCreateTicket(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create Ticket
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SupportTickets;
