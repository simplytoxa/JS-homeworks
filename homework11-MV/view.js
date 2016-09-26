'use strict';

Handlebars.registerHelper('formatTime', function(time) {
  let minutes = parseInt(time / 60),
      seconds = time - minutes * 60;

  minutes = minutes > 9 ? minutes : '0' + minutes;
  seconds = seconds > 9 ? seconds : '0' + seconds;

  return minutes + ':' + seconds;
});

Handlebars.registerHelper('formatDate', function(ts) {
  return new Date(ts * 1000).toLocaleString();
});

module.exports = {
  render(templateName, model) {
    templateName = templateName + 'Template';

    let templateElement = document.getElementById(templateName),
        templateSource  = templateElement.innerHTML,
        renderFn        = Handlebars.compile(templateSource);

    return renderFn(model);
  }
};
