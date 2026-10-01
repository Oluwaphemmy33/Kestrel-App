/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, TelemetryNode } from './types';
import { INITIAL_NODES } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { DownloadModal } from './components/DownloadModal';
import { NodeDetailModal } from './components/NodeDetailModal';
import { AddNodeModal } from './components/AddNodeModal';
import { LiveOverviewScreen } from './screens/LiveOverviewScreen';
import { PricingScreen } from './screens/PricingScreen';
import { DocsScreen } from './screens/DocsScreen';
import { NodesScreen } from './screens/NodesScreen';
import { AboutScreen } from './screens/AboutScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('overview');
  const [nodes, setNodes] = useState<TelemetryNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleToggleNodeStatus = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          const nextStatus = n.status === 'ok' ? 'warning' : 'ok';
          const nextPing = nextStatus === 'warning' ? Number((n.ping * 15).toFixed(1)) : Number((n.ping / 15).toFixed(2));
          handleShowToast(
            nextStatus === 'warning'
              ? `Simulated Jitter / Packet Loss on ${n.name}`
              : `Restored ${n.name} to nominal status`
          );
          return {
            ...n,
            status: nextStatus,
            ping: nextPing,
            packetLoss: nextStatus === 'warning' ? 4.2 : 0.0,
            jitter: nextStatus === 'warning' ? 12.8 : 0.02,
          };
        }
        return n;
      })
    );
  };

  const handleAddNode = (newNode: TelemetryNode) => {
    setNodes((prev) => [newNode, ...prev]);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="bg-[#10131a] text-[#e1e2eb] flex flex-col min-h-screen selection:bg-[#00b4ff] selection:text-[#0b0e14]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-16 bg-[#10131a] min-h-[calc(100vh-140px)] pb-16 md:pb-6">
        {currentScreen === 'overview' && (
          <LiveOverviewScreen
            nodes={nodes}
            onNavigate={handleNavigate}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
            onOpenDownload={() => setIsDownloadOpen(true)}
            onShowToast={handleShowToast}
          />
        )}

        {currentScreen === 'pricing-tiers' && (
          <PricingScreen
            onOpenDownload={() => setIsDownloadOpen(true)}
            onShowToast={handleShowToast}
          />
        )}

        {currentScreen === 'documentation-hub' && (
          <DocsScreen onShowToast={handleShowToast} />
        )}

        {currentScreen === 'node-telemetry' && (
          <NodesScreen
            nodes={nodes}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
            onOpenAddNode={() => setIsAddNodeOpen(true)}
            onShowToast={handleShowToast}
            onToggleNodeStatus={handleToggleNodeStatus}
          />
        )}

        {currentScreen === 'about-kestrel' && (
          <AboutScreen
            onOpenDownload={() => setIsDownloadOpen(true)}
            onShowToast={handleShowToast}
          />
        )}

        {/* Global Footer */}
        <Footer
          onNavigate={handleNavigate}
          onShowToast={handleShowToast}
        />
      </main>

      {/* Mobile Bottom Tab Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />

      {/* Modals & Overlays */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onShowToast={handleShowToast}
      />

      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNodeId(null)}
        onShowToast={handleShowToast}
        onToggleStatus={handleToggleNodeStatus}
      />

      <AddNodeModal
        isOpen={isAddNodeOpen}
        onClose={() => setIsAddNodeOpen(false)}
        onAddNode={handleAddNode}
        onShowToast={handleShowToast}
      />

      {/* Feedback Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
