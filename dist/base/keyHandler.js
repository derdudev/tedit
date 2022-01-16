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
            if (getCursorLine(e.target) <= 1) {
                e.preventDefault();
                let prevComp = Component.tedit.collection.prev(this.refComponent);
                let selection = document.getSelection();
                let endPos;
                endPos = (selection === null || selection === void 0 ? void 0 : selection.focusOffset) || 0;
                prevComp === null || prevComp === void 0 ? void 0 : prevComp.focus(endPos);
            }
        }
    }
    handleDownArrow(e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (e.key == "ArrowDown") {
            console.log(countLines(e.target), getCursorLine(e.target));
            if (getCursorLine(e.target) == countLines(e.target)) {
                e.preventDefault();
                let nextComp = Component.tedit.collection.next(this.refComponent);
                let selection = document.getSelection();
                let endPos;
                console.log((_c = (_b = (_a = this.refComponent) === null || _a === void 0 ? void 0 : _a.html) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.length, selection === null || selection === void 0 ? void 0 : selection.focusOffset);
                endPos = (((_f = (_e = (_d = this.refComponent) === null || _d === void 0 ? void 0 : _d.html) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.length) - (selection === null || selection === void 0 ? void 0 : selection.focusOffset) + (((_g = nextComp === null || nextComp === void 0 ? void 0 : nextComp.html.textContent) === null || _g === void 0 ? void 0 : _g.length) - ((_k = (_j = (_h = this.refComponent) === null || _h === void 0 ? void 0 : _h.html) === null || _j === void 0 ? void 0 : _j.textContent) === null || _k === void 0 ? void 0 : _k.length)) / 5);
                nextComp === null || nextComp === void 0 ? void 0 : nextComp.focus(endPos);
            }
        }
    }
}
function createMirror(element) {
    const m = document.createElement("p");
    m.style.width = element.clientWidth.toString();
    m.style.wordWrap = window.getComputedStyle(element).wordWrap;
    m.style.whiteSpace = window.getComputedStyle(element).whiteSpace;
    m.style.padding = element.style.padding;
    m.style.fontFamily = window.getComputedStyle(element).fontFamily;
    m.style.fontSize = window.getComputedStyle(element).fontSize;
    m.style.lineHeight = window.getComputedStyle(element).lineHeight;
    m.style.opacity = "0";
    m.style.position = "fixed";
    m.style.zIndex = "-1";
    return m;
}
function getLineHeight(element) {
    const m = createMirror(element);
    m.innerHTML = "h";
    document.body.appendChild(m);
    return m.getBoundingClientRect().height - (+m.style.paddingTop.slice(0, 1) + +m.style.paddingBottom.slice(0, 1));
}
function countLines(element) {
    const lineHeight = getLineHeight(element);
    return (element.getBoundingClientRect().height - (+element.style.paddingTop.slice(0, 1) + +element.style.paddingBottom.slice(0, 1))) / lineHeight;
}
function getCursorLine(element) {
    var _a;
    const lineHeight = getLineHeight(element);
    const selection = document.getSelection();
    const m = createMirror(element);
    m.innerHTML = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.slice(0, selection === null || selection === void 0 ? void 0 : selection.anchorOffset)) || "";
    document.body.appendChild(m);
    return (m.getBoundingClientRect().height - (+m.style.paddingTop.slice(0, 1) + +m.style.paddingBottom.slice(0, 1))) / lineHeight;
}
export default KeyHandler;
//# sourceMappingURL=keyHandler.js.map