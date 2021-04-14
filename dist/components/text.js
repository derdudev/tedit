import DOM from "../base/dom.js";
import Component from "../core/component.js";
class Txt extends Component {
    constructor(tedit) {
        super(tedit);
        this._domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
        });
    }
    getContent() {
        throw new Error("Method not implemented.");
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
}
export default Txt;
//# sourceMappingURL=text.js.map