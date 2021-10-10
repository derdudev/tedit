import Component from "src/core/component";
import Tedit from "src/core/tedit";

class DOMRenderer {
    public static render(element: Component | Tedit, parent?: HTMLElement){
        if(parent){
            parent.appendChild(element.html);
        } else {
            document.body.appendChild(element.html);
        }
    }

    public static renderHTML(element: HTMLElement, parent?: HTMLElement){
        if(parent){
            parent.appendChild(element);
        } else {
            document.body.appendChild(element);
        }
    }
}

export default DOMRenderer;