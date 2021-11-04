import Component from "../core/component.js";
class KeyHandler {
    constructor(refComponent) {
        this.refComponent = refComponent;
    }
    handleArrows(e) {
        this.handleUpArrow(e);
        this.handleDownArrow(e);
    }
    handleUpArrow(e) {
        if (e.key == "ArrowUp") {
            e.preventDefault();
            let prevComp = Component.tedit.collection.prev(this.refComponent);
            let selection = document.getSelection();
            let endPos;
            endPos = (selection === null || selection === void 0 ? void 0 : selection.focusOffset) || 0;
            prevComp === null || prevComp === void 0 ? void 0 : prevComp.focus(endPos);
        }
    }
    handleDownArrow(e) {
        if (e.key == "ArrowDown") {
            e.preventDefault();
            let nextComp = Component.tedit.collection.next(this.refComponent);
            let selection = document.getSelection();
            let endPos;
            endPos = (selection === null || selection === void 0 ? void 0 : selection.focusOffset) || 0;
            nextComp === null || nextComp === void 0 ? void 0 : nextComp.focus(endPos);
        }
    }
}
export default KeyHandler;
//# sourceMappingURL=keyHandler.js.map