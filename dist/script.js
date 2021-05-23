import DOM from "./base/dom.js";
import Tedit from "./core/tedit.js";
const tedit = new Tedit([
    {
        type: "text",
        data: {
            text: "This is a headline",
            variant: 1,
        }
    },
    {
        type: "text",
        data: {
            text: "And this one is a very nice paragraph",
            variant: 0,
        }
    },
]);
const button = DOM.create("button", {
    innerText: "Get Content",
    onclick: () => {
        document.body.removeChild(document.body.childNodes[document.body.childNodes.length - 1]);
        DOM.render(DOM.create("pre", { className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3) }));
        tedit.save();
    }
});
DOM.render(tedit.getDomElement());
DOM.render(button);
DOM.render(DOM.create("pre", { className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3) }));
//# sourceMappingURL=script.js.map