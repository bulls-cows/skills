export type ResultTuple<T> = [Error, undefined] | [null, T];

export interface ScriptResult {
  status: boolean;
  message: string;
  outputFile: string;
  totalCount: number;
}

export interface InputRecord {
  [key: string]: unknown;
}

export interface OutputRecord extends InputRecord {
  processed: boolean;
}
