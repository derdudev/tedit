import Component from "./component.js";

class TeditCollection {
    private collection: Component[];
    public length: number;
    
    constructor(initCollection?:[]){
        this.collection = initCollection || [];
        this.length = initCollection?.length || 0;
    }

    public append(component:Component){
        console.log("# Appending <", component, ">");
        this.collection.push(component);
        this.length++;
    }

    public get(index: number){
        return this.collection[index];
    }
}

export default TeditCollection;