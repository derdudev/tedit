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
            if(getCursorLine(e.target as HTMLElement) <= 1){
                e.preventDefault();
                let prevComp = Component.tedit.collection.prev(this.refComponent);
                let selection = document.getSelection();
                let endPos;
                endPos = selection?.focusOffset || 0;
                prevComp?.focus(endPos);
            } 
        }
    }

    public handleDownArrow(e:KeyboardEvent){
        if (e.key == "ArrowDown"){
            console.log(countLines(e.target as HTMLElement));
            if(getCursorLine(e.target as HTMLElement) == countLines(e.target as HTMLElement)){
                e.preventDefault();
                let nextComp = Component.tedit.collection.next(this.refComponent);
                let selection = document.getSelection();
                let endPos;
                endPos = selection?.focusOffset || 0;

                nextComp?.focus(endPos);
            } 
        }
    }
}

// helpers

// ! refactor: using the same mirror element for performance reasons
function createMirror(element:HTMLElement){
    const m = document.createElement("p");
    m.style.width = element.clientWidth.toString();
    m.style.wordWrap = window.getComputedStyle(element).wordWrap;
    m.style.whiteSpace = window.getComputedStyle(element).whiteSpace;
    m.style.padding = element.style.padding;
    m.style.width = window.getComputedStyle(element).width;
    m.style.fontFamily = window.getComputedStyle(element).fontFamily;
    m.style.fontSize = window.getComputedStyle(element).fontSize;
    m.style.lineHeight = window.getComputedStyle(element).lineHeight;
    m.style.opacity = "0";
    m.style.position = "fixed";
    m.style.zIndex = "-1";

    return m;
}

function getLineHeight(element: HTMLElement){
    const m = createMirror(element);

    m.innerHTML = "h";
    document.body.appendChild(m);

    // ! has to be replaced with a regex
    return m.clientHeight - (+m.style.paddingTop.slice(0,1) + +m.style.paddingBottom.slice(0,1));
}

function countLines(element: HTMLElement){
    const lineHeight = getLineHeight(element);

    return (element.clientHeight - (+element.style.paddingTop.slice(0,1) + +element.style.paddingBottom.slice(0,1))) / lineHeight;
}

function getCursorLine(element: HTMLElement){
    const lineHeight = getLineHeight(element);

    const selection = document.getSelection();
  
    const m = createMirror(element);
    m.innerHTML = element.textContent?.slice(0,selection?.anchorOffset) || "";
    document.body.appendChild(m);

    return (m.clientHeight - (+m.style.paddingTop.slice(0,1) + +m.style.paddingBottom.slice(0,1))) / lineHeight;
}

export default KeyHandler;