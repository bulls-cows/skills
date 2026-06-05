import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { main } from "../src/main.ts";

test("main transforms input records and writes output", async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), "node-script-template-"));
  const inputFile = join(tempRoot, "input.json");
  const outputFile = join(tempRoot, "nested", "output.json");

  try {
    await writeFile(inputFile, `${JSON.stringify([{ name: "demo" }, "plain-value"])}\n`, "utf8");

    const result = await main({ inputFile, outputFile });
    const outputText = await readFile(outputFile, "utf8");

    assert.equal(result.status, true);
    assert.equal(result.totalCount, 2);
    assert.deepEqual(JSON.parse(outputText), [
      { name: "demo", processed: true },
      { value: "plain-value", processed: true },
    ]);
  } finally {
    await rm(tempRoot, { force: true, recursive: true });
  }
});

test("main returns failed result when required params are missing", async () => {
  const result = await main({ inputFile: "", outputFile: "" });

  assert.equal(result.status, false);
  assert.match(result.message, /INPUT_FILE/);
  assert.match(result.message, /OUTPUT_FILE/);
});
