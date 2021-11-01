class DomTextSelector {
    public static setSelection(){}

    public static select(){}

    public static setCursor(textNode: Node, pos: number){
        // https://www.geeksforgeeks.org/how-to-set-cursor-position-in-content-editable-element-using-javascript/
        let range = document.createRange();

        range.setStart(textNode, pos);
        range.collapse(true); 

        let selection = document.getSelection();

        selection?.removeAllRanges();
        selection?.addRange(range);

        console.log(selection);
    }

    public static getSelection(){}
}

export default DomTextSelector;