const fs = require('fs');
const readline = require('readline');

const rlInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt')
});

const RAW_DATA = [];

const AMOUNTS = {
  red: 12,
  green: 13,
  blue: 14
}

const NUMBER_REGEX = /\d+/;
const LETTER_REGEX = /[a-z]/g;

//I hate naming functions
function arrayOfArraysToArrayOfObjects(keyArr, valueArr) {

  const results = []

  for(let i = 0; i < keyArr.length; i++) {
    const obj = {};
    for(let j = 0; j < keyArr[i].length; j++) {
      obj[keyArr[i][j]] = valueArr[i][j];
    }
    results.push(obj);
  }
  return results;
}

function splitCommas(arr) {
  return arr.map(item => item.split(','));
}

function returnColors(arr) {
  const letters = [];
  for(const child of arr) {
    //Temporary array so each game has its own array
    const tempArr = [];
    for(const item of child) {
      tempArr.push(item.match(LETTER_REGEX).join(''));    
    }
    letters.push(tempArr);
  }
  return letters;
}

function returnValues(arr) {
    const values = [];
    for(const child of arr) {
      //Temporary array so each game has its own array
      const tempArr = [];
      for(const item of child) {
        tempArr.push(Number(item.match(NUMBER_REGEX).join('')));    
      }
      values.push(tempArr);
    }
    return values;
  }

  function sum(values) {
    return values.reduce((acc, val) => acc + val, 0);
  }

rlInterface.on('line', (line) => {
  RAW_DATA.push(line);
});

rlInterface.on('close', () => {
  const games = [];
  const validGameIDs = [];
  for(let i = 0; i < RAW_DATA.length; i++) {
    const game = RAW_DATA[i].split(':');
    const gameResults = splitCommas(game[1].split(';'));
    const gameResultColors = returnColors(gameResults);
    const gameResultValues = returnValues(gameResults);
    games.push(arrayOfArraysToArrayOfObjects(gameResultColors, gameResultValues));
  }
  for(let i = 0; i < games.length; i++) {
    let isValidGame = true;
    for(let j = 0; j < games[i].length; j++) {
    if(games[i][j].blue > AMOUNTS.blue || 
       games[i][j].green > AMOUNTS.green ||
       games[i][j].red > AMOUNTS.red) {
         isValidGame = false;
       }
    }
    if(isValidGame) {
      validGameIDs.push(i + 1);
    }
  }
  console.log(sum(validGameIDs));
})
