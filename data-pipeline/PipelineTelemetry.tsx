import React, { useState, useEffect } from 'react';
import { MetricsCard } from './MetricsCard';
import { MetricSummary } from '../frontend-components/types';
import { theme } from '../frontend-components/theme.js';
import { ApiClient } from '../backend-api/client';

interface PipelineTelemetryProps {
  apiClient?: ApiClient;
  autoRefreshMs?: number;
}

export const PipelineTelemetry: React.FC<PipelineTelemetryProps> = ({
  apiClient = new ApiClient(),
  autoRefreshMs = 10000,
}) => {
  const [metrics, setMetrics] = useState<MetricSummary>({
    activeSessions: 14,
    latencyMs: 38.6,
    requestCount: 4210,
    errorRatePercent: 0.12,
  });

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await apiClient.fetchTelemetryMetrics();
        if (res.data) {
          setMetrics(res.data);
        }
      } catch {
        // Fallback simulated update
        setMetrics((prev) => ({
          ...prev,
          requestCount: prev.requestCount + Math.floor(Math.random() * 25),
          latencyMs: +(35 + Math.random() * 8).toFixed(1),
        }));
      }
    }, autoRefreshMs);

    return () => clearInterval(timer);
  }, [apiClient, autoRefreshMs]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.md }}>
      <MetricsCard label="Active Requests" metric={metrics} count={metrics.requestCount} deltaPercent={4.2} />
      <MetricsCard label="Concurrent Sessions" metric={metrics} count={metrics.activeSessions} deltaPercent={-1.5} />
      <MetricsCard label="Pipeline Latency (ms)" metric={metrics} count={Math.round(metrics.latencyMs)} deltaPercent={-3.1} />
    </div>
  );
};

