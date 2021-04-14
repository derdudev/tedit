import DOM from "../base/dom.js";
import Component from "../core/component.js";
class TxtContent {
}
class Txt extends Component {
    constructor(tedit) {
        super(tedit);
        this.name = "text";
        this._content = {
            type: this.name,
            data: {
                text: "",
            },
        };
        this._domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
        });
        this._domElement.addEventListener("keydown", (e) => {
            this._content = {
                type: this.name,
                data: {
                    text: e.target.innerText + e.key,
                }
            };
            console.log(tedit.getContent());
        });
    }
    getContent() {
        return this._content;
    }
    setContent(content) {
        this._content = content;
    }
    getDomElement() {
        return this._domElement;
    }
    setDomElement(domElement) {
        this._domElement = domElement;
    }
    getName() {
        return this.name;
    }
}
export default Txt;
//# sourceMappingURL=text.js.map