class DomTextSelector {
    static setSelection(textNode, startPos, endPos) {
        let range = document.createRange();
        if (textNode.childNodes.length < 2 && textNode.childNodes.length > 0) {
            if (startPos < endPos) {
                range.setStart(textNode.childNodes[0], startPos);
                range.setEnd(textNode.childNodes[0], endPos);
            }
            else {
                range.setStart(textNode, endPos);
                range.setEnd(textNode, startPos);
            }
        }
        else {
            range.selectNodeContents(textNode);
        }
        let selection = document.getSelection();
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        if ((selection === null || selection === void 0 ? void 0 : selection.rangeCount) > 0)
            console.log(selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0).endOffset, range.commonAncestorContainer);
    }
    static selectAllOf(textNode) { }
    static spanSelection(startNode, endNode, startPos, endPos) {
    }
    static select() { }
    static setCursor(textNode, pos) {
        let range = document.createRange();
        range.setStart(textNode, pos);
        range.collapse(true);
        let selection = document.getSelection();
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
    }
    static getSelection() { }
}
export default DomTextSelector;
//# sourceMappingURL=DomTextSelector.js.map