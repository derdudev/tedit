import DOM from "./base/dom.js";
let styling = {
    color: "#5ca274",
    backgroundColor: "#444444",
    padding: "15px"
};
let element = DOM.create("p", {
    spellcheck: true,
    style: styling
});
element.innerText = "hello world";
document.body.append(element);
//# sourceMappingURL=script.js.map