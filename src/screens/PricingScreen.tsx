import React, { useState } from 'react';
import { PRICING_PLANS, HOMELAB_FAQS } from '../data/mockData';

interface PricingScreenProps {
  onOpenDownload: () => void;
  onShowToast: (msg: string) => void;
}

export const PricingScreen: React.FC<PricingScreenProps> = ({
  onOpenDownload,
  onShowToast,
}) => {
  const [nodeCount, setNodeCount] = useState<number>(24);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const datadogCost = nodeCount * 15 * 12; // $15/host/month
  const kestrelCost = 0;
  const annualSavings = datadogCost - kestrelCost;

  return (
    <div className="flex flex-col w-full px-4 md:px-8 space-y-12 max-w-7xl mx-auto pt-4 pb-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191c22] border border-[#272a31] text-[#89ceff] font-mono text-xs">
          <span>Obsidian Licensing · Zero Lock-In</span>
        </div>
        <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-[#e1e2eb] font-bold">
          Free forever for your homelab.
        </h1>
        <p className="font-body-md text-sm sm:text-base text-[#bdc8d2] max-w-2xl mx-auto">
          We believe personal infrastructure telemetry belongs in your physical living room, not rented back to you on a monthly SaaS subscription.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => {
          const isPatron = plan.isPopular;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all relative ${
                isPatron
                  ? 'bg-[#151a23] border-2 border-[#89ceff] shadow-[0_0_30px_rgba(0,180,255,0.15)] -translate-y-1'
                  : 'bg-[#1d2026] border border-[#272a31]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00b4ff] text-[#0b0e14] font-headline-sm text-[10px] font-bold tracking-wider font-mono uppercase">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-headline-sm text-xl text-[#e1e2eb] font-bold">
                    {plan.name}
                  </h3>
                  <span className="font-code-sm text-xs text-[#89ceff] font-mono block mt-0.5">
                    {plan.subtitle}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-3xl sm:text-4xl font-bold text-[#e1e2eb] font-headline">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#87929c]">/{plan.period}</span>
                </div>

                <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] leading-relaxed">
                  {plan.description}
                </p>

                <div className="pt-2 border-t border-[#272a31]/60 space-y-2.5 font-mono text-xs">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#89ceff] text-[16px] shrink-0 mt-0.5">
                        check
                      </span>
                      <span className="text-[#e1e2eb]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (plan.id === 'community') {
                      onOpenDownload();
                    } else {
                      onShowToast(`Redirecting to ${plan.name} sponsor gateway...`);
                    }
                  }}
                  className={`w-full py-3 rounded-full font-headline-sm text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    plan.ctaType === 'primary'
                      ? 'bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] shadow-md'
                      : 'bg-[#272a31] hover:bg-[#32353c] text-[#e1e2eb] border border-[#3e4851]'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive SaaS Savings Calculator */}
      <section className="bg-[#151a23] border border-[#272a31] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-label-caps text-xs text-[#89ceff] font-mono uppercase">
              ROI &amp; Sovereignty Calculator
            </span>
            <h2 className="font-headline-sm text-xl sm:text-2xl text-[#e1e2eb] font-bold mt-1">
              What does cloud monitoring cost your rack?
            </h2>
            <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] mt-1">
              Compare Datadog or New Relic host pricing against running Kestrel on your own hardware.
            </p>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs text-[#87929c]">Annual Estimated Savings:</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#10b981] font-headline">
              +${annualSavings.toLocaleString()} / yr
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-[#bdc8d2]">Monitored Hosts &amp; LXC Containers:</span>
            <span className="text-[#89ceff] font-bold">{nodeCount} targets</span>
          </div>
          <input
            type="range"
            min="4"
            max="80"
            value={nodeCount}
            onChange={(e) => setNodeCount(Number(e.target.value))}
            className="w-full h-2 bg-[#272a31] rounded-lg appearance-none cursor-pointer accent-[#00b4ff]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#87929c]">
            <span>Small Mini PC (4)</span>
            <span>Single PVE Node (24)</span>
            <span>Full 42U Server Rack (80)</span>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-[#111620] rounded-xl border border-[#ffb4ab]/20 space-y-1 font-mono">
            <span className="text-xs text-[#ffb4ab]">Enterprise SaaS (Datadog/NewRelic)</span>
            <div className="text-xl font-bold text-[#e1e2eb]">
              ${(nodeCount * 15).toLocaleString()}/mo (${datadogCost.toLocaleString()}/yr)
            </div>
            <p className="text-[11px] text-[#87929c] font-sans">
              Transmits internal IP addresses, container hostnames, and LAN traffic metadata to 3rd-party clouds.
            </p>
          </div>

          <div className="p-4 bg-[#111620] rounded-xl border border-[#00b4ff]/30 space-y-1 font-mono">
            <span className="text-xs text-[#89ceff]">Kestrel Homelab (Self-Hosted)</span>
            <div className="text-xl font-bold text-[#00b4ff]">
              $0 / mo (Free &amp; Open Source)
            </div>
            <p className="text-[11px] text-[#87929c] font-sans">
              100% local DuckDB storage. Zero bytes egressed. Hardware-accurate eBPF socket timestamps.
            </p>
          </div>
        </div>
      </section>

      {/* Homelab FAQs */}
      <section className="space-y-4 max-w-3xl mx-auto w-full">
        <h2 className="font-headline-sm text-xl sm:text-2xl text-[#e1e2eb] font-bold text-center">
          Frequently Answered Questions
        </h2>
        <div className="space-y-2">
          {HOMELAB_FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#1d2026] border border-[#272a31] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-sm font-semibold text-[#e1e2eb] cursor-pointer hover:bg-[#272a31] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#89ceff] shrink-0">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 font-body-sm text-xs sm:text-sm text-[#bdc8d2] leading-relaxed border-t border-[#272a31]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
