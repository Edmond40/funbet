import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/ui';
import {
  Search,
  User,
  Clock,
  MessageSquare,
  Phone,
  Video,
  CheckCircle,
  XCircle,
  Paperclip,
  Smile,
  MoreVertical,
  Settings,
  Send
} from 'lucide-react';

const LiveChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Hooks
  const { isOpen: isChatModalOpen, closeModal: closeChatModal } = useModal();

  const chatSessions = [
    {
      id: 1,
      user: {
        name: 'Kwame Asante',
        email: 'kwame.asante@gmail.com',
        avatar: '/avatars/user1.jpg',
        status: 'online'
      },
      agent: 'John Doe',
      status: 'active',
      priority: 'high',
      subject: 'Withdrawal Issue',
      lastMessage: 'I need help with my withdrawal request',
      lastMessageTime: '2024-01-21 16:45:12',
      startTime: '2024-01-21 16:30:00',
      responseTime: '2m 15s',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Hello, I need help with my withdrawal',
          timestamp: '2024-01-21 16:30:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'agent',
          message: 'Hi Kwame! I\'d be happy to help you with your withdrawal. Can you please provide your transaction ID?',
          timestamp: '2024-01-21 16:32:15',
          type: 'text'
        },
        {
          id: 3,
          sender: 'user',
          message: 'The transaction ID is TXN123456789',
          timestamp: '2024-01-21 16:33:30',
          type: 'text'
        },
        {
          id: 4,
          sender: 'agent',
          message: 'Thank you. Let me check the status of your withdrawal request.',
          timestamp: '2024-01-21 16:34:00',
          type: 'text'
        },
        {
          id: 5,
          sender: 'user',
          message: 'I need help with my withdrawal request',
          timestamp: '2024-01-21 16:45:12',
          type: 'text'
        }
      ],
      unreadCount: 1
    },
    {
      id: 2,
      user: {
        name: 'Ama Osei',
        email: 'ama.osei@yahoo.com',
        avatar: '/avatars/user2.jpg',
        status: 'online'
      },
      agent: 'Jane Smith',
      status: 'waiting',
      priority: 'medium',
      subject: 'Account Verification',
      lastMessage: 'My documents were rejected',
      lastMessageTime: '2024-01-21 16:30:25',
      startTime: '2024-01-21 16:25:00',
      responseTime: '1m 45s',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'My verification documents were rejected. Can you help?',
          timestamp: '2024-01-21 16:25:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'agent',
          message: 'I can help you with that. Let me review your submitted documents.',
          timestamp: '2024-01-21 16:26:45',
          type: 'text'
        },
        {
          id: 3,
          sender: 'user',
          message: 'My documents were rejected',
          timestamp: '2024-01-21 16:30:25',
          type: 'text'
        }
      ],
      unreadCount: 1
    },
    {
      id: 3,
      user: {
        name: 'Kofi Mensah',
        email: 'kofi.mensah@hotmail.com',
        avatar: '/avatars/user3.jpg',
        status: 'offline'
      },
      agent: 'Mike Johnson',
      status: 'resolved',
      priority: 'low',
      subject: 'Bonus Question',
      lastMessage: 'Thank you for your help!',
      lastMessageTime: '2024-01-21 15:20:18',
      startTime: '2024-01-21 15:10:00',
      responseTime: '45s',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'How do I claim my welcome bonus?',
          timestamp: '2024-01-21 15:10:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'agent',
          message: 'You can claim your welcome bonus by making your first deposit of at least GH₵ 20.',
          timestamp: '2024-01-21 15:10:45',
          type: 'text'
        },
        {
          id: 3,
          sender: 'user',
          message: 'Thank you for your help!',
          timestamp: '2024-01-21 15:20:18',
          type: 'text'
        }
      ],
      unreadCount: 0
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: MessageSquare },
      waiting: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      resolved: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.active;
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

  const filteredChats = chatSessions.filter(chat => {
    if (filterStatus === 'all') return true;
    return chat.status === filterStatus;
  });

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: selectedChat.messages.length + 1,
        sender: 'agent',
        message: message.trim(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'text'
      };
      
      selectedChat.messages.push(newMessage);
      setMessage('');
    }
  };

  const stats = {
    activeChats: chatSessions.filter(c => c.status === 'active').length,
    waitingChats: chatSessions.filter(c => c.status === 'waiting').length,
    totalChats: chatSessions.length,
    avgResponseTime: '1m 35s'
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Chat Support</h1>
          <p className="text-gray-600 mt-1">Manage real-time customer support conversations</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Active: {stats.activeChats}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Waiting: {stats.waitingChats}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-500" />
              <span>Avg: {stats.avgResponseTime}</span>
            </div>
          </div>
          <button title="Action button" aria-label="Action button"
            
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Chat List Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Chats</h3>
              <select title="Select option" aria-label="Select option"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="waiting">Waiting</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search chats..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        chat.user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{chat.user.name}</h4>
                        {chat.unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{chat.subject}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(chat.status)}
                    {getPriorityBadge(chat.priority)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1 mr-2">{chat.lastMessage}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(chat.lastMessageTime).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        selectedChat.user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedChat.user.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{selectedChat.user.email}</span>
                        <span>Agent: {selectedChat.agent}</span>
                        <span>Response Time: {selectedChat.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Voice call" aria-label="Voice call">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Video call" aria-label="Video call">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="More options" aria-label="More options">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'agent' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'agent' ? 'text-red-100' : 'text-gray-500'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Attach file" aria-label="Attach file">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Emoji" aria-label="Emoji">
                    <Smile className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input title="Input field" aria-label="Input field" 
                      type="text"
                      value={message}
                      onChange={(e) =>  setMessage(e.target.value)}
                      
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button title="Action button" aria-label="Action button"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </button>
                </div>
                
                {/* Quick Responses */}
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-sm text-gray-500">Quick responses:</span>
                  <button title="Action button" aria-label="Action button" 
                    // onClick={() => /* TODO: Add function */}
            
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Greeting
                  </button>
                  <button title="Action button" aria-label="Action button" 
                    // onClick={() => /* TODO: Add function */}
            
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Checking
                  </button>
                  <button title="Action button" aria-label="Action button" 
                    // onClick={() => /* TODO: Add function */}
           
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Follow-up
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a chat to start</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to begin chatting with customers</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Details Modal */}
      <Modal
        isOpen={isChatModalOpen}
        onClose={closeChatModal}
        title="Chat Session Details"
        size="lg"
      >
        {selectedChat && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">User Information</h4>
                <p className="text-sm text-gray-600">Name: {selectedChat?.user?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">Email: {selectedChat?.user?.email || 'N/A'}</p>
                <p className="text-sm text-gray-600">Status: {selectedChat?.user?.status || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Session Details</h4>
                <p className="text-sm text-gray-600">Session ID: {selectedChat?.id || 'N/A'}</p>
                <p className="text-sm text-gray-600">Status: {selectedChat?.status || 'N/A'}</p>
                <p className="text-sm text-gray-600">Duration: {selectedChat?.responseTime || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Recent Messages</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedChat?.messages?.slice(-5).map((msg, index) => (
                  <div key={index} className={`p-2 rounded ${
                    msg.sender === 'agent' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                  }`}>
                    <span className="font-medium">{msg.sender === 'agent' ? 'Agent' : 'User'}:</span> {msg.message}
                  </div>
                )) || <p className="text-sm text-gray-500">No messages available</p>}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeChatModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Chat
              </button>
              <button
                onClick={closeChatModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LiveChat;