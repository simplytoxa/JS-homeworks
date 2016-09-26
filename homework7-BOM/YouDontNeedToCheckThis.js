'use strict';

;(() => {
  let divModule = {},
      created = false,
      activeElement,
      offsetX = 0,
      offsetY = 0;

  publicMethod();
  init();
  attachEvents();

  function init() {

  }

  function attachEvents() {
    let btn = document.querySelector('.btn-link');

    btn.addEventListener('click', createDiv);
    document.addEventListener('mousemove', dragNdrop);
    document.addEventListener('mousedown', mDown);
    document.addEventListener('mouseup', mUp);
  }

  function createDiv(e) {
    e.preventDefault();

    let elem = document.createElement('div'),
        grad1 = Math.round(Math.random() * 256),
        grad2 = Math.round(Math.random() * 256),
        grad3 = Math.round(Math.random() * 256),
        width = Math.round(Math.random() * 500);

    elem.classList.add('new-div');
    elem.style.height = Math.round(Math.random() * 500) + 'px';
    elem.style.width = `${width}px`;
    elem.style.backgroundColor = `rgb(${grad1}, ${grad2}, ${grad3})`;
    elem.style.left = Math.random() * (screen.width - width) + 'px';
    elem.style.top = Math.random() * screen.height + 'px';

    document.body.appendChild(elem);

    return created = true;
  }

  function mDown(e) {
    activeElement = e.target;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  }

  function mUp() {
    activeElement = undefined;
  }

  function dragNdrop(e) {

    if (created || document.body.childElementCount > 0) {
      if (activeElement && activeElement.tagName !== 'BODY' && activeElement.tagName !== 'BUTTON') {
        activeElement.style.top = (e.clientY - offsetY) + 'px';
        activeElement.style.left = (e.clientX - offsetX) + 'px';
      }
    }

  }

  function publicMethod() {
    divModule = {
      // name : public function
    }
  }

  window.divModule = divModule;
})();