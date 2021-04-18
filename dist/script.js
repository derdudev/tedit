import DOM from "./base/dom.js";
import Tedit from "./core/tedit.js";
import Txt from "./components/text.js";
const tedit = new Tedit();
let text = new Txt({
    variant: 1
});
tedit.append(text);
const button = DOM.create("button", {
    innerText: "Get Content",
    onclick: () => {
        document.body.removeChild(document.body.childNodes[document.body.childNodes.length - 1]);
        DOM.render(DOM.create("pre", { className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3) }));
    }
});
DOM.render(tedit.getDomElement());
DOM.render(button);
let text2 = new Txt();
tedit.append(text2);
DOM.render(DOM.create("pre", { className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3) }));
//# sourceMappingURL=script.js.map