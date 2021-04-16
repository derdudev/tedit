import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
class Component {
    constructor(tedit) {
        this.tedit = tedit;
        this.state = { variant: 0 };
    }
    setState(state) {
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content = { type: this.name, data: updatedData };
        getKeyValue("variant")(this.state);
        let domOptions = getKeyValue(getKeyValue("variant")(this.state))(this.variants).getDomOptions();
        this.update(domOptions);
        console.log(getKeyValue(getKeyValue("variant")(this.state))(this.variants).getDomOptions());
        console.log(this.state);
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
export default Component;
//# sourceMappingURL=component.js.map