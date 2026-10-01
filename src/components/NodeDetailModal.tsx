import React, { useState } from 'react';
import { TelemetryNode } from '../types';

interface NodeDetailModalProps {
  node: TelemetryNode | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onToggleStatus?: (nodeId: string) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  onShowToast,
  onToggleStatus,
}) => {
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  if (!node) return null;

  const handleTestPing = () => {
    setTestingPing(true);
    setPingResult(null);
    setTimeout(() => {
      setTestingPing(false);
      const measured = (node.ping + (Math.random() * 0.1 - 0.05)).toFixed(2);
      setPingResult(`64 bytes from ${node.ip}: icmp_seq=1 ttl=64 time=${measured} ms (0.0% loss)`);
      onShowToast(`eBPF probe returned ${measured} ms round-trip for ${node.name}`);
    }, 450);
  };

  const handleCopySSH = () => {
    navigator.clipboard.writeText(`ssh root@${node.ip}`);
    onShowToast(`Copied 'ssh root@${node.ip}' to clipboard`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-lg bg-[#151a23] border border-[#272a31] rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-4 bg-[#191c22] border-b border-[#272a31] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#272a31] flex items-center justify-center text-[#89ceff]">
              <span className="material-symbols-outlined text-[20px]">{node.icon}</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base text-[#e1e2eb] font-semibold">
                {node.name}
              </h3>
              <p className="font-code-sm text-xs text-[#89ceff] font-mono">
                {node.ip} · {node.category.toUpperCase()}
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

        {/* Content body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-[#111620] rounded-xl border border-[#232a36]">
              <span className="font-label-caps text-[10px] text-[#87929c] block font-mono">LATENCY (RTT)</span>
              <span className="font-headline-sm text-lg text-[#89ceff] font-bold font-mono">
                {node.ping}ms
              </span>
            </div>
            <div className="p-3 bg-[#111620] rounded-xl border border-[#232a36]">
              <span className="font-label-caps text-[10px] text-[#87929c] block font-mono">PACKET LOSS</span>
              <span className="font-headline-sm text-lg text-[#10b981] font-bold font-mono">
                {node.packetLoss}%
              </span>
            </div>
            <div className="p-3 bg-[#111620] rounded-xl border border-[#232a36]">
              <span className="font-label-caps text-[10px] text-[#87929c] block font-mono">JITTER</span>
              <span className="font-headline-sm text-lg text-[#ffb95f] font-bold font-mono">
                ±{node.jitter}ms
              </span>
            </div>
            <div className="p-3 bg-[#111620] rounded-xl border border-[#232a36]">
              <span className="font-label-caps text-[10px] text-[#87929c] block font-mono">STATUS</span>
              <span className="font-headline-sm text-sm text-[#89ceff] font-bold font-mono uppercase mt-1 block">
                {node.status === 'ok' ? '● NOMINAL' : '▲ DEGRADED'}
              </span>
            </div>
          </div>

          {/* Real-time Sparkline Visualization */}
          <div className="p-4 bg-[#111620] rounded-xl border border-[#232a36] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#87929c]">
              <span>Ping History (Last 10 cycles @ 500ms)</span>
              <span className="text-[#89ceff]">eBPF Raw Socket</span>
            </div>
            {/* Sparkline Bars */}
            <div className="h-16 flex items-end gap-1.5 pt-2">
              {node.pingHistory.map((val, idx) => {
                const maxVal = Math.max(...node.pingHistory, 2);
                const heightPct = Math.min(100, Math.max(15, (val / maxVal) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-sm transition-all ${
                        val > 2
                          ? 'bg-[#ffb95f]'
                          : 'bg-[#89ceff] hover:bg-[#00b4ff]'
                      }`}
                    />
                    <span className="text-[9px] font-mono text-[#87929c] opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}m
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Metadata Table */}
          <div className="p-3 bg-[#191c22] rounded-xl border border-[#232a36] divide-y divide-[#272a31]/60 text-xs font-mono">
            <div className="py-2 flex items-center justify-between">
              <span className="text-[#87929c]">Physical MAC Address</span>
              <span className="text-[#e1e2eb]">{node.mac || '52:54:00:81:4e:30'}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-[#87929c]">Assigned Workload</span>
              <span className="text-[#e1e2eb]">{node.details}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-[#87929c]">System Uptime</span>
              <span className="text-[#e1e2eb]">{node.uptime}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-[#87929c]">Probe Mechanism</span>
              <span className="text-[#89ceff]">Kernel BPF_PROG_TYPE_SOCKET_FILTER</span>
            </div>
          </div>

          {/* Interactive Shell Output Box */}
          {pingResult && (
            <div className="p-3 bg-[#0b0e14] rounded-lg border border-[#272a31] text-[#89ceff] font-mono text-xs">
              <span className="text-[#ffb95f] mr-1">$</span>
              {pingResult}
            </div>
          )}

          {/* Actions Button Group */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleTestPing}
              disabled={testingPing}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">
                {testingPing ? 'hourglass_top' : 'bolt'}
              </span>
              {testingPing ? 'Probing Target...' : 'Instant eBPF Ping'}
            </button>
            <button
              onClick={handleCopySSH}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#272a31] hover:bg-[#32353c] text-[#e1e2eb] font-mono text-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              Copy SSH
            </button>
            {onToggleStatus && (
              <button
                onClick={() => onToggleStatus(node.id)}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#191c22] border border-[#ffb95f]/50 hover:bg-[#ffb95f]/10 text-[#ffb95f] font-mono text-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Simulate State Flip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
