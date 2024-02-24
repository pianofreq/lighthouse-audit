const express = require('express');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const app = express();
const port = 8080;

app.get('/lighthouse', async (req, res) => {
    // Define a static URL for testing
    const testUrl = 'https://www.example.com';

    try {
        const reportHtml = await runLighthouse(testUrl);
        // Set the content type to HTML
        res.setHeader('Content-Type', 'text/html');
        res.send(reportHtml);
    } catch (error) {
        console.error('Lighthouse run error:', error);
        res.status(500).send('Failed to run Lighthouse');
    }
});

async function runLighthouse(url) {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
    const runnerResult = await lighthouse(url, options);

    const reportHtml = runnerResult.report;
    await chrome.kill();

    return reportHtml;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
