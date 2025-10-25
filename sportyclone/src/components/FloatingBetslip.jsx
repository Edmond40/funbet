import { useBets } from "@/hooks/useBets";

const FloatingBetslip = ({ onOpenBetslip }) => {
  const { betCount } = useBets();
  return (
    <div className="shadow-lg rounded-l-lg fixed right-0 bottom-20 z-50 lg:hidden" style={{ backgroundColor: '#f1f4f7c0' }}>
      <button
        onClick={onOpenBetslip}
        className=" w-16 h-16 flex flex-col items-center justify-center relative" 
        title={`Open Betslip (${betCount} ${betCount === 1 ? 'bet' : 'bets'})`}
        aria-label={`Open betslip with ${betCount} bets`}
      >
        {/* Bet Count Number */}
        <div className="bg-red-600 w-6 h-6 flex items-center justify-center rounded-full text-white text-lg font-bold leading-none">
          {betCount > 99 ? '99+' : betCount}
        </div>
        
        {/* Betslip Text */}
        <div className="text-black text-xs font-medium leading-none mt-1">
          BETSLIP
        </div>
      </button>
    </div>
  );
};

export default FloatingBetslip;
