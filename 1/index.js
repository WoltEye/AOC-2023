const fs = require('fs');
const readline = require('readline');

const interface = readline.createInterface({
  input: fs.createReadStream('./input.txt')
});

const NUM_NAMES = ['one','two','three','four','five','six','seven','eight','nine'];

function numNameToNum(numName) {
  switch(numName) {
    case 'one': return 1;
    case 'two': return 2;
    case 'three': return 3;
    case 'four': return 4;
    case 'five': return 5;
    case 'six': return 6;
    case 'seven': return 7;
    case 'eight': return 8;
    case 'nine': return 9;
    default: return false;
  }
}

function stringHasNumName(string) {
for (const numName of NUM_NAMES) {
  if(string.includes(numName)) {
    return numName;
  }
}
return false;
}
// :DDD


const inputStrings = [];
const numbers = [];
let sum = 0;

interface.on('line', (line) => {
  const lineString = line.toString().trim();
  inputStrings.push(lineString);
});

interface.on('close', () => {
  for(let i = 0; i < inputStrings.length; i++) {
    let numCount = 0;
    const num = [];
    let letters = [];
    for(let j = 0; j < inputStrings[i].length; j++) {
      const char = inputStrings[i][j];
      if(!isNaN(Number(char))) {
      letters = [];
      if(numCount < 2) {
        num.push(Number(char));
        numCount++;
      } else {
        num[1] = Number(char);
      }
     } else {
       letters.push(char);
       if(stringHasNumName(letters.join(''))) {
         if(numCount < 2) {
          num.push(numNameToNum(stringHasNumName(letters.join(''))));
          numCount++;
         } else {
          num[1] = numNameToNum(stringHasNumName(letters.join('')));
         }
         letters = [letters[letters.length - 1]];
       }
     }
    }
    letters = [];
    if(num.length === 2) {
      numbers.push(Number(num.join('')));
    } else if(num.length === 1) {
      num[1] = num[0];
      numbers.push(Number(num.join('')));
    }
  }
  for(let k = 0; k < numbers.length; k++) {
    sum += numbers[k];
  }
 console.log(sum);
});