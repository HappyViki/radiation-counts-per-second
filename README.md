# Radiation Counts Per Second
Designing a solution without access to the target device has been challenging. I decided to build something I could use in my own development workflow: an application that accepts arguments through command-line commands and displays the results in a web page. I prefer using the command line when developing and testing, so this approach reflects how I'd naturally work with the tool myself.

I'm not familiar with radiation data, so I asked Gemini AI to generate an array of dummy CPS (counts per second) data with timestamps for testing. Since I don't have access to the actual device, I'm assuming it can execute the commands below, display an HTML file, and periodically refresh the page. I'm developing on Windows, so the commands may differ slightly on Linux or macOS.

![Demo CPS Stats Screenshot](img/demoScreenshot.png)

## Commands

### Add CPS reading
`node .\cmd\addCpsReading.js CPS_NUMBER`

### Generate file for HTML page to display
`node .\cmd\makeCpsStats.js`

### Reset Statistics
`node .\cmd\clearCpsReadingsAndStats.js`

### Add reading, then generate file
`node .\cmd\addCpsReading.js CPS_NUMBER | node .\cmd\makeCpsStats.js`

### View fresh demo
`cp .\test\dummyCpsData.csv .\data\cpsReadings.csv | node .\cmd\makeCpsStats.js | start .\index.html`

### View html file in browser
- Windows: `start .\index.html`
- Mac: `open index.html`
- Linux... I'm not sure, I haven't tried.

## Data Files
- raw data: cpsReadings.csv (timestamp, cps)
- formatted stats: data/cpsStatsVariable.js
- dummy data for testing: test/dummyCpsData.csv

## Testing
Do `cp .\test\dummyCpsData.csv .\data\cpsReadings.csv` to manually test.

### Run automated tests:
- Update snapshots: `node --test --test-update-snapshots`
- Run tests: `node --test`
