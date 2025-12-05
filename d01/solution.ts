// day 01 solution
// "uhrenmathematik"
// just a simple simulation of movements on a circular track of 100 positions
// task 1 is solved by looking if we end up at position 0
// task 2 is solved by counting how often we pass position 0

import { inputFileName, readFileAsStringArray } from "../aoc/input";


// task 1: move and check end position
// returns new position and whether we are at 0
function moveExact(position: number, movement: string): [number, number] {
    let direction = movement[0];
    let distance = parseInt(movement.slice(1), 10);
    let newpos = (position + (direction === 'R' ? distance : -distance)) % 100
    if (newpos < 0) newpos += 100;
    return [newpos, newpos === 0 ? 1 : 0];
}

// task 2: move and count how often we pass 0
// very easy if we land in positive numbers, a bit tricky when moving backwards to 0 or below
// returns new position and number of times we passed 0
function moveVisit(position: number, movement: string): [number, number] {
    let direction = movement[0];
    let distance = parseInt(movement.slice(1), 10);
    let newpos = (position + (direction === 'R' ? distance : -distance))
    if (newpos > 0) {
        // as we started in [0,99] we can just count how often we passed 100
        return [newpos%100, Math.floor(newpos/100)];
    } 
    else if (newpos === 0) {
        // we must have come backwards to exactly 0
        return [newpos, 1]
    }
    else {
        // newpos < 0
        // we must have come backwards past 0, and just need to check where we came from
        let zc = Math.floor(Math.abs(newpos)/100) + (position > 0 ? 1 : 0)
        return [(newpos%100+100)%100, zc]
    }
}

// process a list of move commands, either exact or visit counting
function processMoves(moves: string[], exact: boolean = true, startPos: number = 50): [number, number] {
    let pos = startPos;
    let zeroCount = 0;
    for (let moveCmd of moves) {
        // console.log(`Moving from position ${pos} with command ${moveCmd}`);
        let z = 0;
        [pos, z] = exact ? moveExact(pos, moveCmd) : moveVisit(pos, moveCmd);
        zeroCount += z;
        // console.log(`New position: ${pos}, Zero count: ${zeroCount}`);
    }
    return [pos, zeroCount];
}

// main routine
const fname = inputFileName(__dirname);
const data = readFileAsStringArray(fname);

// task 1
const [pos1, zeroCount1] = processMoves(data, true);
console.log('Task 1 - End position:', pos1, '/ Zero count:', zeroCount1);

// task 2
const [pos2, zeroCount2] = processMoves(data, false);
console.log('Task 2 - End position:', pos2, '/ Zero count:', zeroCount2);
