import DomTextSelector from "../base/DomTextSelector.js";
class Component {
    constructor() {
        this.navbarModules = [];
        this.templates = [];
    }
    render(template) {
        this.html = template.html;
        template.html.addEventListener("click", this.onclick.bind(this));
        Component.tedit.html.appendChild(template.html);
    }
    loadTemp(index) {
        this.templates[index].loadData(this.content);
        this.render(this.templates[index]);
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