import { TelemetryNode, PricingPlan, DocArticle } from '../types';

export const INITIAL_NODES: TelemetryNode[] = [
  {
    id: 'proxmox-pve-01',
    name: 'Proxmox VE',
    category: 'compute',
    ip: '192.168.1.10',
    mac: 'd8:5e:d3:40:9a:11',
    ping: 0.4,
    pingHistory: [0.42, 0.40, 0.45, 0.39, 0.41, 0.40, 0.38, 0.42, 0.40],
    status: 'ok',
    details: '24 Containers · 4 VMs',
    uptime: '142 days, 8 hrs',
    packetLoss: 0.0,
    jitter: 0.02,
    icon: 'memory',
    lastPolled: '1s ago'
  },
  {
    id: 'truenas-scale',
    name: 'TrueNAS Core',
    category: 'storage',
    ip: '192.168.1.15',
    mac: 'a4:bb:6d:19:7c:42',
    ping: 0.8,
    pingHistory: [0.81, 0.79, 0.82, 0.80, 0.84, 0.78, 0.81, 0.80, 0.79],
    status: 'ok',
    details: 'ZFS Pool 84% · 64TB Raw',
    uptime: '98 days, 14 hrs',
    packetLoss: 0.0,
    jitter: 0.04,
    icon: 'storage',
    lastPolled: '1s ago'
  },
  {
    id: 'pihole-primary',
    name: 'Pi-hole Primary',
    category: 'dns',
    ip: '192.168.1.2',
    mac: 'b8:27:eb:81:4e:30',
    ping: 0.2,
    pingHistory: [0.21, 0.20, 0.22, 0.19, 0.23, 0.20, 0.21, 0.20, 0.20],
    status: 'ok',
    details: '42,190 blocked · 38% rate',
    uptime: '210 days, 2 hrs',
    packetLoss: 0.0,
    jitter: 0.01,
    icon: 'shield',
    lastPolled: '1s ago'
  },
  {
    id: 'wan-uplink',
    name: 'WAN Uplink (Fiber)',
    category: 'network',
    ip: '192.168.1.1',
    mac: '00:1e:67:d4:ee:98',
    ping: 4.2,
    pingHistory: [4.15, 4.22, 4.30, 4.18, 4.25, 4.20, 4.19, 4.22, 4.21],
    status: 'ok',
    details: '1.2 Gbps Symmetric GPON',
    uptime: '365 days, 0 hrs',
    packetLoss: 0.0,
    jitter: 0.12,
    icon: 'router',
    lastPolled: '1s ago'
  },
  {
    id: 'unifi-gateway',
    name: 'UniFi Gateway UDM-SE',
    category: 'network',
    ip: '192.168.1.254',
    mac: '74:83:c2:1a:bb:01',
    ping: 0.3,
    pingHistory: [0.32, 0.30, 0.35, 0.29, 0.31, 0.30, 0.34, 0.31, 0.30],
    status: 'ok',
    details: '10G SFP+ DAC Trunk · VLAN 10/20/30',
    uptime: '84 days, 11 hrs',
    packetLoss: 0.0,
    jitter: 0.02,
    icon: 'hub',
    lastPolled: '1s ago'
  },
  {
    id: 'home-assistant',
    name: 'Home Assistant OS',
    category: 'iot',
    ip: '192.168.1.50',
    mac: 'dc:a6:32:9b:0c:77',
    ping: 0.6,
    pingHistory: [0.62, 0.58, 0.61, 0.59, 0.63, 0.60, 0.57, 0.61, 0.60],
    status: 'ok',
    details: 'Zigbee2MQTT · 182 Entities',
    uptime: '45 days, 19 hrs',
    packetLoss: 0.0,
    jitter: 0.03,
    icon: 'cottage',
    lastPolled: '1s ago'
  },
  {
    id: 'plex-server',
    name: 'Plex Server (Quicksync)',
    category: 'media',
    ip: '192.168.1.75',
    mac: '2c:f0:5d:8e:12:f3',
    ping: 0.5,
    pingHistory: [0.51, 0.49, 0.52, 0.48, 0.53, 0.50, 0.51, 0.49, 0.50],
    status: 'ok',
    details: 'NVENC 4K HDR Transcode · 3 Streams',
    uptime: '33 days, 4 hrs',
    packetLoss: 0.0,
    jitter: 0.02,
    icon: 'play_circle',
    lastPolled: '1s ago'
  },
  {
    id: 'pihole-secondary',
    name: 'Pi-hole Secondary (DNS 2)',
    category: 'dns',
    ip: '192.168.1.3',
    mac: 'b8:27:eb:11:4a:92',
    ping: 0.3,
    pingHistory: [0.31, 0.29, 0.32, 0.30, 0.33, 0.30, 0.31, 0.29, 0.30],
    status: 'ok',
    details: 'Gravity Sync Cluster Active',
    uptime: '190 days, 6 hrs',
    packetLoss: 0.0,
    jitter: 0.02,
    icon: 'security',
    lastPolled: '1s ago'
  },
  {
    id: 'switch-core-poe',
    name: 'UniFi Switch 24 Enterprise',
    category: 'network',
    ip: '192.168.1.250',
    mac: '74:83:c2:91:ff:14',
    ping: 0.4,
    pingHistory: [0.39, 0.41, 0.40, 0.42, 0.38, 0.40, 0.41, 0.39, 0.40],
    status: 'ok',
    details: '2.5GbE PoE+ · 180W Load',
    uptime: '112 days, 1 hr',
    packetLoss: 0.0,
    jitter: 0.01,
    icon: 'lan',
    lastPolled: '1s ago'
  },
  {
    id: 'synology-backup',
    name: 'Synology DS920+ Offsite',
    category: 'storage',
    ip: '192.168.1.18',
    mac: '00:11:32:ca:44:81',
    ping: 1.1,
    pingHistory: [1.12, 1.08, 1.14, 1.10, 1.15, 1.09, 1.11, 1.08, 1.10],
    status: 'ok',
    details: 'HyperBackup Daily · 4x 14TB IronWolf',
    uptime: '310 days, 16 hrs',
    packetLoss: 0.0,
    jitter: 0.05,
    icon: 'inventory_2',
    lastPolled: '1s ago'
  },
  {
    id: 'k8s-node-01',
    name: 'k3s Worker Node Alpha',
    category: 'compute',
    ip: '192.168.1.41',
    mac: 'e4:5f:01:8b:23:44',
    ping: 0.5,
    pingHistory: [0.52, 0.48, 0.51, 0.49, 0.53, 0.50, 0.52, 0.48, 0.50],
    status: 'ok',
    details: 'Longhorn Storage Replicas · Pods: 18',
    uptime: '62 days, 21 hrs',
    packetLoss: 0.0,
    jitter: 0.02,
    icon: 'dns',
    lastPolled: '1s ago'
  },
  {
    id: 'wireguard-gateway',
    name: 'WireGuard Bastion Tunnel',
    category: 'network',
    ip: '10.14.0.1',
    mac: '52:54:00:12:34:56',
    ping: 0.7,
    pingHistory: [0.72, 0.69, 0.74, 0.71, 0.70, 0.68, 0.73, 0.70, 0.71],
    status: 'ok',
    details: 'Kernel wg0 · 6 Active Peers',
    uptime: '89 days, 15 hrs',
    packetLoss: 0.0,
    jitter: 0.03,
    icon: 'vpn_key',
    lastPolled: '1s ago'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'community',
    name: 'Homelab Community',
    subtitle: '100% Free & Open Source',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to monitor home racks, LXC containers, and gigabit fiber connections with zero telemetry sent to external servers.',
    features: [
      'Unlimited local nodes & VLAN targets',
      'eBPF raw kernel ICMP/TCP probes',
      'Local DuckDB / SQLite time-series storage',
      'Instant push alerts to Gotify, ntfy & Telegram',
      'Single static binary or Docker Compose',
      'Runs natively on Raspberry Pi (ARM64) & x86_64',
      'GPLv3 license — your data never leaves your LAN'
    ],
    ctaText: 'Download free v1.4',
    ctaType: 'primary'
  },
  {
    id: 'patron',
    name: 'Homelab Patron',
    subtitle: 'For the r/homelab rack builder',
    price: '$5',
    period: 'per month',
    badge: 'COMMUNITY SPONSOR',
    isPopular: true,
    description: 'Directly funds continuous Linux kernel eBPF patch testing, hardware compatibility testing, and grants exclusive community perks.',
    features: [
      'Everything in Homelab Community',
      'Direct contribution to upstream eBPF kernel work',
      'Exclusive Discord Patron channel with lead devs',
      'Custom Obsidian & Cyber-monochrome dashboard themes',
      'Early access to release candidate binaries',
      'Sponsor badge on public GitHub profile',
      'Prioritized issue triage on GitHub repository'
    ],
    ctaText: 'Become a patron',
    ctaType: 'secondary'
  },
  {
    id: 'cluster-pro',
    name: 'Multi-Site Mesh Pro',
    subtitle: 'Offsite & Multi-Homelab sync',
    price: '$19',
    period: 'per month',
    badge: 'ADVANCED OPS',
    description: 'For power users managing parental homelabs, offsite colocation backups, or remote office network clusters via encrypted WireGuard tunnels.',
    features: [
      'Cross-homelab telemetry mesh bridge',
      'Encrypted WireGuard peer-to-peer latency maps',
      'Grafana Cloud & Prometheus remote-write endpoints',
      'Multi-tenant role-based access for family racks',
      'Automated DuckDB S3/MinIO offsite backup recipes',
      'OpsGenie & PagerDuty webhook failovers',
      'Priority bug triage and 1-on-1 configuration support'
    ],
    ctaText: 'Deploy Multi-Site Mesh',
    ctaType: 'secondary'
  }
];

