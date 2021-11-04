class DomTextSelector {
    static setSelection(textNode, startPos, endPos) {
        let range = document.createRange();
        (startPos < endPos) ? range.setStart(textNode, startPos) : range.setStart(textNode, endPos);
        if (startPos == endPos)
            range.collapse(true);
        else
            (endPos > startPos) ? range.setEnd(textNode, endPos) : range.setEnd(textNode, startPos);
        let selection = document.getSelection();
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
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