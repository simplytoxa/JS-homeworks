function deleteTextNodes(element) {
  let el = document.querySelector(element),
      elChildren = el.childNodes;

  for (let i of elChildren) {
    if (i.nodeType === Node.TEXT_NODE) {
      el.removeChild(i);
    }
  }

  return element;
}

module.extends = deleteTextNodes;


//-----------------------------------------------TESTS-----------------------------------------------------
// deleteTextNodes('.container');