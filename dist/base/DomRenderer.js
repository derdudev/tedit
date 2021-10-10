class DOMRenderer {
    static render(element, parent) {
        if (parent) {
            parent.appendChild(element.html);
        }
        else {
            document.body.appendChild(element.html);
        }
    }
    static renderHTML(element, parent) {
        if (parent) {
            parent.appendChild(element);
        }
        else {
            document.body.appendChild(element);
        }
    }
}
export default DOMRenderer;
//# sourceMappingURL=DomRenderer.js.map