import Component from "../core/component.js";

class KeyHandler {
    private refComponent:Component;
    /**
     * 
     * @param refElement the element directly containing the text node containing the editable content
     */
    constructor(refComponent: Component){
        // component necessary to always get the latest version of the element
        this.refComponent = refComponent;
    }

    public handleArrows(e:KeyboardEvent){
        this.handleUpArrow(e);
        this.handleDownArrow(e);
    }

    public handleUpArrow(e:KeyboardEvent){
        if (e.key == "ArrowUp"){
            // e.preventDefault();
            // let prevComp = Component.tedit.collection.prev(this.refComponent);
            // let selection = document.getSelection();
            // let endPos;
            // endPos = selection?.focusOffset || 0;
            // prevComp?.focus(endPos);

            let selection = document.getSelection();
            console.log(selection);
        }
    }

    public handleDownArrow(e:KeyboardEvent){
        if (e.key == "ArrowDown"){
            // e.preventDefault();
            // let nextComp = Component.tedit.collection.next(this.refComponent);
            // let selection = document.getSelection();
            // let endPos;
            // endPos = selection?.focusOffset || 0;

            // nextComp?.focus(endPos);
        }
    }
}

// helpers
function getLineHeight(element: HTMLElement){
    const m = document.createElement("p");
    m.style.width = element.clientWidth.toString();
    m.style = element.style;
    m.innerHTML = "h";
    document.body.appendChild(m);
    m.style.opacity = "0";
    m.style.position = "fixed";
    m.style.zIndex = "-1";
}

export default KeyHandler;