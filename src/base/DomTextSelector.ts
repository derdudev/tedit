class DomTextSelector {
    public static setSelection(textNode:Node, startPos:number, endPos:number){
        let range = document.createRange();

        (startPos < endPos) ? range.setStart(textNode, startPos) : range.setStart(textNode, endPos);
        if(startPos == endPos) range.collapse(true);
        else (endPos > startPos) ? range.setEnd(textNode, endPos) : range.setEnd(textNode, startPos); 

        let selection = document.getSelection();

        selection?.removeAllRanges();
        selection?.addRange(range);
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