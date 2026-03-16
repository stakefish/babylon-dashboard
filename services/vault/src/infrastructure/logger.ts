type Value = string | number | boolean | object;

type Context = Record<string, Value | Value[]> & {
  category?: string;
};

type ErrorContext = {
  level?: string;
  tags?: Record<string, string>;
  data?: Record<string, Value | Value[]>;
};

export default {
  info: (message: string, { category, ...data }: Context = {}) =>
    console.info(`[${category ?? "info"}]`, message, data),
  warn: (message: string, { category, ...data }: Context = {}) =>
    console.warn(`[${category ?? "warn"}]`, message, data),
  error: (error: Error, _context: ErrorContext = {}) => console.error(error),
};
