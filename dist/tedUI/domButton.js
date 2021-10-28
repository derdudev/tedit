import domComponent from "./domComponent.js";
class DomButton extends domComponent {
    constructor(buttonOptions) {
        super(buttonOptions || DomButton.defaultOptions);
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