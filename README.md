# AoC2025
Advent of Code 2025 - in TypeScript ...

## About this repository

This year I am participating [Advent of Code](https://adventofcode.com/2025/) to have fun with _TypeScript_ (yeah!)

Although already "in programming" when JavaScript came up in the mid 1990ies, I never really got used to it. Maybe because I never got into web-programming (even today, I find HTML-CSS-JS quite exhausting), and never considered JavaScript to be a "real programming language" for server-side or even cli programming.

Now is the time! Please read about my learnings in [LEARNINGS.md](./LEARNINGS.md)

## What to find in this repository

There is a convenience script as well as a solution template/skeletong available, to make life easier: one to download input and prepare a template, and another just to download the input

- `prepare.ts` - called via `npx ts-node prepare.ts <day>` - will 
    1. create a target directory
    2. (try to) download the input of the specified `<day>`
    3. copy the input data, task (for part 1) as well as the template dile `template/solution-tmpl.ts` into that directory and 
    4. starts up VS Code. 
- `loadinput.ts` - called via `npx ts-node loadinput.ts <day>` - will 
    1. create a target directory (if it does not exist)
    2. (try to) download the input data and task of the specified `<day>`
    
E.g., `npx ts-node prepare.ts 3` will create a director `d03` and put the respective input file `input.txt` and the task (first part) into `task.txt` into it, as well as askeleton `solution.ts`. If the output directory already exists, the script will exit, to avoid overwriting any code. Note that `loadinput.ts` will *always* download the input and overwrite existing one!


### Access to input files

Of course, downloading the input via the script only works if the input is already available on the website (i.e. it must be at least midnight EST/UTC-5). Also, to be able to access the input, you need to put your AoC session variable into the `.env` file - it will be read and used by the script:

```
sessiontoken=abcdefgh12345678...
```

You can grab this token using your browsers development tools after logging in into Advent of Code website, see [this reddit thread](https://www.reddit.com/r/adventofcode/comments/a2vonl/how_to_download_inputs_with_a_script/).

### Happy hacking

The `prepare.ts` script starts up VS Code in the main directory, but you are supposed to open and run/debug the `solution.ts` file in the directory of the respective day. 

### Note on subdirectories

The subdirectories contain my solutions. This year, I could only start on Dec 3rd, and had to set up the full structure first, including the `aoc` subdirectory with some general tools. 

## License

MIT License, Copyright (c) 2025 Jonas Rathert - see file `LICENSE.txt`
