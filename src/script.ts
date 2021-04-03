import DOM from "./base/dom.js";
import * as CSS from 'csstype';

let stylingP: CSS.Properties = {
    color: "#5ca274",
    backgroundColor: "#444444",
    padding: "15px",
    width: "100%",
    textAlign: "center",
}

let p = DOM.create("p", {
    spellcheck: true,
    style: stylingP,
    innerText: "hello world"
});

let p2 = DOM.create("p", {
    spellcheck: true,
    style: stylingP,
    innerText: "hello world"
});

let div = DOM.create("div", {
    spellcheck: true,
    style: {
        display: "flex",
        width: "100%",
    }
}, {
    p, p2
});

document.body.append(div);
