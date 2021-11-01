
import DOMRenderer from "./base/DomRenderer.js";
import DomWorker from "./base/DomWorker.js";
import Tedit from "./core/tedit.js";
import { init } from "./dummyData.js";
//import shortcut from "./utilities/shortcut.js";

const tedit = new Tedit(init);

const button = DomWorker.create("button", {
    innerText: "Get Content",
    events: [
        {
            type: "click", 
            handler: ()=>{
                document.body.removeChild(document.body.childNodes[document.body.childNodes.length-1]);
                DOMRenderer.renderHTML(DomWorker.create("pre", {className: "out", innerText: JSON.stringify(tedit.getContent(), null, 3)}));
                //tedit.save();
            }
        }
    ]
});

const button2 = DomWorker.create("button", {
    innerText: "Get Component Data",
    events: [
        {
            type: "click", 
            handler: ()=>{
                document.body.removeChild(document.body.childNodes[document.body.childNodes.length-1]);
                DOMRenderer.renderHTML(DomWorker.create("pre", {className: "out", innerText: JSON.stringify(tedit.getCompData(), null, 3)}));
                //tedit.save();
            }
        }
    ]
});

DOMRenderer.renderHTML(button);
DOMRenderer.renderHTML(button2);
DOMRenderer.renderHTML(DomWorker.create("pre", {className: "out", innerText: JSON.stringify(tedit.getCompData(), null, 3)}));