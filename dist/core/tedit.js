import DOM from "../base/dom.js";
class Tedit {
    constructor() {
        this.elements = [];
        this.domElement = DOM.create("div");
    }
    getActiveElement() {
        return this.activeElement;
    }
    setActiveElement(activeElement) {
        this.activeElement = activeElement;
    }
    getDomElement() {
        return this.domElement;
    }
    append(element) {
        this.elements.push(element);
        this.render();
    }
    render() {
        if (this.elements.length != 1)
            this.elements.map((element) => this.domElement.removeChild(element.getDomElement()));
        this.elements.map((element) => this.domElement.appendChild(element.getDomElement()));
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map