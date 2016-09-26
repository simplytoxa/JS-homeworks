'use strict';

;(() => {
  let starModule = {};

  publicMethod();
  init();
  attachEvents();

  function init() {
    new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.onload = resolve;
      }
    }).then(() => {
      let cookie = document.cookie,
          search = 'divState',
          state = '',
          div;

      cookie = cookie.split(';');
      cookie.forEach(el => {
        if (el.indexOf(search) !== -1) {
          state = el;
        }
      });

      state = state.replace(/>/g, ';');

      if (state) {
        state = state.split('&');

        state.forEach(el => {
          div = document.createElement('div');
          div.classList.add('new-div');
          div.setAttribute('style', `${el}`);

          document.body.appendChild(div);
        });
      }
    });
  }

  function attachEvents() {
    let save = document.querySelector('.save');

    save.addEventListener('click', saveState);
  }

  /**
   * Saves state of all divs to cookie
   */
  function saveState() {
    let divs = document.querySelectorAll('.new-div'),
        styles = [];

    if (divs.length > 0) {
      for (let el of divs) {
        styles.push(el.getAttribute('style'));
      }

      styles = styles.join('&');
      styles = styles.replace(/;/g, '>');

      document.cookie = `divState=${styles}; expires`;
    } else {
      alert('Create divs!!!');
    }
  }

  function publicMethod() {
    starModule = {
      // name : public function
    }
  }

  window.starModule = starModule;
})();
