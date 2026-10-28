export interface UserData {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

export interface MetricSummary {
  activeSessions: number;
  latencyMs: number;
  requestCount: number;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  timestamp: number;
};

