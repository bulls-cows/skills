import assert from "node:assert/strict";
import { existsSync } from "node:fs";

assert.equal(existsSync(new URL("../src/cli.ts", import.meta.url)), true);
