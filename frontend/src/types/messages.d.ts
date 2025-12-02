// src/types/messages.d.ts
export type FileMeta = { name: string; size?: number; url?: string; mime?: string };
export type BaseMessage = { id: string; role: 'user'|'assistant'; createdAt: number };
export type Message = BaseMessage & { text: string; file?: undefined };
export type MessageWithFile = BaseMessage & { text?: string; file: FileMeta };
export type AnyMessage = Message | MessageWithFile;