'use client';

import React, { createContext, useContext } from 'react';
import TSClient from './typescript';
import PyClient from './python';
import GoClient from './go';
import BaseClient from './sdk/baseClient';
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

export function NeuroEdgeClientProvider({ children }: { children: React.ReactNode }) {
  const ts = new TSClient(process.env.TS_BACKEND_URL);
  const tsBase = new BaseClient({ baseURL: process.env.TS_BACKEND_URL });

  const py = new PyClient(process.env.PY_BACKEND_URL);
  const pyBase = new BaseClient({ baseURL: process.env.PY_BACKEND_URL });

  const go = new GoClient(process.env.GO_BACKEND_URL);
  const goBase = new BaseClient({ baseURL: process.env.GO_BACKEND_URL });

  const wsMux = new WSMultiplexer(
    (process.env.NEXT_PUBLIC_WS_URL || process.env.TS_BACKEND_URL || 'ws://localhost:4000').replace(/^http/, 'ws') + '/ws'
  );

  return (
    <NeuroCtx.Provider value={{ ts, py, go, tsBase, pyBase, goBase, wsMux }}>
      {children}
    </NeuroCtx.Provider>
  );
}

export function useNeuroEdge() {
  const ctx = useContext(NeuroCtx);
  if (!ctx) throw new Error('useNeuroEdge must be used within a NeuroEdgeClientProvider');
  return ctx;
}