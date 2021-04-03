const getKeyValue = (key) => (obj) => obj[key];
export default class DOM {
    static create(tagName, options) {
        let element = document.createElement(tagName);
        let valueOfKey;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            if (key !== "style") {
                element.setAttribute(key, valueOfKey);
            }
            else {
                for (let style in valueOfKey) {
                    element.style.setProperty(style, getKeyValue(style)(valueOfKey));
                }
            }
        }
        return element;
    }
}
//# sourceMappingURL=dom.js.map