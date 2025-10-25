import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, MessageCircle, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const CustomerService = () => {
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [message, setMessage] = useState('');

  const supportChannels= [
    {
      id: 'live-chat',
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <MessageCircle className="w-6 h-6" />,
      availability: '24/7',
      contact: 'Start Chat',
      status: 'online'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      description: 'Speak directly with our customer service',
      icon: <Phone className="w-6 h-6" />,
      availability: '24/7',
      contact: '+233 30 123 4567',
      status: 'online'
    },
    {
      id: 'email',
      name: 'Email Support',
      description: 'Send us an email for detailed inquiries',
      icon: <Mail className="w-6 h-6" />,
      availability: '24/7',
      contact: 'support@sportybet.com.gh',
      status: 'online'
    }
  ];

  const faqItems = [
    {
      question: 'How do I deposit money?',
      answer: 'You can deposit using mobile money (MTN, Vodafone, AirtelTigo), bank transfer, or credit/debit cards. Go to Deposit section and choose your preferred method.'
    },
    {
      question: 'How long does withdrawal take?',
      answer: 'Withdrawals are processed within 24 hours. Mobile money withdrawals are usually instant, while bank transfers may take 1-3 business days.'
    },
    {
      question: 'How do I place a bet?',
      answer: 'Select your preferred sport, choose a match, select your bet type and odds, enter your stake amount, and confirm your bet.'
    },
    {
      question: 'What is the minimum bet amount?',
      answer: 'The minimum bet amount is GHS 1.00 for most sports and betting markets.'
    },
    {
      question: 'How do I check my bet history?',
      answer: 'Go to "Bet History" in your account dashboard to view all your past bets, wins, and losses.'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to the support team
      alert('Message sent! Our support team will respond shortly.');
      setMessage('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'busy':
        return 'text-yellow-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 lg:bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white mr-3"
              title="Back to dashboard"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-white text-lg font-semibold">Customer Service</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-400 text-xs">Online 24/7</span>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 lg:p-6">
          {/* Support Header */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center mb-4">
              <Headphones className={`w-8 h-8 mr-3 ${window.innerWidth < 1024 ? 'text-blue-400' : 'text-blue-500'}`} />
              <div>
                <h2 className="text-2xl font-bold">Customer Support</h2>
                <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  We're here to help you 24/7
                </p>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Average response time: 2 minutes</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% customer satisfaction</span>
              </div>
              <div className="flex items-center">
                <Headphones className="w-4 h-4 mr-2" />
                <span>Available in English & Twi</span>
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`rounded-lg p-4 border cursor-pointer transition-all ${
                    selectedChannel === channel.id
                      ? (window.innerWidth < 1024 ? 'bg-gray-700 border-blue-500' : 'bg-blue-50 border-blue-500')
                      : (window.innerWidth < 1024 ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100')
                  }`}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${getStatusColor(channel.status)}`}>
                      {channel.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{channel.name}</h4>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(channel.status)}`}></div>
                          <span className={`text-xs ${getStatusColor(channel.status)}`}>
                            {getStatusText(channel.status)}
                          </span>
                        </div>
                      </div>

                      <p className={`text-sm mb-2 ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                        {channel.description}
                      </p>

                      <div className="text-sm font-medium text-blue-400">
                        {channel.contact}
                      </div>

                      <div className={`text-xs mt-1 ${window.innerWidth < 1024 ? 'text-gray-500' : 'text-gray-500'}`}>
                        Available {channel.availability}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Quick Help</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className={`p-4 rounded-lg text-left transition-colors ${
                window.innerWidth < 1024
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600">💳</span>
                  </div>
                  <div>
                    <div className="font-medium">Deposit Issues</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Help with deposits and payments
                    </div>
                  </div>
                </div>
              </button>

              <button className={`p-4 rounded-lg text-left transition-colors ${
                window.innerWidth < 1024
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600">🎯</span>
                  </div>
                  <div>
                    <div className="font-medium">Betting Help</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      How to place bets and understand odds
                    </div>
                  </div>
                </div>
              </button>

              <button className={`p-4 rounded-lg text-left transition-colors ${
                window.innerWidth < 1024
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600">🏆</span>
                  </div>
                  <div>
                    <div className="font-medium">Account Issues</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Login problems and account management
                    </div>
                  </div>
                </div>
              </button>

              <button className={`p-4 rounded-lg text-left transition-colors ${
                window.innerWidth < 1024
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-yellow-600">🎁</span>
                  </div>
                  <div>
                    <div className="font-medium">Promotions</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Bonus offers and special promotions
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className={`border-b pb-4 ${window.innerWidth < 1024 ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Send us a Message</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      window.innerWidth < 1024
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      window.innerWidth < 1024
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <select className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  window.innerWidth < 1024
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300'
                }`} title="Contact reason" aria-label="Contact reason">
                  <option>General Inquiry</option>
                  <option>Deposit Issue</option>
                  <option>Withdrawal Issue</option>
                  <option>Betting Question</option>
                  <option>Account Problem</option>
                  <option>Technical Support</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                  message.trim()
                    ? (window.innerWidth < 1024 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600')
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
              >
                <Send size={16} className="mr-2" />
                Send Message
              </button>
            </div>
          </div>

          {/* Response Time */}
          <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className={`w-5 h-5 mr-3 ${window.innerWidth < 1024 ? 'text-blue-400' : 'text-blue-500'}`} />
                <div>
                  <div className="font-medium">Average Response Time</div>
                  <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    We typically respond within 2 hours
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-2xl font-bold ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-600'}`}>
                  2 hours
                </div>
                <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Average response
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
    </>
  );
};

export default CustomerService;
