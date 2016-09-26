'use strict';

new Promise(resolve => {
  if (document.readyState === 'complete') {
    resolve();
  } else {
    window.onload = resolve();
  }
}).then(() => {
  return new Promise((resolve, reject) => {
    VK.init({
      apiId: 5572288
    });

    VK.Auth.login(response => {
      if (response.session) {
        resolve(response);
      } else {
        reject(new Error("You didn't authorized!!!"));
      }
    }, 4);
  });
}).then(() => {
  VK.api('friends.get', {'fields': 'photo_50,bdate'}, response => {
    let nDate = new Date(),
        respArr = [],
        dates = [],
        bDate,
        yOld,
        thisYr = nDate.getFullYear().toString(),
        past = [],
        coming = [],
        friends = document.querySelector('#friends'),
        ctn = document.querySelector('.container'),
        src = friends.innerHTML,
        templFn = Handlebars.compile(src),
        templ,
        newJson = [];


    if (response.error) {
      new Error(response.error.error_msg);
    } else {
      respArr = response.response;

      respArr.forEach(i => {
        bDate = i.bdate;

        if (bDate) {
          dates.push(bDate);
        }
      });

      dates.forEach((el, idx) => {
        el = el.split('.');
        el[2] = thisYr;
        el = el.reverse().join();

        dates.splice(idx, 1, el);

        el = Date.parse(el);
        el < Date.now() ? past.push(el) : coming.push(el);
      });

      past.sort((a, b) => b - a);
      past.forEach((el, index) => {
        nDate.setTime(el);
        el = nDate.toLocaleDateString();

        past.splice(index, 1, el)
      });

      coming.sort();
      coming.forEach((el, index) => {
        nDate.setTime(el);
        el = nDate.toLocaleDateString();

        coming.splice(index, 1, el)
      });

      dates = [...coming, ...past];

      respArr.forEach(el => {
        if (el.bdate) {
          bDate = el.bdate;
          bDate = bDate.split('.');

          yOld = bDate[2];

          bDate[2] = thisYr;
          bDate = bDate.reverse().join('.');

          bDate = new Date(bDate);
          bDate = bDate.toLocaleDateString();

          el.bDay = bDate;
          yOld ? el.yOld = thisYr - yOld : el.yOld = 'Подозрительно скрывает свой возраст!'
        }
      });

      // Putting on screen
      dates.forEach(el => {
        respArr.forEach(i => {
          if (el.indexOf(i.bDay) !== -1 && !i.done) {
            newJson.push(i);
            i.done = true;
          }
        });
      });

      JSON.stringify(newJson);

      templ = templFn({list: newJson});

      ctn.innerHTML = templ;
    }
  });
});