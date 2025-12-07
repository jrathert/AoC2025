// day 4 solution
// "Printing Department"
// find the number of accessible paper rolls in a grid
// a paper roll ("@") is accessible if it has less than 4 neighbors containing paper rolls
// Both parts solved in one go by iterating and counting/removing accessible rolls
// until no more accessible remain, store the number of the very first iteration as part 1 

import { inputFileName, readFileAsGrid } from '../aoc/input';
import { copyGrid, listGridNeighbors, printGrid } from '../aoc/grid';

// determine if a paper roll at position pos is accessible in the grid
function isAccessible(grid: string[][], n: number, m: number, pos: [number, number]): boolean {
    if (grid[pos[0]]![pos[1]] !== "@") return false;
    let neighbors = listGridNeighbors(pos, n, m);
    let cnt = 0;
    for (let p of neighbors) {
        const row = grid[p[0]]!;
        const val = row[p[1]];
        if (val === "@") cnt++;
    }
    return cnt < 4;
}

const fname = inputFileName(__dirname);
let grid = readFileAsGrid(fname);

let N = grid.length;
let M = grid[0]!.length;

// print grid to check
// printGrid(grid);

let firstAccessible = -1;
let totalAccessible = 0;

// Iterate until no more paper rolls are accessible
let nextGrid = copyGrid(grid);
let thisIteration = -1;
while (thisIteration != 0) {
    thisIteration = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (isAccessible(grid, N, M, [i, j])) {
                nextGrid[i]![j] = ".";
                thisIteration++;                
            }
        }
    }
    grid = copyGrid(nextGrid);
    totalAccessible += thisIteration;

    if (firstAccessible === -1) {
        // part 1 result is the number of accessible rolls in the first iteration
        firstAccessible = thisIteration;
    }

    // console.log(thisIteration);
    // printGrid(grid);
}

console.log('Part 1 - Initial number of accessible rolls:', firstAccessible);
console.log('Part 2 - Total number of paper rolls removed:', totalAccessible);
// printGrid(grid);
