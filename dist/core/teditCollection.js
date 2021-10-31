class TeditCollection {
    constructor(initCollection) {
        this.collection = initCollection || [];
        this.length = (initCollection === null || initCollection === void 0 ? void 0 : initCollection.length) || 0;
    }
    append(component) {
        console.log("# Appending <", component, ">");
        this.collection.push(component);
        this.length++;
    }
    get(index) {
        return this.collection[index];
    }
}
export default TeditCollection;
//# sourceMappingURL=teditCollection.js.map