// day X solution
// ... 
// task 1: ...
// task 2: ...

import { inputFileName, readFileAsStringArray } from "../aoc/input";

const fname = inputFileName(__dirname);
const data = readFileAsStringArray(fname);

console.log("Input data has", data.length, "lines");



// process data for task 1
function task1(data: string[]): number {
    let result = 0;
    // ... implement task 1 logic here
    return result;
}

// process data for task 2
function task2(data: string[]): number {
    let result = 0;
    // ... implement task 2 logic here
    return result;
}

const result1 = task1(data);
console.log("Task 1 result:", result1);

const result2 = task2(data);
console.log("Task 2 result:", result2);
