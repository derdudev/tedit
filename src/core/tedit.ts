import DOM from "../base/dom.js";
import Component from "./component";

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

    public append(element: Component){
        this.elements.push(element);
        this.render();
    }

    public render(){
        if(this.elements.length != 1) this.elements.map((element)=>this.domElement.removeChild(element.getDomElement()));

        this.elements.map((element) => this.domElement.appendChild(element.getDomElement()))
    }
}

export default Tedit;