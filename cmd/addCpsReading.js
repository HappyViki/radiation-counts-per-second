import path from 'node:path';
import { addCpsReading } from '../functions.js';

const cpsReadingsFilePath = path.join(import.meta.dirname, '../data/cpsReadings.csv');

addCpsReading(cpsReadingsFilePath);