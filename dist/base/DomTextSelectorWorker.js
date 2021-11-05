import DomTextSelector from "./DomTextSelector.js";
import DomWorker from "./DomWorker.js";
class DomTextSelectorWorker {
    static surroundSelection(element) {
        var _a;
        let selection = document.getSelection();
        let selectedNode = selection === null || selection === void 0 ? void 0 : selection.focusNode;
        let parent = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.parentElement;
        let mainElement = parent === null || parent === void 0 ? void 0 : parent.parentElement;
        console.log(selection);
        let selectionNode;
        if ((parent === null || parent === void 0 ? void 0 : parent.className) == element.className) {
            let textNodeParent = DomWorker.create("p", { innerText: (selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.textContent) || "" });
            let textNode = textNodeParent.childNodes[0];
            parent.replaceWith(textNode);
            let textNodeKey = 0;
            mainElement === null || mainElement === void 0 ? void 0 : mainElement.childNodes.forEach((node, key) => {
                if (node == textNode) {
                    textNodeKey = key;
                    return;
                }
            });
            console.log(mainElement === null || mainElement === void 0 ? void 0 : mainElement.childNodes);
            selectionNode = textNode;
        }
        else {
            selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0).cloneRange().surroundContents(element);
            selectionNode = element.childNodes[0];
        }
        DomTextSelector.setSelection(selectionNode, 0, (_a = selectionNode.textContent) === null || _a === void 0 ? void 0 : _a.length);
        mainElement === null || mainElement === void 0 ? void 0 : mainElement.normalize();
    }
}
export default DomTextSelectorWorker;
//# sourceMappingURL=DomTextSelectorWorker.js.map