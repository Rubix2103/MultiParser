import React from 'react';
import { theme } from './theme.js';
import UserProfile from './UserProfile.jsx';
import { truncate } from '../shared-services/helpers.js';

export default function NavigationHeader({ brandTitle = 'Polyglot System', user, navLinks = [] }) {
  return (
    <header
      style={{
        backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <h1 style={{ fontSize: theme.typography.fontSizeHeading, color: theme.colors.primary, margin: 0 }}>
          {truncate(brandTitle, 25)}
        </h1>
        <nav style={{ display: 'flex', gap: theme.spacing.sm }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              style={{
                color: theme.colors.textPrimary,
                textDecoration: 'none',
                fontSize: theme.typography.fontSizeBase,
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {user && (
        <UserProfile
          name={user.username}
          email={user.email}
          role={user.role}
        />
      )}
    </header>
  );
}

