import HTMLComponent from "../base/HTMLComponent.js";
import { getKeyValue } from "../utilities/objectOperations.js";
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
        HTMLComponent.update(this.domComponent, options);
    }
}
export default Component;
//# sourceMappingURL=component.js.map