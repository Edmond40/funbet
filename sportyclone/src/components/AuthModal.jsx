import React, { useState } from "react";
import { X, ChevronLeft, Check } from "lucide-react";
import Ghana1 from "../assets/ghana1.png";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

const AuthModal = ({ open, mode, onClose, onSwitchMode }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  // Register flow
  const [step, setStep] = useState("account");
  const [username, setUsername] = useState("");
  const [ghanaCard, setGhanaCard] = useState("");
  
  // Forgot password flow
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordValidation({
      minLength: value.length >= 8,
      maxLength: value.length <= 64,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value)
    });
  };
  
  const handleLogin = () => {
    console.log('Login attempt:', { mobile, password, remember, keepSignedIn });
    onClose();
  };
  
  const handleNext = () => {
    if (step === "account") {
      setStep("otp");
    } else if (step === "otp") {
      setStep("personal");
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("account");
    } else if (step === "personal") {
      setStep("otp");
    }
  };

  const handleCreateAccount = () => {
    console.log('Account created:', { mobile, password, username, ghanaCard });
    onClose();
  };

  const canProceedFromAccount = mobile.trim().length >= 10;
  const canCreateAccount = Object.values(passwordValidation).every(Boolean);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg w-full max-w-full max-h-full h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <img src={Ghana1} alt="" className="w-8 h-8 object-cover"/>
            <span className="font-medium">Ghana</span>
            <span className="text-green-500 text-sm">Change</span>
            <span className="text-gray-400">›</span>
          </div>
          <button onClick={onClose} className="p-1" title="Close modal">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {mode === "login" ? (
          // Login Form
          <div className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded">
                  <span className="px-3 py-3 text-gray-600 text-sm">+233</span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="0209732250"
                    className="flex-1 px-3 py-3 border-0 outline-none text-sm"
                  />
                  <button className="p-2" title="Clear mobile number">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-3 border border-gray-300 rounded outline-none text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-green-500"
                  />
                  <span>Remember me</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="w-4 h-4 text-green-500"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                onClick={handleLogin}
                disabled={!mobile || !password}
                className={`w-full py-3 rounded font-medium transition-colors ${
                  mobile && password
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Login
              </button>

              <div className="text-center text-sm">
                <span>By logging in, you agree to our </span>
                <span className="text-green-500">Terms & Conditions</span>
              </div>

              <div className="flex justify-between text-sm">
                <button onClick={() => setShowForgotPassword(true)} className="text-green-500">Forgot Password?</button>
                <button onClick={() => onSwitchMode("register")} className="text-green-500">
                  Create New Account
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <div>Or</div>
                <div className="mt-2">
                  To deactivate or reactivate your account <span className="text-green-500">click here</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Register Form
          <div>
            {step !== "account" && (
              <div className="flex items-center p-4 border-b">
                <button onClick={handleBack} className="p-1 mr-2" title="Go back">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-medium">
                  {step === "otp" ? "Set Password" : "Personal Info"}
                </span>
              </div>
            )}

            {step === "account" && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">Join SportyBet</h2>
                  <p className="text-sm text-gray-600">with your mobile number</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-green-500">Account Info</span>
                    </div>
                    <div className="w-16 h-px bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">
                        2
                      </div>
                      <span className="text-xs mt-1 text-gray-400">OTP Verification</span>
                    </div>
                    <div className="w-16 h-px bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">
                        3
                      </div>
                      <span className="text-xs mt-1 text-gray-400">Personal Info</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-green-500 rounded">
                    <div className="flex items-center">
                      <span className="px-3 py-3 text-gray-600 text-sm">+233</span>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile Number"
                        className="flex-1 px-3 py-3 border-0 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!canProceedFromAccount}
                    className={`w-full py-3 rounded font-medium transition-colors ${
                      canProceedFromAccount
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>

                  <div className="text-center">
                    <button onClick={() => onSwitchMode("login")} className="text-green-500 text-sm">
                      Already have an account? Log In
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "otp" && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">Set Password</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Your password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter and one number.
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-green-500">Account Info</span>
                    </div>
                    <div className="w-16 h-px bg-green-500 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-green-500">OTP Verification</span>
                    </div>
                    <div className="w-16 h-px bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">
                        3
                      </div>
                      <span className="text-xs mt-1 text-gray-400">Personal Info</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Password"
                      className="w-full px-3 py-3 border border-gray-300 rounded outline-none text-sm"
                    />
                  </div>

                  {/* Password Validation */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className={`flex items-center gap-1 ${passwordValidation.minLength ? 'text-green-500' : 'text-gray-400'}`}>
                        <Check className="w-3 h-3" />
                        <span>8 characters minimum</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.maxLength ? 'text-green-500' : 'text-gray-400'}`}>
                        <Check className="w-3 h-3" />
                        <span>64 characters maximum</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.number ? 'text-green-500' : 'text-gray-400'}`}>
                        <Check className="w-3 h-3" />
                        <span>one number</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-1 ${passwordValidation.uppercase ? 'text-green-500' : 'text-gray-400'}`}>
                        <Check className="w-3 h-3" />
                        <span>one uppercase character</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.lowercase ? 'text-green-500' : 'text-gray-400'}`}>
                        <Check className="w-3 h-3" />
                        <span>one lowercase character</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!canCreateAccount}
                    className={`w-full py-3 rounded font-medium transition-colors ${
                      canCreateAccount
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Create Account
                  </button>

                  <div className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our <span className="text-green-500">Terms & Conditions</span> and confirm that you are at least 18 years old or over and all information given is true.
                  </div>
                </div>
              </div>
            )}

            {step === "personal" && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                  <p className="text-sm text-gray-600">Please provide your personal details</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-green-500">Account Info</span>
                    </div>
                    <div className="w-16 h-px bg-green-500 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-green-500">OTP Verification</span>
                    </div>
                    <div className="w-16 h-px bg-green-500 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-xs mt-1 text-green-500">Personal Info</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full px-3 py-3 border border-gray-300 rounded outline-none text-sm"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={ghanaCard}
                      onChange={(e) => setGhanaCard(e.target.value)}
                      placeholder="Ghana Card Number"
                      className="w-full px-3 py-3 border border-gray-300 rounded outline-none text-sm"
                    />
                  </div>

                  <button
                    onClick={handleCreateAccount}
                    disabled={!username || !ghanaCard}
                    className={`w-full py-3 rounded font-medium transition-colors ${
                      username && ghanaCard
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Complete Registration
                  </button>

                  <div className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our <span className="text-green-500">Terms & Conditions</span> and confirm that you are at least 18 years old or over and all information given is true.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Forgot Password Flow */}
      <ForgotPasswordFlow 
        isOpen={showForgotPassword} 
        onClose={() => setShowForgotPassword(false)} 
      />
    </div>
  );
};

export default AuthModal;
  
 