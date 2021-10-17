import Component from "./component";

class TeditCollection {
    private collection: Component[];
    constructor(initCollection?:[]){
        this.collection = initCollection || [];
    }

    public append(component:Component){
        console.log("# Appending <", component, ">");
        this.collection.push(component);
    }
}

export default TeditCollection;