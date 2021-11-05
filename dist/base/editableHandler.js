import Component from "../core/component.js";
import DomTextSelector from "./DomTextSelector.js";
class EditableHandler {
    constructor(refComponent) {
        this.refComponent = refComponent;
    }
    handleKeys(e) {
        this.handleSelectAll(e);
        this.handleSpace(e);
        this.handleBackspace(e);
        this.handleDelete(e);
        this.handleEnter(e);
    }
    handleSelectAll(e) {
        const refCompHtml = this.refComponent.html;
        if (e.key == "a" || e.key == "A") {
            setTimeout(() => {
                var _a;
                let selection = document.getSelection();
                let selectionNode = refCompHtml.childNodes[0];
                if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                    DomTextSelector.setSelection(selectionNode, 0, (_a = selectionNode.textContent) === null || _a === void 0 ? void 0 : _a.length);
                }
            }, 1);
        }
    }
    handleEnter(e) {
        if (e.key == "Enter")
            e.preventDefault();
    }
    handleSpace(e) {
        var _a;
        const refCompHtml = this.refComponent.html;
        const textContent = refCompHtml.textContent || "";
        if (e.key == " ") {
            e.preventDefault();
            let pos = ((_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.anchorOffset) || 0;
            let firstHalf = textContent.slice(0, pos) || "";
            let secondHalf = textContent.slice(pos, textContent.length) || "";
            console.log(firstHalf, secondHalf);
            refCompHtml.textContent = firstHalf + "&nbsp;" + secondHalf;
            let selectionNode = refCompHtml.childNodes[0];
            DomTextSelector.setCursor(selectionNode, ++pos);
        }
    }
    handleBackspace(e) {
        if (e.key == "Backspace") {
            this.handleDeleting(false, e);
        }
    }
    handleDelete(e) {
        if (e.key == "Delete") {
            this.handleDeleting(true, e);
        }
    }
    handleDeleting(isDelete, e) {
        var _a, _b;
        e.preventDefault();
        const selection = document.getSelection();
        let pos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
        const refCompHtml = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
        const textContent = refCompHtml.textContent || "";
        let firstHalf, secondHalf, selectionNode;
        firstHalf = secondHalf = "";
        if (pos != 0) {
            if (selection === null || selection === void 0 ? void 0 : selection.isCollapsed) {
                if (isDelete)
                    firstHalf = (textContent === null || textContent === void 0 ? void 0 : textContent.slice(0, pos)) || "";
                else
                    firstHalf = textContent.slice(0, --pos) || "";
                secondHalf = textContent.slice(++pos, textContent.length) || "";
            }
            else {
                let startPos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
                let endPos = (selection === null || selection === void 0 ? void 0 : selection.focusOffset) || 0;
                console.log(startPos, endPos);
                if (startPos > endPos) {
                    let temp = startPos;
                    startPos = endPos;
                    endPos = temp;
                }
                firstHalf = textContent.slice(0, startPos) || "";
                secondHalf = textContent.slice(endPos, textContent.length);
                console.log(secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*\w/), ((secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*/)) || [])[0].length);
                if (secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/^\s+\w/)) {
                    secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                }
            }
            refCompHtml.textContent = firstHalf + secondHalf;
            selectionNode = refCompHtml.childNodes[0] || refCompHtml;
        }
        else {
            if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                let endPos = (selection === null || selection === void 0 ? void 0 : selection.focusOffset) || 0;
                firstHalf = "";
                refCompHtml.textContent = textContent.slice(endPos, textContent.length) || "";
                selectionNode = refCompHtml;
            }
        }
        if (((_a = refCompHtml.textContent) === null || _a === void 0 ? void 0 : _a.length) == 0 && refCompHtml.textContent == textContent) {
            let prev = Component.tedit.collection.prev(this.refComponent);
            (_b = refCompHtml.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
            Component.tedit.collection.remove(this.refComponent);
            prev === null || prev === void 0 ? void 0 : prev.focus();
        }
        else {
            DomTextSelector.setCursor(selectionNode, firstHalf.length);
        }
    }
}
export default EditableHandler;
//# sourceMappingURL=editableHandler.js.map