const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-6 md:mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="text-lg font-bold mb-2">SportyBet <span className="text-xs align-top">Ghana</span></div>
          <div className="text-sm text-white/80">Official Sports Betting Partner</div>
          <div className="mt-4 text-sm">Paybill: <span className="font-semibold">*711*222#</span></div>
          <div className="mt-4 flex items-center gap-3 text-white/70 text-sm">
            <span>#2 Worldwide in Traffic.</span>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">SportyBet Ghana</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Responsible Gaming</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Sporty Group</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">How To Play</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Cash Out</a></li>
            <li><a href="#" className="hover:underline">Bet Builder</a></li>
            <li><a href="#" className="hover:underline">Live Betting</a></li>
            <li><a href="#" className="hover:underline">Games</a></li>
            <li><a href="#" className="hover:underline">Scheduled Virtuals</a></li>
            <li><a href="#" className="hover:underline">Jackpot</a></li>
            <li><a href="#" className="hover:underline">Others</a></li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <div className="font-semibold mb-3">Connect with Us</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="break-all">telephone: 0596218899</li>
            <li className="break-all">Email: ghana.support@sportybet.com</li>
          </ul>
          <div className="mt-4 text-xs text-white/60">
            SportyBet Ghana is licensed by the Gaming Commission of Ghana under the Gaming Act, 2006 (Act, 721).
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-white/70 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-center md:text-left">Age 18 and above only. Play Responsibly. Betting is addictive and can be psychologically harmful.</div>
          <div className="text-center md:text-right">© 2025 SportyBet. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
