import DOM from "./base/dom.js";
import Tedit from "./core/tedit.js";
import Txt from "./components/text.js";

const tedit = new Tedit();
let text = new Txt(tedit);

tedit.append(text);

DOM.render(tedit.getDomElement());
