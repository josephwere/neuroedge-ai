'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { BaseClient } from './sdk/baseClient';
import TSClient from './typescript';
import PyClient from './python';
import GoClient from './go';
import WSMultiplexer from './sdk/wsMultiplexer';

interface NeuroEdgeContext {
  ts: TSClient;
  py: PyClient;
  go: GoClient;
  tsBase: BaseClient;
  pyBase: BaseClient;
  goBase: BaseClient;
  wsMux: WSMultiplexer;
}

const NeuroCtx = createContext<NeuroEdgeContext | null>(null);

export function NeuroEdgeClientProvider({ children }: { children: ReactNode }) {
  // Backend URLs from environment
  const tsUrl = process.env.TS_BACKEND_URL || '';
  const pyUrl = process.env.PY_BACKEND_URL || '';
  const goUrl = process.env.GO_BACKEND_URL || '';
  const wsUrl =
    (process.env.NEXT_PUBLIC_WS_URL || tsUrl || 'ws://localhost:4000').replace(/^http/, 'ws') +
    '/ws';

  // Clients
  const ts = new TSClient(tsUrl);
  const py = new PyClient(pyUrl);
  const go = new GoClient(goUrl);

  // Base clients
  const tsBase = new BaseClient(tsUrl);
  const pyBase = new BaseClient(pyUrl);
  const goBase = new BaseClient(goUrl);

  // WebSocket multiplexer
  const wsMux = new WSMultiplexer(wsUrl);

  return (
    <NeuroCtx.Provider value={{ ts, py, go, tsBase, pyBase, goBase, wsMux }}>
      {children}
    </NeuroCtx.Provider>
  );
}

export function useNeuroEdge(): NeuroEdgeContext {
  const ctx = useContext(NeuroCtx);
  if (!ctx) throw new Error('useNeuroEdge must be used within NeuroEdgeClientProvider');
  return ctx;
}