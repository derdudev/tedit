import Logger from "../log/logger.js";

class DomTextSelector {
    // TODO: maybe later on extract selectAllOf method
    /**
     * Creates a selection that either spans over the entirety of an element (all its content) or specific boundaries or sets a cursor if startPos = endPos
     * @param textNode 
     * @param startPos 
     * @param endPos 
     */
    public static setSelection(textNode:Node, startPos:number, endPos:number){
        let range = document.createRange();

        if(textNode.childNodes.length < 2 && textNode.childNodes.length > 0) {
            // ! textNode.childNodes[0] only works for length >= 1
            // ranges working with selecting text
            if(startPos < endPos) {
                range.setStart(textNode.childNodes[0], startPos);
                range.setEnd(textNode.childNodes[0], endPos);
            } else {
                range.setStart(textNode, endPos);
                range.setEnd(textNode, startPos);
            }
        } else {
            // ranges working with selecting elements
            range.selectNodeContents(textNode);
        }

        let selection = document.getSelection();

        selection?.removeAllRanges();
        selection?.addRange(range);

        if(selection?.rangeCount as number > 0) Logger.clog("setSelection", "## set selection to: ", range.commonAncestorContainer, "from " + selection?.getRangeAt(0).startOffset + " to " + selection?.getRangeAt(0).endOffset);
    }

    /**
     * Sets a selection over the entirety of the given textNode
     * @param textNode 
     */
    public static selectAllOf(textNode: Node){ }

    /**
     * Creates a selection spanning over multiple html text elements
     * @param startNode node that contains the start of the selection (and thus startPos)
     * @param endNode node containing the end of the selection (and thus endPos)
     * @param startPos start offset inside of the startNode
     * @param endPos end offset inside of the endNode
     */
    public static spanSelection(startNode: Node, endNode: Node, startPos: number, endPos: number) {

    }

    public static select(){}

    public static setCursor(textNode: Node, pos: number){
        // https://www.geeksforgeeks.org/how-to-set-cursor-position-in-content-editable-element-using-javascript/
        let range = document.createRange();

        range.setStart(textNode, pos);
        range.collapse(true); 

        let selection = document.getSelection();

        selection?.removeAllRanges();
        selection?.addRange(range);
    }

    public static getSelection(){}
}

export default DomTextSelector;