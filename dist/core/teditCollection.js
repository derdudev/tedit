class TeditCollection {
    constructor(initCollection) {
        this.collection = initCollection || [];
        this.length = (initCollection === null || initCollection === void 0 ? void 0 : initCollection.length) || 0;
    }
    append(component) {
        this.collection.push(component);
        this.length++;
    }
    get(index) {
        return this.collection[index];
    }
    remove(component) {
        let compIndex = this.collection.indexOf(component);
        if (!(compIndex == -1)) {
            let tempList = this.collection.slice(0, compIndex);
            for (let i = compIndex + 1; i < this.collection.length; i++) {
                tempList.push(this.collection[i]);
            }
            this.collection = tempList;
        }
        this.length--;
    }
    prev(refComp) {
        let compIndex = this.collection.indexOf(refComp);
        if (!(compIndex == -1)) {
            if (compIndex == 0)
                return null;
            return this.collection[compIndex - 1];
        }
        return null;
    }
    next(refComp) {
        let compIndex = this.collection.indexOf(refComp);
        if (!(compIndex == -1)) {
            if (compIndex == this.collection.length - 1)
                return null;
            return this.collection[compIndex + 1];
        }
        return null;
    }
}
export default TeditCollection;
//# sourceMappingURL=teditCollection.js.map