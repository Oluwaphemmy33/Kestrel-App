import React, { useState } from 'react';
import { Screen } from '../types';

interface FooterProps {
  onNavigate: (screen: Screen) => void;
  onShowToast: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid homelab or personal email address.');
      return;
    }
    setSubscribed(true);
    onShowToast(`Subscribed ${email} to zero-noise kernel updates!`);
  };

  return (
    <footer className="w-full bg-[#0b0e14] mt-12 py-12 px-4 md:px-8 border-t border-[#272a31]/50 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product links */}
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-[11px] uppercase text-[#89ceff] tracking-wider font-mono">
              Product
            </span>
            <button
              onClick={() => onNavigate('overview')}
              className="text-left font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 cursor-pointer"
            >
              Features & Architecture
            </button>
            <button
              onClick={() => onNavigate('documentation-hub')}
              className="text-left font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 cursor-pointer"
            >
              Documentation
            </button>
            <button
              onClick={() => onNavigate('node-telemetry')}
              className="text-left font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 cursor-pointer"
            >
              Live Node Monitor
            </button>
            <button
              onClick={() => onNavigate('pricing-tiers')}
              className="text-left font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 cursor-pointer"
            >
              Homelab Sponsorship
            </button>
          </div>

          {/* Community */}
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-[11px] uppercase text-[#89ceff] tracking-wider font-mono">
              Community
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 flex items-center gap-1.5"
            >
              GitHub Repository
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 flex items-center gap-1.5"
            >
              Discord Server
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <a
              href="https://reddit.com/r/homelab"
              target="_blank"
              rel="noreferrer"
              className="font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 flex items-center gap-1.5"
            >
              Homelab Reddit
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <button
              onClick={() => onNavigate('about-kestrel')}
              className="text-left font-body-sm text-sm text-[#bdc8d2] hover:text-[#e1e2eb] transition-colors py-1 cursor-pointer"
            >
              Zero-Cloud Manifesto
            </button>
          </div>

          {/* Stay informed */}
          <div className="col-span-2 flex flex-col gap-3">
            <span className="font-label-caps text-[11px] uppercase text-[#89ceff] tracking-wider font-mono">
              Stay Informed
            </span>
            <p className="font-body-sm text-sm text-[#bdc8d2]">
              Zero-noise homelab and kernel telemetry release updates. No spam, ever.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#191c22] border border-[#89ceff]/40 text-[#89ceff] text-xs font-mono flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Subscribed! You will receive kernel and release notifications.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-3 rounded-lg bg-[#191c22] text-[#e1e2eb] font-code-sm text-xs placeholder:text-[#87929c] border border-[#272a31] focus:outline-none focus:border-[#89ceff] flex-1 font-mono"
                  placeholder="sysadmin@homelab.local"
                  type="email"
                />
                <button
                  className="h-11 px-5 rounded-lg bg-[#1d2026] hover:bg-[#272a31] text-[#e1e2eb] font-headline-sm text-xs font-semibold border border-[#32353c] transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#272a31]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-code-sm text-xs text-[#87929c] text-center sm:text-left font-mono">
            © 2026 Kestrel. Free and open-source self-hosted telemetry (GPLv3).
          </p>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#89ceff] animate-pulse"></span>
            <span className="text-[#bdc8d2]">mesh-core: v2.4.9 operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
