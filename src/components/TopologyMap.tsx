import React, { useState } from 'react';
import { TelemetryNode } from '../types';

interface TopologyMapProps {
  onSelectNode: (nodeId: string) => void;
  isSimulatingJitter: boolean;
  probeInterval: number;
}

export const TopologyMap: React.FC<TopologyMapProps> = ({
  onSelectNode,
  isSimulatingJitter,
  probeInterval,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="w-full relative bg-[#191c22] rounded-lg p-2 sm:p-4 overflow-hidden border border-[#272a31]/60">
      {/* Topology Status Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#89ceff] animate-pulse"></span>
        <span className="font-code-sm text-[11px] text-[#bdc8d2] font-mono">
          Kernel eBPF Socket Mesh · {probeInterval}ms poll
        </span>
      </div>

      {isSimulatingJitter && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ee9800]/20 border border-[#ee9800]/50 text-[#ffb95f] font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-ping"></span>
          WAN CRC RETRANSMIT DETECTED
        </div>
      )}

      {/* SVG Canvas */}
      <div className="w-full h-64 sm:h-72 relative flex items-center justify-center pt-4">
        <svg
          className="w-full h-full select-none"
          fill="none"
          viewBox="0 0 600 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="primaryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#89ceff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00b4ff" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Paths */}
          {/* Gateway -> Proxmox */}
          <path
            d="M 300 40 L 150 110"
            opacity="0.6"
            stroke="#89ceff"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
          {/* Gateway -> TrueNAS */}
          <path
            d="M 300 40 L 450 110"
            opacity="0.6"
            stroke="#89ceff"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
          {/* Proxmox -> WAN */}
          <path
            d="M 150 110 L 80 180"
            opacity={isSimulatingJitter ? 0.9 : 0.5}
            stroke={isSimulatingJitter ? '#ffb95f' : '#ffb95f'}
            strokeWidth={isSimulatingJitter ? '2.5' : '1.5'}
            strokeDasharray={isSimulatingJitter ? '4 2' : 'none'}
          />
          {/* Proxmox -> Pi-hole */}
          <path
            d="M 150 110 L 220 180"
            opacity="0.5"
            stroke="#89ceff"
            strokeWidth="1.5"
          />
          {/* TrueNAS -> Home Assist */}
          <path
            d="M 450 110 L 380 180"
            opacity="0.5"
            stroke="#89ceff"
            strokeWidth="1.5"
          />
          {/* TrueNAS -> Plex Server */}
          <path
            d="M 450 110 L 520 180"
            opacity="0.5"
            stroke="#89ceff"
            strokeWidth="1.5"
          />

          {/* Animated Packet Beacons */}
          <circle cx="225" cy="75" r="3" fill="#89ceff">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="r" values="2.5;4;2.5" dur="1.2s" repeatCount="indefinite" />
          </circle>

          <circle cx="375" cy="75" r="3" fill="#89ceff">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="r" values="2.5;4;2.5" dur="1.4s" repeatCount="indefinite" />
          </circle>

          <circle cx="115" cy="145" r="3" fill={isSimulatingJitter ? '#ffb95f' : '#ffb95f'}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="2.5;5;2.5" dur="0.8s" repeatCount="indefinite" />
          </circle>

          <circle cx="185" cy="145" r="2.5" fill="#89ceff">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite" />
          </circle>

          <circle cx="415" cy="145" r="2.5" fill="#89ceff">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.1s" repeatCount="indefinite" />
          </circle>

          <circle cx="485" cy="145" r="2.5" fill="#89ceff">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.3s" repeatCount="indefinite" />
          </circle>

          {/* Node 1: Gateway UniFi (Top Center) */}
          <g
            transform="translate(300, 40)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('unifi-gateway')}
            onMouseEnter={() => setHoveredNode('unifi-gateway')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-65"
              y="-18"
              width="130"
              height="36"
              rx="18"
              fill={hoveredNode === 'unifi-gateway' ? '#272a31' : '#1d2026'}
              stroke={hoveredNode === 'unifi-gateway' ? '#89ceff' : '#32353c'}
              strokeWidth="1.5"
            />
            <circle cx="-45" cy="0" r="4" fill="#89ceff" />
            <text
              x="-32"
              y="4"
              fill="#e1e2eb"
              fontFamily="JetBrains Mono"
              fontSize="10"
              fontWeight="600"
            >
              UniFi Gateway
            </text>
          </g>

          {/* Node 2: Proxmox Cluster (Mid Left) */}
          <g
            transform="translate(150, 110)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('proxmox-pve-01')}
            onMouseEnter={() => setHoveredNode('proxmox-pve-01')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-60"
              y="-16"
              width="120"
              height="32"
              rx="16"
              fill={hoveredNode === 'proxmox-pve-01' ? '#272a31' : '#1d2026'}
              stroke={hoveredNode === 'proxmox-pve-01' ? '#89ceff' : '#32353c'}
              strokeWidth="1.5"
            />
            <circle cx="-42" cy="0" r="4" fill="#89ceff" />
            <text
              x="-28"
              y="4"
              fill="#e1e2eb"
              fontFamily="JetBrains Mono"
              fontSize="10"
            >
              Proxmox Cluster
            </text>
          </g>

          {/* Node 3: TrueNAS Scale (Mid Right) */}
          <g
            transform="translate(450, 110)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('truenas-scale')}
            onMouseEnter={() => setHoveredNode('truenas-scale')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-60"
              y="-16"
              width="120"
              height="32"
              rx="16"
              fill={hoveredNode === 'truenas-scale' ? '#272a31' : '#1d2026'}
              stroke={hoveredNode === 'truenas-scale' ? '#89ceff' : '#32353c'}
              strokeWidth="1.5"
            />
            <circle cx="-42" cy="0" r="4" fill="#89ceff" />
            <text
              x="-28"
              y="4"
              fill="#e1e2eb"
              fontFamily="JetBrains Mono"
              fontSize="10"
            >
              TrueNAS Scale
            </text>
          </g>

          {/* Leaf Nodes (Bottom Row) */}
          {/* WAN Fiber */}
          <g
            transform="translate(80, 180)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('wan-uplink')}
            onMouseEnter={() => setHoveredNode('wan-uplink')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-48"
              y="-14"
              width="96"
              height="28"
              rx="14"
              fill={hoveredNode === 'wan-uplink' ? '#32353c' : '#272a31'}
              stroke={isSimulatingJitter ? '#ffb95f' : '#3e4851'}
              strokeWidth={isSimulatingJitter ? '1.5' : '1'}
            />
            <circle cx="-32" cy="0" r="3.5" fill="#ffb95f" />
            <text
              x="-22"
              y="3"
              fill="#bdc8d2"
              fontFamily="JetBrains Mono"
              fontSize="9"
            >
              WAN Fiber
            </text>
          </g>

          {/* Pi-hole DNS */}
          <g
            transform="translate(220, 180)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('pihole-primary')}
            onMouseEnter={() => setHoveredNode('pihole-primary')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-48"
              y="-14"
              width="96"
              height="28"
              rx="14"
              fill={hoveredNode === 'pihole-primary' ? '#32353c' : '#272a31'}
              stroke={hoveredNode === 'pihole-primary' ? '#89ceff' : '#3e4851'}
              strokeWidth="1"
            />
            <circle cx="-32" cy="0" r="3.5" fill="#89ceff" />
            <text
              x="-22"
              y="3"
              fill="#bdc8d2"
              fontFamily="JetBrains Mono"
              fontSize="9"
            >
              Pi-hole DNS
            </text>
          </g>

          {/* Home Assist */}
          <g
            transform="translate(380, 180)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('home-assistant')}
            onMouseEnter={() => setHoveredNode('home-assistant')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-48"
              y="-14"
              width="96"
              height="28"
              rx="14"
              fill={hoveredNode === 'home-assistant' ? '#32353c' : '#272a31'}
              stroke={hoveredNode === 'home-assistant' ? '#89ceff' : '#3e4851'}
              strokeWidth="1"
            />
            <circle cx="-32" cy="0" r="3.5" fill="#89ceff" />
            <text
              x="-22"
              y="3"
              fill="#bdc8d2"
              fontFamily="JetBrains Mono"
              fontSize="9"
            >
              Home Assist
            </text>
          </g>

          {/* Plex Server */}
          <g
            transform="translate(520, 180)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectNode('plex-server')}
            onMouseEnter={() => setHoveredNode('plex-server')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="-48"
              y="-14"
              width="96"
              height="28"
              rx="14"
              fill={hoveredNode === 'plex-server' ? '#32353c' : '#272a31'}
              stroke={hoveredNode === 'plex-server' ? '#89ceff' : '#3e4851'}
              strokeWidth="1"
            />
            <circle cx="-32" cy="0" r="3.5" fill="#89ceff" />
            <text
              x="-22"
              y="3"
              fill="#bdc8d2"
              fontFamily="JetBrains Mono"
              fontSize="9"
            >
              Plex Server
            </text>
          </g>

          {/* Latency Badges matching mockup */}
          <text fill="#89ceff" fontFamily="JetBrains Mono" fontSize="8" x="210" y="65">
            0.4ms
          </text>
          <text fill="#89ceff" fontFamily="JetBrains Mono" fontSize="8" x="365" y="65">
            0.8ms
          </text>
          <text
            fill={isSimulatingJitter ? '#ffb95f' : '#ffb95f'}
            fontFamily="JetBrains Mono"
            fontSize="8"
            x="105"
            y="145"
            fontWeight={isSimulatingJitter ? 'bold' : 'normal'}
          >
            {isSimulatingJitter ? '38.4ms (jitter)' : '4.2ms'}
          </text>
          <text fill="#89ceff" fontFamily="JetBrains Mono" fontSize="8" x="195" y="145">
            0.2ms
          </text>
          <text fill="#89ceff" fontFamily="JetBrains Mono" fontSize="8" x="390" y="145">
            0.6ms
          </text>
          <text fill="#89ceff" fontFamily="JetBrains Mono" fontSize="8" x="480" y="145">
            0.5ms
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#87929c] font-mono px-2 pt-2 border-t border-[#272a31]/40">
        <span>Click any node to inspect raw socket metrics</span>
        <span className="hidden sm:inline">Packet Loss: 0.00%</span>
      </div>
    </div>
  );
};
