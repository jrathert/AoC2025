export function stringToGrid(input: string): string[][] {
    let lines = input.trim().split('\n').map(line => line.trim());
    let grid = Array<string[]>(lines.length);
    for (let i =  0; i < lines.length; i++) {
        grid[i] = lines[i]!.split('')
    }
    return grid;
}

export function printGrid(grid: string[][]): void {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i]!.join(''));
    }
}
export function copyGrid(grid: string[][]): string[][] {
    let newGrid = Array<string[]>(grid.length);
    for (let i = 0; i < grid.length; i++) {
        newGrid[i] = grid[i]!.slice();  // trick to create a copy
    }
    return newGrid;
}

// return neighbors of a position in a grid - basically a list of (x,y) positions
export function listGridNeighbors(pos: [number, number], n: number, m: number): [number, number][] {
    // pos is [x, y], x representing the row, y representing the col
    // n = num rows, m = num cols
    // return the array of neighbors
    const x = pos[0];
    const y = pos[1];
    let neighs: [number, number][] = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            if (x+i >= 0 && x+i < n && y+j >= 0 && y+j < m) {
                neighs.push([x+i, y+j]);
            }
        }
    }
    return neighs;
}

