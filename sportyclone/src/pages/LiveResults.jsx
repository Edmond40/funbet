import Header from "@/components/Header";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const LiveResults = () => {
  const items = [
    { league: "International Clubs AFC Champions League", home: "Sharjah FC", away: "Al Gharafa SC", score: "2 - 1", time: "67'", status: "LIVE" },
    { league: "Italy Primavera 1", home: "Hellas Verona", away: "Cesena FC", score: "1 - 0", time: "45' HT", status: "HT" },
    { league: "Egypt Second Division B", home: "Fayoum FC", away: "Cascada SC", score: "0 - 0", time: "12'", status: "LIVE" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <div className="flex-1 p-6 bg-white">
          <h1 className="text-2xl font-bold mb-4">Live Results</h1>
          <div className="max-w-6xl mx-auto">
            {/* Sport Filter Strip */}
            <div className="rounded-lg overflow-hidden border mb-6">
              <div className="bg-sporty-dark text-white p-3 text-sm flex items-center gap-4 overflow-x-auto">
                <Link to="/football" className="text-white font-medium border-b-2 border-sporty-green pb-1">Football</Link>
                <Link to="/basketball" className="text-gray-300 hover:text-white">Basketball</Link>
                <Link to="/sports" className="text-gray-300 hover:text-white">Tennis</Link>
                <Link to="/virtual" className="text-gray-300 hover:text-white">eFootball</Link>
                <div className="ml-auto flex items-center gap-2 text-xs">
                  <label htmlFor="lr-date" className="sr-only">Select date</label>
                  <input id="lr-date" type="date" className="bg-white text-sporty-dark rounded px-2 py-1" aria-label="Select date" />
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="rounded-lg overflow-hidden border">
                  <div className="bg-white">
                    {items.map((it, i) => (
                      <div key={i} className="grid grid-cols-12 items-center p-3 border-t text-sm">
                        <div className="col-span-4 text-gray-600">{it.league}</div>
                        <div className="col-span-2 font-medium">
                          <div>{it.home}</div>
                          <div>{it.away}</div>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="text-lg font-bold text-sporty-red">{it.score}</div>
                        </div>
                        <div className="col-span-2 text-center">
                          <Badge className={`text-white ${it.status === 'LIVE' ? 'bg-green-600' : 'bg-gray-500'}`}>{it.time}</Badge>
                        </div>
                        <div className="col-span-2 text-right pr-2">
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="live" className="mt-6">
                <div className="rounded-lg border p-6 text-center text-gray-600">Live-only filter will appear here.</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <UnifiedBetslip />
      </div>
      <Footer />
    </div>
  );
};

export default LiveResults;
