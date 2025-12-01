'use client';

import React, { useEffect, useState } from 'react';
import client from '@/lib/client'; // your TSClient wrapper

export default function AgentsPanel() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.request("GET", "/api/agents");
        setAgents(res.agents || []);
      } catch (e) {
        console.error("Failed to fetch agents:", e);
      }
    })();
  }, []);

  return (
    <section className="border border-gray-200 p-4 mb-4 rounded bg-white shadow-sm text-black">
      <h2>Agents</h2>
      <pre>{JSON.stringify(agents, null, 2)}</pre>
    </section>
  );
}