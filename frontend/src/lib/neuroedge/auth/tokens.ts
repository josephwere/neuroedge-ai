// src/lib/neuroedge/auth/tokens.ts

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const saveToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};