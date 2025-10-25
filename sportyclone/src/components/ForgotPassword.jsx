import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';

const ForgotPassword = ({ onClose, onNext }) => {
  const [mobile, setMobile] = useState('');

  const handleNext = () => {
    if (mobile.trim().length >= 9) {
      onNext(mobile);
    }
  };

  const canProceed = mobile.trim().length >= 9;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onClose} className="p-1" title="Go back">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button onClick={onClose} className="p-1" title="Close">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Find Account</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              To reset your password, please confirm your account first.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-300 rounded-lg">
              <div className="flex items-center">
                <span className="px-4 py-4 text-gray-600 text-sm border-r border-gray-300">+233</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                  className="flex-1 px-4 py-4 border-0 outline-none text-sm rounded-r-lg"
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`w-full py-4 rounded-lg font-medium text-sm transition-colors ${
                canProceed
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ForgotPassword;
