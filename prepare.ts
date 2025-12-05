import { config } from 'dotenv';
import { mkdirSync, writeFileSync } from 'fs';
import * as cheerio from 'cheerio';
import { join } from 'path';
import fetch from 'node-fetch';
import { execSync } from 'child_process';

// 1. Read token from .env
config();
const token = process.env.AOC_TOKEN;
if (!token) {
    console.error('AOC_TOKEN not found in .env');
    process.exit(1);
}
console.log('AOC_TOKEN found:', token.slice(0, 4) + '...' + token.slice(-4));

// 2. Read command line argument as "number of day"
const day = process.argv[2];
if (!day || isNaN(Number(day)) || Number(day) < 1 || Number(day) > 25) {
    console.error('Please provide a valid day number (1-25)');
    process.exit(1);
}
const dayPadded = String(day).padStart(2, '0');
console.log('Preparing for day:', day, "(padded: " + dayPadded + ")");

// 3. Create directory named "d" + "number of day"
const dir = join(process.cwd(), `d${dayPadded}`);
mkdirSync(dir, { recursive: true });

// 4. Fetch task and input from adventofcode.com
const year = 2025;
const baseUrl = `https://adventofcode.com/${year}/day/${day}`;
const headers = { cookie: `session=${token}` };

async function fetchFiles() {
    // Fetch task (problem description)
    const taskRes = await fetch(baseUrl, { headers });
    const taskHtml = await taskRes.text();

    // Extract plain text from <article> tag
    const $ = cheerio.load(taskHtml);
    const articleText = $('main article').text().trim();
    writeFileSync(join(dir, 'task.txt'), articleText);

    // Fetch input
    const inputRes = await fetch(`${baseUrl}/input`, { headers });
    const inputText = await inputRes.text();
    writeFileSync(join(dir, 'input.txt'), inputText);

    const templatePath = join(process.cwd(), 'template', 'solution-tmpl.ts');
    const destPath = join(dir, 'solution.ts');
    writeFileSync(destPath, require('fs').readFileSync(templatePath));

}

fetchFiles().then(() => {

    // 5. Start VS Code in that directory
    console.log('Opening VS Code ...');
    execSync(`code .`);
}).catch(err => {
    console.error('Error fetching files:', err);
    process.exit(1);
});