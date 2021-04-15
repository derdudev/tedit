import DOM from "../base/dom.js";
import { isDuplicate } from "../utilities/listOperations.js";
import { setKeyValue } from "../utilities/objectOperations.js";
import Navbar from "./navbar.js";
class Tedit {
    constructor() {
        this.elements = [];
        this.domElement = DOM.create("div");
        this.navbar = new Navbar();
        this.domElement.appendChild(this.navbar.getDomElement());
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
    getContent() {
        let result = {};
        for (let i = 0; i < this.elements.length; i++) {
            setKeyValue(typeof this.elements[i], this.elements[i].getContent())(result);
        }
        return this.elements.map((element) => {
            return element.getContent();
        });
    }
    append(element) {
        if (isDuplicate(this.elements, element)) {
            this.elements.push(element);
            this.render();
        }
    }
    render() {
        if (this.elements.length != 1) {
            for (let i = 0; i < this.elements.length - 1; i++) {
                this.domElement.removeChild(this.elements[i].getDomElement());
            }
        }
        this.elements.map((element) => this.domElement.appendChild(element.getDomElement()));
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map