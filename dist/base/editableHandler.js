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
    }
    handleSelectAll(e) {
        if (e.key == "a" || e.key == "A") {
            setTimeout(() => {
                var _a;
                let selection = document.getSelection();
                let selectionNode = this.refComponent.html.childNodes[0];
                if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                    let range = new Range();
                    range.setStart(selectionNode, 0);
                    range.setEnd(selectionNode, (_a = selectionNode.textContent) === null || _a === void 0 ? void 0 : _a.length);
                    selection === null || selection === void 0 ? void 0 : selection.addRange(range);
                }
            }, 1);
        }
    }
    handleSpace(e) {
        var _a, _b, _c;
        if (e.key == " ") {
            e.preventDefault();
            let pos = ((_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.anchorOffset) || 0;
            let firstHalf = ((_b = this.refComponent.html.textContent) === null || _b === void 0 ? void 0 : _b.slice(0, pos)) || "";
            let secondHalf = ((_c = this.refComponent.html.textContent) === null || _c === void 0 ? void 0 : _c.slice(pos, this.refComponent.html.textContent.length)) || "";
            console.log(firstHalf, secondHalf);
            this.refComponent.html.innerHTML = firstHalf + "&nbsp;" + secondHalf;
            let selectionNode = this.refComponent.html.childNodes[0];
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
        let selection = document.getSelection();
        let pos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
        if (pos != 0) {
            let firstHalf, secondHalf;
            if (selection === null || selection === void 0 ? void 0 : selection.isCollapsed) {
                if (isDelete)
                    firstHalf = ((_a = this.refComponent.html.textContent) === null || _a === void 0 ? void 0 : _a.slice(0, pos)) || "";
                else
                    firstHalf = ((_b = this.refComponent.html.textContent) === null || _b === void 0 ? void 0 : _b.slice(0, --pos)) || "";
                secondHalf = ((_c = this.refComponent.html.textContent) === null || _c === void 0 ? void 0 : _c.slice(++pos, this.refComponent.html.textContent.length)) || "";
                this.refComponent.html.innerHTML = firstHalf + secondHalf;
                let selectionNode = this.refComponent.html.childNodes[0];
                DomTextSelector.setCursor(selectionNode, --pos);
            }
            else {
                let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                let startPos = (range === null || range === void 0 ? void 0 : range.startOffset) || 0;
                let endPos = (range === null || range === void 0 ? void 0 : range.endOffset) || 0;
                console.log(startPos, endPos);
                firstHalf = ((_d = this.refComponent.html.textContent) === null || _d === void 0 ? void 0 : _d.slice(0, startPos)) || "";
                secondHalf = (_e = this.refComponent.html.textContent) === null || _e === void 0 ? void 0 : _e.slice(endPos, this.refComponent.html.textContent.length);
                console.log(secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*\w/), ((secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*/)) || [])[0].length);
                if (secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/^\s+\w/)) {
                    secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                }
                console.log(firstHalf, firstHalf.length, secondHalf);
                this.refComponent.html.innerHTML = firstHalf + secondHalf;
                let selectionNode = this.refComponent.html.childNodes[0];
                if (this.refComponent.html.innerHTML.length < pos)
                    DomTextSelector.setCursor(selectionNode, this.refComponent.html.innerHTML.length - (pos - this.refComponent.html.innerHTML.length));
                else if (startPos == 0)
                    DomTextSelector.setCursor(selectionNode, 0);
                else
                    DomTextSelector.setCursor(selectionNode, firstHalf.length);
            }
        }
        else {
            if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                console.log(range, selection);
                let startPos = (range === null || range === void 0 ? void 0 : range.startOffset) || 0;
                let endPos = (range === null || range === void 0 ? void 0 : range.endOffset) || 0;
                console.log(endPos, startPos);
                this.refComponent.html.innerHTML = ((_f = this.refComponent.html.textContent) === null || _f === void 0 ? void 0 : _f.slice(endPos, this.refComponent.html.textContent.length)) || "";
                DomTextSelector.setCursor(this.refComponent.html, pos);
            }
        }
    }
}
export default EditableHandler;
//# sourceMappingURL=editableHandler.js.map