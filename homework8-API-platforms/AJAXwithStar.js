'use strict';

;(() => {
  let starModule = {},
      input = document.querySelector('.find'),
      ctn = document.querySelector('.container');

  publicMethod();
  init();
  attachEvents();

  function init() {
    // Some code..functions that are needed for module initialization
  }

  function attachEvents() {
    window.addEventListener('load', getData);
  }

  /**
   * Function that loads data from server and realizes search in it.
   */
  function getData() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    ajaxModule.sendAjax(url).then(response => {

      input.addEventListener('keyup', e => {
        let iVal = input.value,
            div,
            arr = [],

            // Function for comparing input value with given data
            compare = () => {
              for (let val of response) {
                arr.push(val.name);
              }

              arr.forEach(word => {
                if (word.indexOf(iVal) !== -1) {
                  div = document.createElement('div');
                  div.innerHTML = word;
                  ctn.appendChild(div);
                }
              });
            };

        /**
         * Events for letters.
         */
        if (e.keyCode >= 65 && e.keyCode <= 90) {
          ajaxModule.clearScreen();

          compare();
        }
        /**
         * Events for DEL & Backspace.
         */
        else if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 127) {
          if (iVal) {
            ajaxModule.clearScreen();

            compare();
          } else {
            ajaxModule.clearScreen();
          }
        }
      });
    },

    () => {
      throw new Error('You have an error!!!');
    });
  }

  function publicMethod() {
    starModule = {
      // name : public method
    }
  }

  window.starModule = starModule;
})();
