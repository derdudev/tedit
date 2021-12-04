import DomWorker from "../base/DomWorker.js";
class Navbar {
    constructor(initModule) {
        var _a;
        this.html = DomWorker.create("nav");
        this.load(initModule);
        (_a = DomWorker.getByID("teditContainer")) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement("afterbegin", this.html);
    }
    load(navbarModule) {
        DomWorker.clearElement(this.html);
        for (let i = 0; i < navbarModule.size; i++) {
            this.html.appendChild(navbarModule.get(i).html);
        }
    }
}
export default Navbar;
//# sourceMappingURL=navbar.js.map