const MiniGamesPanel = () => {
  const games = [
    { title: "Spin da' Bottle", img: "/api/placeholder/160/90" },
    { title: "Sporty Hero", img: "/api/placeholder/160/90" },
    { title: "Penalty Shootout", img: "/api/placeholder/160/90" },
    { title: "Lucky Wheel", img: "/api/placeholder/160/90" }
  ];

  return (
    <div className="w-80 bg-white border rounded-lg overflow-hidden">
      <div className="bg-sporty-dark text-white px-4 py-2 text-sm font-medium">Mini Games</div>
      <div className="p-3 grid grid-cols-2 gap-3">
        {games.map((g, i) => (
          <div key={i} className="border rounded hover:shadow cursor-pointer overflow-hidden">
            <img src={g.img} alt={g.title} className="w-full h-20 object-cover" />
            <div className="px-2 py-2 text-xs font-medium text-center">{g.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniGamesPanel;
