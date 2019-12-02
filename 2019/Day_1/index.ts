const fs = require("fs");
const input = fs.readFileSync('./data.txt', 'utf-8').trim().split('\n')

const masses = input.map(Number);

const calculateFuel = (mass:number):number => {
    let baseFuel =  Math.floor(mass / 3) - 2;
    if(baseFuel>6) {
        const additionalFuel = calculateFuel(baseFuel);
        return baseFuel + additionalFuel;
    } else {
        return baseFuel
    }
}

const fuel = masses.reduce((acc: number, mass: number) => {
    return acc + calculateFuel(mass);
}, 0)

console.log(fuel)