/**
 * Function that inserts new element at the beginning of the another element
 * @param container - CSS selector. Element where to insert
 * @param newElement - Element to insert
 */
function prepend(container, newElement) {
  let cont = document.querySelector(container),
      firstEl = cont.firstElementChild;

  console.log(cont);

  cont.insertBefore(newElement, firstEl);
}

module.extends = prepend;

// ----------------------------------TESTS-------------------------------------------
// let el = document.createElement('div');
// el.innerHTML = '<p>NEW ELEMENT!!!!!</p>';
//
// prepend('.container', el);