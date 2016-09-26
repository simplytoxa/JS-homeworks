let Model = require('./model'),
    View = require('./view'),
    Router = require('./router'),
    Controller = require('./controller'),
    btnPanel = document.querySelector('#btnPanel'),
    results = document.querySelector('#results');

btnPanel.addEventListener('click', e => {
  let route = e.target.dataset.route;

  route && Router.handle(route);
});

results.addEventListener('change', e => {
  let route = e.target.dataset.route;

  route && route === 'sort'  && Controller.sort(e);
});


new Promise(function(resolve) {
  window.onload = resolve;
}).then(function() {
  return Model.login(5595899, 2 | 8 | 8192 | 262144 | 4);
}).then(function() {
  return Model.getUser().then(function(users) {
    header.innerHTML = View.render('header', users[0]);
  });
}).catch(function(e) {
  console.error(e);
  alert('Ошибка: ' + e.message);
});

