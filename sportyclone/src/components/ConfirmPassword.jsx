import React, { useState } from 'react';
import { ChevronLeft, X, Check } from 'lucide-react';

const ConfirmPassword = ({ onBack, onClose, onComplete, newPassword }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  // Password validation
  const validation = {
    minLength: newPassword.length >= 8,
    maxLength: newPassword.length <= 64,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    match: confirmPassword === newPassword && confirmPassword.length > 0
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setShowValidation(value.length > 0);
  };

  const handleComplete = () => {
    if (Object.values(validation).every(Boolean)) {
      onComplete();
    }
  };

  const canProceed = Object.values(validation).every(Boolean);

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
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Confirm Password</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please confirm your new password to complete the reset process.
            </p>
          </div>

          <div className="space-y-6">
            {/* New Password (Read-only display) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                readOnly
                title="New password (read-only)"
                aria-label="New password (read-only)"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 text-sm cursor-not-allowed"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg outline-none text-sm focus:border-green-500 transition-colors"
              />
            </div>

            {/* Password Validation */}
            {showValidation && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Password Requirements</h3>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className={`flex items-center gap-2 ${validation.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className="w-3 h-3" />
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validation.maxLength ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className="w-3 h-3" />
                    <span>Maximum 64 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validation.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className="w-3 h-3" />
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validation.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className="w-3 h-3" />
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validation.number ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className="w-3 h-3" />
                    <span>One number</span>
                  </div>
                  <div className={`flex items-center gap-2 ${validation.match ? 'text-green-600' : 'text-gray-400'}`}>
                    <Check className="w-3 h-3" />
                    <span>Passwords match</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleComplete}
              disabled={!canProceed}
              className={`w-full py-4 rounded-lg font-medium text-sm transition-colors ${
                canProceed
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Complete Password Reset
            </button>

            {/* Success Message */}
            {canProceed && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-green-600 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Password requirements met</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ConfirmPassword;
