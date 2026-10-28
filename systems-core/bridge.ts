import { ApiClient } from '../backend-api/client';
import { SystemHealthReport } from '../frontend-components/types';
import { computeHash } from '../shared-services/crypto_utils';

export interface NativeEngineBinding {
  executeTask(payload: string): string;
  getWorkerCount(): number;
  healthCheck(): SystemHealthReport;
}

export class CoreSystemBridge implements NativeEngineBinding {
  private workerCount: number;
  private taskCount: number = 0;
  private apiClient: ApiClient;

  constructor(workerCount: number = 4) {
    this.workerCount = workerCount;
    this.apiClient = new ApiClient();
  }

  executeTask(payload: string): string {
    this.taskCount++;
    const checksum = computeHash(payload);
    return `[Bridge-Rust-Call#${this.taskCount}] Hash(${checksum}) Processed: ${payload}`;
  }

  getWorkerCount(): number {
    return this.workerCount;
  }

  healthCheck(): SystemHealthReport {
    return {
      status: this.taskCount > 100 ? 'degraded' : 'healthy',
      engineWorkers: this.workerCount,
      completedTasks: this.taskCount,
      timestamp: new Date().toISOString(),
    };
  }

  getApiClient(): ApiClient {
    return this.apiClient;
  }
}
