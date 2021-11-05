import DomTextSelector from "../base/DomTextSelector.js";
class Component {
    constructor() {
        this.templates = [];
    }
    render(isFirstRender, template) {
        const selection = document.getSelection();
        let startPos = selection === null || selection === void 0 ? void 0 : selection.anchorOffset;
        let endPos = selection === null || selection === void 0 ? void 0 : selection.focusOffset;
        let selectionNode;
        if (template != this.activeTemplate) {
            template.html.addEventListener("click", this.onclick.bind(this));
            if (isFirstRender)
                Component.tedit.html.appendChild(template.html);
            else {
                Component.tedit.html.replaceChild(template.html, this.html);
            }
            this.html = template.html;
            selectionNode = this.html.childNodes[0] || this.html;
        }
        else {
            selectionNode = this.html.childNodes[0] || this.html;
        }
        DomTextSelector.setSelection(selectionNode, startPos, endPos);
        setTimeout(() => console.log(document.getSelection()), 1);
    }
    loadTemp(isFirstLoad, index) {
        if (this.templates[index] != this.activeTemplate)
            this.templates[index].loadData(this.content);
        this.render(isFirstLoad, this.templates[index]);
        this.activeTemplate = this.templates[index];
    }
    getContent() {
        return this.content;
    }
    getCompData() {
        return {
            type: this.name,
            content: this.content,
            template: this.templates.indexOf(this.activeTemplate),
        };
    }
    focus(cursorPos) {
        let domElement = this.html;
        domElement.click();
        let textNode = domElement.childNodes[0];
        let textContent = textNode.textContent;
        if (domElement.childNodes[0]) {
            let anchorOffset = (textContent === null || textContent === void 0 ? void 0 : textContent.length) || 0;
            if (cursorPos != undefined && cursorPos <= (textContent === null || textContent === void 0 ? void 0 : textContent.length))
                DomTextSelector.setCursor(textNode, cursorPos);
            else
                DomTextSelector.setCursor(textNode, anchorOffset);
        }
        else {
            domElement.focus();
        }
    }
    static setTedit(tedit) {
        this.tedit = tedit;
    }
    onclick() {
        console.log(this);
        Component.tedit.navbar.load(this.activeTemplate.barConfig);
    }
}
export default Component;
//# sourceMappingURL=component.js.map