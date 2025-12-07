export function mul(arr: number[]): number {
    return arr.reduce((a, b) => a * b, 1);
}
export function add(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
}
