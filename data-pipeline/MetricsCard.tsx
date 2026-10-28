import React from 'react';

interface MetricsCardProps {
  label: string;
  count: number;
  deltaPercent: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ label, count, deltaPercent }) => {
  const isPositive = deltaPercent >= 0;

  return (
    <div className="metrics-card">
      <h4>{label}</h4>
      <p className="count">{count.toLocaleString()}</p>
      <span className={isPositive ? 'trend-up' : 'trend-down'}>
        {isPositive ? '+' : ''}{deltaPercent}% vs last week
      </span>
    </div>
  );
};

