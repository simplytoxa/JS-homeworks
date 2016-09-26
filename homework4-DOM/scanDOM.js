'use strict';

let results = {};

/**
 * Function that scans the DOM and logs the statistics
 * @param element - Optional parameter. If
 */
function scanDOM(element) {
  let page = document.querySelector('body'),
      children = page.childNodes,
      name,
      nameOfClass;

  if (element) {
    if (element.nodeType !== Node.ELEMENT_NODE) {
      element = document.querySelector(element);
    }

    children = element.childNodes;
  }

  for (let node of children) {
    if (node.nodeType === Node.ELEMENT_NODE && node.childElementCount > 0) {
      scanDOM(node);
    }

    name = node.nodeName.toLowerCase();

    // Tags info creation
    if (!results.tags) {
      results.tags = {};
    }
    else if (!results.tags[name] && node.nodeType == Node.ELEMENT_NODE) {
      results.tags[name] = 0;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      results.tags[name] += 1;
    }

    // Text & comment nodes info creation
    if (name[0] === '#') {
      if (!results.other) {
        results.other = {};
      }
      else if (!results.other[name]) {
        results.other[name] = 0;
      }

      results.other[name]++;
    }

    // Class info creation
    nameOfClass = node.className;

    if (nameOfClass) {
      if (!results.classes) {
        results.classes = {};
      }
      if (!results.classes[nameOfClass]) {
        results.classes[nameOfClass] = 0;
      }

      results.classes[nameOfClass] += 1;
    }


    if (node === page.lastChild || (!node.nextElementSibling && node.childElementCount === 0)) {
      logResults();
    }
  }
}

/**
 * Function that logs the results of scanDOM function
 */
function logResults() {
  // Log for tags
  for (let key in results.tags) {
    console.log('----',`Тэгов ${key}: ${results.tags[key]}`);
  }

  // Log for classes
  for (let key in results.classes) {
    console.log('--------',`Элементов с классом ${key}: ${results.classes[key]}`);
  }

  // Log for other
  for (let key in results.other) {
    if (key === '#text') {
      console.log('------------',`Текстовых узлов: ${results.other[key]}`);
    }

    if (key === '#comment') {
      console.log('------------',`Узлов комментариев: ${results.other[key]}`);
    }
  }
}


// module.exports = scanDOM;

//-------------------------------------------TESTS------------------------------------------
scanDOM('.bla');
console.log(results);