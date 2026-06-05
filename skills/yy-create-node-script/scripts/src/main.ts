import { readScriptEnv } from "#constants/env";
import { readInput } from "#steps/read-input/main";
import { transformRecords } from "#steps/transform-records/main";
import { writeOutput } from "#steps/write-output/main";
import type { ScriptResult } from "#typings/result";
import { logger } from "#utils/log-utils";
import { delayProcessExit } from "#utils/process-utils";
import { toKeyValueString } from "#utils/string-utils";

export interface MainParams {
  inputFile: string;
  outputFile: string;
}

export async function main(params: MainParams): Promise<ScriptResult> {
  const missingParams = getMissingParams(params);

  if (missingParams.length > 0) {
    return buildFailedResult(`参数缺失：${missingParams.join("、")}`, params.outputFile || "");
  }

  const records = await readInput(params.inputFile);
  logger.info(`输入读取完成：${toKeyValueString({ totalCount: records.length })}`);

  const outputRecords = transformRecords(records);
  await writeOutput(params.outputFile, outputRecords);

  return {
    status: true,
    message: "处理成功",
    outputFile: params.outputFile,
    totalCount: outputRecords.length,
  };
}

function getMissingParams(params: MainParams): string[] {
  return [
    ["INPUT_FILE", params.inputFile],
    ["OUTPUT_FILE", params.outputFile],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

function buildFailedResult(message: string, outputFile: string): ScriptResult {
  return {
    status: false,
    message,
    outputFile,
    totalCount: 0,
  };
}

async function runCli(): Promise<number> {
  try {
    const env = readScriptEnv();
    const result = await main({ inputFile: env.inputFile, outputFile: env.outputFile });
    const logMessage = `脚本执行完成：${toKeyValueString({
      status: result.status,
      totalCount: result.totalCount,
      outputFile: result.outputFile,
    })}`;

    if (result.status) {
      logger.info(logMessage);
      return 0;
    }

    logger.error(result.message);
    return 1;
  } catch (error) {
    logger.error(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const exitCode = await runCli();
  await delayProcessExit(exitCode);
}
