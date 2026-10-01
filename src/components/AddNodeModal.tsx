import React, { useState } from 'react';
import { TelemetryNode } from '../types';

interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (node: TelemetryNode) => void;
  onShowToast: (msg: string) => void;
}

export const AddNodeModal: React.FC<AddNodeModalProps> = ({
  isOpen,
  onClose,
  onAddNode,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [category, setCategory] = useState<TelemetryNode['category']>('compute');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ip) {
      onShowToast('Please provide both node name and target IP address.');
      return;
    }

    const newNode: TelemetryNode = {
      id: `custom-node-${Date.now()}`,
      name: name.trim(),
      ip: ip.trim(),
      category,
      mac: `fa:16:3e:${Math.floor(Math.random() * 89 + 10)}:${Math.floor(Math.random() * 89 + 10)}:${Math.floor(Math.random() * 89 + 10)}`,
      ping: Number((0.2 + Math.random() * 0.7).toFixed(2)),
      pingHistory: [0.35, 0.40, 0.38, 0.42, 0.36, 0.39, 0.37, 0.41],
      status: 'ok',
      details: details.trim() || 'Custom Homelab Target',
      uptime: 'Just provisioned',
      packetLoss: 0.0,
      jitter: 0.02,
      icon: category === 'storage' ? 'storage' : category === 'dns' ? 'shield' : category === 'network' ? 'router' : category === 'iot' ? 'cottage' : category === 'media' ? 'play_circle' : 'memory',
      lastPolled: 'Just now',
    };

    onAddNode(newNode);
    onShowToast(`Target ${newNode.name} (${newNode.ip}) attached to eBPF probe ring`);
    setName('');
    setIp('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#151a23] border border-[#272a31] rounded-2xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#191c22] border-b border-[#272a31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#89ceff] text-[20px]">add_circle</span>
            <h3 className="font-headline-sm text-base text-[#e1e2eb] font-semibold">
              Attach Target to eBPF Probe
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-[#bdc8d2] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-mono text-[#87929c] mb-1">
              Target Hostname / Label
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Raspberry Pi Cluster Node 03"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 bg-[#111620] border border-[#232a36] rounded-lg text-sm text-[#e1e2eb] font-mono focus:outline-none focus:border-[#89ceff]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#87929c] mb-1">
              IP Address or LAN Hostname
            </label>
            <input
              type="text"
              required
              placeholder="192.168.1.120"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full h-10 px-3 bg-[#111620] border border-[#232a36] rounded-lg text-sm text-[#e1e2eb] font-mono focus:outline-none focus:border-[#89ceff]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#87929c] mb-1">
              Infrastructure Tier
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TelemetryNode['category'])}
              className="w-full h-10 px-3 bg-[#111620] border border-[#232a36] rounded-lg text-sm text-[#e1e2eb] font-mono focus:outline-none focus:border-[#89ceff]"
            >
              <option value="compute">Compute (Proxmox / K8s / LXC)</option>
              <option value="storage">Storage (ZFS / TrueNAS / Synology)</option>
              <option value="network">Network (UDM / Switch / Router)</option>
              <option value="dns">DNS & Security (Pi-hole / AdGuard)</option>
              <option value="iot">Home Automation / IoT</option>
              <option value="media">Media (Plex / Jellyfin / Transcoder)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#87929c] mb-1">
              Workload Details (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 8 Cores, NVMe cache, 10G SFP+"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full h-10 px-3 bg-[#111620] border border-[#232a36] rounded-lg text-sm text-[#e1e2eb] font-mono focus:outline-none focus:border-[#89ceff]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-[#191c22] hover:bg-[#272a31] text-[#bdc8d2] text-xs font-mono transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-[#00b4ff] hover:bg-[#89ceff] text-[#0b0e14] text-xs font-bold transition-colors cursor-pointer"
            >
              Attach Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
