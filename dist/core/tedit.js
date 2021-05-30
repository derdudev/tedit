import DOM from "../base/dom.js";
import Component from "./component.js";
import { isDuplicate } from "../utilities/listOperations.js";
import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import Navbar from "./navbar.js";
import blockMap from "./internals/blockMap.js";
class Tedit {
    constructor({ data, types }) {
        this.elements = [];
        this.domElement = DOM.create("div");
        this.navbar = new Navbar();
        this.domElement.appendChild(this.navbar.getDomElement());
        this.domElement.appendChild(DOM.create("div"));
        Component.setTedit(this);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.append((new (getKeyValue(data[i].type)(blockMap))({ variant: data[i].data.variant, content: data[i] })));
            }
            this.elements[0].focus();
        }
        if (types) {
            for (let i = 0; i < types.length; i++) {
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
    append(element, index) {
        if (isDuplicate(this.elements, element)) {
            console.log(index);
            if (index) {
                this.elements.splice(index, 0, element);
                element.setPosition(index);
            }
            else {
                this.elements.push(element);
                element.setPosition(this.elements.length - 1);
            }
            this.render();
            element.focus();
        }
    }
    removeElementAt(index) {
        this.domElement.childNodes[1].removeChild(this.elements[index].getDomElement());
        this.elements.splice(index, 1);
        this.elements[index - 1].focus();
    }
    render() {
        if (this.elements.length != 1) {
            this.domElement.childNodes[1].innerHTML = "";
        }
        this.elements.map((element) => {
            this.domElement.childNodes[1].appendChild(element.getDomElement());
        });
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map