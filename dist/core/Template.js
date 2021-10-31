class Template {
    constructor(domElement, barConfig, templateLoader, dataLoader) {
        this.html = domElement;
        this.barConfig = barConfig;
        if (dataLoader)
            this.loadData = dataLoader;
    }
    loadData(data) { }
}
export default Template;
//# sourceMappingURL=Template.js.map