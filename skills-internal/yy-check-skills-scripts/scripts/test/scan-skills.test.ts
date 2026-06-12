import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { scanSkillsWithScripts } from '#steps/scan-skills';

describe('scanSkillsWithScripts', () => {
  it('should scan skills directories', async () => {
    const results = await scanSkillsWithScripts(process.cwd());
    assert.ok(Array.isArray(results));
  });
});
