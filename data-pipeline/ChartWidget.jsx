import React from 'react';

export default function ChartWidget({ title, dataPoints = [] }) {
  const maxVal = Math.max(...dataPoints, 100);

  return (
    <div className="chart-widget">
      <h3>{title}</h3>
      <div className="bars-container" style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '120px' }}>
        {dataPoints.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              height: `${(value / maxVal) * 100}%`,
              width: '20px',
              backgroundColor: '#3f51b5',
            }}
            title={`Val: ${value}`}
          />
        ))}
      </div>
    </div>
  );
}

