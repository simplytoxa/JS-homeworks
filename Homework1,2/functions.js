'use strict';

let consoleRec = (src, steps) => {
  if (steps <= src.length){
    console.log(src[src.length - steps]);
  }

  steps -= 1;
  if (steps >= 0) {
    consoleRec(src, steps);
  }
  return false;
};

// let array = ['я', 'умею', 'писать', 'рекурсивные', 'функции'];
//
// consoleRec(array, 5);


module.exports = consoleRec;