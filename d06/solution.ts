// day 6 solution
// "Trash Compactor"
// Based on a grid of numbers, process them according to operations specified
// While part 1 is relatively straight forward, part 2 requires handling empty entries,
// e.g., you must NOT trim the input lines, as empty entries are significant!
// part 1: just split the numbers by ignoring whitespace and perform operations column-wise
// part 2: transpose the columns to get to proper numbers and then perform operations

import { inputFileName, readFileAsStringArrayNoTrim } from "../aoc/input";
import { add, mul } from "../aoc/maths";

const fname = inputFileName(__dirname);
const data = readFileAsStringArrayNoTrim(fname);

// process data for part 1
function part1(data: string[]): number {
    let totalSum = 0;
    // create array of number ignoring ALL whitespace between them
    const nums: number[][] = data.slice(0, data.length-1).map(line => line.trim().split(RegExp('\\s+')).map(Number));
    const ops = data[data.length-1].trim().split(RegExp('\\s+'));
    // console.log("Numbers:", nums);
    // console.log("Operations:", ops);
    for (let i = 0; i < nums[0].length; i++) {
        // get column i
        const col = nums.map(row => row[i]);
        // console.log(`Column ${i}:`, col, ' -> ', ops[i]);
        const calc = (ops[i] === '+') ? add(col) : mul(col);
        totalSum += calc;
    }
    return totalSum;
}

// process data for part 2
function part2(data: string[]): number {
    let totalSum = 0;

    // create an array of all "cells", preserving empty entries - note the line
    // MUST NOT be trimmed, as even leading or trailing empty entries are significant
    let cells: string[][] = data.slice(0, data.length-1).map(line => line.split(''));
    let ops = data[data.length-1].trim().split(RegExp('\\s+'));
    // console.log("Entries:", cells);
    // console.log("Operations:", ops);

    // we collect all numbers until we hit an empty entry or the end of the row
    let collector: number[] = [];
    // we also keep track of the current operator index
    let opsIdx = 0;

    // now iterate over all columns
    for (let i = 0; i < cells[0].length; i++) {
        // get column i and join its elements into a string
        const col = cells.map(row => row[i]).join('').trim();

        // if it is not empty, convert to number and add to collector
        if (col !== '') collector.push(Number(col));

        // if it is empty OR we are at the last column, perform calculation,
        // empty the collector and move to next operation 
        if (col === '' || i === cells[0].length - 1) { 
            const calc = (ops[opsIdx] === '+') ? add(collector) : mul(collector);
            // console.log(`Column ${i}:`, collector, ' -> ', ops[opsIdx], ' = ', calc);
            totalSum += calc;
            collector = [];
            opsIdx++;
        }
    }
    return totalSum;
}

const rowCalc = part1(data);
console.log("Total sum of rows (part 1):", rowCalc);

const colCalc= part2(data);
console.log("Total sum of columns (part 2):", colCalc);
