// day 3 solution
// "Lobby"
// find the maximum joltage value in a bank represented as a string of digits
// part 1: find the maximum joltage made by combining the two highest digits
// part 2: find the maximum joltage made by combining the n highest digits
// using a greedy approach, calling the respective function recursively

import { inputFileName, readFileAsStringArray } from '../aoc/input';

// find the index and value of the maximum digit in a string
function maxIdx(part: string): [number, number] {
    if (part === undefined || part.length === 0) return [-1, -1];
    // console.log(`Finding max in part: ${part}`);
    let mi = 0;
    let mv = parseInt(part.charAt(0), 10);
    if (part.length === 1) return [mi, mv];
    for (let i = 1; i < part.length; i++) {
        let v = parseInt(part.charAt(i), 10);
        if (v > mv) {
            mi = i;
            mv = v;
        }
    }
    return [mi, mv];
}

// find the maximum joltage made by combining the two highest digits
function maxJoltage(bank: string): number {
    let [fIdx, fVal] = maxIdx(bank.slice(0, bank.length-1));
    let [_, sVal] = maxIdx(bank.slice(fIdx+1))
    return 10*fVal + sVal;
}

// find the maximum joltage made by combining the n highest digits
function maxJoltageN(bank: string, n: number): number {
    if (n-1 === 1) { 
        return maxJoltage(bank);
    }
    let [fIdx, fVal] = maxIdx(bank.slice(0, bank.length-(n-1)));
    return 10**(n-1) * fVal + maxJoltageN(bank.slice(fIdx+1), n-1);
}

const fname = inputFileName(__dirname);
const data = readFileAsStringArray(fname);

// process a bank of joltage digits for n highest combination
function processBank(data: string[], n: number) {
    let sum = 0;
    for (const line of data) {
        let mj = maxJoltageN(line, n);
        // console.log(`Val: ${mj}`);
        sum += mj;
    }
    return sum;
}

// part 1: find the maximum joltage made by combining the two highest digits
const sum2 = processBank(data, 2);
console.log('Part 1 - max joltage of 2:', sum2);

// part 2: find the maximum joltage made by combining the 12 highest digits
const sum12 = processBank(data, 12);
console.log('Part 2 - max joltage of 12:', sum12);