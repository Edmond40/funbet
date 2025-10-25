import { create } from 'zustand';

const useBetStore = create((set) => ({
  bets: [],
  betCount: 0,
  addBet: (bet) =>
    set((state) => {
      const exists = state.bets.find((b) => b.id === bet.id);
      if (exists) return state;
      const newBets = [...state.bets, bet];
      return { bets: newBets, betCount: newBets.length };
    }),
  removeBet: (id) =>
    set((state) => {
      const newBets = state.bets.filter((bet) => bet.id !== id);
      return { bets: newBets, betCount: newBets.length };
    }),
  removeAllBets: () => set({ bets: [], betCount: 0 }),
  updateBetStake: (id, stake) =>
    set((state) => ({ bets: state.bets.map((bet) =>
        bet.id === id ? { ...bet, stake } : bet
    )})),
}));

// Listen for custom events
if (typeof window !== 'undefined') {
  window.addEventListener('add-bet', ((event) => {
    const betData = event.detail;
    useBetStore.getState().addBet(betData);
  }));
}

export const useBets = () => {
  const bets = useBetStore((state) => state.bets);
  const betCount = useBetStore((state) => state.betCount);
  const addBet = useBetStore((state) => state.addBet);
  const removeBet = useBetStore((state) => state.removeBet);
  const removeAllBets = useBetStore((state) => state.removeAllBets);
  const updateBetStake = useBetStore((state) => state.updateBetStake);

  return {
    bets,
    betCount,
    addBet,
    removeBet,
    removeAllBets,
    updateBetStake,
  };
};
