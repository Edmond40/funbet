const WinnersPanel = () => {
  const winners = [
    { amount: "GH₵6,350.00", time: "7 min ago", product: "Sports Betting", user: "55*****002" },
    { amount: "GH₵6,686.15", time: "13 min ago", product: "Sports Betting", user: "53*****903" },
    { amount: "GH₵14,414.40", time: "13 min ago", product: "Sports Betting", user: "24*****303" },
    { amount: "GH₵5,985.00", time: "1 min ago", product: "Sports Betting", user: "59*****255" },
    { amount: "GH₵3,726.00", time: "1 min ago", product: "Sports Betting", user: "53*****016" },
    { amount: "GH₵3,540.18", time: "1 min ago", product: "Sports Betting", user: "54*****735" },
  ];

  return (
    <div className="w-80 bg-white border rounded-lg overflow-hidden">
      <div className="bg-sporty-dark text-white px-4 py-2 text-sm font-medium">Grand Prize Winners</div>
      <div className="max-h-[420px] overflow-y-auto divide-y">
        {winners.map((w, i) => (
          <div key={i} className="p-3">
            <div className="text-sporty-green font-bold">{w.amount}</div>
            <div className="text-xs text-gray-500">{w.time}</div>
            <div className="text-xs text-gray-600 mt-1">{w.product}</div>
            <div className="text-xs text-gray-500">{w.user}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnersPanel;
