class Component {
    constructor() {
        this.navbarModules = [];
    }
    render(template) {
        template.html.addEventListener("click", this.onclick.bind(this));
        Component.tedit.html.appendChild(template.html);
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