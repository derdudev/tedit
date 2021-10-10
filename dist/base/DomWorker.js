import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
class DomWorker {
    static create(tagName, options, children) {
        let element = document.createElement(tagName);
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
        for (let child in children) {
            element.appendChild(getKeyValue(child)(children));
        }
        return element;
    }
}
export default DomWorker;
//# sourceMappingURL=DomWorker.js.map