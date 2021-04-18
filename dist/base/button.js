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
class MaterialIconButton extends Button {
    constructor(name, options) {
        super({ innerText: name });
        if (options) {
            options.className += " material-icons";
            this.update(options);
        }
        else {
            options = {};
            options.className = "material-icons";
            this.update(options);
        }
    }
}
export default Button;
export { MaterialIconButton };
//# sourceMappingURL=button.js.map