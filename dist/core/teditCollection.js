class TeditCollection {
    constructor(initCollection) {
        this.collection = initCollection || [];
    }
    append(component) {
        console.log("# Appending <", component, ">");
        this.collection.push(component);
    }
}
export default TeditCollection;
//# sourceMappingURL=teditCollection.js.map