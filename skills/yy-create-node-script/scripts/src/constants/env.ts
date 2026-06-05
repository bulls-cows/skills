export interface ScriptEnv {
  inputFile: string;
  outputFile: string;
  debug: boolean;
}

const REQUIRED_ENV_KEYS = ["INPUT_FILE", "OUTPUT_FILE"] as const;

export function readScriptEnv(env: NodeJS.ProcessEnv = process.env): ScriptEnv {
  const missingKeys = REQUIRED_ENV_KEYS.filter((key) => !env[key]?.trim());

  if (missingKeys.length > 0) {
    throw new Error(`参数缺失：${missingKeys.join("、")}`);
  }

  return {
    inputFile: env.INPUT_FILE || "",
    outputFile: env.OUTPUT_FILE || "",
    debug: parseBooleanEnv(env.DEBUG),
  };
}

function parseBooleanEnv(value: string | undefined): boolean {
  return ["1", "true", "yes", "on"].includes(
    String(value || "")
      .trim()
      .toLowerCase(),
  );
}
