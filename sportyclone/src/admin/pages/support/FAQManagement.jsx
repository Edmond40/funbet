import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Settings,
  ExternalLink,
  Copy
} from 'lucide-react';

const FAQManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddFAQ, setShowAddFAQ] = useState(false);

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqCategories = [
    { id: 'all', name: 'All Categories', count: 25 },
    { id: 'account', name: 'Account & Registration', count: 8 },
    { id: 'deposits', name: 'Deposits & Withdrawals', count: 6 },
    { id: 'betting', name: 'Betting & Odds', count: 5 },
    { id: 'bonuses', name: 'Bonuses & Promotions', count: 4 },
    { id: 'technical', name: 'Technical Support', count: 2 }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button on our homepage. Fill in your personal details including name, email, phone number, and create a secure password. You must be 18 years or older to register.',
      category: 'account',
      status: 'published',
      views: 15420,
      helpful: 1234,
      notHelpful: 89,
      lastUpdated: '2024-01-15 10:30:00',
      createdBy: 'Admin User',
      priority: 'high'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including MTN Mobile Money, Vodafone Cash, AirtelTigo Money, Visa/Mastercard, and bank transfers. All transactions are processed in Ghana Cedis (GH₵).',
      category: 'deposits',
      status: 'published',
      views: 12345,
      helpful: 987,
      notHelpful: 45,
      lastUpdated: '2024-01-20 14:15:00',
      createdBy: 'Support Team',
      priority: 'high'
    },
    {
      id: 3,
      question: 'How long do withdrawals take?',
      answer: 'Withdrawal processing times vary by method: Mobile Money (1-5 minutes), Bank Transfer (1-24 hours), Card withdrawals (3-5 business days). All withdrawals are subject to verification requirements.',
      category: 'deposits',
      status: 'published',
      views: 9876,
      helpful: 756,
      notHelpful: 67,
      lastUpdated: '2024-01-18 09:45:00',
      createdBy: 'Finance Team',
      priority: 'high'
    },
    {
      id: 4,
      question: 'What is the minimum bet amount?',
      answer: 'The minimum bet amount is GH₵ 1 for most sports and markets. Some special markets may have different minimum bet requirements which will be displayed when placing your bet.',
      category: 'betting',
      status: 'published',
      views: 8765,
      helpful: 654,
      notHelpful: 32,
      lastUpdated: '2024-01-16 16:20:00',
      createdBy: 'Sports Team',
      priority: 'medium'
    },
    {
      id: 5,
      question: 'How do I claim my welcome bonus?',
      answer: 'Your welcome bonus is automatically credited after making your first deposit of at least GH₵ 20. The bonus must be wagered 5 times before withdrawal. Terms and conditions apply.',
      category: 'bonuses',
      status: 'published',
      views: 7654,
      helpful: 543,
      notHelpful: 28,
      lastUpdated: '2024-01-19 11:30:00',
      createdBy: 'Marketing Team',
      priority: 'medium'
    },
    {
      id: 6,
      question: 'Why can\'t I access my account?',
      answer: 'Account access issues can occur due to incorrect login credentials, account suspension, or technical problems. Try resetting your password first. If the issue persists, contact our support team.',
      category: 'technical',
      status: 'draft',
      views: 0,
      helpful: 0,
      notHelpful: 0,
      lastUpdated: '2024-01-21 08:15:00',
      createdBy: 'Tech Support',
      priority: 'low'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      archived: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.draft;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { bg: 'bg-gray-100', text: 'text-gray-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-red-100', text: 'text-red-800' }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalFAQs: faqs.length,
    publishedFAQs: faqs.filter(f => f.status === 'published').length,
    totalViews: faqs.reduce((sum, f) => sum + f.views, 0),
    avgHelpfulness: faqs.reduce((sum, f) => sum + (f.helpful / (f.helpful + f.notHelpful || 1)), 0) / faqs.length * 100
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600 mt-1">Manage frequently asked questions and help content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Action button" aria-label="Action button"
            onClick={() => setShowAddFAQ(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </button>
          <button
            onClick={() => setShowAddFAQ(true)}
            title="Action button"
            aria-label="Action button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export FAQs
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total FAQs</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalFAQs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.publishedFAQs}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Helpfulness</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgHelpfulness.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
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
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <select title="Select option" aria-label="Select option"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              
            >
              {faqCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          <button title="Action button" aria-label="Action button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => {
          const helpfulnessRate = faq.helpful + faq.notHelpful > 0
            ? (faq.helpful / (faq.helpful + faq.notHelpful)) * 100
            : 0;

          return (
            <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {getStatusBadge(faq.status)}
                    {getPriorityBadge(faq.priority)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>Category: {faq.category.replace('_', ' ').toUpperCase()}</span>
                    <span>Views: {faq.views.toLocaleString()}</span>
                    <span>Updated: {faq.lastUpdated}</span>
                    <span>By: {faq.createdBy}</span>
                  </div>

                  {/* Answer Preview/Full */}
                  <div className={`text-gray-700 ${expandedFAQ === faq.id ? '' : 'line-clamp-2'}`}>
                    {faq.answer}
                  </div>

                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    title="Action button"
                    aria-label="Action button"
                    className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 flex items-center"
                  >
                    {expandedFAQ === faq.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show More
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View FAQ" aria-label="Action button">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit FAQ" aria-label="Action button">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Copy link" aria-label="Copy link">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors" title="View on site" aria-label="View on site">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Settings" aria-label="Settings">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* FAQ Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Views:</span>
                  <span className="text-sm font-medium text-gray-900">{faq.views.toLocaleString()}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Helpful:</span>
                  <span className="text-sm font-medium text-green-600">{faq.helpful}</span>
                  <span>({helpfulnessRate.toFixed(1)}%)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">Not Helpful:</span>
                  <span className="text-sm font-medium text-red-600">{faq.notHelpful}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add FAQ Modal */}
      {showAddFAQ && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New FAQ</h3>
              <button title="Action button" aria-label="Action button"
                onClick={() => setShowAddFAQ(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input title="Input field" aria-label="Input field" placeholder="Enter value"
                  type="text"

                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  rows={6}
                  placeholder="Provide a comprehensive answer to the question"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select title="Select option" aria-label="Select option" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="account">Account & Registration</option>
                    <option value="deposits">Deposits & Withdrawals</option>
                    <option value="betting">Betting & Odds</option>
                    <option value="bonuses">Bonuses & Promotions</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select title="Select option" aria-label="Select option" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select title="Select option" aria-label="Select option" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" title="Input field" placeholder="Enter value" />
                  <span className="ml-2 text-sm text-gray-700">Featured FAQ</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" title="Input field" aria-label="Input field" placeholder="Enter value" />
                  <span className="ml-2 text-sm text-gray-700">Send notification to users</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button"
                  type="button"
                  onClick={() => setShowAddFAQ(false)}

                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Action button" aria-label="Action button"
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Create FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Details Modal */}
     
    </div>
  );
};

export default FAQManagement;
