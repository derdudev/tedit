import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
class HTMLComponent {
    getDomElement() {
        return this.domElement;
    }
    update(options) {
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
}
export default HTMLComponent;
//# sourceMappingURL=HTMLComponent.js.map