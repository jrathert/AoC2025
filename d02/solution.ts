// day 2 solution
// "Gift Shop"
// find invalid identification numbers in given ranges
// invalid means: made by repeating a smaller fragment, e.g. 123123 or 1212 or 11 or 999999
// alternative definition: made by writing the same number twice, e.g. 1212 or 999999 or 123123

import { inputFileName, readFileAsString } from "../aoc/input";

// part 1: check if a number exactly consists of the same number appended twice
function consistsOfSameNumberTwice(text: string): boolean {
    if (text.length % 2 !== 0) return false;
    const halfLength = text.length / 2;
    const firstHalf = text.slice(0, halfLength);
    const secondHalf = text.slice(halfLength);
    return firstHalf === secondHalf;
}

// part 2: check if a number exactly consists of a smaller fragment repeated
function consistsOfRepeatedFragment(text: string, fragment: string): boolean {
    if (fragment.length === 0) return false;
    const repeatCount = text.length / fragment.length;
    if (!Number.isInteger(repeatCount)) return false;
    return fragment.repeat(repeatCount) === text;
}

// check if an ID is invalid according to the given criteria
function isInvalid(id: number, exactTwice: boolean): boolean {
    const idStr = id.toString();
    if (exactTwice) {
        return consistsOfSameNumberTwice(idStr);
    }
    else {
        for (let len = 1; len <= Math.floor(idStr.length / 2); len++) {
            const fragment = idStr.slice(0, len);
            if (consistsOfRepeatedFragment(idStr, fragment)) {
                return true;
            }
        }
        return false;
    }
}

const fname = inputFileName(__dirname);
const data = readFileAsString(fname);

// create an array of start/end objects from the input data
const ranges = data.split(',').map(part => {
    let [start, end] = part.split('-').map(Number);
    return { start, end };
});

function processRanges(exactTwice: boolean) {
    let sum = 0;
    for (const range of ranges) {
        let result = []
        for (let id = range.start!; id <= range.end!; id++) {
            if (isInvalid(id, exactTwice)) {
                result.push(id);
                sum += id;
            }
        }
        // console.log(result);
    }   
    return sum;
}

// part 1: find invalid IDs made by repeating the same number twice
let sum = processRanges(true);
console.log("Sum of invalid IDs (same number twice):", sum);

// part 2: find invalid IDs made by repeating a smaller fragment
sum = processRanges(false);
console.log("Sum of invalid IDs (repeated fragment):", sum);
