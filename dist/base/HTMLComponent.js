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
        let domOption, element;
        for (let domOptionName in options) {
            domOption = getKeyValue(domOptionName)(options);
            element = htmlComponent.getDomElement();
            if (domOptionName === "tagName") {
                htmlComponent.replace(DOM.create(domOption, options));
            }
            else if (domOptionName !== "style") {
                element.setAttribute(domOptionName, domOption);
                setKeyValue(domOptionName, domOption)(element);
            }
            else {
                Object.assign(element.style, getKeyValue(domOptionName)(options));
            }
        }
    }
    replace(newElement) {
        var _a;
        (_a = this.domElement.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(newElement, this.domElement);
        this.domElement = newElement;
    }
}
export default HTMLComponent;
//# sourceMappingURL=HTMLComponent.js.map