const getKeyValue = (key) => (obj) => obj[key];
const setKeyValue = (key, value) => (obj) => obj[key] = value;
export default class DOM {
    static create(tagName, options, children) {
        let element = document.createElement(tagName);
        let valueOfKey;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            if (key !== "style") {
                element.setAttribute(key, valueOfKey);
                setKeyValue(key, valueOfKey)(element);
            }
            else if (key === "style") {
                Object.assign(element.style, getKeyValue(key)(options));
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
//# sourceMappingURL=dom.js.map