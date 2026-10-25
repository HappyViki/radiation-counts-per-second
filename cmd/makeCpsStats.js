import path from 'node:path';
import { makeCpsStats } from '../functions.js';

const cpsReadingsFilePath = path.join(import.meta.dirname, '../data/cpsReadings.csv');
const cpsStatsVariableFilePath = path.join(import.meta.dirname, '../data/cpsStatsVariable.js');

makeCpsStats(cpsReadingsFilePath, cpsStatsVariableFilePath);