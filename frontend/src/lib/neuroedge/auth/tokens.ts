// src/lib/neuroedge/auth/tokens.ts
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};