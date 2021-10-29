class NavbarModule {
    constructor(initElements) {
        this.elements = initElements || [];
        this.size = this.elements.length;
    }
    get(index) {
        return this.elements[index];
    }
}
export default NavbarModule;
//# sourceMappingURL=navbarModule.js.map