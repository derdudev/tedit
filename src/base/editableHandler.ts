import Component from "../core/component.js";
import Logger from "../log/logger.js";
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
            if(!selection?.isCollapsed) {
                selection?.deleteFromDocument();
                affectedNode = selection?.anchorNode;
            }
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

        if(refCompHtml.textContent?.length == 0 && refCompHtml.textContent == textContent){
            let prev = Component.tedit.collection.prev(this.refComponent);

            // ! not clear if it works
            refCompHtml.parentElement?.remove();
            Component.tedit.collection.remove(this.refComponent);
            
            prev?.focus();

        } else {
            Logger.clog("deletingInfo", "## deleted in ", affectedNode, "that is of type " + affectedNode?.nodeType);
            DomTextSelector.setCursor(affectedNode as Node, pos );
        }
    }
}

export default EditableHandler;