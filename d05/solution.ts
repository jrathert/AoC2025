// day 5 solution
// "slice management"
// manage a set of slices (ranges) and determine if numbers are contained in any slice
// task 1: add slices and compact the set
// task 2: determine how many numbers are contained in the slices

import { inputFileName, readFileAsStringArray } from "../aoc/input";

// solve it by having two classes: Slice and SliceSet
// a Slice represents a range, and it can merge with another slice if they overlap
// a SliceSet represents a set of slices, and can add slices (with merging) and 
// check if a number is contained in any slice, as well as compute total length of all slices

class Slice {

    start: number
    end: number

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
    merge(other: Slice): boolean {
        if (this.end < other.start || other.end < this.start) {
            return false;
        }
        this.start = Math.min(this.start, other.start);
        this.end = Math.max(this.end, other.end);
        return true
    }
    length(): number {
        return this.end - this.start + 1;
    }
    contains(num: number): boolean {
        return this.start <= num && num <= this.end;
    }
}

class SliceSet {

    slices: Slice[]

    constructor() {
        this.slices = [];
    }
    sort() {
        this.slices.sort((a, b) => a.start - b.start);
    }
    compact() {
        this.sort();
        let compacted: Slice[] = [];
        for (let s of this.slices) {
            let last = compacted[compacted.length - 1];
            if (last) {
                let merged = last.merge(s);
                if (merged) {
                    continue;
                }
            }
            compacted.push(s);
        }
        this.slices = compacted;
    }
    addSmart(slice: Slice) {
        this.slices.push(slice);
        this.compact();
    }
    add(slice: Slice) {
        this.slices.push(slice);
    }
    contains(num: number): boolean {
        for (let slice of this.slices) {
            if (slice.contains(num)) {
                return true;
            }
        }
        return false;
    }
    length(): number {
        return this.slices.length;
    }
    totalLength(): number {
        let total = 0;
        for (let s of this.slices) {
            total += s.length();
        }
        return total;
    }
    print() {
        for (let s of this.slices) {
            console.log(` [ ${s.start} - ${s.end} ] (len ${s.length()})`);
        }
    }
}

const fname = inputFileName(__dirname);
const input = readFileAsStringArray(fname);

const ss = new SliceSet();
let numFresh = 0;
for (let line of input) {
    if (line.includes('-')) {
        let parts = line.split('-');
        ss.addSmart(new Slice(Number(parts[0]), Number(parts[1])));
        // ss.add(new Slice(Number(parts[0]), Number(parts[1])));
    } else if (line.length > 0) {
        let num = Number(line);
        if (ss.contains(num)) { 
            // console.log(`${num} contained - fresh`);
            numFresh += 1;
        }
    }
}

// task 1: just tell how many of the number are contained in the slices 
console.log('Number of selected fresh IDs:', numFresh);

// task 2: tell the total length of all slices 
console.log('Total number of fresh IDs:', ss.totalLength());



