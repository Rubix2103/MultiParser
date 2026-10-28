import React, { useState, useEffect } from 'react';
import { SystemHealthReport } from './types';
import { theme, getStatusColor } from './theme.js';
import { CoreSystemBridge } from '../systems-core/bridge';
import { ApiClient } from '../backend-api/client';
import { formatTimestamp } from '../shared-services/helpers.js';

interface SystemStatusWidgetProps {
  bridge?: CoreSystemBridge;
  apiClient?: ApiClient;
}

export const SystemStatusWidget: React.FC<SystemStatusWidgetProps> = ({
  bridge = new CoreSystemBridge(8),
  apiClient = new ApiClient(),
}) => {
  const [report, setReport] = useState<SystemHealthReport>(bridge.healthCheck());
  const [lastCheck, setLastCheck] = useState<string>(formatTimestamp(Date.now()));

  const handleManualCheck = () => {
    bridge.executeTask('manual_system_diagnostic');
    const updated = bridge.healthCheck();
    setReport(updated);
    setLastCheck(formatTimestamp(Date.now()));
  };

  const statusColor = getStatusColor(report.status);

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: theme.spacing.md,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: theme.typography.fontSizeHeading }}>Systems Core Status</h3>
        <span
          style={{
            backgroundColor: statusColor,
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {report.status}
        </span>
      </div>

      <div style={{ marginTop: theme.spacing.sm, fontSize: theme.typography.fontSizeBase }}>
        <div>Workers: <strong>{report.engineWorkers}</strong></div>
        <div>Completed Operations: <strong>{report.completedTasks}</strong></div>
        <div style={{ fontSize: '11px', color: theme.colors.textSecondary, marginTop: '4px' }}>
          Last Checked: {lastCheck}
        </div>
      </div>

      <button
        onClick={handleManualCheck}
        style={{
          marginTop: theme.spacing.sm,
          backgroundColor: theme.colors.primary,
          color: '#fff',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        Run Diagnostic
      </button>
    </div>
  );
};

