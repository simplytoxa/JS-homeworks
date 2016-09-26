function deleteTextNodes(element) {
  let elChildren = element.childNodes;

  for (let node of elChildren) {
    if (node.nodeType === Node.TEXT_NODE) {
      element.removeChild(node);
    }
  }

  for (let node of elChildren) {
    if (node.nodeType === Node.ELEMENT_NODE && node.childElementCount > 1) {
     deleteTextNodes(node);
    }
  }

  return element;
}

// module.extends = deleteTextNodes;


//-----------------------------------------------TESTS-----------------------------------------------------
// let ddd = document.querySelector('.container');
// let sss = document.querySelector('.sub-container');
// let subsub = document.querySelector('.sub-sub-container');
// deleteTextNodes(ddd);
// console.log(subsub.childNodes);
