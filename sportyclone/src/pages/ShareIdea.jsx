import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Send, MessageSquare, Star, ThumbsUp, Heart } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const ShareIdea = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const categories= [
    {
      id: 'features',
      name: 'New Features',
      icon: '✨',
      description: 'Suggest new betting features or games'
    },
    {
      id: 'improvements',
      name: 'Improvements',
      icon: '🔧',
      description: 'Help us improve existing features'
    },
    {
      id: 'design',
      name: 'Design & UX',
      icon: '🎨',
      description: 'Suggest UI/UX improvements'
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      icon: '📱',
      description: 'Mobile app features and improvements'
    },
    {
      id: 'other',
      name: 'Other',
      icon: '💭',
      description: 'Any other ideas or suggestions'
    }
  ];

  const submittedIdeas= [
    {
      id: '1',
      title: 'Dark Mode for Desktop',
      description: 'Add dark mode option for the desktop version to reduce eye strain',
      category: 'design',
      author: 'User***123',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 24,
      status: 'implemented'
    },
    {
      id: '2',
      title: 'Live Chat Support',
      description: 'Add 24/7 live chat support for immediate assistance',
      category: 'features',
      author: 'User***456',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 18,
      status: 'reviewing'
    },
    {
      id: '3',
      title: 'Betting History Export',
      description: 'Allow users to export their betting history or CSV',
      category: 'features',
      author: 'User***789',
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 31,
      status: 'pending'
    }
  ];

  const handleSubmitIdea = () => {
    if (!selectedCategory || !ideaTitle.trim() || !ideaDescription.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Here you would typically submit the idea to the backend
    alert('Thank you for your idea! We\'ll review it and get back to you soon.');
    setSelectedCategory('');
    setIdeaTitle('');
    setIdeaDescription('');
    setContactEmail('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-100 text-green-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'implemented':
        return 'Implemented';
      case 'reviewing':
        return 'Under Review';
      case 'rejected':
        return 'Not Feasible';
      default:
        return 'Pending';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 lg:bg-gray-100">
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
          <h1 className="text-white text-lg font-semibold">Share an Idea</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 lg:p-6">
          {/* Hero Section */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center mb-4">
              <Lightbulb className={`w-8 h-8 mr-3 ${window.innerWidth < 1024 ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <div>
                <h2 className="text-2xl font-bold">Share Your Ideas</h2>
                <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Help us improve SportyBet with your suggestions and feedback
                </p>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>We listen to our users</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>Great ideas get implemented</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-2" />
                <span>Your feedback matters</span>
              </div>
            </div>
          </div>

          {/* Idea Submission Form */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Submit Your Idea</h3>

            <div className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? (window.innerWidth < 1024 ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                          : (window.innerWidth < 1024 ? 'bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100')
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <span className="text-lg mr-2">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <p className={`text-xs ${selectedCategory === category.id ? 'text-blue-100' : window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        {category.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Idea Title */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Idea Title
                </label>
                <input
                  type="text"
                  placeholder="Brief title for your idea"
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Idea Description */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
                  value={ideaDescription}
                  onChange={(e) => setIdeaDescription(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                />
              </div>

              <button
                onClick={handleSubmitIdea}
                disabled={!selectedCategory || !ideaTitle.trim() || !ideaDescription.trim()}
                className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                  selectedCategory && ideaTitle.trim() && ideaDescription.trim()
                    ? (window.innerWidth < 1024 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600')
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
              >
                <Send size={16} className="mr-2" />
                Submit Idea
              </button>
            </div>
          </div>

          {/* Submitted Ideas */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Recent Ideas</h3>

            <div className="space-y-4">
              {submittedIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className={`rounded-lg p-4 border ${
                    window.innerWidth < 1024 ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{idea.title}</h4>
                      <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        {idea.description}
                      </p>
                    </div>

                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(idea.status)}`}>
                      {getStatusText(idea.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`text-xs ${window.innerWidth < 1024 ? 'text-gray-500' : 'text-gray-500'}`}>
                      By {idea.author} • {new Date(idea.timestamp).toLocaleDateString()}
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className={`flex items-center space-x-1 text-sm transition-colors ${
                        window.innerWidth < 1024 ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
                      }`}>
                        <Heart size={14} />
                        <span>{idea.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Share Ideas */}
          <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Why Share Your Ideas?</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  window.innerWidth < 1024 ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="font-semibold mb-2">Shape the Future</h4>
                <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your ideas help us build better features that you actually want to use.
                </p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  window.innerWidth < 1024 ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <span className="text-2xl">🎁</span>
                </div>
                <h4 className="font-semibold mb-2">Get Rewards</h4>
                <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Great ideas that get implemented earn you bonus points and exclusive rewards.
                </p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  window.innerWidth < 1024 ? 'bg-purple-900' : 'bg-purple-100'
                }`}>
                  <span className="text-2xl">💬</span>
                </div>
                <h4 className="font-semibold mb-2">Community Impact</h4>
                <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Join thousands of users who have helped improve SportyBet for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Submission Guidelines</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">✅ Good Ideas</h4>
                <ul className={`space-y-2 text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• Clear and specific suggestions</li>
                  <li>• Features that benefit many users</li>
                  <li>• Solutions to existing problems</li>
                  <li>• Well-thought-out improvements</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">❌ Avoid</h4>
                <ul className={`space-y-2 text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• Vague or unclear requests</li>
                  <li>• Personal complaints</li>
                  <li>• Illegal or unethical suggestions</li>
                  <li>• Spam or duplicate submissions</li>
                </ul>
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-blue-900' : 'bg-blue-50'}`}>
              <p className={`text-sm ${window.innerWidth < 1024 ? 'text-blue-300' : 'text-blue-700'}`}>
                <strong>Note:</strong> We review all submissions and implement the best ideas. You may receive follow-up questions about your suggestion.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
};

export default ShareIdea;
