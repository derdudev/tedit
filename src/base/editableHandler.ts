import Component from "../core/component.js";
import DomTextSelector from "./DomTextSelector.js";

class EditableHandler {
    private refComponent:Component;
    /**
     * 
     * @param refElement the element directly containing the text node containing the editable content
     */
    constructor(refComponent: Component){
        // component necessary to always get the latest version of the element
        this.refComponent = refComponent;
    }

    public handleKeys(e:KeyboardEvent){
        this.handleSelectAll(e);
        this.handleSpace(e);
        this.handleBackspace(e);
        this.handleDelete(e);
    }

    /**
     * handler for Ctrl + A selection. Ensures compatabilty between chromium and firefox
     */
    public handleSelectAll(e:KeyboardEvent){
        const refCompHtml = this.refComponent.html;

        // needed for firefox in case of Ctrl + A
        if(e.key == "a" || e.key == "A"){
            // timeout is necessary for the selection to occur
            // if the key combination Ctrl + A is checked specifically 
            setTimeout(()=>{
                let selection = document.getSelection();
                let selectionNode = refCompHtml.childNodes[0];

                // if selection is not collapsed, anchorOffset != focusOffset
                if(!selection?.isCollapsed){
                    selection?.removeAllRanges();
                    let range = new Range();
                    range.setStart(selectionNode as Node, 0);
                    range.setEnd(selectionNode as Node, selectionNode.textContent?.length as number);
                    selection?.addRange(range);
                }
            },1)
        }
    }

    public handleSpace(e:KeyboardEvent){
        const refCompHtml = this.refComponent.html;
        const textContent = refCompHtml.textContent || "";

        if(e.key == " "){
            e.preventDefault();
            let pos = document.getSelection()?.anchorOffset || 0;
            //refCompHtml.childNodes[0].textContent += " "; // refCompHtml.innerText += " " doesnt work

            let firstHalf = textContent.slice(0,pos) || "";
            let secondHalf = textContent.slice(pos, textContent.length) || "";

            console.log(firstHalf, secondHalf)
            refCompHtml.innerHTML = firstHalf + "&nbsp;" + secondHalf;
            
            // refCompHtml.innerHTML += "&nbsp;"; // NOTE: if only " " (Space) is appended, after the first Space, the element text breaks somehow
            let selectionNode = refCompHtml.childNodes[0];
            // ! innerText does not get updated properly -> textContent is more reliable
            // console.log(selectionNode, pos, textContent.length, refCompHtml.innerHTML.length)
            DomTextSelector.setCursor(selectionNode as Node, ++pos);
            // console.log(document.getSelection()?.anchorOffset)
        }
    }

    public handleBackspace(e:KeyboardEvent){
        if (e.key == "Backspace") {
            this.handleDeleting(false, e);
        }
    }

    public handleDelete(e:KeyboardEvent){
        if (e.key == "Delete"){
            this.handleDeleting(true, e);
        }
    }

    /**
     * 
     * @param isDelete if true: use delete implementation, if false, use backspace implementation
     */
    private handleDeleting(isDelete:boolean, e:KeyboardEvent){
        e.preventDefault();

        const selection = document.getSelection();

        let pos = selection?.anchorOffset || 0;
        const refCompHtml = this.refComponent.html;
        const textContent = refCompHtml.textContent || "";

        let firstHalf, secondHalf, selectionNode;
        firstHalf = secondHalf = "";

        if(pos != 0){
            if(selection?.isCollapsed){ // returns true only if selection is cursor
                if(isDelete) firstHalf = textContent?.slice(0,(pos as number)) || "";
                else firstHalf = textContent.slice(0,--(pos as number)) || "";
                secondHalf = textContent.slice(++(pos as number), textContent.length) || "";
            } else {
                let startPos = selection?.anchorOffset || 0;
                let endPos = selection?.focusOffset || 0;
                console.log(startPos, endPos)

                // depending on how the mouse was dragged, startPos can be bigger than endPos
                if(startPos > endPos) {
                    let temp = startPos;
                    startPos = endPos;
                    endPos = temp;
                }

                firstHalf = textContent.slice(0, startPos) || "";
                secondHalf = textContent.slice(endPos, textContent.length);

                console.log(secondHalf?.match(/\s*\w/),(secondHalf?.match(/\s*/) || [])[0].length);

                if(secondHalf?.match(/^\s+\w/)){ // if secondHalf starts with a space
                    secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                }
            }
            refCompHtml.innerHTML = firstHalf + secondHalf;
            selectionNode = refCompHtml.childNodes[0];
        } else {
            if(!selection?.isCollapsed){
                // * NOTE only in firefox there is a problem with Ctrl+A and Selection (0:1) in Chrome Selection works
                // selection spans from start (0) to some position (n)

                let endPos = selection?.focusOffset || 0;
                
                firstHalf = "";

                refCompHtml.innerHTML = textContent.slice(endPos, textContent.length) || "";

                selectionNode = refCompHtml;
            }
        }
        DomTextSelector.setCursor(selectionNode as Node, firstHalf.length);
    }
}

export default EditableHandler;