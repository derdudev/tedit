import DOM from "./dom.js";
import HTMLComponent from "./HTMLComponent.js";
class Button extends HTMLComponent {
    constructor(options) {
        super();
        if (options) {
            this.domElement = DOM.create("button", options);
        }
        else {
            this.domElement = DOM.create("button", { innerText: "Button" });
        }
    }
}
export default Button;
//# sourceMappingURL=button.js.map