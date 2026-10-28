import { UserData, MetricSummary } from './types';
import { computeHash } from '../shared-services/crypto_utils';

export interface AppState {
  currentUser: UserData | null;
  metrics: MetricSummary;
  stateChecksum: string;
}

type Listener = (state: AppState) => void;

class StateManager {
  private state: AppState = {
    currentUser: null,
    metrics: {
      activeSessions: 0,
      latencyMs: 0.0,
      requestCount: 0,
    },
    stateChecksum: '',
  };

  private listeners: Set<Listener> = new Set();

  getState(): AppState {
    return { ...this.state };
  }

  setUser(user: UserData): void {
    this.state.currentUser = user;
    this.updateChecksum();
    this.notify();
  }

  updateMetrics(metrics: Partial<MetricSummary>): void {
    this.state.metrics = {
      ...this.state.metrics,
      ...metrics,
    };
    this.updateChecksum();
    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private updateChecksum(): void {
    const raw = JSON.stringify({
      user: this.state.currentUser?.id,
      metrics: this.state.metrics,
    });
    this.state.stateChecksum = computeHash(raw);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.getState()));
  }
}

export const globalStateManager = new StateManager();

