const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

//Declare interfaces
interface Coordinate {
    x: number,
    y: number,
    value: string
}

interface Instruction {
    direction: string,
    distance: number
}

const firstInstructions: string[] = input[0].split(',');
const secondInstructions: string[] = input[1].split(',');

const mapInstructions = (instructions: string[]): Instruction[] => {
    return instructions.map((step) => {
        const direction = step.substring(0,1);
        const distance = parseInt(step.substring(1));

        return {
            direction,
            distance
        }
    })
}

const getCoordinate = (map: Coordinate[], x: number, y: number): Coordinate | undefined => {
    return map.find(coor => coor.x === x && coor.y === y);
}

const createCoordinate = (map: Coordinate[], x: number, y:number): Coordinate => {
    let existingCoor = getCoordinate(map, x, y);
    if(existingCoor === undefined){
        //Create a new coordinate
        let newCoor = {
            x: x,
            y: y,
            value: '-'
        }
        map.push(newCoor);
        return newCoor
    } else {
        if(existingCoor.value == '-') {
            existingCoor.value = 'X'
        } else {
            existingCoor.value = '-';
        }
        return existingCoor;
    }
}

const executeInstruction = (map: Coordinate[], start: Coordinate, instruction: Instruction): Coordinate => {
    let lastCoordinate = start;
    switch(instruction.direction) {
        case 'U':
            for(let i = 0; i < instruction.distance; i++) {
                lastCoordinate = createCoordinate(map, lastCoordinate.x, lastCoordinate.y+1);
            }
            return lastCoordinate
        case 'D':
            for(let i = 0; i < instruction.distance; i++) {
                lastCoordinate = createCoordinate(map, lastCoordinate.x, lastCoordinate.y - 1);
            }
            return lastCoordinate
        case 'R':
            for(let i = 0; i < instruction.distance; i++) {
                lastCoordinate = createCoordinate(map, lastCoordinate.x+1, lastCoordinate.y)
            }
            return lastCoordinate
        case 'L':
            for(let i = 0; i < instruction.distance; i++) {
                lastCoordinate = createCoordinate(map, lastCoordinate.x - 1, lastCoordinate.y)
            }
            return lastCoordinate
    }
    return lastCoordinate
}


const drawWire = (map: Coordinate[], start: Coordinate, instructions: Instruction[]): void => {
    let lastCoordinate = start;
    instructions.forEach((step) => {
        lastCoordinate = executeInstruction(map, lastCoordinate, step);
    })
}

const calculateDistance = (point: Coordinate): number => {
    return Math.abs(point.x) + Math.abs(point.y)
}

let map: Coordinate[] = [];
map.push({
    x: 0,
    y: 0,
    value: 'o'
})

drawWire(map, map[0], mapInstructions(firstInstructions));
drawWire(map, map[0], mapInstructions(secondInstructions));

const crosses = map.filter((coor) => coor.value === 'X');
console.log(crosses)

const distances = crosses.map((coor) => {
    return calculateDistance(coor);
})
console.log(distances)

console.log(Math.min(...distances));