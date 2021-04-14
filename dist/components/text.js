import DOM from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
class TxtContent {
}
class Txt extends Component {
    constructor() {
        super();
        this.name = "text";
        this.content = {
            type: this.name,
            data: {
                text: "",
            },
        };
        this.variants = {
            0: new Variant(),
            1: new Variant(),
        };
        this.domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
        });
        this.domElement.addEventListener("keydown", (e) => {
            this.content = {
                type: this.name,
                data: {
                    text: e.target.innerText + e.key,
                }
            };
        });
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getDomElement() {
        return this.domElement;
    }
    setDomElement(domElement) {
        this.domElement = domElement;
    }
    getName() {
        return this.name;
    }
}
export default Txt;
//# sourceMappingURL=text.js.map