export const DOCS_ARTICLES: DocArticle[] = [
  {
    id: 'docker-compose-quickstart',
    category: 'Getting Started',
    title: '30-Second Docker Compose Quickstart',
    readTime: '2 min read',
    summary: 'Deploy the official Kestrel container with host networking for unrestricted eBPF socket monitoring.',
    codeLanguage: 'yaml',
    codeSnippet: `version: "3.8"

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
      - ./data:/var/lib/kestrel
      - /sys/fs/bpf:/sys/fs/bpf:ro
    environment:
      - KESTREL_PORT=9090
      - KESTREL_STORAGE=duckdb
      - KESTREL_PROBE_INTERVAL_MS=500
      - TZ=America/Los_Angeles`,
    content: `Kestrel runs as a single lightweight container. Because it uses eBPF probes for sub-second ping cycles without spiking CPU usage, it requires CAP_BPF and CAP_NET_RAW capabilities or host network mode. Once started, open http://localhost:9090 to view your live topology.`
  },
  {
    id: 'ebpf-kernel-probes',
    category: 'Architecture',
    title: 'Understanding Kernel-Level eBPF Probing',
    readTime: '4 min read',
    summary: 'Why traditional ping forks 2,000 sub-processes while Kestrel probes 1,000 targets in the Linux socket ring buffer.',
    codeLanguage: 'bash',
    codeSnippet: `# Verify that your host kernel supports eBPF ring buffers
uname -r # Requires Linux 5.8+
zcat /proc/config.gz | grep CONFIG_BPF_SYSCALL

# Run Kestrel standalone binary with capabilities
sudo setcap cap_net_raw,cap_bpf+ep ./kestrel
./kestrel --probe-rate=500ms --db=duckdb`,
    content: `Traditional network uptime utilities execute the ping command or spawn a separate thread per socket. When polling dozens of devices every 500ms, context switching creates CPU spikes on low-power devices like Raspberry Pis or Intel N100 servers. Kestrel attaches an eBPF program directly to the network stack socket filter (XDP / TC), measuring hardware-accurate round-trip timestamps with negligible CPU footprint.`
  },
  {
    id: 'push-notifications-webhooks',
    category: 'Alerting',
    title: 'Configuring Instant Push Webhooks (Gotify / ntfy)',
    readTime: '3 min read',
    summary: 'Dispatch instant alerts to your smartphone before packet dropouts escalate into family Wi-Fi complaints.',
    codeLanguage: 'json',
    codeSnippet: `{
  "alert_channels": [
    {
      "name": "Local Gotify Server",
      "type": "gotify",
      "url": "http://192.168.1.50:8080/message",
      "token": "A1B2C3D4E5_GOTIFY_TOKEN",
      "priority": 8
    },
    {
      "name": "ntfy.sh Mobile Push",
      "type": "ntfy",
      "topic": "my-homelab-urgent-alerts",
      "tags": ["warning", "rotating_light"]
    }
  ]
}`,
    content: `Kestrel integrates natively with self-hosted alert services. When any monitored service fails 3 consecutive ping checks or latency exceeds the user-defined jitter threshold, Kestrel generates a webhook payload and sends it asynchronously.`
  },
  {
    id: 'duckdb-local-queries',
    category: 'Storage & SQL',
    title: 'Zero-Cloud Sovereignty with DuckDB',
    readTime: '3 min read',
    summary: 'How time-series telemetry is recorded in local columnar Parquet files without external telemetry or data leaks.',
    codeLanguage: 'sql',
    codeSnippet: `-- Query 24-hour P99 latency distribution directly from DuckDB CLI
duckdb /var/lib/kestrel/telemetry.duckdb

SELECT 
    target_ip,
    name,
    COUNT(*) as total_pings,
    ROUND(AVG(latency_ms), 2) as avg_latency,
    ROUND(QUANTILE_CONT(latency_ms, 0.99), 2) as p99_latency,
    ROUND(SUM(CASE WHEN packet_loss THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 3) as loss_pct
FROM ping_telemetry 
WHERE timestamp >= NOW() - INTERVAL '24 HOURS'
GROUP BY target_ip, name
ORDER BY avg_latency DESC;`,
    content: `Unlike SaaS monitors that transmit your private LAN topology, internal IPs, and device hostnames to remote clouds, Kestrel records all metrics locally in an embedded DuckDB columnar database. Your homelab topology never leaves your physical rack.`
  }
];

