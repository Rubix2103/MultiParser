import { CoreSystemBridge } from './bridge';
import { formatTimestamp, truncate } from '../shared-services/helpers.js';

export interface QueuedTask {
  id: string;
  command: string;
  scheduledAt: string;
}

export class NativeTaskWrapper {
  private bridge: CoreSystemBridge;
  private taskQueue: QueuedTask[] = [];

  constructor(bridge: CoreSystemBridge = new CoreSystemBridge()) {
    this.bridge = bridge;
  }

  queueCommand(command: string): string {
    const taskId = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.taskQueue.push({
      id: taskId,
      command,
      scheduledAt: formatTimestamp(Date.now()),
    });
    return taskId;
  }

  flushQueue(): string[] {
    const outputs: string[] = [];
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift()!;
      const result = this.bridge.executeTask(task.command);
      outputs.push(`[${truncate(task.id, 12)}] -> ${result}`);
    }
    return outputs;
  }

  pendingTaskCount(): number {
    return this.taskQueue.length;
  }

  getSystemStatus() {
    return this.bridge.healthCheck();
  }
}

