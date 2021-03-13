function GElement(type, id, className, innerHTML, value, nameAttr, otherAttr) {
    var newElement = document.createElement(type);
    if (Valid(innerHTML)) newElement.innerHTML = innerHTML;
    if (Valid(value)) newElement.setAttribute("value", value);
    if (Valid(id)) newElement.id = id;
    if (Valid(className)) newElement.className = className;
    if (Valid(nameAttr)) newElement.setAttribute("name", nameAttr);
    if (Valid(otherAttr)) {
      for (key in otherAttr) {
        newElement.setAttribute(key, otherAttr[key]);
      };
    };
    return newElement;
};