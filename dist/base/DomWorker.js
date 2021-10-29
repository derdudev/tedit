import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
class DomWorker {
    static create(tagName, options, children) {
        let element = document.createElement(tagName);
        console.log(element, tagName, options === null || options === void 0 ? void 0 : options.innerText);
        let valueOfKey;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            if (key == "tagName") {
            }
            else if (key !== "style") {
                element.setAttribute(key, valueOfKey);
                setKeyValue(key, valueOfKey)(element);
            }
            else {
                Object.assign(element.style, getKeyValue(key)(options));
            }
        }
        if (children) {
            for (let i = 0; i < children.length; i++) {
                element.appendChild(children[i]);
            }
        }
        return element;
    }
    static getByID(id) {
        return document.getElementById(id);
    }
    static clearElement(element) {
        element.innerHTML = "";
    }
}
export default DomWorker;
//# sourceMappingURL=DomWorker.js.map