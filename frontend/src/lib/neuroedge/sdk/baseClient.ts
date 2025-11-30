// src/lib/neuroedge/sdk/baseClient.ts
import axios, { AxiosInstance } from 'axios';
import { getToken, saveToken, getRefreshToken } from '../auth/tokens';

export interface BaseClientOptions {
  baseURL?: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  error?: string;
}

export class BaseClient {
  private client: AxiosInstance;

  constructor(options?: BaseClientOptions) {
    this.client = axios.create({
      baseURL: options?.baseURL || process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercept requests to add Authorization header
    this.client.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    // Intercept responses to handle 401 and refresh token
    this.client.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalReq = err.config;

        if (err.response?.status === 401 && !originalReq._retry) {
          originalReq._retry = true;

          const refreshToken = getRefreshToken();
          if (!refreshToken) return Promise.reject(err);

          try {
            const response = await axios.post(`${this.client.defaults.baseURL}/auth/refresh`, { token: refreshToken });
            const { token: newToken } = response.data;

            saveToken(newToken);
            originalReq.headers['Authorization'] = `Bearer ${newToken}`;

            return this.client(originalReq);
          } catch (refreshErr) {
            return Promise.reject(refreshErr);
          }
        }

        return Promise.reject(err);
      }
    );
  }

  async get<T = any>(url: string, params?: any): Promise<APIResponse<T>> {
    try {
      const res = await this.client.get(url, { params });
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false, data: null, error: err.message };
    }
  }

  async post<T = any>(url: string, data?: any): Promise<APIResponse<T>> {
    try {
      const res = await this.client.post(url, data);
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false, data: null, error: err.message };
    }
  }

  async put<T = any>(url: string, data?: any): Promise<APIResponse<T>> {
    try {
      const res = await this.client.put(url, data);
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false, data: null, error: err.message };
    }
  }

  async delete<T = any>(url: string): Promise<APIResponse<T>> {
    try {
      const res = await this.client.delete(url);
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false, data: null, error: err.message };
    }
  }
}

// Export a singleton client if needed
export const apiClient = new BaseClient();