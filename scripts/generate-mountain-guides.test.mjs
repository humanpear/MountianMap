import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('generate-mountain-guides script', () => {
  it('does not force-exit immediately after async failures', () => {
    const script = readFileSync('scripts/generate-mountain-guides.mjs', 'utf8');

    expect(script).toContain('process.exitCode = 1');
    expect(script).not.toContain('process.exit(1)');
  });

  it('uses Gemini API credentials and preserves generated guides incrementally', () => {
    const script = readFileSync('scripts/generate-mountain-guides.mjs', 'utf8');

    expect(script).toContain('GEMINI_API_KEY');
    expect(script).toContain('GEMINI_MODEL');
    expect(script).toContain('generativelanguage.googleapis.com');
    expect(script).toContain('parseExistingGuides');
    expect(script).toContain('writeFileSync(OUTPUT_PATH, renderGuideFile(guides),');
    expect(script).not.toContain('OPENAI_API_KEY');
  });
});
