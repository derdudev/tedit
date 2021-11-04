import Component from "./component.js";

class TeditCollection {
    private collection: Component[];
    public length: number;
    
    constructor(initCollection?:[]){
        this.collection = initCollection || [];
        this.length = initCollection?.length || 0;
    }

    public append(component:Component){
        // console.log("# Appending <", component, ">");
        this.collection.push(component);
        this.length++;
    }

    public get(index: number){
        return this.collection[index];
    }

    public remove(component: Component){
        let compIndex = this.collection.indexOf(component);
        if(!(compIndex == -1)) { // only if the element is present
            let tempList = this.collection.slice(0, compIndex);
            for(let i=compIndex+1; i<this.collection.length; i++){
                tempList.push(this.collection[i]);
            }
            this.collection = tempList;
        } 
        this.length--; 
    }

    /**
     * 
     * @param refComp 
     * @returns the previous element in relation to the given refComp
     */
    public prev(refComp: Component): Component | null{
        let compIndex = this.collection.indexOf(refComp);
        if(!(compIndex == -1)) {
            if(compIndex == 0) return null;
            return this.collection[compIndex-1];
        } 
        return null;
    }

    public next(refComp: Component): Component | null{
        let compIndex = this.collection.indexOf(refComp);
        if(!(compIndex == -1)) {
            if(compIndex == this.collection.length-1) return null;
            return this.collection[compIndex+1];
        } 
        return null;
    }
}

export default TeditCollection;