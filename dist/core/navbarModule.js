import Logger from "../log/logger.js";
class NavbarModule {
    constructor(initElements) {
        this.elements = initElements || [];
        this.size = this.elements.length;
        Logger.clog("navbarLoading", this.elements);
    }
    get(index) {
        return this.elements[index];
    }
}
export default NavbarModule;
//# sourceMappingURL=navbarModule.js.map