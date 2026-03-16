jest.mock("react", () => ({
  useMemo: jest.fn((fn) => fn()),
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loggerModule = require("@/ui/common/hooks/useLogger");

describe("useLogger", () => {
  const logger = loggerModule.useLogger();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs info messages to console", () => {
    logger.info("Test message", { category: "test", key: "value" });
    expect(console.info).toHaveBeenCalledWith("[test]", "Test message", {
      key: "value",
    });
  });

  it("logs warnings to console", () => {
    logger.warn("Warning message", { category: "test" });
    expect(console.warn).toHaveBeenCalledWith("[test]", "Warning message", {});
  });

  it("logs errors to console", () => {
    const error = new Error("Test error");
    logger.error(error);
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("returns error message string from error()", () => {
    const error = new Error("Test error");
    const result = logger.error(error);
    expect(result).toBe("Test error");
  });
});
