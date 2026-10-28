export interface TokenPayload {
  userId: string;
  role: string;
  expiresAt: number;
}

export function generateToken(payload: TokenPayload, secretKey: string = 'mix-repo-secret'): string {
  const serialized = JSON.stringify(payload);
  const base64Data = typeof btoa !== 'undefined'
    ? btoa(serialized)
    : Buffer.from(serialized).toString('base64');
  const signature = computeHash(serialized + secretKey);
  return `${base64Data}.${signature}`;
}

export function parseToken(token: string): TokenPayload | null {
  try {
    const [encoded] = token.split('.');
    if (!encoded) return null;
    const jsonStr = typeof atob !== 'undefined'
      ? atob(encoded)
      : Buffer.from(encoded, 'base64').toString('utf8');
    return JSON.parse(jsonStr) as TokenPayload;
  } catch {
    return null;
  }
}

export function computeHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

