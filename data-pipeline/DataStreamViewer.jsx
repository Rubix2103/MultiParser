import React, { useState } from 'react';
import ChartWidget from './ChartWidget.jsx';
import { theme } from '../frontend-components/theme.js';
import { truncate, formatTimestamp } from '../shared-services/helpers.js';

export default function DataStreamViewer({ streamName = 'Main Ingestion Feed', initialPoints = [10, 25, 45, 30, 80] }) {
  const [points, setPoints] = useState(initialPoints);
  const [log, setLog] = useState([`Feed started at ${formatTimestamp(Date.now())}`]);

  const addPoint = () => {
    const nextVal = Math.floor(Math.random() * 90) + 10;
    setPoints((prev) => [...prev.slice(Math.max(0, prev.length - 8)), nextVal]);
    setLog((prev) => [`Event: Emitted ${nextVal} at ${formatTimestamp(Date.now())}`, ...prev.slice(0, 4)]);
  };

  return (
    <div
      style={{
        padding: theme.spacing.md,
        borderRadius: '8px',
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.background,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        <h3 style={{ margin: 0, color: theme.colors.textPrimary }}>{truncate(streamName, 30)}</h3>
        <button
          onClick={addPoint}
          style={{
            backgroundColor: theme.colors.secondary,
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Push Point
        </button>
      </div>

      <ChartWidget title="Real-Time Data Velocity" dataPoints={points} />

      <div style={{ marginTop: theme.spacing.sm, fontSize: '12px', color: theme.colors.textSecondary }}>
        <strong>Stream Events:</strong>
        <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
          {log.map((entry, idx) => (
            <li key={idx}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

