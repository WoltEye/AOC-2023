const fs = require('fs');
const readline = require('readline');

const rlInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt')
});

const RAW_DATA = [];

function sum(values) {
    return values.reduce((acc, val) => acc + val, 0);
  }

rlInterface.on('line', (line) => {
  RAW_DATA.push(line.split(''));
});

rlInterface.on('close', () => {
 const partNumbers = [];
 for(let i = 0; i < RAW_DATA.length; i++) {
    let num = [];
    let symbolAdjacent = false; 
    for(let j = 0; j < RAW_DATA[i].length; j++) {
      const char = RAW_DATA[i][j];
      const under = RAW_DATA[i + 1] ? RAW_DATA[i + 1][j] : false;
      const top = RAW_DATA[i - 1] ? RAW_DATA[i - 1][j] : false;
      const left = RAW_DATA[i][j - 1] ? RAW_DATA[i][j - 1] : false;
      const right = RAW_DATA[i][j + 1] ? RAW_DATA[i][j + 1] : false;
      const topLeft = RAW_DATA[i - 1] ? RAW_DATA[i - 1][j - 1] : false;
      const topRight = RAW_DATA[i - 1] ? RAW_DATA[i - 1][j + 1] : false;
      const bottomLeft = RAW_DATA[i + 1] ? RAW_DATA[i + 1][j - 1] : false;
      const bottomRight = RAW_DATA[i + 1] ? RAW_DATA[i + 1][j + 1] : false;
      if(!isNaN(Number(char))) {
        num.push(char);
        if(
            top && isNaN(Number(top)) && top !== '.' ||
            under && isNaN(Number(under)) && under !== '.' ||
            left && isNaN(Number(left)) && left !== '.' ||
            right && isNaN(Number(right)) && right !== '.' ||
            topLeft && isNaN(Number(topLeft)) && topLeft !== '.' ||
            topRight && isNaN(Number(topRight)) && topRight !== '.' ||
            bottomLeft && isNaN(Number(bottomLeft)) && bottomLeft !== '.' ||
            bottomRight && isNaN(Number(bottomRight)) && bottomRight !== '.' 
          ) {
            symbolAdjacent = true; 
            //If row ends before finding non numeric character and there is a symbol adjacent to the number  
          } else if(j === RAW_DATA[i].length - 1 && symbolAdjacent) {
            partNumbers.push(Number(num.join('')))
            symbolAdjacent = false;
            num = [];
          } 
      } else {
        if(symbolAdjacent) { 
          partNumbers.push(Number(num.join('')))
          symbolAdjacent = false;
       }
        num = [];
      }
    }
 }
 console.log(sum(partNumbers));
})