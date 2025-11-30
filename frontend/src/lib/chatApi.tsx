// --- Chat API helper functions ---
// Handles sending messages, uploading files, and transcribing audio.

export interface UploadResponse {
  name: string;
  url: string;
  size?: number;
}

export interface TranscribeResponse {
  text: string;
}

/**
 * Send a chat message to a conversation
 */
export async function sendMessage(conversationId: string, text: string) {
  const res = await fetch("/api/chat/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, text }),
  });

  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Upload a file to the server
 */
export async function uploadFile(file: File): Promise<UploadResponse> {
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

/**
 * Transcribe an audio file
 */
export async function transcribeAudio(file: File): Promise<TranscribeResponse> {
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