type Value = string | number | boolean | object;

type Context = Record<string, Value | Value[]> & {
  category?: string;
};

type ErrorContext = {
  level?: string;
  tags?: Record<string, string>;
  data?: Record<string, Value | Value[]>;
};

interface Logger {
  info(message: string, context?: Context): void;
  warn(message: string, context?: Context): void;
  error(error: Error, context?: ErrorContext): void;
}

const logger: Logger = {
  info: (message, { category, ...data } = {}) =>
    console.info(`[${category ?? "info"}]`, message, data),
  warn: (message, { category, ...data } = {}) =>
    console.warn(`[${category ?? "warn"}]`, message, data),
  error: (error) => console.error(error),
};

export default logger;
