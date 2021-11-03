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
        // needed for firefox in case of Ctrl + A
        if(e.key == "a" || e.key == "A"){
            // timeout is necessary for the selection to occur
            // if the key combination Ctrl + A is checked specifically 
            setTimeout(()=>{
                let selection = document.getSelection();
                let selectionNode = this.refComponent.html.childNodes[0];

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
        if(e.key == " "){
            e.preventDefault();
            let pos = document.getSelection()?.anchorOffset || 0;
            //this.refComponent.html.childNodes[0].textContent += " "; // this.refComponent.html.innerText += " " doesnt work

            let firstHalf = this.refComponent.html.textContent?.slice(0,pos) || "";
            let secondHalf = this.refComponent.html.textContent?.slice(pos, this.refComponent.html.textContent.length) || "";

            console.log(firstHalf, secondHalf)
            this.refComponent.html.innerHTML = firstHalf + "&nbsp;" + secondHalf;
            
            // this.refComponent.html.innerHTML += "&nbsp;"; // NOTE: if only " " (Space) is appended, after the first Space, the element text breaks somehow
            let selectionNode = this.refComponent.html.childNodes[0];
            // ! innerText does not get updated properly -> textContent is more reliable
            // console.log(selectionNode, pos, this.refComponent.html.textContent?.length, this.refComponent.html.innerHTML.length)
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

        let selection = document.getSelection();

        let pos = selection?.anchorOffset || 0;

        if(pos != 0){
            let firstHalf, secondHalf;
            if(selection?.isCollapsed){
                // returns true only if selection is cursor

                if(isDelete) firstHalf = this.refComponent.html.textContent?.slice(0,(pos as number)) || "";
                else firstHalf = this.refComponent.html.textContent?.slice(0,--(pos as number)) || "";
                secondHalf = this.refComponent.html.textContent?.slice(++(pos as number), this.refComponent.html.textContent.length) || "";

                this.refComponent.html.innerHTML = firstHalf + secondHalf;
                let selectionNode = this.refComponent.html.childNodes[0];

                DomTextSelector.setCursor(selectionNode as Node, --(pos as number));
            } else {
                let range = selection?.getRangeAt(0);

                let startPos = range?.startOffset || 0;
                let endPos = range?.endOffset || 0;
                console.log(startPos, endPos)

                firstHalf = this.refComponent.html.textContent?.slice(0, startPos) || "";
                secondHalf = this.refComponent.html.textContent?.slice(endPos, this.refComponent.html.textContent.length);

                console.log(secondHalf?.match(/\s*\w/),(secondHalf?.match(/\s*/) || [])[0].length);

                if(secondHalf?.match(/^\s+\w/)){
                    // if starts with a space
                    secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                }

                console.log(firstHalf, firstHalf.length, secondHalf)
                    
                this.refComponent.html.innerHTML = firstHalf + secondHalf;
                let selectionNode = this.refComponent.html.childNodes[0];

                if(this.refComponent.html.innerHTML.length < pos) DomTextSelector.setCursor(selectionNode as Node, this.refComponent.html.innerHTML.length - (pos - this.refComponent.html.innerHTML.length));
                else if (startPos == 0) DomTextSelector.setCursor(selectionNode as Node, 0);
                else DomTextSelector.setCursor(selectionNode as Node, firstHalf.length);
                
            }
        } else {
            if(!selection?.isCollapsed){
                // ! only in firefox there is a problem with Ctrl+A and Selection (0:1) in Chrome Selection works
                // selection spans from start (0) to some position (n)
                let range = selection?.getRangeAt(0);

                console.log(range, selection);

                let startPos = range?.startOffset || 0;
                let endPos = range?.endOffset || 0;
                console.log(endPos, startPos);

                this.refComponent.html.innerHTML = this.refComponent.html.textContent?.slice(endPos, this.refComponent.html.textContent.length) || "";

                DomTextSelector.setCursor(this.refComponent.html, pos);
            }
        }
    }
}

export default EditableHandler;