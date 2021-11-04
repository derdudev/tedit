class DomTextSelector {
    static setSelection() { }
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