class NavbarModule {
    constructor(initElements) {
        this.elements = initElements || [];
        this.size = this.elements.length;
        console.log(this.elements);
    }
    get(index) {
        return this.elements[index];
    }
}
export default NavbarModule;
//# sourceMappingURL=navbarModule.js.map