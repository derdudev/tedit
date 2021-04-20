import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import { DomOptions } from "./dom.js";

class HTMLComponent{
    protected domElement: HTMLElement;

    constructor(domElement?: HTMLElement){
        if(domElement) this.domElement = domElement;
    }

    public getDomElement(): HTMLElement {
        return this.domElement;
    }

    public update(options: DomOptions){
        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if(key !== "style"){
                this.domElement.setAttribute(key, valueOfKey as string);
                setKeyValue(key as never, valueOfKey as string)(this.domElement);
            } else {
                Object.assign(this.domElement.style, getKeyValue(key as never)(options));
            }
        }
    }

    public replace(newElement: HTMLElement){
        //let index = this.getIndex(this.domElement, this.domElement.parentElement);
        this.domElement.parentElement?.replaceChild(newElement, this.domElement);
        this.domElement = newElement;
    }

    private getIndex(element: HTMLElement, parent: HTMLElement | null): number{
        if(parent) {
            for(let i=0; i<parent.childNodes.length; i++){
                if(parent.childNodes[i] == element) return i;
            }
        }
        return -1;
    }
}

export default HTMLComponent;