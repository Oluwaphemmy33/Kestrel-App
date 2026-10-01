import React, { useState } from 'react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onOpenDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenDownload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (screen: Screen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  const navItems: { label: string; screen: Screen; icon: string }[] = [
    { label: 'Features', screen: 'overview', icon: 'hub' },
    { label: 'Pricing', screen: 'pricing-tiers', icon: 'payments' },
    { label: 'Docs', screen: 'documentation-hub', icon: 'menu_book' },
    { label: 'Nodes', screen: 'node-telemetry', icon: 'deployed_code' },
    { label: 'About', screen: 'about-kestrel', icon: 'info' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0b0e14]/85 backdrop-blur-xl border-b border-[#272a31]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] pt-safe">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <div 
          onClick={() => handleNav('overview')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <img
            alt="Kestrel Network Monitor Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1ULtRAFVcUB2QAWdHTfA9i2oyFHBKrEImVQs_H0wBuBpPEPgIvu8OvBrwqgliMlrRa2MRvgHLYr-FiOhdGqpB0HiFQ1v8WUPvGei9B7RTW-UIPtkMwqjL4KaCVI2oJYk6RX5z8zxWCuiDi6J507mDbi_bxXwhx220c4rmzqC3fhzMQEC6ovX5PawKR5Lmizj59mnT123294qpiaNx67l4JjwHzDR_FSaB4RiKW9co9TLQhX6QqSfVUgn2I"
          />
          <span className="font-headline-sm text-[20px] text-[#e1e2eb] tracking-tight ml-1 font-semibold">
            Kestrel
          </span>
          <span className="hidden sm:inline font-code-sm text-[11px] text-[#bdc8d2] font-label-caps uppercase ml-2 text-[#89ceff]">
            // {currentScreen === 'overview' ? 'Overview' : currentScreen === 'pricing-tiers' ? 'Pricing' : currentScreen === 'documentation-hub' ? 'Docs' : currentScreen === 'node-telemetry' ? 'Telemetry' : 'About'}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => handleNav(item.screen)}
                className={`font-code-md text-sm transition-colors py-1 px-1 cursor-pointer select-none ${
                  isActive
                    ? 'text-[#89ceff] font-semibold border-b-2 border-[#89ceff]'
                    : 'text-[#bdc8d2] hover:text-[#e1e2eb]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center justify-center bg-[#00b4ff] text-[#0b0e14] font-headline-sm text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-full min-h-[38px] shadow-[0_0_16px_rgba(0,180,255,0.25)] hover:shadow-[0_0_24px_rgba(0,180,255,0.45)] hover:bg-[#89ceff] transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px] mr-1">download</span>
            <span>Download</span>
          </button>

          {/* Mobile Menu Button */}
          <div className="relative md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#191c22] text-[#e1e2eb] hover:bg-[#272a31] cursor-pointer"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Host status indicator (desktop) */}
          <div 
            onClick={() => handleNav('node-telemetry')}
            title="Mesh node cluster status"
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#191c22] border border-[#272a31] text-[#bdc8d2] hover:border-[#89ceff] transition-colors cursor-pointer text-xs font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-[#89ceff] animate-pulse"></span>
            <span className="text-[11px] text-[#e1e2eb]">24/24 OK</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#0b0e14]/98 backdrop-blur-2xl p-4 border-b border-[#272a31] shadow-2xl flex flex-col gap-2 z-50">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#272a31]/60">
            <span className="font-label-caps text-[11px] uppercase text-[#87929c]">Navigation Index</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#89ceff] animate-ping"></span>
              <span className="font-code-sm text-xs text-[#89ceff]">v1.4 Homelab</span>
            </div>
          </div>
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => handleNav(item.screen)}
                className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors font-code-md text-sm cursor-pointer ${
                  isActive
                    ? 'bg-[#1d2026] text-[#89ceff] border border-[#89ceff]/40 font-semibold'
                    : 'text-[#e1e2eb] hover:bg-[#1d2026]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#89ceff]">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                <span className="material-symbols-outlined text-[#bdc8d2] text-[18px]">
                  arrow_forward_ios
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
