import Component from "../core/component.js";
import Logger from "../log/logger.js";
import DomTextSelector from "./DomTextSelector.js";
import DomWorker from "./DomWorker.js";
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
        this.handleBackspace(e);
        this.handleDelete(e);
        this.handleEnter(e);
    }

    /**
     * handler for Ctrl + A selection. Ensures compatabilty between chromium and firefox
     */
    public handleSelectAll(){
        const refCompHtml = this.refComponent.html;

        // ! in the case of multiple childNodes, only the first one would be selected completely
        let selectionNode = refCompHtml;

        // if selection is not collapsed, anchorOffset != focusOffset
        DomTextSelector.setSelection(selectionNode as Node, 0 as number, refCompHtml.textContent?.length as number);
    }

    public handleEnter(e:KeyboardEvent){
        if(e.key == "Enter") e.preventDefault();
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

        let anchorIsEmpty = false, isComponent = false, isComponentTextNode = false;
        let pos = selection?.anchorOffset || 0;

        let firstHalf, secondHalf, selectionNode, textContent, affectedNode, affectedSibling, affectedParent;
        firstHalf = secondHalf = "";

        selectionNode = selection?.anchorNode; // ! if childElementCounts == 0, hasPreviousSibling should 

        anchorIsEmpty = (selectionNode?.nodeType != 3 && !selectionNode?.hasChildNodes());
        isComponentTextNode = (selectionNode?.parentNode?.nodeName == "P") ? true : false;
        isComponent = (selectionNode?.nodeName == "P") ? true : false;

        if(isDelete){

        } else {
            if(!selection?.isCollapsed) {
                // selection spans over multiple characters
                selection?.deleteFromDocument();
                affectedNode = selection?.anchorNode; // ! if selection spans over the entire anchor node, this results in affectedNode = null
                pos = ((selection?.anchorOffset as number > (selection?.focusOffset as number)) ? selection?.anchorOffset : selection?.anchorOffset) as number + 1;
            }
            else if(!anchorIsEmpty && !isComponent){
                if(pos == 0 && !anchorIsEmpty && hasPreviousSibling(selectionNode as Node)){ 
                    // on the lefthand side of the element is another inline style element/node
                    if(selectionNode?.nodeType === 3 && (selectionNode.parentNode?.nodeName.toLowerCase() !== "p")) affectedNode = this.getInnerRightNode(selectionNode.parentNode?.previousSibling as Node);
                    else affectedNode = this.getInnerRightNode(selectionNode?.previousSibling as Node);

                    pos = affectedNode.textContent?.length || 0;
                } else if  (pos == 0) {
                    // * NOTE (maybe) fuse element above?
                    // if first case failed and pos is 0, there is no previous sibling
                    affectedNode = selectionNode;

                    // ! fusing needs to be implemented
                    pos++;
                } else {
                    affectedNode = selectionNode;
                }

                textContent = affectedNode?.textContent || "";

                firstHalf = textContent.slice(0,pos - 1) || "";
                secondHalf = textContent.slice(pos, textContent.length) || "";

                if(affectedNode?.parentNode?.nodeName.toLowerCase() === "p") {
                    affectedParent = affectedNode?.parentNode;
                    affectedSibling = affectedNode?.previousSibling || affectedNode?.nextSibling || affectedParent;
                } else {
                    affectedSibling = affectedNode?.parentNode?.previousSibling || affectedNode?.parentNode?.nextSibling;
                    affectedParent = affectedNode?.parentNode?.parentNode;
                }

                (affectedNode as Node).textContent = firstHalf + secondHalf;

                if(firstHalf + secondHalf == ""){
                    if(affectedParent?.firstChild == affectedSibling) {
                        pos = (this.getInnerRightNode(affectedSibling as Node).textContent?.length || 0) + 1 || 0;

                        console.log(affectedNode?.parentNode)
                        affectedNode?.parentNode?.parentNode?.removeChild(affectedNode.parentNode);

                        affectedNode = this.getInnerRightNode(affectedSibling as Node);
                    } else {
                        pos = 0;
                        affectedNode = this.getInnerRightNode(affectedSibling as Node);
                    }
                }
            }
        }

        if(anchorIsEmpty && isComponent){
            let prev = Component.tedit.collection.prev(this.refComponent);

            selectionNode?.parentNode?.removeChild(selectionNode);
            Component.tedit.collection.remove(this.refComponent);
            
            prev?.focus();

        } else {
            Logger.clog("deletingInfo", "## deleted in ", affectedNode, "that is of type " + affectedNode?.nodeType);

            // * check necessary as cursor position could very well be at 0 and pos - 1 would result in an overflow
            if(pos < 1 && isComponentTextNode) DomTextSelector.setCursor(affectedNode as Node, pos);
            else DomTextSelector.setCursor(affectedNode as Node, pos-1);

            affectedNode?.parentNode?.normalize();
        }
    }

    private fuseNodes(node: Node){
        // * NOTE: look into Note.normalize() function
        let childNodes = node.childNodes || [];

        console.log(childNodes, node);

        let updatedChildNotes: Node[] = [];

        for(let i=1; i<childNodes.length; i++){
            console.log(childNodes[i-1].nodeName, childNodes[i].nodeName)
            if(childNodes[i-1].nodeName == childNodes[i].nodeName){
                if(childNodes[i].nodeName == "#text") updatedChildNotes.push(document.createTextNode(childNodes[i-1].textContent || "" + childNodes[i].textContent || ""));
                else updatedChildNotes.push(DomWorker.create(childNodes[i].nodeName, {innerText: childNodes[i-1].textContent || "" + childNodes[i].textContent}));
            } else {
                updatedChildNotes.push(childNodes[i-1]);
                updatedChildNotes.push(childNodes[i]);
            }
        }

        console.log(updatedChildNotes);

        if(updatedChildNotes) (node.parentElement as HTMLElement).innerHTML = "";

        for(let i=0; i<updatedChildNotes.length; i++){
            node.appendChild(updatedChildNotes[i]);
        }
    }

    private getInnerRightNode(parentNode: Node): Node{
        if(parentNode.hasChildNodes()){
            return this.getInnerRightNode(parentNode.lastChild as Node);
        } else {
            return parentNode;
        }
    }
}

// helper functions
function hasPreviousSibling(selectionNode: Node){
    let check; 
    if(selectionNode.nodeType === 3 && (selectionNode.parentNode?.nodeName.toLowerCase() !== "p")) { // ! requires inline styles to be of a different element than a paragraph
        check = selectionNode?.parentElement?.previousSibling;
    } else {
        check = selectionNode?.previousSibling;
    }
    if(check) return true;
    return false;
}

export default EditableHandler;