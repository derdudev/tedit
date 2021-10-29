import DomWorker from "../base/DomWorker.js";
class DomComponent {
    constructor(options, element) {
        this.html = DomWorker.create(options.tagName || "div", options);
        if (element)
            this.html = element;
    }
    replaceWith(replacementElement) {
        var _a;
        (_a = this.html.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(replacementElement, this.html);
        this.html = replacementElement;
    }
}
export default DomComponent;
//# sourceMappingURL=domComponent.js.map