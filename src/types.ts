export type Screen = 'overview' | 'pricing-tiers' | 'documentation-hub' | 'node-telemetry' | 'about-kestrel';

export interface TelemetryNode {
  id: string;
  name: string;
  category: 'compute' | 'storage' | 'network' | 'dns' | 'iot' | 'media';
  ip: string;
  mac?: string;
  ping: number; // in milliseconds
  pingHistory: number[];
  status: 'ok' | 'warning' | 'error';
  details: string;
  uptime: string;
  packetLoss: number;
  jitter: number;
  icon: string;
  lastPolled: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  ctaText: string;
  ctaType: 'primary' | 'secondary';
}

export interface DocArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
}
