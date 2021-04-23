import DOM from "../base/dom.js";
import Component from "./component.js";
import { isDuplicate } from "../utilities/listOperations.js";
import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import Navbar from "./navbar.js";
import blockMap from "./internals/blockMap.js";
class Tedit {
    constructor(data) {
        this.elements = [];
        this.domElement = DOM.create("div");
        this.navbar = new Navbar();
        this.domElement.appendChild(this.navbar.getDomElement());
        this.domElement.appendChild(DOM.create("div"));
        Component.setTedit(this);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                console.log();
                this.append((new (getKeyValue(data[i].type)(blockMap))({ variant: data[i].data.variant })));
            }
        }
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
    save() {
        const content = this.getContent();
        fetch("/save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        }).then((res) => {
            return res.body;
        }).then((_data) => {
            console.log("successfull");
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
            this.domElement.childNodes[1].innerHTML = "";
        }
        this.elements.map((element) => this.domElement.childNodes[1].appendChild(element.getDomElement()));
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map