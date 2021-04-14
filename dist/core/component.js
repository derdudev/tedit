import { getKeyValue } from "../utilities/objectOperations.js";
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
        console.log(this.state);
    }
    update(options) {
    }
}
export default Component;
//# sourceMappingURL=component.js.map