// day X solution
// ... 
// part 1: ...
// part 2: ...

import { inputFileName, readFileAsStringArray } from "../aoc/input";

const fname = inputFileName(__dirname);
const data = readFileAsStringArray(fname);

console.log("Input data has", data.length, "lines");



// process data for part 1
function part1(data: string[]): number {
    let result = 0;
    // ... implement part 1 logic here
    return result;
}

// process data for part 2
function part2(data: string[]): number {
    let result = 0;
    // ... implement part 2 logic here
    return result;
}

const result1 = part1(data);
console.log("part 1 result:", result1);

const result2 = part2(data);
console.log("part 2 result:", result2);
