export interface FileInfo {
  path: string;
  name: string;
  size: number;
  modified: Date;
  daysSinceModified: number;
  lines: number;
}

export interface SizeIssue {
  file: string;
  size: string;
  limit: string;
  message: string;
}

export interface InactiveMemory {
  file: string;
  path: string;
  daysSinceModified: number;
  lastModified: string;
  suggestion: string;
}

export interface ReportSummary {
  totalFiles: number;
  totalSize: string;
  hubsCount: number;
  leafsCount: number;
  errors: number;
  warnings: number;
  inactiveCount: number;
}

export interface TrimReport {
  summary: ReportSummary;
  errors: SizeIssue[];
  warnings: SizeIssue[];
  inactive: InactiveMemory[];
}
