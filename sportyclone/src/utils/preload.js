import React from 'react';

// Preload utility for route components
export const preloadRoute = (routeImport) => {
  const componentImport = routeImport();
  return componentImport;
};

// Preload critical routes on user interaction
export const preloadCriticalRoutes = () => {
  // Preload most commonly accessed routes
  import('../pages/Football');
  import('../pages/Basketball');
  import('../pages/LiveBetting');
  import('../pages/Login');
  import('../pages/Register');
};

// Preload routes on hover/focus
export const preloadOnHover = (routeName) => {
  switch (routeName) {
    case 'football':
      import('../pages/Football');
      break;
    case 'basketball':
      import('../pages/Basketball');
      break;
    case 'tennis':
      import('../pages/Tennis');
      break;
    case 'live-betting':
      import('../pages/LiveBetting');
      break;
    case 'promotions':
      import('../pages/Promotions');
      break;
    case 'livescore':
      import('../pages/Livescore');
      break;
    default:
      break;
  }
};
