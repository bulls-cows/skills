import { LOG_LEVEL } from "@src/utils/constantUtils";

const LOG_LEVEL_WEIGHT: Record<LogLevel, number> = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
};

function shouldWriteLog(level: LogLevel): boolean {
  return LOG_LEVEL_WEIGHT[level] >= LOG_LEVEL_WEIGHT[LOG_LEVEL];
}

function writeLog(level: LogLevel, message: string, fields?: unknown): void {
  if (!shouldWriteLog(level)) {
    return;
  }

  if (level === "ERROR") {
    console.error(message, fields);
    return;
  }

  if (level === "WARN") {
    console.warn(message, fields);
    return;
  }

  console.info(message, fields);
}

export const logInfo = (message: string, fields?: unknown): void => {
  writeLog("INFO", message, fields);
};

export const logWarn = (message: string, fields?: unknown): void => {
  writeLog("WARN", message, fields);
};

export const logError = (message: string, fields?: unknown): void => {
  writeLog("ERROR", message, fields);
};
