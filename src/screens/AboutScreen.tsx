import React from 'react';

interface AboutScreenProps {
  onOpenDownload: () => void;
  onShowToast: (msg: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onOpenDownload,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full px-4 md:px-8 space-y-12 max-w-5xl mx-auto pt-4 pb-12">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191c22] border border-[#272a31] text-[#89ceff] font-mono text-xs">
          <span>The Zero-Cloud Homelab Manifesto</span>
        </div>
        <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-[#e1e2eb] font-bold">
          Why we built Kestrel.
        </h1>
        <p className="font-body-md text-sm sm:text-base text-[#bdc8d2] max-w-2xl mx-auto leading-relaxed">
          Your home network is your private sanctuary. Its internal IP maps, container workloads, and latency fluctuations shouldn’t be monetized on cloud telemetry servers.
        </p>
      </div>

      {/* The 3 Core Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1d2026] p-6 rounded-2xl border border-[#272a31] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#272a31] flex items-center justify-center text-[#89ceff]">
            <span className="material-symbols-outlined text-[24px]">shield_lock</span>
          </div>
          <h3 className="font-headline-sm text-lg text-[#e1e2eb] font-bold">
            Zero Egress Telemetry
          </h3>
          <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] leading-relaxed">
            Every metric, latency spike, and topology connection is written strictly to an embedded DuckDB file on your physical hard drive. No phoning home. No telemetry tokens.
          </p>
        </div>

        <div className="bg-[#1d2026] p-6 rounded-2xl border border-[#272a31] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#272a31] flex items-center justify-center text-[#89ceff]">
            <span className="material-symbols-outlined text-[24px]">memory</span>
          </div>
          <h3 className="font-headline-sm text-lg text-[#e1e2eb] font-bold">
            eBPF Kernel Probing
          </h3>
          <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] leading-relaxed">
            Instead of executing thousands of heavy sub-processes that cook your low-power Raspberry Pi CPU, Kestrel uses Linux socket filters to inspect packets at wire speed.
          </p>
        </div>

        <div className="bg-[#1d2026] p-6 rounded-2xl border border-[#272a31] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#272a31] flex items-center justify-center text-[#ffb95f]">
            <span className="material-symbols-outlined text-[24px]">power</span>
          </div>
          <h3 className="font-headline-sm text-lg text-[#e1e2eb] font-bold">
            35MB Static Binary
          </h3>
          <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] leading-relaxed">
            No NodeJS runtime, no JVM, no bloated Python virtualenv. A single static binary with musl libc that runs natively on x86_64, aarch64, and Proxmox LXC containers.
          </p>
        </div>
      </div>

      {/* Architecture Deep-Dive Diagram */}
      <section className="bg-[#151a23] border border-[#272a31] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#272a31] pb-4">
          <div>
            <span className="font-label-caps text-xs text-[#89ceff] font-mono">
              INTERNAL PIPELINE
            </span>
            <h2 className="font-headline-sm text-xl text-[#e1e2eb] font-bold mt-0.5">
              Kernel-to-Screen Telemetry Flow
            </h2>
          </div>
          <span className="font-mono text-xs text-[#87929c]">GPLv3 Open Source</span>
        </div>

        {/* Visual Architecture Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-4 bg-[#111620] rounded-xl border border-[#232a36] space-y-2">
            <span className="text-[#89ceff] font-bold">01. Raw Sockets</span>
            <p className="text-[11px] text-[#87929c] font-sans">
              AF_PACKET / raw ICMP ring captures sub-millisecond timestamps directly at network driver ingress.
            </p>
          </div>

          <div className="p-4 bg-[#111620] rounded-xl border border-[#232a36] space-y-2">
            <span className="text-[#89ceff] font-bold">02. eBPF Ring Buffer</span>
            <p className="text-[11px] text-[#87929c] font-sans">
              Linux kernel bpf_perf_event_output passes verified metrics to user space with zero buffer copying.
            </p>
          </div>

          <div className="p-4 bg-[#111620] rounded-xl border border-[#232a36] space-y-2">
            <span className="text-[#89ceff] font-bold">03. DuckDB Storage</span>
            <p className="text-[11px] text-[#87929c] font-sans">
              Columnar Parquet blocks compress 10M pings into &lt;45MB disk with instantaneous P99 SQL aggregations.
            </p>
          </div>

          <div className="p-4 bg-[#111620] rounded-xl border border-[#232a36] space-y-2">
            <span className="text-[#ffb95f] font-bold">04. Push Alerting</span>
            <p className="text-[11px] text-[#87929c] font-sans">
              Local webhook dispatches Gotify / ntfy notification to your phone in &lt;280ms when packet drops occur.
            </p>
          </div>
        </div>
      </section>

      {/* Community Callout */}
      <section className="bg-[#1d2026] border border-[#272a31] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-headline-sm text-xl text-[#e1e2eb] font-bold">
            Join 38,500+ self-hosters and rack maintainers.
          </h3>
          <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2]">
            Kestrel is built in the open on GitHub. Contribute eBPF probe drivers, alert plugins, or custom themes.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={onOpenDownload}
            className="px-6 py-2.5 rounded-full bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] font-headline-sm text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md"
          >
            Deploy v1.4
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#272a31] hover:bg-[#32353c] text-[#e1e2eb] border border-[#3e4851] font-mono text-xs sm:text-sm transition-all flex items-center gap-1.5"
          >
            GitHub
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </section>
    </div>
  );
};
