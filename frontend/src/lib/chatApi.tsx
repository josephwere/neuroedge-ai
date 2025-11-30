import { apiClient } from '@/lib/neuroedge/sdk/baseClient';

// --- SEND MESSAGE ---
export async function sendMessage(conversationId: string, text: string) {
  const res = await apiClient.post('/chat/send', { conversationId, text });
  return res;
}

// --- UPLOAD FILE ---
export async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append('file', file);

  const res = await fetch('/api/uploads', {
    method: 'POST',
    body: fd,
  });

  return res.json();
}

// --- TRANSCRIBE AUDIO ---
export async function transcribeAudio(file: File) {
  const fd = new FormData();
  fd.append('file', file);

  const res = await fetch('/api/audio/transcribe', {
    method: 'POST',
    body: fd,
  });

  return res.json();
}