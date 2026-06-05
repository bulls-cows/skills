import type { InputRecord, OutputRecord } from "#typings/result";

export function transformRecords(records: InputRecord[]): OutputRecord[] {
  return records.map((record) => ({
    ...record,
    processed: true,
  }));
}
