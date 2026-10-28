import { useState, useEffect } from 'react';
import { theme } from './theme.js';
import { debounce } from '../shared-services/helpers.js';

/**
 * Custom React hook for tracking viewport dimension changes.
 * @returns {{ width: number, isMobile: boolean }}
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    isMobile: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = debounce(() => {
      const mobileBreakpoint = parseInt(theme.breakpoints.md, 10) || 768;
      setDimensions({
        width: window.innerWidth,
        isMobile: window.innerWidth < mobileBreakpoint,
      });
    }, 150);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}

/**
 * Hook to toggle dark / light UI theme mode.
 * @param {string} initialMode
 * @returns {[string, Function]}
 */
export function useThemeToggle(initialMode = 'light') {
  const [mode, setMode] = useState(initialMode);
  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));
  return [mode, toggle];
}

