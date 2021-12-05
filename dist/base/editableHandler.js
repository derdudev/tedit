import Component from "../core/component.js";
import Logger from "../log/logger.js";
import DomTextSelector from "./DomTextSelector.js";
import ShortcutHandler from "./shortcutHandler.js";
class EditableHandler {
    constructor(refComponent) {
        this.refComponent = refComponent;
        this.shortcutHandler = new ShortcutHandler(refComponent.html);
        this.shortcutHandler.registerShortcut(["Control", "A"], this.handleSelectAll.bind(this));
    }
    handleKeys(e) {
        this.handleSpace(e);
        this.handleBackspace(e);
        this.handleDelete(e);
        this.handleEnter(e);
    }
    handleSelectAll(e) {
        var _a;
        const refCompHtml = this.refComponent.html;
        let selectionNode = refCompHtml;
        DomTextSelector.setSelection(selectionNode, 0, (_a = refCompHtml.textContent) === null || _a === void 0 ? void 0 : _a.length);
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
        var _a, _b, _c, _d, _e, _f;
        e.preventDefault();
        const selection = document.getSelection();
        let pos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
        const refCompHtml = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
        let firstHalf, secondHalf, selectionNode, textContent, affectedNode;
        firstHalf = secondHalf = "";
        if (isDelete) {
        }
        else {
            if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                selection === null || selection === void 0 ? void 0 : selection.deleteFromDocument();
                affectedNode = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
            }
            else {
                selectionNode = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
                if (pos == 0 && ((selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.previousSibling) || ((_a = selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.parentElement) === null || _a === void 0 ? void 0 : _a.previousSibling))) {
                    affectedNode = (((_b = selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.previousSibling) === null || _b === void 0 ? void 0 : _b.childNodes[0]) || ((_c = selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.parentElement) === null || _c === void 0 ? void 0 : _c.previousSibling));
                    pos = (((_d = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.textContent) === null || _d === void 0 ? void 0 : _d.length) || 0);
                }
                else if (pos == 0) {
                    affectedNode = selectionNode;
                    pos++;
                }
                else {
                    affectedNode = selectionNode;
                }
                textContent = (affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.textContent) || "";
                firstHalf = textContent.slice(0, pos - 1) || "";
                secondHalf = textContent.slice(pos, textContent.length) || "";
                affectedNode.textContent = firstHalf + secondHalf;
            }
        }
        if (((_e = refCompHtml.textContent) === null || _e === void 0 ? void 0 : _e.length) == 0 && refCompHtml.textContent == textContent) {
            let prev = Component.tedit.collection.prev(this.refComponent);
            (_f = refCompHtml.parentElement) === null || _f === void 0 ? void 0 : _f.remove();
            Component.tedit.collection.remove(this.refComponent);
            prev === null || prev === void 0 ? void 0 : prev.focus();
        }
        else {
            Logger.clog("deletingInfo", "## deleted in ", affectedNode, "that is of type " + (affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.nodeType));
            DomTextSelector.setCursor(affectedNode, pos);
        }
    }
}
export default EditableHandler;
//# sourceMappingURL=editableHandler.js.map