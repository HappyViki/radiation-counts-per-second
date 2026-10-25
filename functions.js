import { readFileSync } from 'node:fs';
import { access, appendFile, writeFile } from 'node:fs/promises'; 

export const addCpsReading = async (filepath, cps) => {
    const timestamp = new Date().toISOString().split('.')[0] + 'Z';
    
    cps = Number(cps) || Number(process.argv[2]) || '';    

    try {
        await access(filepath)
    } catch {
        // create csv with head if file doesn't exist
        await appendFile(filepath, 'timestamp,cps');
    }

    await appendFile(filepath, `\n${timestamp},${cps}`);

    return {
        timestamp, 
        cps
    }
}

export const clearCpsReadingsAndStats = async (readingsFilePath, statsFilePath) => {
    await writeFile(readingsFilePath, 'timestamp,cps');
    await writeFile(statsFilePath, '');
}

export const makeCpsStats = async (readingsFilePath, statsFilePath) => {    
    const data = readFileSync(readingsFilePath).toString()
        .split('\n')
        .map(row => row.split(','))
        .map(row => {
            // transform cps csv string to number
            row[1] = Number(row[1]);
            return row;
        });
    const numberOfReadings = data.length-1;

    const stats = {
    numberOfReadings,
    "minCps": data.slice(1).sort((a, b) => a[1] - b[1])[0][1],
    "maxCps": data.slice(1).sort((a, b) => b[1] - a[1])[0][1],
    // JS is bad at adding fractions
    // Example: 38.199999999999996 instead of 38.2 
    // Fix: need to add whole numbers (multiply by 10, then divide by 10)
    "sumOfReadings": data.slice(1).reduce((total, current) => total + current[1]*10, 0)/10,
    "firstTimestamp": data[1][0],
    "lastTimestamp": data[numberOfReadings][0]
    };

    // console.log(data);
    // console.log(stats);

    const fileContent = 'const stats = ' + JSON.stringify(stats) + ';';

    // Max 2GB write
    await writeFile(statsFilePath, fileContent);

    return fileContent;
}