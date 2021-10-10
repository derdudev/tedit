import DOM from "../base/dom.js";
import HTMLComponent from "../base/HTMLComponent.js";
import Component from "./component.js";
export default class ContextMenu extends Component {
    constructor() {
        super();
        let domElement;
        domElement = DOM.create("div", {
            style: {
                display: "none",
                backgroundColor: "#fff",
                position: "fixed",
                height: "300px",
                width: "200px",
                top: "200px",
                left: "200px",
                boxShadow: "0px 0px 20px #00000020",
            }
        });
        this.domComponent = new HTMLComponent(domElement);
    }
    show(x, y) {
        this.getDomElement().style.display = "block";
        this.getDomElement().style.top = y + "px";
        this.getDomElement().style.left = x + "px";
    }
    hide() {
        this.getDomElement().style.display = "none";
    }
    getContent() {
        throw new Error("Method not implemented.");
    }
    setContent(content) {
        this.content = content;
    }
    getDomComponent() {
        return this.domComponent;
    }
    setDomComponent(domComponent) {
        this.domComponent = domComponent;
    }
    getName() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=contextMenu.js.map