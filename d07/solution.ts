// day 7 solution
// "Laboratories"
// see how many quantum laser beams will be split and how many paths exist 
// part 1: just count of often laser beams are split
// part 2: keep track of number of paths to each position

import { inputFileName, readFileAsStringArray } from "../aoc/input";

const fname = inputFileName(__dirname);
const data = readFileAsStringArray(fname);

// process data for part 1
function processInput(data: string[]): [number, number] {

    // beams hold the current positions of the beams
    let beams: number[] = [];
    // splitCount counts the number of splits, relevant for part 1
    // pathCounter counts the number of ways to reach each position, relevant for part 2
    let splitCount = 0;
    let pathCounter: number[] = Array(data[0]!.length).fill(0);

    for (const line of data) {

        // we process each line and create new beams and a new path counter
        // valid after the line 
        let newBeams: number[] = [];
        let newPathCounter: number[] = Array(data[0]!.length).fill(0);

        if (beams.length === 0) {
            // first row, initialize beams
            const s = line.indexOf('S');
            // console.log("Found S at", s);
            newBeams.push(s);
            newPathCounter[s] = 1;
        } else {
            if (line.indexOf('^') === -1) {
                // nothing would change, skip processing
                continue;
            }

            // iterate over beams and process each to create new beams and update path counter
            for (const idx of beams) {
                if (line[idx] === '^') { 
                    //
                    splitCount++;
                    newPathCounter[idx] = 0;
                    // check left
                    if (idx > 0) {
                        newPathCounter[idx - 1] += pathCounter[idx];
                        // only add if not already present
                        if (newBeams[newBeams.length-1] !== idx - 1) {
                            newBeams.push(idx - 1);
                        }
                    }
                    // check right
                    if (idx < line.length - 1) {
                        newPathCounter[idx + 1] += pathCounter[idx];
                        newBeams.push(idx + 1);
                    }
                }
                else {
                    // continue straight
                    newPathCounter[idx] += pathCounter[idx];
                    // only add if not already present
                    if (newBeams[newBeams.length-1] !== idx) {
                        newBeams.push(idx);
                    }
                }
            }
        }
        beams = [...newBeams];
        pathCounter = [...newPathCounter];

        // console.log(`l: [ ${line} ]`);
        // console.log(`p: [ ${pathCOunter.join('')} ]`);
    }
    return [splitCount, pathCounter.reduce((a, b) => a + b, 0)];
}


const [splitCount, pathCount] = processInput(data);
console.log("Number of slipts (part 1):", splitCount);
console.log("Number of paths (part 2):", pathCount);
