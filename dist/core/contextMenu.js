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
            }
        });
        this.domComponent = new HTMLComponent(domElement);
    }
    show() {
        this.getDomElement().style.display = "block";
    }
    hide() {
        this.getDomElement().style.display = "none";
    }
    getContent() {
        throw new Error("Method not implemented.");
    }
    setContent(content) {
        throw new Error("Method not implemented.");
    }
    getDomComponent() {
        throw new Error("Method not implemented.");
    }
    setDomComponent(domComponent) {
        throw new Error("Method not implemented.");
    }
    getName() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=contextMenu.js.map