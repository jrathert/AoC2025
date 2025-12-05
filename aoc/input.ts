import * as fs from 'fs';

export function inputFileName(dirname: string): string {
    const testmode = process.argv.includes('--test');
    return dirname + '/' + (testmode ? 'testdata.txt' : 'input.txt');
}

export function readFileAsString(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8').trim();
}

export function readFileAsStringArray(filePath: string): string[] {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.trim().split('\n').map(line => line.trim());
}

export function readFileAsGrid(filePath: string): string[][] {
    const content = fs.readFileSync(filePath, 'utf-8');
    let lines = content.trim().split('\n').map(line => line.trim());
    let grid = Array<string[]>(lines.length);
    for (let i =  0; i < lines.length; i++) {
        grid[i] = lines[i]!.split('')
    }
    return grid;
}

export function stringToArray(input: string): string[] {
    return input.trim().split('\n').map(line => line.trim());
}

