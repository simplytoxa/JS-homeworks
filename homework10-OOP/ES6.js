'use strict';

class Calculator {
  constructor(firstNumber) {
    this.firstNumber = firstNumber;
  }

  sum(...args) {
    let result = 0;

    if (args.length === 0) {
      throw new Error('Добавь параметров, будь человеком =)');
    }

    args.forEach(i => result += i);
    result += this.firstNumber;

    return result;
  }

  dif(...args) {
    let result = 0;

    if (args.length === 0) {
      throw new Error('Добавь параметров, будь человеком =)');
    }

    args.forEach(i => result -= i);
    result += this.firstNumber;

    return result;
  }

  div(...args) {
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
  }

  mul(...args) {
    let result = 1;

    if (args.length === 0) {
      throw new Error('Добавь параметров, будь человеком =)');
    }

    args.forEach(i => result *= i);

    result *= this.firstNumber;

    return result;
  }
}

class SqrCalc extends Calculator {
  constructor(firstNumber) {
    super(firstNumber);
  }

  sum(...args) {
    let result = 0;

    result = super.sum(...args);
    result = Math.pow(result, 2);

    return result;
  };

  dif(...args) {
    let result = 0;

    result = super.dif(...args);
    result = Math.pow(result, 2);

    return result;
  };

  div(...args) {
    let result = 0;

    result = super.div(...args);
    result = Math.pow(result, 2);

    return result;
  };

  mul(...args) {
    let result = 0;

    result = super.mul(...args);
    result = Math.pow(result, 2);

    return result;
  };
}

try {
  let myCalculator = new SqrCalc(100);
  console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
  console.log(myCalculator.dif(10, 20)); //вернет 4 900
  console.log(myCalculator.div(2, 2)); //вернет 625
  console.log(myCalculator.mul(2, 2)); //вернет 160 000
  // console.log(myCalculator.div(1, 0, 3)); // на ноль делим
  // console.log(myCalculator.sum());
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}