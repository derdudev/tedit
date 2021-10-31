import DOMRenderer from "./base/DomRenderer.js";
import DomWorker from "./base/DomWorker.js";
import Tedit from "./core/tedit.js";
import { init } from "./dummyData.js";
const tedit = new Tedit(init);
const button = DomWorker.create("button", {
    innerText: "Get Content",
    events: [
        {
            type: "click",
            handler: () => {
                document.body.removeChild(document.body.childNodes[document.body.childNodes.length - 1]);
                DOMRenderer.renderHTML(DomWorker.create("pre", { className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3) }));
            }
        }
    ]
});
DOMRenderer.renderHTML(button);
DOMRenderer.renderHTML(DomWorker.create("pre", { className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3) }));
//# sourceMappingURL=script.js.map