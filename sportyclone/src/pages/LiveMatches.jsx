import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const LiveMatches = () => {
  const matches = [
    { id: 1, title: "Ogura, K vs YOSHIMOTO, Akaru", sport: "Tennis", status: "LIVE" },
    { id: 2, title: "Sharjah FC vs Al Gharafa SC", sport: "Football", status: "LIVE" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 bg-[#12171b]">
        <div className="max-w-[1100px] mx-auto space-y-4">
          <div className="rounded border border-white/10 bg-[#0f1418] text-white p-4">
            <h1 className="text-xl font-semibold mb-2">All Live Matches</h1>
            <p className="text-white/70 text-sm mb-3">Select a live match to view Single View details.</p>
            <ul className="divide-y divide-white/10">
              {matches.map((m) => (
                <li key={m.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{m.title}</div>
                    <div className="text-white/60 text-sm">{m.sport} • {m.status}</div>
                  </div>
                  <Link to="/live-betting" className="text-sporty-green hover:underline">Open Single View</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveMatches;
