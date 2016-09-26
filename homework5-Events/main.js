'use strict';

;(() => {
  let myModule = {};

  publicMethod();
  init();
  attachEvents();

  function init() {

  }

  function attachEvents() {
    let trigger = document.querySelector('.accordeon__list');

    trigger.addEventListener('click', accordion);
  }

  function accordion(e) {
    e.preventDefault();

    let eTarget = e.target,
      list = eTarget.closest('.accordeon__list'),
      item = eTarget.closest('.accordeon__item'),
      items = list.querySelectorAll('.accordeon__item'),
      isActive = item.classList.contains('active'),
      count = 0;

    for (let elem of items) {
      if (elem.classList.contains('active')) {
        count++;
      }
    }

    if(!isActive) {

      for (let elem of items) {
        elem.classList.remove('active');
      }

      if (count > 0) {
        setTimeout(function() {
          item.classList.add('active');
        }, 400);
      } else {
        item.classList.add('active');
      }

    } else {
      item.classList.remove('active');
    }
  }

  function publicMethod() {
    myModule = {

    }
  }

  window.myModule = myModule;
})();