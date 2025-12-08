// day 8 solution
// "Playground"
// generate all 3d points, each in their own set and calculate their distances,
// then start iterating with smallest (remaining) distance and update the 
// point sets accordingly - part 1 and 2 can be done in one go
// part 1: After iteratin 10 / 1000 distances, identify three biggest sets and multiply their sizes 
// part 2: Iterate further until only one set remains, mutliply the x-values of the last points


import { inputFileName, readFileAsStringArray } from "../aoc/input";

const fname = inputFileName(__dirname);
const data = readFileAsStringArray(fname);

// a Point3D is a point in space, which also contains a link to the set it belongs to
// (during intiatilization, each point gets its own set)
class Point3D {
    x: number;
    y: number;
    z: number; 
    set: Set<Point3D>;
    constructor(x: number, y: number, z: number, set: Set<Point3D>) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.set = set;
        this.set.add(this);
    }
    distanceTo(other: Point3D): number {
        return Math.sqrt(
            (this.x - other.x) ** 2 +
            (this.y - other.y) ** 2 +
            (this.z - other.z) ** 2
        );
    }
}

// a Tuple consists of two points and their distance
// during intiatilization, all potential tuples get created
class Tuple {
    first: Point3D;
    second: Point3D;
    dist: number;
    constructor(p1: Point3D, p2: Point3D) {
        this.first = p1;
        this.second = p2;
        this.dist = p1.distanceTo(p2);
    }   
}

// process data for part 1 and part 2
function processInput(data: string[]) {

    // allSets is the main entity we manage in this process
    // initially an empty set, this set keeps track of all existing
    // sets containing the points 
    let allSets: Set<Set<Point3D>> = new Set();

    // read points, each with its own set, and add it to allSets
    const points: Point3D[] = [];
    for (let line of data) {
        let vals = line.split(",").map(Number);
        let newSet = new Set<Point3D>();
        allSets.add(newSet);
        let point = new Point3D(vals[0], vals[1], vals[2], newSet);
        points.push(point);
    }
    console.log("Read", points.length, "points");

    // create list of all distances and sort them from small to big 
    const tuples: Tuple[] = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            tuples.push(new Tuple(points[i], points[j]));
        }
    }
    const sortedTuples = tuples.sort((a, b) => b.dist - a.dist)
    
    const part1Iterations = process.argv.includes('--test') ? 10 : 1000;
    let ct: Tuple|undefined = undefined;

    for (let i = 1; allSets.size > 1; i++) {

        ct = sortedTuples.pop();
        if (ct === undefined) {
            // should not happen
            console.log("Error - no more distances in stack");
            break;
        }

        // console.log(`Processing points (${ct.first.x},${currDist.first.y},${ct.first.z}) and (${ct.second.x},${ct.second.y},${ct.second.z}) - (distance: ${ct.dist})`);

        // if first only its own set -> add it to set of second point
        if (ct.first.set.size === 1) {
            ct.second.set.add(ct.first);
            allSets.delete(ct.first.set);
            ct.first.set = ct.second.set;
        }
        // if second only its own set -> add it to the set of first point
        else if (ct.second.set.size === 1) {
            ct.first.set.add(ct.second);
            allSets.delete(ct.second.set);
            ct.second.set = ct.first.set;
        }
        // both in different sets -> merge
        else if (ct.first.set !== ct.second.set) {
            // merge sets (can be optimized to merge smaller into larger)
            let set1 = ct.first.set;
            let set2 = ct.second.set;
            for (let p of set2) {
                set1.add(p);
                allSets.delete(p.set);
                p.set = set1;
            }
            ct.second.set = ct.first.set;
        }

        if (i === part1Iterations) {
            // part 1 is done - sort sets by size (biggest first) 
            // and multiply size of three biggest sets
            const sortedSets = Array.from(allSets.values()).sort((a, b) => b.size - a.size);
            const total = sortedSets.slice(0,3).reduce((acc, s) => acc * s.size, 1);
            console.log('Multiplying three largest sets (part 1):', total)
        }
    }

    console.log('Multiplying x-values of last points (part 2):', 
                ct!.first.x * ct!.second.x)

}

 processInput(data);
