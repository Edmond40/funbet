import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';

const ResetPassword = ({ onBack, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    if (password.trim().length >= 8) {
      onConfirm(password);
    }
  };

  const canProceed = password.trim().length >= 8;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onBack} className="p-1" title="Go back">
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
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reset Password</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter and one number.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg outline-none text-sm focus:border-green-500 transition-colors"
              />
            </div>

            <button
              onClick={handleConfirm}
              disabled={!canProceed}
              className={`w-full py-4 rounded-lg font-medium text-sm transition-colors ${
                canProceed
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ResetPassword;
