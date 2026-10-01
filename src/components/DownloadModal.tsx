import React, { useState } from 'react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'curl' | 'docker' | 'proxmox' | 'binary'>('curl');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copied ${label} to clipboard!`);
  };

  const curlCmd = `curl -sSL https://get.kestrel.dev | sh`;

  const dockerCompose = `version: "3.8"

services:
  kestrel:
    image: ghcr.io/kestrel-dev/kestrel:v1.4.0
    container_name: kestrel
    restart: unless-stopped
    network_mode: host
    cap_add:
      - NET_RAW
      - NET_ADMIN
      - BPF
    volumes:
      - ./kestrel-data:/var/lib/kestrel
      - /sys/fs/bpf:/sys/fs/bpf:ro
    environment:
      - KESTREL_PORT=9090
      - KESTREL_STORAGE=duckdb
      - KESTREL_PROBE_INTERVAL_MS=500`;

  const proxmoxCmd = `bash -c "$(wget -qLO - https://get.kestrel.dev/proxmox-lxc.sh)"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-xl bg-[#151a23] border border-[#272a31] rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-[#191c22] border-b border-[#272a31] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00b4ff] text-[22px]">download</span>
            <div>
              <h3 className="font-headline-sm text-base text-[#e1e2eb] font-semibold">
                Install Kestrel v1.4
              </h3>
              <p className="font-code-sm text-xs text-[#bdc8d2] font-mono">
                Single static binary · Zero external dependencies · GPLv3
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-[#bdc8d2] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#272a31] bg-[#111620] px-4 pt-2 gap-2 overflow-x-auto">
          {[
            { id: 'curl', label: '1-Line Shell', icon: 'terminal' },
            { id: 'docker', label: 'Docker Compose', icon: 'deployed_code' },
            { id: 'proxmox', label: 'Proxmox VE LXC', icon: 'memory' },
            { id: 'binary', label: 'Direct Binaries', icon: 'file_download' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#00b4ff] text-[#00b4ff] font-semibold'
                    : 'border-transparent text-[#87929c] hover:text-[#e1e2eb]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {activeTab === 'curl' && (
            <div className="space-y-3">
              <p className="font-body-sm text-xs text-[#bdc8d2]">
                Automated installer detects Linux distribution, architecture (x86_64 or aarch64), verifies eBPF socket support, configures systemd daemon, and launches localhost:9090.
              </p>
              <div className="bg-[#0b0e14] p-3 rounded-xl border border-[#272a31] flex items-center justify-between gap-2">
                <code className="font-code-sm text-xs text-[#e1e2eb] font-mono break-all">
                  <span className="text-[#00b4ff] select-none">$ </span>
                  {curlCmd}
                </code>
                <button
                  onClick={() => copyToClipboard(curlCmd, 'Shell install command')}
                  className="p-1.5 rounded-lg bg-[#1d2026] hover:bg-[#272a31] text-[#bdc8d2] hover:text-[#00b4ff] transition-colors shrink-0 cursor-pointer"
                  title="Copy command"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#87929c]">
                <span className="material-symbols-outlined text-[14px] text-[#10b981]">verified</span>
                Signed with GPG key 0x76FA90D2 · SHA256 checksum verified on download
              </div>
            </div>
          )}

          {activeTab === 'docker' && (
            <div className="space-y-3">
              <p className="font-body-sm text-xs text-[#bdc8d2]">
                Host network mode and kernel capabilities (<code className="text-[#89ceff]">NET_RAW</code>, <code className="text-[#89ceff]">BPF</code>) ensure sub-second latency precision with zero virtualization overhead.
              </p>
              <div className="relative bg-[#0b0e14] p-3 rounded-xl border border-[#272a31]">
                <button
                  onClick={() => copyToClipboard(dockerCompose, 'docker-compose.yml')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#1d2026] hover:bg-[#272a31] text-[#bdc8d2] hover:text-[#00b4ff] transition-colors cursor-pointer"
                  title="Copy docker-compose.yml"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
                <pre className="font-code-sm text-xs text-[#e1e2eb] font-mono overflow-x-auto pr-10">
                  {dockerCompose}
                </pre>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-[#87929c]">
                <span>Run with: <code className="text-[#00b4ff]">docker compose up -d</code></span>
                <span>Image size: 14.8 MB</span>
              </div>
            </div>
          )}

          {activeTab === 'proxmox' && (
            <div className="space-y-3">
              <p className="font-body-sm text-xs text-[#bdc8d2]">
                Homelab community favorite. Creates an unprivileged Alpine Linux LXC with eBPF passthrough enabled on Proxmox VE 7.4 / 8.x in 15 seconds.
              </p>
              <div className="bg-[#0b0e14] p-3 rounded-xl border border-[#272a31] flex items-center justify-between gap-2">
                <code className="font-code-sm text-xs text-[#e1e2eb] font-mono break-all">
                  <span className="text-[#ffb95f] select-none">pve# </span>
                  {proxmoxCmd}
                </code>
                <button
                  onClick={() => copyToClipboard(proxmoxCmd, 'Proxmox helper script')}
                  className="p-1.5 rounded-lg bg-[#1d2026] hover:bg-[#272a31] text-[#bdc8d2] hover:text-[#00b4ff] transition-colors shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#111620] text-xs font-mono text-[#87929c] space-y-1">
                <div>• Allocates 1 vCPU, 128MB RAM, 2GB disk</div>
                <div>• Automatically binds to vmbr0 LAN bridge</div>
              </div>
            </div>
          )}

          {activeTab === 'binary' && (
            <div className="space-y-3">
              <p className="font-body-sm text-xs text-[#bdc8d2]">
                Compiled with musl libc for pure zero-dependency standalone execution on any modern Linux kernel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => onShowToast('Downloading kestrel-v1.4.0-linux-amd64.tar.gz (11.2 MB)...')}
                  className="p-3 bg-[#191c22] hover:bg-[#272a31] border border-[#232a36] rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
                >
                  <div>
                    <div className="font-mono text-xs font-semibold text-[#e1e2eb]">Linux x86_64</div>
                    <div className="text-[10px] text-[#87929c] font-mono">AMD/Intel 64-bit · 11.2 MB</div>
                  </div>
                  <span className="material-symbols-outlined text-[#00b4ff] text-[20px]">download</span>
                </button>

                <button
                  onClick={() => onShowToast('Downloading kestrel-v1.4.0-linux-arm64.tar.gz (10.8 MB)...')}
                  className="p-3 bg-[#191c22] hover:bg-[#272a31] border border-[#232a36] rounded-xl flex items-center justify-between cursor-pointer transition-colors text-left"
                >
                  <div>
                    <div className="font-mono text-xs font-semibold text-[#e1e2eb]">Linux ARM64</div>
                    <div className="text-[10px] text-[#87929c] font-mono">Raspberry Pi 4/5 · 10.8 MB</div>
                  </div>
                  <span className="material-symbols-outlined text-[#00b4ff] text-[20px]">download</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick reassurance tags */}
          <div className="pt-2 border-t border-[#272a31]/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#87929c]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00b4ff]">verified</span>
              100% Free & Open Source
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00b4ff]">lock</span>
              No Cloud Telemetry
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00b4ff]">speed</span>
              &lt; 35MB RAM Footprint
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
