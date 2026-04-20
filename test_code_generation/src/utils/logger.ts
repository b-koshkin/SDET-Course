// path: src/utils/logger.ts

type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * Simple structured logger scoped to a named context (class or module).
 */
export class Logger {
  private readonly context: string;

  /**
   * @param context - Label shown in every log line (e.g. class name).
   */
  constructor(context: string) {
    this.context = context;
  }

  /**
   * Log an informational message.
   * @param message - Message text.
   */
  info(message: string): void {
    this.log("info", message);
  }

  /**
   * Log a warning message.
   * @param message - Message text.
   */
  warn(message: string): void {
    this.log("warn", message);
  }

  /**
   * Log an error message.
   * @param message - Message text.
   */
  error(message: string): void {
    this.log("error", message);
  }

  /**
   * Log a debug message.
   * @param message - Message text.
   */
  debug(message: string): void {
    this.log("debug", message);
  }

  private log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
    if (level === "error") {
      console.error(line);
    } else if (level === "warn") {
      console.warn(line);
    } else {
      console.log(line);
    }
  }
}
