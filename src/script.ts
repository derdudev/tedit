import DOM from "./base/dom.js";

let element = DOM.create("p", {
    spellcheck: true,
    style: {
        color: "#5ca274",
    }
});
element.innerText = "hello world";

document.body.append(element);