export const HOMELAB_FAQS = [
  {
    q: 'Can Kestrel run on a Raspberry Pi or low-power mini PC?',
    a: 'Yes. Kestrel is compiled to native ARM64 and x86_64 static binaries with no runtime dependencies. Thanks to eBPF kernel offloading, it consumes under 35MB of RAM and <0.5% CPU on a Raspberry Pi 4 while monitoring 50+ network targets at 500ms intervals.'
  },
  {
    q: 'Does Kestrel transmit any telemetry or analytics back to developers?',
    a: 'Absolutely zero. Kestrel has no analytics beacons, no license check pings, no Google Analytics, and no telemetry reporting. All data stays inside your local SQLite or DuckDB file on your host machine.'
  },
  {
    q: 'How does Kestrel compare to Uptime Kuma or Smokeping?',
    a: 'Uptime Kuma is a fantastic HTTP status page, but it is not optimized for sub-second LAN latency or kernel-level network tracing. Smokeping is reliable but relies on legacy Perl/RRDtool architectures. Kestrel merges sub-second eBPF latency tracing, vector mesh topology maps, and modern push notifications into a single modern binary.'
  },
  {
    q: 'What push notification channels are supported?',
    a: 'Kestrel supports Gotify, ntfy.sh, Pushover, Telegram Bot API, Discord Webhooks, Slack, Home Assistant Webhook triggers, and arbitrary custom JSON POST payloads.'
  }
];
