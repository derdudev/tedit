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
            let selection = document.getSelection();
            console.log(selection);
        }
    }
    handleDownArrow(e) {
        if (e.key == "ArrowDown") {
        }
    }
}
function getLineHeight(element) {
    const m = document.createElement("p");
    m.style.width = element.clientWidth.toString();
    m.style = element.style;
    m.innerHTML = "h";
    document.body.appendChild(m);
    m.style.opacity = "0";
    m.style.position = "fixed";
    m.style.zIndex = "-1";
}
export default KeyHandler;
//# sourceMappingURL=keyHandler.js.map