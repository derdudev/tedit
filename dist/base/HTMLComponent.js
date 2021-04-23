import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import DOM from "./dom.js";
class HTMLComponent {
    constructor(domElement) {
        if (domElement)
            this.domElement = domElement;
    }
    getDomElement() {
        return this.domElement;
    }
    setOptions(options) {
        this.domOptions = options;
    }
    getOptions() {
        return this.domOptions;
    }
    update(options) {
        this.domOptions = options;
        let valueOfKey;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            if (key !== "style") {
                this.domElement.setAttribute(key, valueOfKey);
                setKeyValue(key, valueOfKey)(this.domElement);
            }
            else {
                Object.assign(this.domElement.style, getKeyValue(key)(options));
            }
        }
    }
    static update(htmlComponent, options) {
        let valueOfKey, element;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            element = htmlComponent.getDomElement();
            if (key === "tagName") {
                console.log(options);
                htmlComponent.replace(DOM.create(valueOfKey, options));
            }
            else if (key !== "style") {
                element.setAttribute(key, valueOfKey);
                setKeyValue(key, valueOfKey)(element);
            }
            else {
                Object.assign(element.style, getKeyValue(key)(options));
            }
        }
    }
    replace(newElement) {
        var _a;
        (_a = this.domElement.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(newElement, this.domElement);
        this.domElement = newElement;
    }
    getIndex(element, parent) {
        if (parent) {
            for (let i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i] == element)
                    return i;
            }
        }
        return -1;
    }
}
export default HTMLComponent;
//# sourceMappingURL=HTMLComponent.js.map