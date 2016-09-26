'use strict';

let Controller = require('./controller');

module.exports = {
  handle(route) {
    let routeName = route + 'Route';

    if (!Controller.hasOwnProperty(routeName)) {
      throw new Error('Маршрут не найден!');
    }

    Controller[routeName]();
  }
};

