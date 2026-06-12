import type { ScanResult } from '#steps/scan-skills';

export function formatOutput(results: ScanResult[]): string {
  if (results.length === 0) {
    return 'No skills with scripts/ directory found.';
  }

  const lines: string[] = [
    `Found ${results.length} skill(s) with scripts/ directory:`,
    '',
  ];

  for (const result of results) {
    lines.push(`- ${result.skillsDir}/${result.skillName}`);
    lines.push(`  scripts: ${result.relativePath}`);
  }

  return lines.join('\n');
}
