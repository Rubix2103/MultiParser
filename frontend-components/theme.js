export const theme = {
  colors: {
    primary: '#1E88E5',
    secondary: '#26A69A',
    background: '#F5F7FB',
    surface: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    error: '#E53935',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSizeBase: '14px',
    fontSizeHeading: '20px',
  },
};

export function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'active':
      return theme.colors.secondary;
    case 'error':
      return theme.colors.error;
    default:
      return theme.colors.textSecondary;
  }
}

