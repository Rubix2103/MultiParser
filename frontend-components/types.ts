export interface UserData {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  lastLogin?: string;
}

export interface MetricSummary {
  activeSessions: number;
  latencyMs: number;
  requestCount: number;
  errorRatePercent?: number;
}

export interface SystemHealthReport {
  status: 'healthy' | 'degraded' | 'critical';
  engineWorkers: number;
  completedTasks: number;
  timestamp: string;
}

export interface PipelineStreamEvent {
  id: string;
  source: string;
  payload: Record<string, any>;
  timestamp: string;
  processed: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  badge?: number;
}
