import { readJsonFile } from "#utils/file-utils";
import type { InputRecord } from "#typings/result";

export async function readInput(inputFile: string): Promise<InputRecord[]> {
  const inputData = await readJsonFile<unknown>(inputFile);

  if (!Array.isArray(inputData)) {
    throw new Error(`输入文件必须是数组结构：${inputFile}`);
  }

  return inputData.map(normalizeRecord);
}

function normalizeRecord(value: unknown): InputRecord {
  if (value != null && typeof value === "object" && !Array.isArray(value)) {
    return value as InputRecord;
  }

  return { value };
}
