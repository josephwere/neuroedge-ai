// src/lib/chatApi.ts
export async function sendMessage(
  conversationId: string, 
  text: string, 
  agent?: string
) {
  const res = await fetch("/api/chat/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, text, agent }), // include agent
  });

  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.statusText}`);
  }

  return res.json();
}

export async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/uploads", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload file: ${res.statusText}`);
  }

  return res.json();
}

export async function transcribeAudio(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/audio/transcribe", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error(`Failed to transcribe audio: ${res.statusText}`);
  }

  return res.json();
}