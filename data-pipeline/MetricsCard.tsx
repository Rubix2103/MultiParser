import React from 'react';
import { theme, getStatusColor } from '../frontend-components/theme.js';
import { MetricSummary } from '../frontend-components/types';
import { formatTimestamp } from '../shared-services/helpers.js';

interface MetricsCardProps {
  label: string;
  metric: Partial<MetricSummary>;
  count?: number;
  deltaPercent?: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  metric,
  count = 0,
  deltaPercent = 0,
}) => {
  const isPositive = deltaPercent >= 0;
  const statusColor = isPositive ? getStatusColor('healthy') : getStatusColor('error');

  return (
    <div
      className="metrics-card"
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: theme.spacing.md,
        fontFamily: theme.typography.fontFamily,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <h4 style={{ margin: '0 0 8px 0', color: theme.colors.textSecondary, fontSize: '13px' }}>
        {label}
      </h4>
      <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0', color: theme.colors.textPrimary }}>
        {(metric.requestCount || count).toLocaleString()}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: statusColor, fontSize: '12px', fontWeight: 600 }}>
          {isPositive ? '▲ +' : '▼ '}
          {deltaPercent}% vs last cycle
        </span>
        <span style={{ fontSize: '10px', color: theme.colors.textSecondary }}>
          {formatTimestamp(Date.now(), false)}
        </span>
      </div>
    </div>
  );
};
