import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const currentDir = dirname(fileURLToPath(import.meta.url));

const MODE = process.env.MODE as TMode;
const NODE_ENV = process.env.NODE_ENV as TNodeEnv;

dotenv.config({
  path: [
    resolve(currentDir, `.env.${MODE}.local`),
    resolve(currentDir, `.env.${MODE}`),
    resolve(currentDir, `.env.local`),
    resolve(currentDir, `.env`),
  ].filter((path) => existsSync(path)),
});

function resolveEnableReport(): TDebug {
  return process.env.ENABLE_REPORT === "1" ? "1" : "0";
}

function resolveMock(): TMock {
  return process.env.MOCK === "1" ? "1" : "0";
}

function resolveNeedAuth(): TNeedAuth {
  return process.env.NEED_AUTH === "0" ? "0" : "1";
}

function resolveLogLevel(): LogLevel {
  return process.env.LOG_LEVEL ?? "INFO";
}

export function createRuntimeDefines() {
  return {
    __APP_VERSION__: JSON.stringify("0.1.0"),
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __MODE__: JSON.stringify(MODE),
    __ENABLE_REPORT__: JSON.stringify(resolveEnableReport()),
    __MOCK__: JSON.stringify(resolveMock()),
    __NEED_AUTH__: JSON.stringify(resolveNeedAuth()),
    __LOG_LEVEL__: JSON.stringify(resolveLogLevel()),
  };
}
