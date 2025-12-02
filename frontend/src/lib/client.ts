// src/lib/client.ts
// Minimal client helper used by frontend components during SSR/client builds.
// Exposes a `client.get(path)` that returns parsed JSON (throws on non-OK).
// Keeps types small and compatible with previous usage in the project.

export async function get(path: string, opts?: RequestInit) {
  const res = await fetch(path, {
    // ensure absolute paths are allowed in server/client
    ...opts,
    headers: {
      // allow callers to pass headers via opts.headers too
      ...(opts && (opts as any).headers),
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    // try to surface useful message
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status} ${res.statusText} ${text}`);
  }

  // try parse JSON, fallback to text
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return res.json();
  }
  return { data: await res.text() };
}

const client = { get };

export type TSClient = typeof client;
export default client;