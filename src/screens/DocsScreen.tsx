import React, { useState } from 'react';
import { DOCS_ARTICLES } from '../data/mockData';
import { DocArticle } from '../types';

interface DocsScreenProps {
  onShowToast: (msg: string) => void;
}

export const DocsScreen: React.FC<DocsScreenProps> = ({ onShowToast }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(DOCS_ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [webhookTarget, setWebhookTarget] = useState<'gotify' | 'ntfy' | 'telegram' | 'homeassistant'>('gotify');

  const selectedArticle =
    DOCS_ARTICLES.find((a) => a.id === selectedArticleId) || DOCS_ARTICLES[0];

  const filteredArticles = DOCS_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    onShowToast('Copied code snippet to clipboard!');
  };

  const handleTestWebhook = () => {
    const payloads = {
      gotify: 'Gotify: [ALERT] UniFi Gateway SFP+ high CRC retransmits (38ms latency)',
      ntfy: 'ntfy.sh: 🚨 Homelab Alert: WAN Fiber ping jitter exceeded 25ms threshold',
      telegram: 'Telegram Bot: ⚠️ Kestrel alert dispatched to @homelab_ops',
      homeassistant: 'Home Assistant: Webhook webhook_kestrel_alert executed automation',
    };
    onShowToast(`Simulated dispatch -> ${payloads[webhookTarget]}`);
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 space-y-8 max-w-7xl mx-auto pt-4 pb-12">
      {/* Docs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#272a31] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#e1e2eb] font-bold">
              Documentation Hub
            </h1>
            <span className="font-code-sm text-xs px-2 py-0.5 rounded-full bg-[#191c22] border border-[#272a31] text-[#89ceff] font-mono">
              v1.4 Spec
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-[#bdc8d2] mt-1">
            Setup guides, kernel eBPF socket configuration, webhooks, and local DuckDB time-series schemas.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#87929c] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full h-10 pl-9 pr-3 bg-[#191c22] border border-[#272a31] rounded-lg text-xs font-mono text-[#e1e2eb] placeholder:text-[#87929c] focus:outline-none focus:border-[#89ceff]"
          />
        </div>
      </div>

      {/* Docs Body Layout: Sidebar + Article */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-4 bg-[#1d2026] border border-[#272a31] rounded-xl p-3 space-y-1.5">
          <span className="font-label-caps text-[10px] text-[#87929c] px-2 py-1 block font-mono">
            GUIDES &amp; SPECIFICATIONS
          </span>
          {filteredArticles.map((article) => {
            const isSelected = selectedArticle.id === article.id;
            return (
              <button
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-[#151a23] border border-[#89ceff]/40 text-[#89ceff]'
                    : 'hover:bg-[#191c22] text-[#bdc8d2] hover:text-[#e1e2eb]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#87929c]">
                    {article.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#87929c]">
                    {article.readTime}
                  </span>
                </div>
                <span className="font-headline-sm text-xs sm:text-sm font-semibold text-[#e1e2eb]">
                  {article.title}
                </span>
              </button>
            );
          })}

          {/* Interactive Webhook Simulator Widget */}
          <div className="mt-4 pt-4 border-t border-[#272a31]/60 p-2 space-y-2">
            <span className="font-label-caps text-[10px] text-[#ffb95f] font-mono block">
              ⚡ LIVE WEBHOOK TESTER
            </span>
            <p className="text-[11px] text-[#87929c]">
              Test instant push dispatch to verify receiver latency:
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {(['gotify', 'ntfy', 'telegram', 'homeassistant'] as const).map((channel) => (
                <button
                  key={channel}
                  onClick={() => setWebhookTarget(channel)}
                  className={`text-[10px] font-mono px-2 py-1 rounded transition-colors cursor-pointer ${
                    webhookTarget === channel
                      ? 'bg-[#00b4ff] text-[#0b0e14] font-bold'
                      : 'bg-[#191c22] text-[#bdc8d2] border border-[#272a31]'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
            <button
              onClick={handleTestWebhook}
              className="w-full mt-2 py-2 rounded-lg bg-[#272a31] hover:bg-[#32353c] text-[#89ceff] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Dispatch Test Alert
            </button>
          </div>
        </div>

        {/* Article Viewer */}
        <div className="lg:col-span-8 bg-[#151a23] border border-[#272a31] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2 border-b border-[#272a31] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#89ceff]">
              <span>{selectedArticle.category}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
            </div>
            <h2 className="font-headline-sm text-2xl sm:text-3xl text-[#e1e2eb] font-bold">
              {selectedArticle.title}
            </h2>
            <p className="font-body-md text-sm text-[#bdc8d2]">
              {selectedArticle.summary}
            </p>
          </div>

          {/* Article Text Content */}
          <div className="prose prose-invert max-w-none text-sm text-[#bdc8d2] leading-relaxed space-y-4">
            <p>{selectedArticle.content}</p>
          </div>

          {/* Code Snippet */}
          {selectedArticle.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#87929c]">
                <span className="uppercase">Configuration ({selectedArticle.codeLanguage})</span>
                <button
                  onClick={() => copyCode(selectedArticle.codeSnippet)}
                  className="flex items-center gap-1 text-[#89ceff] hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  Copy Code
                </button>
              </div>
              <div className="bg-[#0b0e14] p-4 rounded-xl border border-[#272a31] relative overflow-x-auto">
                <pre className="font-code-sm text-xs text-[#e1e2eb] font-mono leading-relaxed">
                  {selectedArticle.codeSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* Related homelab links */}
          <div className="p-4 bg-[#111620] rounded-xl border border-[#232a36] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#87929c]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#89ceff] text-[18px]">verified_user</span>
              <span>Host Kernel Requirement: Linux 5.8+ (x86_64, arm64)</span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#89ceff] hover:underline flex items-center gap-1"
            >
              View on GitHub
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
