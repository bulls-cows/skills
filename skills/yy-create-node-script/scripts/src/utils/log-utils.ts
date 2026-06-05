import { readScriptEnv } from "#constants/env";

export const logger = {
  info(message: string): void {
    console.log(message);
  },
  debug(message: string): void {
    if (readScriptEnvSafe().debug) {
      console.log(message);
    }
  },
  error(message: string): void {
    console.error(message);
  },
};

function readScriptEnvSafe(): { debug: boolean } {
  try {
    return { debug: readScriptEnv().debug };
  } catch {
    return { debug: false };
  }
}
