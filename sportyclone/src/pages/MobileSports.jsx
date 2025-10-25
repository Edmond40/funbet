import React from 'react';
import MobileHeader from '../components/MobileHeader';
import SportsNavigation from '../components/SportsNavigation';

const MobileSports = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      <SportsNavigation />
    </div>
  );
};

export default MobileSports;
