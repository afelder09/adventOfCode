import { ifError } from "assert";

const util = require('util')
const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

interface OrbitInstruction {
    centerId: string,
    planetId: string
}

interface Planet {
    id: string,
    directOrbit: Planet[],
    indirectOrbits: Planet[]
}

//Convert input into orbit instructions array
const orbitInstructions = input.map((instruction: string): OrbitInstruction => {
    return {
        centerId: instruction.split(')')[0],
        planetId: instruction.split(')')[1]
    }
});

const executOrbitInstruction = (instruction: OrbitInstruction, universe: Planet[]): void => {
    const { centerId, planetId } = instruction;

    let centerPlanet = findPlanet(centerId, universe);
    let planet = findPlanet(planetId, universe);

    // If center doesnt exist, then create it
    if(centerPlanet === undefined) {
        centerPlanet = {id: centerId, directOrbit: [], indirectOrbits: []}
        universe.push(centerPlanet)
    }

    // If plaent doesnt exist, then create it
    if(planet === undefined) {
        // Make new planet and push to universe
        planet = {
            id: planetId, 
            directOrbit: [centerPlanet], 
            indirectOrbits: getAllOrbits(centerPlanet)
        };
        universe.push(planet);
    } else {
        // Update existing planet in universe
        const planetIndex = findPlanetIndex(planetId, universe);
        universe[planetIndex].directOrbit = [centerPlanet];
        universe[planetIndex].indirectOrbits = getAllOrbits(centerPlanet)
    }

    updateAllOrbits(universe);
}

const updatePlanetsOrbit = (planet: Planet | undefined): Planet | void => {
    
    if(planet===undefined) {
        return
    }
    const center = planet.directOrbit[0];
    if(center == undefined) {
        console.log('No center found')
    }
    else if(center.indirectOrbits == []) {
        planet.indirectOrbits = [];
    } else {
        planet.indirectOrbits = center.indirectOrbits.concat(center.directOrbit)
    }
    return planet;
}

const updateAllOrbits = (universe: Planet[]): Planet[] => {
    return universe.map((planet) => {
        const centerPlanet = planet.directOrbit[0]

        if(!centerPlanet == undefined) {
            updatePlanetsOrbit(findPlanet(centerPlanet.id, universe))
        }
        updatePlanetsOrbit(planet)
        return planet;
    })
}

const executeAllOrbitInstructions = (instructions: OrbitInstruction[], universe: Planet[]): void => {
    instructions.map(instruction => {
        executOrbitInstruction(instruction, universe);
    })
}

const findPlanet = (id: string, universe: Planet[]): Planet | undefined => {
    return universe.find((planet) => planet.id === id)
}

const findPlanetIndex = (id: string, universe: Planet[]): number => {
    return universe.findIndex((planet) => planet.id === id)
}

const getAllOrbits = (planet: Planet): Planet[] => {
    if(!planet.directOrbit) {
        return []
    } else if (!planet.indirectOrbits) {
        return planet.directOrbit
    } else {
        return planet.indirectOrbits.concat(planet.directOrbit);
    }
}

const countOrbits = (universe: Planet[]) : number => {
    return universe.reduce((orbits: number, planet: Planet): number => {
        return orbits + getAllOrbits(planet).length
    }, 0)
}

// The big bang
let universe: Planet[] = []
executeAllOrbitInstructions(orbitInstructions, universe);
updateAllOrbits(universe);
console.log('Total number of orbits in the universe: ', countOrbits(universe))
// console.log(util.inspect(universe, {showHidden: false, depth: null}))

