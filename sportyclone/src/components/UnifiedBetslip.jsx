import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import MobileBetslip from './MobileBetslip';

const UnifiedBetslip = ({ isOpen, onClose, isMobile }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  // Use mobile betslip for mobile devices
  if (isMobileView || isMobile) {
    return <MobileBetslip isOpen={isOpen} onClose={onClose} />;
  }

  // Use desktop betslip for desktop devices
  return (
    <div className="fixed inset-0 bg-blue-500 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden relative">
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md"
            title="Close betslip"
            aria-label="Close betslip"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UnifiedBetslip;