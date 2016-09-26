'use strict';

;(() => {
  let cookieModule = {},
      names = [],
      values = [],
      nList = document.querySelector('.name__list'),
      vList = document.querySelector('.value__list'),
      add = document.querySelector('#add-btn'),
      arr = [];

  publicMethod();
  init();
  attachEvents();

  function init() {
    let date1 = new Date(2016, 7, 9).toUTCString(),
        date2 = new Date(2016, 7, 10).toUTCString(),
        date3 = new Date(2016, 7, 11).toUTCString(),
        elem = [],
        li,
        btn,
        /**
         * Function that inserts results to the appropriate list
         * @param arr - Array with the elements
         * @param list - List to which elements should be appended
         * @param btn - Boolean. If true - the function adds delete buttons
         */
        append = (arr, list, btn) => {
          arr.forEach(el => {
            li = document.createElement('li');
            li.innerHTML = el;
            list.appendChild(li);

            if (btn) {
              btn = document.createElement('button');
              btn.innerHTML = 'Delete';
              btn.classList.add('delete-btn');
              li.appendChild(btn);
            }
          });
        };

    document.cookie = `sayHi=Hi; expires=${date1}`;
    document.cookie = `greeting=hello hello hello hello; expires=${date2}`;
    document.cookie = `something=asdaffas a fasf; expires=${date3}`;
    document.cookie = `bla=blabla; expires=${date3}`;

    arr = document.cookie.split(';');

    arr.forEach(el => {
      elem = el.split('=');

      names.push(elem[0]);
      values.push(elem[1]);
    });

    append(names, nList);

    append(values, vList, true);
  }

  function attachEvents() {
    document.addEventListener('click', deleteCookie);
    add.addEventListener('click', addCookie);
  }

  /**
   * Deletes cookie from the browser and table.
   * @param e
   */
  function deleteCookie(e) {
    let index = 0,
        deleteDate = new Date(),
        cookies = document.cookie.split(';');

    deleteDate.setTime(deleteDate.getTime() - 1);

    if (e.target.className === 'delete-btn') {
      index = values.indexOf(e.target.previousSibling.textContent);

      if (window.confirm(`Удалить cookie с именем ${names[index]}?`)) {
        document.cookie = `${cookies[index]}; expires=${deleteDate.toUTCString()}`;

        vList.removeChild(vList.children[index]);
        nList.removeChild(nList.children[index]);

        names.splice(index, 1);
        values.splice(index, 1);
      }
    }
  }

  /**
   * Adds new cookie.
   * @param e
   */
  function addCookie(e) {
    let name = document.forms[0].name,
        val = document.forms[0].value,
        exp = document.forms[0].days,
        date = new Date(),
        li,
        /**
         * Inserts element to the table.
         * @param value - Value from input that should be added to table.
         * @param dest - Destination.
         * @param btn - Boolean. If true - the function adds delete buttons.
         */
        insertNew = (value, dest, btn) => {
          li = document.createElement('li');
          li.innerHTML = value;
          dest.insertBefore(li, dest.firstElementChild);

          if (btn) {
            btn = document.createElement('button');
            btn.innerHTML = 'Delete';
            btn.classList.add('delete-btn');
            li.appendChild(btn);
          }
        };

    e.preventDefault();

    name.value = name.value.replace(/(^\s+|\s+$)/g,'');
    val.value = val.value.replace(/(^\s+|\s+$)/g,'');
    exp.value = exp.value.replace(/(^\s+|\s+$)/g,'');


    if (name.value.length && val.value.length && exp.value.length) {
      date.setDate(date.getDate() + parseInt(exp.value));

      document.cookie = `${name.value}=${val.value}; expires=${date.toUTCString()}`;

      insertNew(name.value, nList);
      insertNew(val.value, vList, true);

      names.splice(0, 0, name.value);
      values.splice(0, 0, val.value);

      name.value = '';
      val.value = '';
      exp.value = '';

    } else {
      alert('Заполните все поля формы');
    }
  }

  function publicMethod() {
    cookieModule = {
        // name : public function
    }
  }

  window.cookieModule = cookieModule;
})();
