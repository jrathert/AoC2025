// day 4 solution
// "paper roll arrangement"
// find the number of accessible paper rolls in a grid
// a paper roll ("@") is accessible if it has less than 4 neighbors containing paper rolls
// task 1: determine the number of accessible paper rolls in the initial arrangement
// task 2: remove and iterate until no more paper rolls are accessible

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

// task 1: determine the number of accessible paper rolls in the initial arrangement
let numAccessible = 0;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (isAccessible(grid, N, M, [i, j])) {
            numAccessible++;
        }
    }
}
console.log('Task 1 - Number of accessible paper rolls:', numAccessible);

// task 2: iterate until no more paper rolls are accessible
let totalAccessible = 0;

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

    // console.log(thisIteration);
    // printGrid(grid);
}

console.log('Task 2 - Total number of rolls removed:', totalAccessible);
// printGrid(grid);
