import { describe, expect, it } from "vitest";
import { resolveMockTopic } from "@src/scripts/requestUtils";

describe("requestUtils", () => {
  it("resolves api path to mock topic", () => {
    expect(resolveMockTopic({ url: "/api/example/todo" })).toBe("example.todo");
  });

  it("resolves url with query to mock topic", () => {
    expect(resolveMockTopic({ url: "/api/example/todo?id=1" })).toBe("example.todo");
  });

  it("resolves absolute url to mock topic", () => {
    expect(resolveMockTopic({ url: "https://example.com/api/example/todo?id=1" })).toBe(
      "example.todo",
    );
  });

  it("throws error when url is missing", () => {
    expect(() => resolveMockTopic({})).toThrow("Mock 请求缺少 url");
  });
});
