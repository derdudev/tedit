import Component from "../core/component.js";
import DomTextSelector from "./DomTextSelector.js";
import ShortcutHandler from "./shortcutHandler.js";

class EditableHandler {
    private refComponent:Component;

    private shortcutHandler: ShortcutHandler;
    /**
     * 
     * @param refElement the element directly containing the text node containing the editable content
     */
    constructor(refComponent: Component){
        // component necessary to always get the latest version of the element
        this.refComponent = refComponent;

        this.shortcutHandler = new ShortcutHandler(refComponent.html);
        this.shortcutHandler.registerShortcut(["Control", "A"], this.handleSelectAll.bind(this));
    }

    public handleKeys(e:KeyboardEvent){
        // this.handleSelectAll(e); - is handled by the shortcutHandler
        this.handleSpace(e);
        this.handleBackspace(e);
        this.handleDelete(e);
        this.handleEnter(e);
    }

    /**
     * handler for Ctrl + A selection. Ensures compatabilty between chromium and firefox
     */
    public handleSelectAll(e:KeyboardEvent){
        const refCompHtml = this.refComponent.html;

        // ! in the case of multiple childNodes, only the first one would be selected completely
        let selectionNode = refCompHtml;

        // if selection is not collapsed, anchorOffset != focusOffset
        DomTextSelector.setSelection(selectionNode as Node, 0, refCompHtml.textContent?.length as number);
    }

    public handleEnter(e:KeyboardEvent){
        if(e.key == "Enter") e.preventDefault();
    }

    public handleSpace(e:KeyboardEvent){
        // const selection = document.getSelection();

        const refCompHtml = this.refComponent.html;
        const textContent = refCompHtml.textContent || "";

        if(e.key == " "){
            e.preventDefault();
            let pos = document.getSelection()?.anchorOffset || 0;
            //refCompHtml.childNodes[0].textContent += " "; // refCompHtml.innerText += " " doesnt work

            let firstHalf = textContent.slice(0,pos) || "";
            let secondHalf = textContent.slice(pos, textContent.length) || "";

            console.log(firstHalf, secondHalf)
            refCompHtml.textContent = firstHalf + "&nbsp;" + secondHalf;
            
            // refCompHtml.textContent += "&nbsp;"; // NOTE: if only " " (Space) is appended, after the first Space, the element text breaks somehow
            let selectionNode = refCompHtml.childNodes[0];
            // ! innerText does not get updated properly -> textContent is more reliable
            // console.log(selectionNode, pos, textContent.length, refCompHtml.textContent.length)
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
        // if(pos > (selection?.focusOffset as number)) pos = selection?.focusOffset || 0;
        const refCompHtml = selection?.anchorNode as Node;

        let firstHalf, secondHalf, selectionNode, textContent, affectedNode;
        firstHalf = secondHalf = "";

        if(isDelete){

        } else {
            if(!selection?.isCollapsed) selection?.deleteFromDocument();
            else {
                selectionNode = selection?.anchorNode;

                if(pos == 0 && (selectionNode?.previousSibling || selectionNode?.parentElement?.previousSibling)){ 
                    // on the lefthand side of the element is another inline style element/node
                    // ! EDGE CASE MISSING: if selectionNode.parentElement.previousSibling is another styling element and not a pure #text node
                    affectedNode = (selectionNode?.previousSibling?.childNodes[0] || selectionNode?.parentElement?.previousSibling);
                    pos = (affectedNode?.textContent?.length || 0);
                } else if  (pos == 0) {
                    // * NOTE (maybe) fuse element above?
                    // if first case failed and pos is 0, there is no previous sibling
                    affectedNode = selectionNode;
                    pos++;
                } else {
                    affectedNode = selectionNode;
                }

                textContent = affectedNode?.textContent || "";

                firstHalf = textContent.slice(0,pos - 1) || "";
                secondHalf = textContent.slice(pos, textContent.length) || "";

                (affectedNode as Node).textContent = firstHalf + secondHalf;
            }
        }

        // if(pos != 0){
        //     // * NOTE : these two cases seem to work pretty nicely, if the selection is only in one textNode
        //     // ! BUT the selection can also span over multiple nodes - this case has to be addressed (thoughts: https://trello.com/c/Nxbimnhc)
        //     if(selection?.isCollapsed){ // returns true only if selection is cursor
        //         if(isDelete) firstHalf = textContent?.slice(0,(pos as number)) || "";
        //         else firstHalf = textContent.slice(0,--(pos as number)) || "";
        //         secondHalf = textContent.slice(++(pos as number), textContent.length) || "";
        //     } else {
        //         let startPos = selection?.anchorOffset || 0;
        //         let endPos = selection?.focusOffset || 0;
        //         console.log(startPos, endPos)

        //         // depending on how the mouse was dragged, startPos can be bigger than endPos
        //         if(startPos > endPos) {
        //             let temp = startPos;
        //             startPos = endPos;
        //             endPos = temp;
        //         }

        //         firstHalf = textContent.slice(0, startPos) || "";
        //         secondHalf = textContent.slice(endPos, textContent.length);

        //         console.log(secondHalf?.match(/\s*\w/),(secondHalf?.match(/\s*/) || [])[0].length);

        //         // ! adding more spaces via &nbsp; necessary with Node.textContent? (hopefully not)
        //         if(secondHalf?.match(/^\s+\w/)){ // if secondHalf starts with a space
        //             secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
        //         }
        //     }
        //     refCompHtml.textContent = firstHalf + secondHalf;
        //     selectionNode = refCompHtml.childNodes[0] || refCompHtml;
        // } else {
        //     if(!selection?.isCollapsed){
        //         // * NOTE only in firefox there is a problem with Ctrl+A and Selection (0:1) in Chrome Selection works
        //         // selection spans from start (0) to some position (n)

        //         let endPos = selection?.focusOffset || 0;
                
        //         firstHalf = "";

        //         console.log(endPos, textContent, textContent.length);
        //         refCompHtml.textContent = textContent.slice(endPos, textContent.length) || "";

        //         selectionNode = refCompHtml;
        //     }
        // }
        if(refCompHtml.textContent?.length == 0 && refCompHtml.textContent == textContent){
            let prev = Component.tedit.collection.prev(this.refComponent);

            // ! not clear if it works
            refCompHtml.parentElement?.remove();
            Component.tedit.collection.remove(this.refComponent);
            
            prev?.focus();

        } else {
            console.log(affectedNode,affectedNode?.nodeType)
            DomTextSelector.setCursor(affectedNode as Node, pos - 1);
        }
    }
}

export default EditableHandler;