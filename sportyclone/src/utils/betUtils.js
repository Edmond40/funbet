// Utility function to add a bet from any component
export const addBetToGlobal = (bet) => {
  // Dispatch custom event that the BetContext listens to
  window.dispatchEvent(new CustomEvent('add-bet', { detail: bet }));
};

// Example usage in any component:
// addBetToGlobal({
//   id: 'unique-bet-id',
//   event: 'Manchester United vs Liverpool',
//   market: 'Match Winner',
//   pick: 'Manchester United',
//   odds: '2.50'
// });