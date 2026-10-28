export const theme = {
  colors: {
    primary: '#1E88E5',
    secondary: '#26A69A',
    background: '#F5F7FB',
    surface: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    warning: '#FFA000',
    error: '#E53935',
    success: '#43A047',
    border: '#E0E0E0',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontSizeBase: '14px',
    fontSizeHeading: '20px',
    fontSizeTitle: '28px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export function getStatusColor(status) {
  if (!status) return theme.colors.textSecondary;
  switch (status.toLowerCase()) {
    case 'active':
    case 'healthy':
    case 'success':
      return theme.colors.success;
    case 'degraded':
    case 'warning':
    case 'pending':
      return theme.colors.warning;
    case 'error':
    case 'critical':
    case 'failed':
      return theme.colors.error;
    default:
      return theme.colors.textSecondary;
  }
}

export function createComponentStyle(extra = {}) {
  return {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    borderRadius: '8px',
    border: `1px solid ${theme.colors.border}`,
    padding: theme.spacing.md,
    ...extra,
  };
}
