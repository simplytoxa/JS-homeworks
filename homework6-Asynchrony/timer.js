'use strict';

let timer = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);

    if (time !== time || typeof time !== 'number') {
      reject();
    }
  })
};



module.exports = timer;


// ----------------------------------------TESTS---------------------------------------------
// timer(5000).then(time => {
//   console.log(`я вывелась через ${time / 1000} секунды`);
//   return timer(2000)
// }).then(time => {
//   console.log(`я вывелась через ${time / 1000} секунды`);
//   return timer('asdasfasfasfas')
// }).then(time => {
//   console.log(`я вывелась через ${time / 1000} секунды`);
//   },
//   () => {
//     throw new Error('Invalid input!!!');
//   });