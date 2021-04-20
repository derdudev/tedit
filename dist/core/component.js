import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
class Component {
    constructor() {
        this.state = { variant: 0 };
    }
    static setTedit(tedit) {
        Component.tedit = tedit;
    }
    setState(state) {
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content = { type: this.name, data: updatedData };
        getKeyValue("variant")(this.state);
        console.log(getKeyValue(getKeyValue("variant")(this.state))(this.variants).getDomOptions());
        let domOptions = getKeyValue(getKeyValue("variant")(this.state))(this.variants).getDomOptions();
        this.update(domOptions);
        console.log(this.state);
    }
    update(options) {
        let valueOfKey;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            if (key !== "style") {
                this.domComponent.getDomElement().setAttribute(key, valueOfKey);
                setKeyValue(key, valueOfKey)(this.domComponent.getDomElement());
            }
            else {
                Object.assign(this.domComponent.getDomElement().style, getKeyValue(key)(options));
            }
        }
    }
}
export default Component;
//# sourceMappingURL=component.js.map