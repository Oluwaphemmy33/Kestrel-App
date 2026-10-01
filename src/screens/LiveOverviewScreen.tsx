import React, { useState, useEffect } from 'react';
import { Screen, TelemetryNode } from '../types';
import { TopologyMap } from '../components/TopologyMap';

interface LiveOverviewScreenProps {
  nodes: TelemetryNode[];
  onNavigate: (screen: Screen) => void;
  onSelectNode: (nodeId: string) => void;
  onOpenDownload: () => void;
  onShowToast: (msg: string) => void;
}

export const LiveOverviewScreen: React.FC<LiveOverviewScreenProps> = ({
  nodes,
  onNavigate,
  onSelectNode,
  onOpenDownload,
  onShowToast,
}) => {
  const [probeInterval, setProbeInterval] = useState<number>(500);
  const [isSimulatingJitter, setIsSimulatingJitter] = useState<boolean>(false);
  const [livePings, setLivePings] = useState<Record<string, number>>({
    'proxmox-pve-01': 0.4,
    'truenas-scale': 0.8,
    'pihole-primary': 0.2,
    'wan-uplink': 4.2,
  });

  // Dynamic micro-jitter simulation to keep the UI authentically alive
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePings((prev) => ({
        'proxmox-pve-01': Number((0.38 + Math.random() * 0.05).toFixed(2)),
        'truenas-scale': Number((0.78 + Math.random() * 0.06).toFixed(2)),
        'pihole-primary': Number((0.19 + Math.random() * 0.04).toFixed(2)),
        'wan-uplink': isSimulatingJitter
          ? Number((32.4 + Math.random() * 8.2).toFixed(1))
          : Number((4.15 + Math.random() * 0.15).toFixed(2)),
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, [isSimulatingJitter]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copied ${label} to clipboard!`);
  };

  const toggleJitterSimulation = () => {
    const next = !isSimulatingJitter;
    setIsSimulatingJitter(next);
    if (next) {
      onShowToast('Simulating WAN jitter & fiber SFP+ latency spike');
    } else {
      onShowToast('Restored WAN fiber uplink to nominal 4.2ms');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 space-y-10 max-w-7xl mx-auto pt-4">
      {/* SECTION 1: HERO */}
      <section className="flex flex-col items-center text-center pt-2 sm:pt-6 space-y-4 max-w-3xl mx-auto">
        {/* Version Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#272a31] shadow-sm border border-[#3e4851]/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#89ceff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#89ceff]"></span>
          </span>
          <span className="font-code-sm text-xs text-[#e1e2eb] font-mono">
            v1.4 Released · Homelab Native
          </span>
          <span className="text-[#ffb86a] font-code-sm text-xs font-semibold font-mono">
            ● ACTIVE
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-[#e1e2eb] tracking-tight text-balance font-bold leading-tight">
          Know your network before it knows you’re gone
        </h1>

        {/* Subhead */}
        <p className="font-body-md text-base sm:text-lg text-[#bdc8d2] max-w-2xl text-balance">
          Watches your LAN, pings your services, and sends push notifications before your family notices the Wi-Fi is down.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full sm:w-auto">
          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] font-headline-sm text-sm font-bold px-6 py-3 rounded-full min-h-[44px] shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">download</span>
            Download free
          </button>
          <button
            onClick={() => onNavigate('documentation-hub')}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1d2026] hover:bg-[#272a31] text-[#e1e2eb] border border-[#32353c] font-headline-sm text-sm px-6 py-3 rounded-full min-h-[44px] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">menu_book</span>
            Read the docs
          </button>
        </div>

        {/* Quick Terminal Install Box */}
        <div className="w-full max-w-lg mt-2 bg-[#0b0e14] rounded-xl p-2 sm:p-3 shadow-xl flex items-center justify-between gap-2 border border-[#272a31]">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-2">
            <span className="text-[#89ceff] font-code-sm text-xs select-none font-mono">$</span>
            <code className="font-code-sm text-xs text-[#e1e2eb] truncate font-mono">
              curl -sSL https://get.kestrel.dev | sh
            </code>
          </div>
          <button
            aria-label="Copy install script"
            className="shrink-0 p-2 rounded-lg bg-[#1d2026] hover:bg-[#272a31] text-[#bdc8d2] hover:text-[#89ceff] transition-colors cursor-pointer"
            onClick={() => copyToClipboard('curl -sSL https://get.kestrel.dev | sh', 'install command')}
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: DARK DASHBOARD MOCKUP */}
      <section className="w-full max-w-5xl mx-auto">
        <div className="bg-[#1d2026] rounded-xl shadow-2xl overflow-hidden border border-[#272a31]">
          {/* Accent Top Lip */}
          <div className="h-1 bg-gradient-to-r from-[#89ceff] via-[#00b4ff] to-[#ffb95f]"></div>

          {/* Mockup Header Bar */}
          <div className="p-3 sm:p-4 bg-[#272a31] flex flex-wrap items-center justify-between gap-3 border-b border-[#32353c]/60">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#32353c]"></span>
                <span className="w-3 h-3 rounded-full bg-[#32353c]"></span>
                <span className="w-3 h-3 rounded-full bg-[#32353c]"></span>
              </div>
              <span className="font-code-sm text-xs text-[#bdc8d2] tracking-wide pl-2 font-mono">
                KESTREL LOCALHOST:9090
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0b0e14] font-code-sm text-xs text-[#89ceff] font-medium font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#89ceff] animate-pulse"></span>
                24/24 NODES HEALTHY
              </span>
              <span className="font-code-sm text-xs text-[#ffb95f] hidden sm:inline font-mono">
                99.98% 30-DAY UPTIME
              </span>

              {/* Jitter simulation button */}
              <button
                onClick={toggleJitterSimulation}
                className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors cursor-pointer border ${
                  isSimulatingJitter
                    ? 'bg-[#ee9800]/20 text-[#ffb95f] border-[#ee9800]'
                    : 'bg-[#191c22] text-[#87929c] border-[#32353c] hover:text-[#e1e2eb]'
                }`}
                title="Toggle simulated packet latency spike"
              >
                {isSimulatingJitter ? 'Simulating Jitter: ON' : 'Test Outage / Jitter'}
              </button>
            </div>
          </div>

          {/* Interactive Network Topology Mini-Map */}
          <div className="p-4 bg-[#0b0e14] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-[11px] uppercase text-[#bdc8d2] tracking-wider font-mono">
                Topology Map // Real-time Latency Mesh
              </span>
              <div className="flex items-center gap-2">
                <span className="font-code-sm text-xs text-[#89ceff] font-mono">
                  eBPF Probe: Active ({probeInterval}ms)
                </span>
                <button
                  onClick={() => setProbeInterval((prev) => (prev === 250 ? 500 : prev === 500 ? 1000 : 250))}
                  className="text-[10px] font-mono text-[#87929c] hover:text-[#89ceff] px-1.5 py-0.5 rounded bg-[#191c22] cursor-pointer"
                  title="Switch probe frequency"
                >
                  Rate: {probeInterval}ms ↻
                </button>
              </div>
            </div>

            {/* Topology SVG Component */}
            <TopologyMap
              onSelectNode={onSelectNode}
              isSimulatingJitter={isSimulatingJitter}
              probeInterval={probeInterval}
            />
          </div>

          {/* Live Ping Feed / Service List */}
          <div className="p-3 sm:p-4 bg-[#1d2026] space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-caps text-[11px] uppercase text-[#bdc8d2] font-mono">
                Live Service Telemetry
              </span>
              <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">
                Polled 1s ago
              </span>
            </div>

            {/* Node Item 1: Proxmox VE */}
            <div
              onClick={() => onSelectNode('proxmox-pve-01')}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#191c22] hover:bg-[#272a31] rounded-lg gap-2 cursor-pointer transition-colors border border-[#232a36]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#89ceff] text-[20px] shrink-0">
                  memory
                </span>
                <div className="min-w-0">
                  <span className="font-headline-sm text-sm text-[#e1e2eb] font-semibold truncate block">
                    Proxmox VE
                  </span>
                  <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">
                    192.168.1.10 · 24 Containers
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono">
                <span className="font-code-sm text-xs text-[#89ceff]">
                  {livePings['proxmox-pve-01']}ms
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#1d2026] font-code-sm text-xs text-[#89ceff] font-medium border border-[#89ceff]/20">
                  OK
                </span>
              </div>
            </div>

            {/* Node Item 2: TrueNAS Core */}
            <div
              onClick={() => onSelectNode('truenas-scale')}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#191c22] hover:bg-[#272a31] rounded-lg gap-2 cursor-pointer transition-colors border border-[#232a36]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#89ceff] text-[20px] shrink-0">
                  storage
                </span>
                <div className="min-w-0">
                  <span className="font-headline-sm text-sm text-[#e1e2eb] font-semibold truncate block">
                    TrueNAS Core
                  </span>
                  <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">
                    192.168.1.15 · ZFS Pool 84%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono">
                <span className="font-code-sm text-xs text-[#89ceff]">
                  {livePings['truenas-scale']}ms
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#1d2026] font-code-sm text-xs text-[#89ceff] font-medium border border-[#89ceff]/20">
                  OK
                </span>
              </div>
            </div>

            {/* Node Item 3: Pi-hole Primary */}
            <div
              onClick={() => onSelectNode('pihole-primary')}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#191c22] hover:bg-[#272a31] rounded-lg gap-2 cursor-pointer transition-colors border border-[#232a36]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#89ceff] text-[20px] shrink-0">
                  shield
                </span>
                <div className="min-w-0">
                  <span className="font-headline-sm text-sm text-[#e1e2eb] font-semibold truncate block">
                    Pi-hole Primary
                  </span>
                  <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">
                    192.168.1.2 · 42,190 blocked
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono">
                <span className="font-code-sm text-xs text-[#89ceff]">
                  {livePings['pihole-primary']}ms
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#1d2026] font-code-sm text-xs text-[#89ceff] font-medium border border-[#89ceff]/20">
                  OK
                </span>
              </div>
            </div>

            {/* Node Item 4: WAN Uplink (Fiber) */}
            <div
              onClick={() => onSelectNode('wan-uplink')}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#191c22] hover:bg-[#272a31] rounded-lg gap-2 cursor-pointer transition-colors border border-[#232a36]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px] shrink-0">
                  router
                </span>
                <div className="min-w-0">
                  <span className="font-headline-sm text-sm text-[#e1e2eb] font-semibold truncate block">
                    WAN Uplink (Fiber)
                  </span>
                  <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">
                    1.2 Gbps Symmetric
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono">
                <span className={`font-code-sm text-xs font-semibold ${isSimulatingJitter ? 'text-[#ffb95f]' : 'text-[#ffb95f]'}`}>
                  {livePings['wan-uplink']}ms
                </span>
                <span className={`px-2 py-0.5 rounded-full bg-[#1d2026] font-code-sm text-xs font-medium border ${isSimulatingJitter ? 'text-[#ffb95f] border-[#ffb95f]/40' : 'text-[#ffb95f] border-[#ffb95f]/20'}`}>
                  {isSimulatingJitter ? 'JITTER' : 'OK'}
                </span>
              </div>
            </div>

            {/* Link to full 24 nodes screen */}
            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('node-telemetry')}
                className="font-code-sm text-xs text-[#89ceff] hover:underline cursor-pointer inline-flex items-center gap-1 font-mono"
              >
                Inspect all 24 monitored homelab nodes
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THREE-COLUMN FEATURE TEASER */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Feature 1 */}
        <div className="bg-[#1d2026] p-5 rounded-xl border border-[#272a31] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-3 shadow-md">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#272a31] flex items-center justify-center text-[#89ceff]">
              <span className="material-symbols-outlined text-[24px]">lock</span>
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2eb] font-semibold">
              Zero-Cloud Sovereignty
            </h3>
            <p className="font-body-sm text-sm text-[#bdc8d2] leading-relaxed">
              100% local SQLite / DuckDB storage. No telemetry sent home, no third-party accounts, and zero subscription lock-in for homelab privacy.
            </p>
          </div>
          <div className="pt-2 border-t border-[#272a31]/50">
            <span className="font-code-sm text-xs text-[#89ceff] font-mono">
              duckdb_storage: v1.1.0
            </span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#1d2026] p-5 rounded-xl border border-[#272a31] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-3 shadow-md">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#272a31] flex items-center justify-center text-[#89ceff]">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2eb] font-semibold">
              Sub-Second Ping Cycles
            </h3>
            <p className="font-body-sm text-sm text-[#bdc8d2] leading-relaxed">
              eBPF-powered packet probes test ICMP, HTTP/S, TCP sockets, and DNS resolvers every 500ms without spiking your host CPU cores.
            </p>
          </div>
          <div className="pt-2 border-t border-[#272a31]/50">
            <span className="font-code-sm text-xs text-[#89ceff] font-mono">
              kernel_ring: eBPF active
            </span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#1d2026] p-5 rounded-xl border border-[#272a31] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-3 shadow-md">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#272a31] flex items-center justify-center text-[#ffb95f]">
              <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2eb] font-semibold">
              Multi-Channel Push Alerts
            </h3>
            <p className="font-body-sm text-sm text-[#bdc8d2] leading-relaxed">
              Instant webhooks to Gotify, ntfy, Pushover, Telegram, Discord, or Home Assistant before packet drops cause family complaints.
            </p>
          </div>
          <div className="pt-2 border-t border-[#272a31]/50">
            <span className="font-code-sm text-xs text-[#ffb95f] font-mono">
              ntfy + gotify webhooks ready
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: STATS BAND */}
      <section className="w-full bg-[#272a31] rounded-xl p-5 sm:p-8 shadow-lg border border-[#32353c]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col space-y-1">
            <span className="font-display-xl text-3xl sm:text-4xl md:text-5xl text-[#89ceff] font-bold tracking-tight font-headline">
              420M+
            </span>
            <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">Checks per Day</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-display-xl text-3xl sm:text-4xl md:text-5xl text-[#89ceff] font-bold tracking-tight font-headline">
              &lt; 280ms
            </span>
            <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">Avg Alert Latency</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-display-xl text-3xl sm:text-4xl md:text-5xl text-[#ffb95f] font-bold tracking-tight font-headline">
              38.5k+
            </span>
            <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">Self-Hosted Installs</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-display-xl text-3xl sm:text-4xl md:text-5xl text-[#89ceff] font-bold tracking-tight font-headline">
              0 B
            </span>
            <span className="font-code-sm text-xs text-[#bdc8d2] font-mono">Telemetry Leaked</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIAL CARD */}
      <section className="max-w-3xl mx-auto w-full">
        <div className="bg-[#1d2026] p-5 sm:p-7 rounded-xl border border-[#272a31] shadow-lg relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#272a31] flex items-center justify-center text-[#89ceff] shrink-0 border border-[#3e4851]">
              <span className="material-symbols-outlined text-[28px]">format_quote</span>
            </div>
            <div className="space-y-3 min-w-0">
              <blockquote className="font-body-md text-sm sm:text-base text-[#e1e2eb] italic leading-relaxed">
                “Kestrel notified my phone that my gateway SFP+ transceiver was throwing CRC errors while I was out getting groceries. Fixed it before my partner even sat down to stream Netflix. Essential software for any serious r/homelab rack.”
              </blockquote>
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <span className="font-headline-sm text-sm text-[#e1e2eb] font-semibold">
                  Alex Chen
                </span>
                <span className="font-code-sm text-[#89ceff]">(@sysadmin_al)</span>
                <span className="text-[#87929c]">·</span>
                <span className="font-code-sm text-[#bdc8d2]">
                  Homelabber &amp; Proxmox Maintainer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLOSING CTA */}
      <section
        className="w-full bg-[#0b0e14] rounded-xl p-6 sm:p-10 shadow-2xl text-center space-y-4 max-w-4xl mx-auto border border-[#272a31]"
        id="install"
      >
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[#e1e2eb] font-bold">
            Reclaim telemetry over your home network.
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#bdc8d2]">
            Single static binary. Deploys via Docker Compose in 30 seconds.
          </p>
        </div>

        {/* Code Block */}
        <div className="max-w-md mx-auto bg-[#1d2026] p-2.5 sm:p-3 rounded-lg flex items-center justify-between gap-2 shadow-inner border border-[#272a31]">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0">
            <span className="text-[#ffb95f] font-code-sm text-xs select-none font-mono">$</span>
            <code className="font-code-sm text-xs text-[#e1e2eb] truncate font-mono">
              docker compose up -d kestrel
            </code>
          </div>
          <button
            aria-label="Copy docker compose command"
            className="shrink-0 p-1.5 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-[#bdc8d2] hover:text-[#89ceff] transition-colors cursor-pointer"
            onClick={() => copyToClipboard('docker compose up -d kestrel', 'docker command')}
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
          </button>
        </div>

        {/* Download Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center justify-center bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] font-headline-sm text-sm font-bold px-8 py-3 rounded-full min-h-[44px] shadow-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] mr-2">download</span>
            Download free v1.4
          </button>
        </div>

        {/* Reassurance Badges */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-2 sm:gap-4 font-mono text-xs text-[#bdc8d2]">
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#89ceff]">verified</span>
            Free &amp; Open Source
          </span>
          <span className="text-[#87929c] text-xs">·</span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#89ceff]">verified</span>
            GPLv3
          </span>
          <span className="text-[#87929c] text-xs">·</span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#89ceff]">verified</span>
            No Cloud Required
          </span>
          <span className="text-[#87929c] text-xs">·</span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#89ceff]">verified</span>
            Runs on Raspberry Pi
          </span>
        </div>
      </section>
    </div>
  );
};
