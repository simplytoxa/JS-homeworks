'use strict';

function Calculator(firstNumber) {
  this.firstNumber = firstNumber;
}

Calculator.prototype.sum = function(...args) {
  let result = 0;

  if (args.length === 0) {
    throw new Error('Добавь параметров, будь человеком =)');
  }

  args.forEach(i => result += i);
  result += this.firstNumber;

  return result;
};

Calculator.prototype.dif = function(...args) {
  let result = 0;

  if (args.length === 0) {
    throw new Error('Добавь параметров, будь человеком =)');
  }

  args.forEach(i => result -= i);
  result += this.firstNumber;

  return result;
};

Calculator.prototype.div = function(...args) {
  let result = 1;

  if (args.length === 0) {
    throw new Error('Добавь параметров, будь человеком =)');
  }

  args.forEach(i => {
    if (i === 0) {
      throw new Error('Нельзя делить на ноль!!! Как не стыдно?');
    }
    result *= i;
  });

  result = this.firstNumber / result;

  return result;
};

Calculator.prototype.mul = function(...args) {
  let result = 1;

  if (args.length === 0) {
    throw new Error('Добавь параметров, будь человеком =)');
  }

  args.forEach(i => result *= i);

  result *= this.firstNumber;

  return result;
};

function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
  child.prototype.parent = parent;
}

inherit(SqrCalc, Calculator);

function SqrCalc(firstNumber) {
  this.parent.call(this, firstNumber);
}

function powResult(method, ...args) {
  let result = 0;

  switch (method) {
    case 'sum':
      result = this.parent.prototype.sum.call(this, ...args);
      break;
    case 'dif':
      result = this.parent.prototype.dif.call(this, ...args);
      break;
    case 'div':
      result = this.parent.prototype.div.call(this, ...args);
      break;
    case 'mul':
      result = this.parent.prototype.mul.call(this, ...args);
      break;
    default:
      throw new Error('Incorrect method!!!');
  }

  result = Math.pow(result, 2);

  return result;
}

SqrCalc.prototype.sum = function (...args) {
  return powResult.call(this, 'sum', ...args);
};

SqrCalc.prototype.dif = function(...args) {
  return powResult.call(this, 'dif', ...args);
};

SqrCalc.prototype.div = function(...args) {
  return powResult.call(this, 'div', ...args);
};

SqrCalc.prototype.mul = function(...args) {
  return powResult.call(this, 'mul', ...args);
};

try {
  let myCalculator = new SqrCalc(100);
  console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
  // console.log(myCalculator.dif(10, 20)); //вернет 4 900
  // console.log(myCalculator.div(2, 2)); //вернет 625
  // console.log(myCalculator.mul(2, 2)); //вернет 160 000
  // console.log(myCalculator.div(1, 0, 3)); // на ноль делим
  // console.log(myCalculator.sum());
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}