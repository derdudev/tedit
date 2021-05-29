import DOM from "./base/dom.js";
import Tedit from "./core/tedit.js";
import { init } from "./dummyData.js";
const tedit = new Tedit(init);
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