class DomTextSelectorWorker {
    static surroundSelection(element) {
        var _a, _b, _c;
        let selection = Object.freeze(window.getSelection());
        let selectedNode = selection === null || selection === void 0 ? void 0 : selection.focusNode;
        let parent = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.parentElement;
        console.log(selection);
        if ((parent === null || parent === void 0 ? void 0 : parent.tagName) != "B")
            selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0).cloneRange().surroundContents(element);
        else
            (_b = (_a = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.replaceChild(selectedNode, parent);
        let range = new Range();
        range.setStart(element.childNodes[0], 0);
        range.setEnd(element.childNodes[0], element.innerText.length - 1);
        (_c = document.getSelection()) === null || _c === void 0 ? void 0 : _c.addRange(range);
        console.log(document.getSelection());
    }
}
export default DomTextSelectorWorker;
//# sourceMappingURL=DomTextSelectorWorker.js.map