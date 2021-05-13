import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
export default class DOM {
    static create(tagName, options, children) {
        let element = document.createElement(tagName);
        let valueOfKey;
        for (let key in options) {
            valueOfKey = getKeyValue(key)(options);
            if (key == "tagName") {
            }
            else if (key !== "style") {
                element.setAttribute(key, valueOfKey);
                setKeyValue(key, valueOfKey)(element);
            }
            else {
                Object.assign(element.style, getKeyValue(key)(options));
            }
        }
        for (let child in children) {
            element.appendChild(getKeyValue(child)(children));
        }
        return element;
    }
    static render(element, parent) {
        if (parent) {
            parent.appendChild(element);
        }
        else {
            document.body.appendChild(element);
        }
    }
}
class DOMWorker {
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
    static setCursor(textNode, pos) {
        var _a, _b;
        let range = document.createRange();
        range.setStart(textNode, pos);
        range.collapse(true);
        (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
        (_b = document.getSelection()) === null || _b === void 0 ? void 0 : _b.addRange(range);
    }
}
export { DOMWorker };
//# sourceMappingURL=dom.js.map