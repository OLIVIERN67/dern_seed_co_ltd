function readEnv(key: string): string | undefined {
  return process.env[key];
}

export function getEnv(key: string, defaultValue?: string) {
  const v = readEnv(key);
  if (v === undefined || v === "") return defaultValue;
  return v;
}

export function requireEnv(key: string): string {
  const v = readEnv(key);
  if (v === undefined || v === "") {
    throw new Error(`Missing required env var: ${key}`);
  }
  return v;
}

