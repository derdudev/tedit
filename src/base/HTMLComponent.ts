import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import DomOptions from "./DomOptions.js";
import DomWorker from "./DomWorker.js";

class HTMLComponent{
    protected domElement: HTMLElement;
    private domOptions: DomOptions;

    constructor(domElement?: HTMLElement){
        if(domElement) this.domElement = domElement;
    }

    public getDomElement(): HTMLElement {
        return this.domElement;
    }

    public setOptions(options: DomOptions){
        this.domOptions = options;
    }
    public getOptions(): DomOptions{
        return this.domOptions;
    }

    public update(options: DomOptions){
        this.domOptions = options;

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

    static update(htmlComponent: HTMLComponent, options: DomOptions){
        let domOption, element;
        
        for(let domOptionName in options){
            domOption = getKeyValue(domOptionName as never)(options);
            element = htmlComponent.getDomElement();
            if(domOptionName === "tagName"){
                htmlComponent.replace(DomWorker.create(domOption, options));
            } else if(domOptionName !== "style"){
                element.setAttribute(domOptionName, domOption as string);
                setKeyValue(domOptionName as never, domOption as string)(element);
            } else {
                Object.assign(element.style, getKeyValue(domOptionName as never)(options));
            }
        }
    }

    public replace(newElement: HTMLElement){
        //let index = this.getIndex(this.domElement, this.domElement.parentElement);
        this.domElement.parentElement?.replaceChild(newElement, this.domElement);
        this.domElement = newElement;
    }

    /*
    private getIndex(element: HTMLElement, parent: HTMLElement | null): number{
        if(parent) {
            for(let i=0; i<parent.childNodes.length; i++){
                if(parent.childNodes[i] == element) return i;
            }
        }
        return -1;
    }
    */
}

export default HTMLComponent;
