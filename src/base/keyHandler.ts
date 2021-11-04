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
            e.preventDefault();
            let prevComp = Component.tedit.collection.prev(this.refComponent);
            let selection = document.getSelection();
            let endPos;
            endPos = selection?.focusOffset || 0;

            prevComp?.focus(endPos);
        }
    }

    public handleDownArrow(e:KeyboardEvent){
        if (e.key == "ArrowDown"){
            e.preventDefault();
            let nextComp = Component.tedit.collection.next(this.refComponent);
            let selection = document.getSelection();
            let endPos;
            endPos = selection?.focusOffset || 0;

            nextComp?.focus(endPos);
        }
    }
}

export default KeyHandler;