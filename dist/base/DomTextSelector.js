class DomTextSelector {
    static setSelection() { }
    static select() { }
    static setCursor(textNode, pos) {
        var _a, _b;
        let range = document.createRange();
        range.setStart(textNode, pos);
        range.collapse(true);
        (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        (_b = document.getSelection()) === null || _b === void 0 ? void 0 : _b.addRange(range);
    }
    static getSelection() { }
}
export default DomTextSelector;
//# sourceMappingURL=DomTextSelector.js.map