import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Camera, Phone, Mail, MapPin, Calendar, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

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
          <h1 className="text-white text-lg font-semibold">My Account Info</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 lg:p-6">
          {/* Profile Header */}
          <div className={`rounded-lg p-6 mb-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
                  window.innerWidth < 1024 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  ED
                </div>
                <button className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                  window.innerWidth < 1024 ? 'bg-white text-gray-800' : 'bg-blue-500 text-white'
                }`} title="Upload profile picture" aria-label="Upload profile picture">
                  <Camera size={16} />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">EDMUND O...</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                      window.innerWidth < 1024
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <Edit size={16} className="mr-2" />
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2" />
                    <span>207*39*96</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2" />
                    <span>edmund@email.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>Accra, Ghana</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>Member since Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Edmund"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                  title="First name"
                  aria-label="First name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Osei"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                  title="Last name"
                  aria-label="Last name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="edmund@email.com"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                  title="Email address"
                  aria-label="Email address"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="207*39*96"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                  title="Phone number"
                  aria-label="Phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="Accra, Ghana"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    window.innerWidth < 1024
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter address"
                  title="Address"
                  aria-label="Address"
                />
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className={`rounded-lg p-6 mt-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-xl font-semibold mb-4">Account Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${window.innerWidth < 1024 ? 'text-blue-400' : 'text-blue-600'}`}>
                  127
                </div>
                <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Bets Placed
                </div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-600'}`}>
                  GHS 2,847.50
                </div>
                <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Wagered
                </div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold ${window.innerWidth < 1024 ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  89%
                </div>
                <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                  Win Rate
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className={`rounded-lg p-6 mt-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-xl font-semibold mb-4">Verification Status</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-800">Email Verified</span>
                </div>
                <span className="text-green-600">✓</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="font-medium text-yellow-800">Phone Verification</span>
                </div>
                <span className="text-yellow-600">Pending</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-800">Identity Verification</span>
                </div>
                <span className="text-gray-600">Not Started</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-800">Address Verification</span>
                </div>
                <span className="text-gray-600">Not Started</span>
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

export default Profile;
