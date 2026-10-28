import { UserData, MetricSummary } from '../frontend-components/types';
import { generateToken } from '../shared-services/crypto_utils';

export interface ApiResponse<T> {
  status: number;
  data: T;
  timestamp: number;
}

export class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }

  setCredentials(user: UserData): void {
    this.authToken = generateToken({
      userId: user.id,
      role: user.role,
      expiresAt: Date.now() + 3600 * 1000,
    });
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['X-Auth-Token'] = this.authToken;
    }

    const response = await fetch(url, { headers });
    const data = (await response.json()) as T;
    return {
      status: response.status,
      data,
      timestamp: Date.now(),
    };
  }

  async fetchTelemetryMetrics(): Promise<ApiResponse<MetricSummary>> {
    return this.get<MetricSummary>('api/metrics/summary');
  }
}
