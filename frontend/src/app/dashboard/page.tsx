'use client'

import React from 'react';

import QueueManager from '../../components/QueueManager';
import RecommendationsPanel from '../../components/RecommendationsPanel';

import AgentsPanel from '../../components/AgentsPanel';
import EnginesPanel from '../../components/EnginesPanel';
import VectorsPanel from '../../components/VectorsPanel';
import JobsPanel from '../../components/JobsPanel';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {/* LEFT SIDE */}
      <div className="col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">NeuroEdge Master Dashboard</h1>

        <AgentsPanel />
        <EnginesPanel />
        <VectorsPanel />
        <JobsPanel />
      </div>

      {/* RIGHT SIDE */}
      <aside className="space-y-6">
        <RecommendationsPanel />
        <QueueManager />
      </aside>
    </div>
  );
}