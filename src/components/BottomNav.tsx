import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs: { label: string; screen: Screen; icon: string }[] = [
    { label: 'Live', screen: 'overview', icon: 'monitor_heart' },
    { label: 'Pricing', screen: 'pricing-tiers', icon: 'token' },
    { label: 'Docs', screen: 'documentation-hub', icon: 'terminal' },
    { label: 'Nodes', screen: 'node-telemetry', icon: 'deployed_code' },
    { label: 'About', screen: 'about-kestrel', icon: 'info' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-[#0b0e14]/90 backdrop-blur-xl border-t border-[#272a31]/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => onNavigate(tab.screen)}
              className={`flex flex-col items-center justify-center w-14 h-14 transition-all cursor-pointer ${
                isActive ? 'text-[#89ceff]' : 'text-[#bdc8d2] hover:text-[#e1e2eb]'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-label-caps text-[10px] tracking-wider mt-0.5 font-mono">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#89ceff] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
