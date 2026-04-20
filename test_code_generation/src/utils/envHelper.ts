// path: src/utils/envHelper.ts

/**
 * Read an environment variable by key.
 * Returns fallback if variable is absent; throws if no fallback provided.
 * @param key - Environment variable name.
 * @param fallback - Optional default value.
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value !== undefined) {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Required environment variable "${key}" is not set.`);
}

/**
 * Read an environment variable and parse it as an integer.
 * @param key - Environment variable name.
 * @param fallback - Optional default integer.
 */
export function getEnvInt(key: string, fallback?: number): number {
  const raw = process.env[key];
  if (raw !== undefined) {
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) {
      throw new Error(
        `Environment variable "${key}" is not a valid integer: "${raw}"`,
      );
    }
    return parsed;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Required environment variable "${key}" is not set.`);
}

/**
 * Read an environment variable and parse it as a boolean.
 * Accepts 'true'/'1' as true; everything else as false.
 * @param key - Environment variable name.
 * @param fallback - Optional default boolean.
 */
export function getEnvBool(key: string, fallback?: boolean): boolean {
  const raw = process.env[key];
  if (raw !== undefined) {
    return raw === "true" || raw === "1";
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Required environment variable "${key}" is not set.`);
}
