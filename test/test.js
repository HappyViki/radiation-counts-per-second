import path from 'node:path';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addCpsReading, clearCpsReadingsAndStats, makeCpsStats } from '../functions.js';

const testReadingsFilePath = path.join(import.meta.dirname, 'testCpsReadings.csv');
const testStatsFilePath = path.join(import.meta.dirname, 'testCpsStats.csv');
const dummyDataFilePath = path.join(import.meta.dirname, 'dummyCpsData.csv');

test('adds cps reading', async () => {
  const testCps = 1.4;
  const result = await addCpsReading(testReadingsFilePath, testCps);
  
  assert.strictEqual(result.cps, testCps);
});

test('resets cps readings and stats', async () => {
  await clearCpsReadingsAndStats(testReadingsFilePath, testStatsFilePath);
  const testReadings = readFileSync(testReadingsFilePath).toString();
  const testStats = readFileSync(testStatsFilePath).toString();
  
  assert.strictEqual(testReadings, 'timestamp,cps');
  assert.strictEqual(testStats, '');
});

test('makes stats variable file for page use', async (t) => {
  const testStatsContent = await makeCpsStats(dummyDataFilePath, testStatsFilePath);  
  
  t.assert.snapshot(testStatsContent);
});