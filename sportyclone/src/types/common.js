// Common type definitions for the SportyBet application

// Type guard to check if odds include draw
export function hasDrawOdds(odds){
  return 'draw' in odds;
}
