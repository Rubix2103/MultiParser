import React, { useState, useEffect } from 'react';
import { UserData, MetricSummary } from './types';

interface DashboardProps {
  user: UserData;
  refreshIntervalMs?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, refreshIntervalMs = 5000 }) => {
  const [metrics, setMetrics] = useState<MetricSummary>({
    activeSessions: 12,
    latencyMs: 45.2,
    requestCount: 1040,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        requestCount: prev.requestCount + Math.floor(Math.random() * 10),
        latencyMs: +(40 + Math.random() * 10).toFixed(1),
      }));
    }, refreshIntervalMs);

    return () => clearInterval(timer);
  }, [refreshIntervalMs]);

  return (
    <section className="dashboard-container">
      <header>
        <h1>Welcome back, {user.username}!</h1>
        <span>User ID: {user.id}</span>
      </header>
      <div className="metrics-grid">
        <div className="card">Active Sessions: {metrics.activeSessions}</div>
        <div className="card">Latency: {metrics.latencyMs} ms</div>
        <div className="card">Requests: {metrics.requestCount}</div>
      </div>
    </section>
  );
};

