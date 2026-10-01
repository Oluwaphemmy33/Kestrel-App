import React, { useState } from 'react';
import { TelemetryNode } from '../types';

interface NodesScreenProps {
  nodes: TelemetryNode[];
  onSelectNode: (nodeId: string) => void;
  onOpenAddNode: () => void;
  onShowToast: (msg: string) => void;
  onToggleNodeStatus: (nodeId: string) => void;
}

export const NodesScreen: React.FC<NodesScreenProps> = ({
  nodes,
  onSelectNode,
  onOpenAddNode,
  onShowToast,
  onToggleNodeStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ok' | 'warning'>('all');

  const categories = [
    { id: 'all', label: 'All Tiers' },
    { id: 'network', label: 'Network & SFP+' },
    { id: 'compute', label: 'Compute & Hypervisors' },
    { id: 'storage', label: 'Storage & ZFS' },
    { id: 'dns', label: 'DNS & AdBlock' },
    { id: 'iot', label: 'Home IoT' },
    { id: 'media', label: 'Transcoding & Media' },
  ];

  const filteredNodes = nodes.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.ip.includes(searchTerm) ||
      node.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || node.category === activeCategory;
    const matchesStatus =
      statusFilter === 'all' || node.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const healthyCount = nodes.filter((n) => n.status === 'ok').length;
  const avgPing = (
    nodes.reduce((acc, curr) => acc + curr.ping, 0) / (nodes.length || 1)
  ).toFixed(2);

  return (
    <div className="flex flex-col w-full px-4 md:px-8 space-y-6 max-w-7xl mx-auto pt-4 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#272a31] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#e1e2eb] font-bold">
              Live Node Telemetry
            </h1>
            <span className="font-code-sm text-xs px-2 py-0.5 rounded-full bg-[#191c22] border border-[#272a31] text-[#89ceff] font-mono">
              eBPF Socket Ring
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] mt-1">
            Real-time ICMP &amp; TCP socket latency metrics across all rack hardware and virtualized guests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddNode}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] font-headline-sm text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Attach Target
          </button>
        </div>
      </div>

      {/* Rack Health Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1d2026] p-4 rounded-xl border border-[#272a31]">
        <div>
          <span className="font-label-caps text-[10px] text-[#87929c] font-mono block">
            ONLINE TARGETS
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#89ceff] animate-pulse"></span>
            <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#e1e2eb] font-mono">
              {healthyCount} / {nodes.length}
            </span>
          </div>
        </div>

        <div>
          <span className="font-label-caps text-[10px] text-[#87929c] font-mono block">
            MEDIAN RTT
          </span>
          <div className="mt-1">
            <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#89ceff] font-mono">
              {avgPing} ms
            </span>
          </div>
        </div>

        <div>
          <span className="font-label-caps text-[10px] text-[#87929c] font-mono block">
            POLL CYCLE
          </span>
          <div className="mt-1">
            <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#e1e2eb] font-mono">
              500 ms
            </span>
          </div>
        </div>

        <div>
          <span className="font-label-caps text-[10px] text-[#87929c] font-mono block">
            PACKET LOSS (AVG)
          </span>
          <div className="mt-1">
            <span className="font-headline-sm text-lg sm:text-xl font-bold text-[#10b981] font-mono">
              0.00%
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#87929c] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by IP, hostname, or container..."
            className="w-full h-10 pl-9 pr-3 bg-[#191c22] border border-[#272a31] rounded-lg text-xs font-mono text-[#e1e2eb] placeholder:text-[#87929c] focus:outline-none focus:border-[#89ceff]"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#89ceff] text-[#001e2f] font-bold'
                    : 'bg-[#191c22] text-[#bdc8d2] hover:text-[#e1e2eb] border border-[#272a31]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredNodes.map((node) => {
          const isWarning = node.status !== 'ok';
          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className={`p-4 rounded-xl border bg-[#1d2026] hover:bg-[#272a31] transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                isWarning
                  ? 'border-[#ffb95f]/60 shadow-[0_0_12px_rgba(255,185,95,0.15)]'
                  : 'border-[#272a31] hover:border-[#89ceff]/50'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isWarning
                        ? 'bg-[#ee9800]/20 text-[#ffb95f]'
                        : 'bg-[#191c22] text-[#89ceff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {node.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-sm text-[#e1e2eb] font-semibold truncate group-hover:text-[#89ceff] transition-colors">
                      {node.name}
                    </h3>
                    <span className="font-code-sm text-xs text-[#bdc8d2] font-mono block">
                      {node.ip}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono shrink-0">
                  <span
                    className={`font-code-sm text-sm font-bold block ${
                      isWarning ? 'text-[#ffb95f]' : 'text-[#89ceff]'
                    }`}
                  >
                    {node.ping}ms
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isWarning
                        ? 'bg-[#ee9800]/20 text-[#ffb95f]'
                        : 'bg-[#191c22] text-[#89ceff]'
                    }`}
                  >
                    {isWarning ? 'DEGRADED' : 'NOMINAL'}
                  </span>
                </div>
              </div>

              {/* Workload details */}
              <div className="text-xs font-mono text-[#87929c] truncate">
                {node.details}
              </div>

              {/* Mini Sparkline Bar */}
              <div className="pt-2 border-t border-[#272a31]/60 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-end gap-1 h-6 w-28">
                  {node.pingHistory.slice(-8).map((val, i) => {
                    const max = Math.max(...node.pingHistory, 2);
                    const h = Math.min(100, Math.max(15, (val / max) * 100));
                    return (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`w-2.5 rounded-xs ${
                          val > 2 ? 'bg-[#ffb95f]' : 'bg-[#89ceff]'
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-[#87929c]">
                  <span>Loss: {node.packetLoss}%</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleNodeStatus(node.id);
                    }}
                    className="p-1 hover:text-[#e1e2eb] text-[#87929c] cursor-pointer"
                    title="Toggle simulated state"
                  >
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNodes.length === 0 && (
        <div className="p-8 text-center bg-[#191c22] rounded-xl border border-[#272a31] text-[#87929c] font-mono text-xs">
          No monitored targets matched your criteria.
        </div>
      )}
    </div>
  );
};
