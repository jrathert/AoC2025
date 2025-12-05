# Learnings

## The TypeScript environment

### Installation

Even 2025, TypeScript requires JavaScript (of course) and its environment.

So you need to install:

- Node.js (including `npm` and `npx`)
- TypeScript in the project via `npm install typescript --save-dev` (and then use `npx tsc` to compile) OR
- TypeScript globally via `npm install -g typescript`

`tsc` then allows you to compile files, and with a proper `tsconfig.json` that you may get with `tsc --init` you can get all JS files being written in a separate directory - and then run via `node`.

A shortcut is the handy `ts-node` module, that can be installed in the project via `npm install -D ts-node` and then be used like `npx ts-code <yourfile.ts>`

### Modules suck

The __module system__, inherited from JavaScript, sucks. You need to have a good combination of values in `tsconfig.json` and `package.json` (the latter only being needed for the `prepare.ts` script). 

I finally was successful with having the following in `tsconfig.json`: 

```
    "compilerOptions": {
        "target": "ES6",
        "module": "nodenext",
        "strict": true,
        "outDir": "dist",
        "sourceMap": true
    }
```

and also ensure to __NOT__ have a line

```
    "type": "module"
```

in top-level `package.json` (which is the *"nearest"* for the project files)

### VS Code debugging

Due to the "chain" TS -> JS -> Node you need a `launch.json` for VS Code in order for the Debugging to work smoothly, even in complexer file structures. You need a pre-launch task to compile the sources. Make sure in you `tsconfig.json` that 
- files land in a specific directory `"outDir": "dist"`
- you enable source maps `"sourceMap": true`

Then, your `launch.json` should look like this
```
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${file}", 
            "preLaunchTask": "tsc: build - tsconfig.json",
        }
    ]
```

