import DOM, { DomOptions } from "./dom.js";
import HTMLComponent from "./HTMLComponent.js";

class Button extends HTMLComponent{
    constructor(options?: DomOptions){
        super();
        if(options){
            this.domElement = DOM.create("button", options)
        } else {
            this.domElement = DOM.create("button", {innerText: "Button"})
        }
    }
}

export default Button;