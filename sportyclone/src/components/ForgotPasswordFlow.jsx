import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import VerifyMobileNumber from './VerifyMobileNumber';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';
import ConfirmPassword from './ConfirmPassword';

const ForgotPasswordFlow = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState('find-account');
  const [mobile, setMobile] = useState('');
  const [otpMethod, setOtpMethod] = useState('sms');
  const [newPassword, setNewPassword] = useState('');

  const handleFindAccount = (mobileNumber) => {
    setMobile(mobileNumber);
    setCurrentStep('verify-method');
  };

  const handleSelectOTPMethod = (method) => {
    setOtpMethod(method);
    setCurrentStep('otp-verification');
  };

  const handleOTPVerification = (code) => {
    // In a real app, verify the OTP code here
    console.log('OTP verified:', code);
    setCurrentStep('reset-password');
  };

  const handleResetPassword = (password) => {
    setNewPassword(password);
    setCurrentStep('confirm-password');
  };

  const handlePasswordConfirmed = () => {
    setCurrentStep('success');
    // In a real app, submit the new password to the server
    console.log('Password reset completed');
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
      resetFlow();
    }, 2000);
  };

  const resetFlow = () => {
    setCurrentStep('find-account');
    setMobile('');
    setOtpMethod('sms');
    setNewPassword('');
  };

  const handleClose = () => {
    onClose();
    resetFlow();
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'verify-method':
        setCurrentStep('find-account');
        break;
      case 'otp-verification':
        setCurrentStep('verify-method');
        break;
      case 'reset-password':
        setCurrentStep('otp-verification');
        break;
      case 'confirm-password':
        setCurrentStep('reset-password');
        break;
      default:
        handleClose();
    }
  };

  if (!isOpen) return null;

  // Success screen
  if (currentStep === 'success') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Password Reset Successful!</h1>
          <p className="text-gray-600 text-sm">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentStep === 'find-account' && (
        <ForgotPassword
          onClose={handleClose}
          onNext={handleFindAccount}
        />
      )}

      {currentStep === 'verify-method' && (
        <VerifyMobileNumber
          onBack={handleBack}
          onSelectMethod={handleSelectOTPMethod}
          mobile={mobile}
        />
      )}

      {currentStep === 'otp-verification' && (
        <OTPVerification
          onBack={handleBack}
          onVerify={handleOTPVerification}
          mobile={mobile}
          method={otpMethod}
        />
      )}

      {currentStep === 'reset-password' && (
        <ResetPassword
          onBack={handleBack}
          onClose={handleClose}
          onConfirm={handleResetPassword}
        />
      )}

      {currentStep === 'confirm-password' && (
        <ConfirmPassword
          onBack={handleBack}
          onClose={handleClose}
          onComplete={handlePasswordConfirmed}
          newPassword={newPassword}
        />
      )}
    </>
  );
};

export default ForgotPasswordFlow;
