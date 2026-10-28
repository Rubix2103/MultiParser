import React from 'react';
import { theme } from '../frontend-components/theme.js';
import { formatCurrency, truncate } from '../shared-services/helpers.js';

export default function ChartWidget({ title, dataPoints = [], isCurrency = false }) {
  const maxVal = Math.max(...dataPoints, 100);

  return (
    <div
      className="chart-widget"
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: theme.spacing.md,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: theme.typography.fontSizeHeading, color: theme.colors.textPrimary }}>
        {truncate(title, 30)}
      </h3>
      <div
        className="bars-container"
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
          height: '140px',
          borderBottom: `2px solid ${theme.colors.border}`,
          paddingBottom: '4px',
        }}
      >
        {dataPoints.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              height: `${Math.max(4, (value / maxVal) * 100)}%`,
              width: '24px',
              backgroundColor: idx % 2 === 0 ? theme.colors.primary : theme.colors.secondary,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.3s ease',
            }}
            title={`Val: ${isCurrency ? formatCurrency(value) : value}`}
          />
        ))}
      </div>
      <div style={{ marginTop: '8px', fontSize: '11px', color: theme.colors.textSecondary }}>
        Count: {dataPoints.length} | Max: {isCurrency ? formatCurrency(maxVal) : maxVal}
      </div>
    </div>
  );
}
