import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

function runAudit() {
  const output = execFileSync('node', ['scripts/audit-mountain-guides.mjs'], {
    encoding: 'utf8'
  });

  return JSON.parse(output);
}

describe('audit-mountain-guides script', () => {
  it('reports active and draft guide coverage across the full top-100 list', () => {
    const report = runAudit();

    expect(report.totals.mountains).toBe(100);
    expect(report.totals.activeGuides).toBeGreaterThan(0);
    expect(report.totals.draftGuides).toBeGreaterThan(0);
    expect(report.totals.missingActiveGuides).toBe(
      report.totals.mountains - report.totals.activeGuides
    );
    expect(report.missingActiveGuides).toHaveLength(report.totals.missingActiveGuides);
    expect(report.draftOnlyGuides).toHaveLength(report.totals.draftOnlyGuides);
  });

  it('keeps route-level course data free of removed map/track fields and legacy 숲나들e course-map images', () => {
    const report = runAudit();

    expect(report.policyViolations).toEqual([]);
  });
});
