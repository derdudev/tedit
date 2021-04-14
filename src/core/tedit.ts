import DOM from "../base/dom.js";
import Component from "./component.js";
import { isDuplicate } from "../utilities/listOperations.js";
import {setKeyValue} from "../utilities/objectOperations.js";

class Tedit {
    private activeElement: Component;
    private elements: Component[];
    private domElement: HTMLElement;

    constructor(){
        this.elements = [];
        this.domElement = DOM.create("div");
    }

    public getActiveElement(): Component{
        return this.activeElement;
    }
    public setActiveElement(activeElement:Component){
        this.activeElement = activeElement;
    }
    public getDomElement(): HTMLElement{
        return this.domElement;
    }

    public getContent(){
        

        let result = {};
        for(let i=0; i<this.elements.length; i++){
            setKeyValue(typeof (this.elements[i] as any) as never, this.elements[i].getContent())(result);
        }
        return this.elements.map((element) => {
            return element.getContent();
        });
    }

    public append(element: Component){
        if(isDuplicate(this.elements, element)) {
            this.elements.push(element);
            this.render();
        }
    }

    public render(){
        if(this.elements.length != 1) {
            for(let i=0; i<this.elements.length-1; i++){
                this.domElement.removeChild(this.elements[i].getDomElement())
            }
        }

        this.elements.map((element) => this.domElement.appendChild(element.getDomElement()))
    }
}

export default Tedit;