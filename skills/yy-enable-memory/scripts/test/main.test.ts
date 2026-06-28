import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatSize, getFileInfo, scanDirectory } from "../src/utils/file-utils.ts";

test("formatSize returns correct human-readable sizes", () => {
  assert.equal(formatSize(0), "0B");
  assert.equal(formatSize(500), "500B");
  assert.equal(formatSize(1024), "1.00KB");
  assert.equal(formatSize(1536), "1.50KB");
  assert.equal(formatSize(1048576), "1.00MB");
});

test("getFileInfo returns file info for existing file", () => {
  const tempDir = mkdtempSync(join(tmpdir(), "memory-trim-test-"));
  try {
    const filePath = join(tempDir, "test.md");
    writeFileSync(filePath, "line1\nline2\nline3\n", "utf-8");

    const info = getFileInfo(filePath);
    assert.notEqual(info, null);
    assert.equal(info!.name, "test.md");
    assert.equal(info!.lines, 4);
    assert.ok(info!.size > 0);
    assert.ok(info!.daysSinceModified >= 0);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("getFileInfo returns null for non-existent file", () => {
  const info = getFileInfo("/nonexistent/path.md");
  assert.equal(info, null);
});

test("scanDirectory returns only .md files recursively", () => {
  const tempDir = mkdtempSync(join(tmpdir(), "memory-trim-test-"));
  try {
    const subDir = join(tempDir, "sub");
    mkdirSync(subDir, { recursive: true });

    writeFileSync(join(tempDir, "root.md"), "root content", "utf-8");
    writeFileSync(join(tempDir, "notes.txt"), "not scanned", "utf-8");
    writeFileSync(join(subDir, "nested.md"), "nested content", "utf-8");

    const results = scanDirectory(tempDir);
    assert.equal(results.length, 2);
    assert.ok(results.some((f) => f.name === "root.md"));
    assert.ok(results.some((f) => f.name === "nested.md"));
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("scanDirectory returns empty array for non-existent directory", () => {
  const results = scanDirectory("/nonexistent-dir");
  assert.deepEqual(results, []);
});

test("checkSizeLimits detects oversized files", async () => {
  const { checkSizeLimits } = await import("../src/main.ts");

  const oversized = {
    path: "/test/MEMORY.md",
    name: "MEMORY.md",
    size: 10 * 1024,
    modified: new Date(),
    daysSinceModified: 0,
    lines: 100,
  };

  const result = checkSizeLimits([oversized]);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].file, "MEMORY.md");
  assert.ok(result.errors[0].message.includes("超过容量限制"));
});

test("checkInactiveMemories detects old files", async () => {
  const { checkInactiveMemories } = await import("../src/main.ts");

  const oldFile = {
    path: "/test/old.md",
    name: "old.md",
    size: 100,
    modified: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    daysSinceModified: 60,
    lines: 10,
  };

  const inactive = checkInactiveMemories([oldFile], "/test");
  assert.equal(inactive.length, 1);
  assert.equal(inactive[0].file, "old.md");
  assert.equal(inactive[0].daysSinceModified, 60);
});
