import HTMLComponent from "../base/HTMLComponent.js";
import { getKeyValue } from "../utilities/objectOperations.js";
class Component {
    constructor() {
        this.state = { variant: 0 };
    }
    getDomElement() {
        return this.domComponent.getDomElement();
    }
    getPosition() {
        return this.position;
    }
    setPosition(position) {
        this.position = position;
    }
    static setTedit(tedit) {
        Component.tedit = tedit;
    }
    setState(state) {
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content.data = updatedData;
        let domOptions = this.getCurrentVariant().getDomOptions();
        domOptions.innerText = this.domComponent.getDomElement().innerText;
        domOptions = Object.assign(domOptions, this.variants.default.getDomOptions());
        this.update(domOptions);
    }
    getCurrentVariantID() {
        return getKeyValue("variant")(this.state);
    }
    getCurrentVariant() {
        return getKeyValue(this.getCurrentVariantID())(this.variants);
    }
    update(options) {
        HTMLComponent.update(this.domComponent, options);
    }
    focus() {
        setTimeout(() => {
            this.getDomElement().focus();
            this.getDomElement().click();
        }, 1);
    }
}
export default Component;
//# sourceMappingURL=component.js.map