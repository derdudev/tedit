import Logger from "../log/logger.js";
import DomTextSelector from "./DomTextSelector.js";
import DomWorker from "./DomWorker.js";
import ShortcutHandler from "./shortcutHandler.js";
class EditableHandler {
    constructor(refComponent) {
        this.refComponent = refComponent;
        this.shortcutHandler = new ShortcutHandler(refComponent.html);
        this.shortcutHandler.registerShortcut(["Control", "A"], this.handleSelectAll.bind(this));
    }
    handleKeys(e) {
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        e.preventDefault();
        const selection = document.getSelection();
        let pos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
        const refCompHtml = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
        let firstHalf, secondHalf, selectionNode, textContent, affectedNode, affectedSibling, affectedParent;
        firstHalf = secondHalf = "";
        if (isDelete) {
        }
        else {
            if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                selection === null || selection === void 0 ? void 0 : selection.deleteFromDocument();
                affectedNode = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
                pos = (((selection === null || selection === void 0 ? void 0 : selection.anchorOffset) > (selection === null || selection === void 0 ? void 0 : selection.focusOffset)) ? selection === null || selection === void 0 ? void 0 : selection.anchorOffset : selection === null || selection === void 0 ? void 0 : selection.anchorOffset);
            }
            else {
                selectionNode = selection === null || selection === void 0 ? void 0 : selection.anchorNode;
                if (pos == 0 && hasPreviousSibling(selectionNode)) {
                    if ((selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.nodeType) === 3 && (((_a = selectionNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) !== "p"))
                        affectedNode = this.getInnerRightNode((_b = selectionNode.parentNode) === null || _b === void 0 ? void 0 : _b.previousSibling);
                    else
                        affectedNode = this.getInnerRightNode(selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.previousSibling);
                    pos = ((_c = affectedNode.textContent) === null || _c === void 0 ? void 0 : _c.length) || 0;
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
                if (((_d = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode) === null || _d === void 0 ? void 0 : _d.nodeName.toLowerCase()) === "p") {
                    affectedParent = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode;
                    affectedSibling = (affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.previousSibling) || (affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.nextSibling) || affectedParent;
                }
                else {
                    affectedSibling = ((_e = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode) === null || _e === void 0 ? void 0 : _e.previousSibling) || ((_f = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode) === null || _f === void 0 ? void 0 : _f.nextSibling);
                    affectedParent = (_g = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode) === null || _g === void 0 ? void 0 : _g.parentNode;
                }
                affectedNode.textContent = firstHalf + secondHalf;
                if (firstHalf + secondHalf == "") {
                    (_j = (_h = affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode) === null || _h === void 0 ? void 0 : _h.parentNode) === null || _j === void 0 ? void 0 : _j.removeChild(affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.parentNode);
                    if ((affectedParent === null || affectedParent === void 0 ? void 0 : affectedParent.firstChild) == affectedSibling) {
                        pos = ((_k = this.getInnerRightNode(affectedSibling).textContent) === null || _k === void 0 ? void 0 : _k.length) || 0 + 1 || 0;
                        affectedNode = this.getInnerRightNode(affectedSibling);
                    }
                    else {
                        pos = 1;
                        console.log(affectedParent, affectedSibling);
                        affectedNode = this.getInnerRightNode(affectedSibling);
                    }
                }
            }
        }
        if (((_l = refCompHtml.textContent) === null || _l === void 0 ? void 0 : _l.length) == 0 && refCompHtml.textContent == textContent) {
        }
        else {
            Logger.clog("deletingInfo", "## deleted in ", affectedNode, "that is of type " + (affectedNode === null || affectedNode === void 0 ? void 0 : affectedNode.nodeType));
            console.log(pos);
            if (pos > 0)
                DomTextSelector.setCursor(affectedNode, pos - 1);
            else
                DomTextSelector.setCursor(affectedNode, pos);
            (_m = refCompHtml.parentElement) === null || _m === void 0 ? void 0 : _m.normalize();
        }
    }
    fuseNodes(node) {
        let childNodes = node.childNodes || [];
        console.log(childNodes, node);
        let updatedChildNotes = [];
        for (let i = 1; i < childNodes.length; i++) {
            console.log(childNodes[i - 1].nodeName, childNodes[i].nodeName);
            if (childNodes[i - 1].nodeName == childNodes[i].nodeName) {
                if (childNodes[i].nodeName == "#text")
                    updatedChildNotes.push(document.createTextNode(childNodes[i - 1].textContent || "" + childNodes[i].textContent || ""));
                else
                    updatedChildNotes.push(DomWorker.create(childNodes[i].nodeName, { innerText: childNodes[i - 1].textContent || "" + childNodes[i].textContent }));
            }
            else {
                updatedChildNotes.push(childNodes[i - 1]);
                updatedChildNotes.push(childNodes[i]);
            }
        }
        console.log(updatedChildNotes);
        if (updatedChildNotes)
            node.parentElement.innerHTML = "";
        for (let i = 0; i < updatedChildNotes.length; i++) {
            node.appendChild(updatedChildNotes[i]);
        }
    }
    getInnerRightNode(parentNode) {
        if (parentNode.hasChildNodes()) {
            return this.getInnerRightNode(parentNode.lastChild);
        }
        else {
            return parentNode;
        }
    }
}
function hasPreviousSibling(selectionNode) {
    var _a, _b;
    let check;
    if (selectionNode.nodeType === 3 && (((_a = selectionNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase()) !== "p")) {
        check = (_b = selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.parentElement) === null || _b === void 0 ? void 0 : _b.previousSibling;
    }
    else {
        check = selectionNode === null || selectionNode === void 0 ? void 0 : selectionNode.previousSibling;
    }
    if (check)
        return true;
    return false;
}
export default EditableHandler;
//# sourceMappingURL=editableHandler.js.map