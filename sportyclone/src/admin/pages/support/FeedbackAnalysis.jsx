import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Eye,
  BarChart3
} from 'lucide-react';

const FeedbackAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const { addToast } = useToast();
  const { isOpen: isFeedbackModalOpen, openModal: openFeedbackModal, closeModal: closeFeedbackModal } = useModal();

  const feedbackData = [
    {
      id: 'FB-001',
      user: 'John Doe',
      rating: 5,
      category: 'App Performance',
      message: 'Great app, very fast and reliable!',
      date: '2024-01-20',
      status: 'reviewed'
    },
    {
      id: 'FB-002', 
      user: 'Jane Smith',
      rating: 3,
      category: 'User Interface',
      message: 'Good but could use some UI improvements.',
      date: '2024-01-19',
      status: 'pending'
    }
  ];

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    openFeedbackModal();
  };

  const handleCloseFeedbackModal = () => {
    setSelectedFeedback(null);
    closeFeedbackModal();
  };

  const handleExportFeedback = () => {
    const csvContent = feedbackData
      .map(feedback => [
        feedback.id,
        feedback.user,
        feedback.rating,
        feedback.category,
        feedback.message,
        feedback.date,
        feedback.status
      ].join(','))
      .join('\n');
    
    const csvData = 'ID,User,Rating,Category,Message,Date,Status\n' + csvContent;
    downloadFile(csvData, 'feedback-analysis.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Feedback data exported successfully');
  };

  const stats = {
    totalFeedback: feedbackData.length,
    averageRating: 4.2,
    positiveRating: feedbackData.filter(f => f.rating >= 4).length,
    negativeRating: feedbackData.filter(f => f.rating <= 2).length,
    pendingReview: feedbackData.filter(f => f.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Analysis</h1>
          <p className="text-gray-600 mt-1">Analyze customer feedback and ratings</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportFeedback}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            title="Export feedback analysis report"
            aria-label="Export feedback analysis report"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalFeedback}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.averageRating}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Positive Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.positiveRating}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Negative Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.negativeRating}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingReview}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Filter by rating"
            aria-label="Filter feedback by rating"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Filter by category"
            aria-label="Filter feedback by category"
          >
            <option value="all">All Categories</option>
            <option value="App Performance">App Performance</option>
            <option value="User Interface">User Interface</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Features">Features</option>
          </select>
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            title="Apply filters"
            aria-label="Apply feedback filters"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackData.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{feedback.user}</div>
                    <div className="text-sm text-gray-500">{feedback.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{feedback.rating}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {feedback.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {feedback.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feedback.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      feedback.status === 'reviewed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewFeedback(feedback)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View feedback details"
                      aria-label="View feedback details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedFeedback && isFeedbackModalOpen && (
        <Modal
          isOpen={isFeedbackModalOpen}
          onClose={handleCloseFeedbackModal}
          title="Feedback Details"
          size="lg"
        >
          <div className="space-y-6 p-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Feedback Information</h4>
              <p className="text-sm text-gray-600">User: {selectedFeedback.user}</p>
              <p className="text-sm text-gray-600">Rating: {selectedFeedback.rating}/5</p>
              <p className="text-sm text-gray-600">Category: {selectedFeedback.category}</p>
              <p className="text-sm text-gray-600">Date: {selectedFeedback.date}</p>
              <p className="text-sm text-gray-600 mt-4">Message:</p>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedFeedback.message}</p>
            </div>
            <div>
              <button
                onClick={handleCloseFeedbackModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FeedbackAnalysis;
