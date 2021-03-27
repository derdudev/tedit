const getKeyValue = (key) => (obj) => obj[key];
function prop(obj, key) {
    return obj[key];
}
export default class DOM {
    static create(tagName, options) {
        let element = document.createElement(tagName);
        for (let key in options) {
            console.log(typeof key);
            element.setAttribute(key, prop(options, key));
        }
        return element;
    }
}
//# sourceMappingURL=dom.js.map