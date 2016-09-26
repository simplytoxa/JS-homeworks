'use strict';

;(() => {
  let ajaxModule = {},
      btn = document.querySelector('.btn'),
      ctn = document.querySelector('.container'),
      reset = document.querySelector('.btn-reset');

  publicMethod();
  init();
  attachEvents();

  function init() {
    // Some code..functions that are needed for module initialization
  }

  function attachEvents() {
    btn.addEventListener('click', showCities);
    reset.addEventListener('click', ajaxModule.clearScreen);
  }

  /**
   * Function that display cities on the screen.
   */
  function showCities() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
        div,
        arr = [];

    ajaxModule.sendAjax(url).then(response => {
      for (let item of response) {
        arr.push(item.name);
      }

      arr.sort();

      for (let elem of arr) {
        div = document.createElement('div');
        div.innerHTML = elem;
        ctn.appendChild(div);
      }
    },

    () => {
      throw new Error('You have an error!!!');
    });
  }

  function publicMethod() {
    ajaxModule = {
      /**
       * Public function that clears container.
       */
      clearScreen() {
        ctn.innerHTML = '';
      },

      /**
       * Public function that sends AJAX request and gets data from server.
       * @param url - Url of source
       * @returns {Promise}
       */
      sendAjax(url) {
        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
            resolve(xhr.response);
          });
          xhr.addEventListener('error', () => {
            reject();
          });
          xhr.send();
        });
      }
    }
  }

  window.ajaxModule = ajaxModule;
})();