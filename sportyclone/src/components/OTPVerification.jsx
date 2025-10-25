import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

const OTPVerification = ({ onBack, onVerify, mobile, method }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(8);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(1);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      setTimeout(() => onVerify(newOtp.join('')), 100);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend && resendCount > 0) {
      setTimeLeft(8);
      setCanResend(false);
      setResendCount(resendCount - 1);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleSwitchMethod = (newMethod) => {
    // In a real app, this would trigger the parent to switch methods
    console.log(`Switching to ${newMethod} OTP`);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="p-1 mr-3" title="Go back">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Verify Mobile Number</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              We've sent you a 6-digit code to +233 {mobile}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                aria-label={`OTP digit ${index + 1}`}
                title={`Enter digit ${index + 1} of 6`}
                className={`w-12 h-12 text-center text-lg font-medium border-2 rounded-lg outline-none transition-colors ${
                  digit 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 focus:border-green-500'
                }`}
              />
            ))}
          </div>

          {/* Resend Section */}
          <div className="text-center mb-8">
            <div className="text-sm text-gray-600 mb-2">
              {canResend ? (
                <button 
                  onClick={handleResend}
                  className="text-green-500 font-medium"
                  disabled={resendCount === 0}
                >
                  Send Again
                </button>
              ) : (
                <>
                  <span className="text-green-500 font-medium">Send Again</span> {timeLeft}s left
                </>
              )}
            </div>
            <div className="text-xs text-gray-500">
              You have {resendCount} time left to request another one
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-4">
              Please disable Do Not Disturb to receive your code.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Haven't you received the code?
            </p>
          </div>

          {/* Alternative Methods */}
          <div className="space-y-3">
            {method !== 'voice' && (
              <button
                onClick={() => handleSwitchMethod('voice')}
                className="w-full text-green-500 text-sm font-medium py-2"
              >
                Switch to Voice OTP
              </button>
            )}
            {method !== 'telegram' && (
              <button
                onClick={() => handleSwitchMethod('telegram')}
                className="w-full text-green-500 text-sm font-medium py-2"
              >
                Switch to Telegram OTP
              </button>
            )}
            <button className="w-full text-green-500 text-sm font-medium py-2">
              Contact Customer Service
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default OTPVerification;
