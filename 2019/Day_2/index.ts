const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split(',');

const addOp = (state: number[], index: number): void => {
    const noun = state[state[index+1]];
    const verb = state[state[index+2]]
    state[state[index+3]] = noun + verb;
}

const multiplyOp = (state: number[], index: number): void => {
    const noun = state[state[index+1]];
    const verb = state[state[index+2]]
    state[state[index+3]] = noun * verb;
}

let state = input.map(Number)

// let state = [1,1,1,4,99,5,6,0,99]

let keepGoing = true;
let index = 0
console.log(state[index])
while(keepGoing) {
    const opcode = state[index]
    if(opcode == 1) {
        console.log('In add case');
        addOp(state, index);
        index = index + 4
    } else if(opcode ==2) {
        console.log('In multiply case')
        multiplyOp(state, index);
        index = index + 4
    } else {
        keepGoing = false;
    }
}

console.log(state[0])

