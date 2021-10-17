import DomWorker from "src/base/DomWorker";
const getTextCaretPosition = () => {
    var _a;
    let tempSpan = DomWorker.create("span", { innerText: "." });
    (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.getRangeAt(0).surroundContents(tempSpan);
    return {
        left: tempSpan.offsetLeft,
        top: tempSpan.offsetTop + tempSpan.offsetHeight,
    };
};
export default getTextCaretPosition;
//# sourceMappingURL=textCaretPosition.js.map