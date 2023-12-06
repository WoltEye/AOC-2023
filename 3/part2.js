const fs = require('fs');
const readline = require('readline');

const rlInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt')
});

const RAW_DATA = [];

function sum(values) {
    return values.reduce((acc, val) => acc + val, 0);
  }

function arrayIncludes(arr, arr2) {
  let includes = false;
  for (const item of arr) {
    for (const item2 of arr2) {
      if(item.toString() === item2.toString()) {
        includes = true;
      }
    }
  }
  return includes;
}

rlInterface.on('line', (line) => {
  RAW_DATA.push(line.split(''));
});

rlInterface.on('close', () => {
 const gearRatios = [];
 const adjacentGearNumbers = [];
 for(let i = 0; i < RAW_DATA.length; i++) {
    let num = [];
    let currentAdjacentGearLocations = [];
    for(let j = 0; j < RAW_DATA[i].length; j++) {
      const char = RAW_DATA[i][j];
      const under = RAW_DATA[i + 1] ? [i + 1, j] : false;
      const top = RAW_DATA[i - 1] ? [i - 1, j] : false;
      const left = RAW_DATA[i][j - 1] ? [i, j - 1] : false;
      const right = RAW_DATA[i][j + 1] ? [i, j + 1] : false;
      const topLeft = RAW_DATA[i - 1] ? [i - 1, j - 1] : false;
      const topRight = RAW_DATA[i - 1] ? [i - 1, j + 1] : false;
      const bottomLeft = RAW_DATA[i + 1] ? [i + 1, j - 1] : false;
      const bottomRight = RAW_DATA[i + 1] ? [i + 1, j + 1] : false;
      const gearDirections = [under, top, left, right, topLeft, topRight, bottomLeft, bottomRight].filter(direction => {
      if(direction[0]) {
        if(RAW_DATA[direction[0]][direction[1]] === '*') {
          return direction;
        }
      }
    });
      
      if(!isNaN(Number(char))) {
      num.push(char);
      if(gearDirections.length > 0) {
        for(const direction of gearDirections) {
          let duplicate = false;
          for(const adjacentGearLocation of currentAdjacentGearLocations) {
            if(adjacentGearLocation.toString() === direction.toString()) {
              duplicate = true;
            }
          }
          if(!duplicate) {
            currentAdjacentGearLocations.push(direction);
          }
        }
      }
        if(j === RAW_DATA[i].length - 1) {
          if(currentAdjacentGearLocations.length > 0) {
            adjacentGearNumbers.push({ num: num.join(''), gearLocations: currentAdjacentGearLocations });
          }
          num = [];
          currentAdjacentGearLocations = [];
        }
      } else {
        if(currentAdjacentGearLocations.length > 0) {
          adjacentGearNumbers.push({ num: num.join(''), gearLocations: currentAdjacentGearLocations });
        }
        num = [];
        currentAdjacentGearLocations = [];
      }
   }   
 }
 const multipliedIndexes = [];
 for(let i = 0; i < adjacentGearNumbers.length; i++) {
    const gearNumber = Number(adjacentGearNumbers[i].num);
    const gearLocations = adjacentGearNumbers[i].gearLocations;
    const numbersToMultiply = [gearNumber];
    let indexOfDuplicate;
    for(let j = 0; j < adjacentGearNumbers.length; j++) {
      if(arrayIncludes(adjacentGearNumbers[j].gearLocations, gearLocations) && i !== j && !multipliedIndexes.includes(j)) {
        numbersToMultiply.push(Number(adjacentGearNumbers[j].num));
        indexOfDuplicate = j;
      }
    }
    if(numbersToMultiply.length === 2) {
      multipliedIndexes.push(i);
      multipliedIndexes.push(indexOfDuplicate);
      gearRatios.push(numbersToMultiply[0] * numbersToMultiply[1]);
    } 
 }
 console.log(sum(gearRatios)); 
})