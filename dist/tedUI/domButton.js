import DomComponent from "./domComponent.js";
import { setKeyValue } from "../utilities/objectOperations.js";
class DomButton extends DomComponent {
    constructor(buttonOptions, element) {
        let buttonOptionsValid = buttonOptions;
        if (!(buttonOptions === null || buttonOptions === void 0 ? void 0 : buttonOptions.tagName)) {
            setKeyValue("tagName", "button")(buttonOptionsValid);
        }
        super(buttonOptionsValid || DomButton.defaultOptions, element);
    }
    addEvent(eventType, eventHandler) {
        this.html.addEventListener(eventType, eventHandler);
    }
}
DomButton.defaultOptions = {
    tagName: "button",
    style: {
        padding: "2px",
    }
};
export default DomButton;
//# sourceMappingURL=domButton.js.map