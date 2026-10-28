import React, { useState, useEffect } from 'react';
import { UserData, MetricSummary } from './types';
import { theme } from './theme.js';
import NavigationHeader from './NavigationHeader.jsx';
import { SystemStatusWidget } from './SystemStatusWidget';
import ChartWidget from '../data-pipeline/ChartWidget.jsx';
import { PipelineTelemetry } from '../data-pipeline/PipelineTelemetry';
import { ApiClient } from '../backend-api/client';
import { formatTimestamp, truncate } from '../shared-services/helpers.js';

interface DashboardProps {
  user: UserData;
  refreshIntervalMs?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, refreshIntervalMs = 5000 }) => {
  const [metrics, setMetrics] = useState<MetricSummary>({
    activeSessions: 18,
    latencyMs: 42.1,
    requestCount: 3200,
  });

  const [apiClient] = useState<ApiClient>(() => {
    const client = new ApiClient();
    client.setCredentials(user);
    return client;
  });

  const [trendData, setTrendData] = useState<number[]>([45, 62, 58, 80, 95, 110, 88]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        requestCount: prev.requestCount + Math.floor(Math.random() * 15),
        latencyMs: +(40 + Math.random() * 12).toFixed(1),
      }));

      setTrendData((prev) => {
        const nextPoint = Math.floor(Math.random() * 80) + 40;
        return [...prev.slice(1), nextPoint];
      });
    }, refreshIntervalMs);

    return () => clearInterval(timer);
  }, [refreshIntervalMs]);

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh', fontFamily: theme.typography.fontFamily }}>
      <NavigationHeader
        brandTitle="Enterprise Polyglot Ops"
        user={user}
        navLinks={[
          { id: '1', label: 'Overview', path: '#' },
          { id: '2', label: 'Data Pipeline', path: '#pipeline' },
          { id: '3', label: 'Native Core', path: '#core' },
        ]}
      />

      <main style={{ padding: theme.spacing.lg, maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: theme.spacing.lg }}>
          <h1 style={{ fontSize: theme.typography.fontSizeTitle, color: theme.colors.textPrimary, margin: 0 }}>
            Operations Command Center
          </h1>
          <p style={{ color: theme.colors.textSecondary, marginTop: '4px' }}>
            Logged in as {truncate(user.username, 24)} ({user.role}) | System time: {formatTimestamp(Date.now())}
          </p>
        </header>

        {/* Real-time telemetry grid */}
        <section style={{ marginBottom: theme.spacing.lg }}>
          <PipelineTelemetry apiClient={apiClient} />
        </section>

        {/* Middle section: Chart & System Status */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
          <ChartWidget title="Throughput Trends (req/sec)" dataPoints={trendData} />
          <SystemStatusWidget apiClient={apiClient} />
        </div>
      </main>
    </div>
  );
};
