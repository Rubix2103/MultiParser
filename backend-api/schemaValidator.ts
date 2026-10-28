import { ApiResponse } from './client';
import { UserData, MetricSummary } from '../frontend-components/types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateUserData(user: Partial<UserData>): ValidationResult {
  const errors: string[] = [];
  if (!user.id || typeof user.id !== 'string') errors.push('Missing or invalid id');
  if (!user.username || typeof user.username !== 'string') errors.push('Missing or invalid username');
  if (!user.email || !user.email.includes('@')) errors.push('Invalid email format');

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateMetricResponse(response: ApiResponse<MetricSummary>): boolean {
  if (response.status !== 200 || !response.data) return false;
  const { activeSessions, latencyMs, requestCount } = response.data;
  return (
    typeof activeSessions === 'number' &&
    typeof latencyMs === 'number' &&
    typeof requestCount === 'number'
  );
}

