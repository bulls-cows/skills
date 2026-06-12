import { scanSkillsWithScripts } from '#steps/scan-skills';
import { formatOutput } from '#utils/output';
import { findProjectRoot } from '#utils/path';

async function main(): Promise<void> {
  const projectRoot = await findProjectRoot();

  const results = await scanSkillsWithScripts(projectRoot);

  console.log(formatOutput(results));
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
