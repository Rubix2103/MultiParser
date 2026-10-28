import React, { useState } from 'react';
import { theme, getStatusColor, createComponentStyle } from './theme.js';
import { formatTimestamp, truncate } from '../shared-services/helpers.js';
import { isValidEmail } from '../shared-services/validator.js';

export default function UserProfile({
  name = 'Anonymous',
  email = '',
  role = 'Viewer',
  initialStatus = 'Active',
  lastActive = Date.now(),
}) {
  const [status, setStatus] = useState(initialStatus);
  const emailValid = isValidEmail(email);

  const toggleStatus = () => {
    setStatus((prev) => (prev === 'Active' ? 'Away' : 'Active'));
  };

  const statusColor = getStatusColor(status);

  return (
    <div className="user-profile-card" style={createComponentStyle({ maxWidth: '320px' })}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: theme.typography.fontSizeHeading }}>{truncate(name, 20)}</h2>
        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: statusColor,
          }}
          title={`Status: ${status}`}
        />
      </div>

      <p style={{ color: theme.colors.textSecondary, margin: '8px 0 4px' }}>
        Role: <strong>{role}</strong>
      </p>

      {email && (
        <p style={{ fontSize: '12px', color: emailValid ? theme.colors.textSecondary : theme.colors.error }}>
          {email} {emailValid ? '' : '(Invalid)'}
        </p>
      )}

      <p style={{ fontSize: '11px', color: theme.colors.textSecondary }}>
        Active: {formatTimestamp(lastActive, false)}
      </p>

      <button
        onClick={toggleStatus}
        style={{
          marginTop: theme.spacing.sm,
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          backgroundColor: theme.colors.primary,
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Set to {status === 'Active' ? 'Away' : 'Active'}
      </button>
    </div>
  );
}
