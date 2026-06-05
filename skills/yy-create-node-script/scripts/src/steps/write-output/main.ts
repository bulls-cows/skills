import { writeJsonFile } from "#utils/file-utils";
import type { OutputRecord } from "#typings/result";

export async function writeOutput(outputFile: string, records: OutputRecord[]): Promise<void> {
  await writeJsonFile(outputFile, records);
}
