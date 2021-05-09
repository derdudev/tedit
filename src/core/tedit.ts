import DOM from "../base/dom.js";
import Component from "./component.js";
import { isDuplicate } from "../utilities/listOperations.js";
import {getKeyValue, setKeyValue} from "../utilities/objectOperations.js";
import Navbar from "./navbar.js";
import blockMap from "./internals/blockMap.js";
import Data from "./data.js";

class Tedit {
    private activeElement: Component;
    private elements: Component[];
    private domElement: HTMLElement;
    public navbar: Navbar;

    constructor(data?: Data[]){
        this.elements = [];
        this.domElement = DOM.create("div");
        this.navbar = new Navbar();
        this.domElement.appendChild(this.navbar.getDomElement());
        this.domElement.appendChild(DOM.create("div"));

        Component.setTedit(this);

        if(data) {
            for(let i=0; i<data.length; i++){
                //blockMap[data[i].type]
                this.append((new (getKeyValue(data[i].type as never)(blockMap))({variant: data[i].data.variant, content: data[i]})));
            }
            this.elements[0].focus();
        }
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

    public save() {
        const content = this.getContent();
        fetch("/save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        }).then((res)=>{
            return res.body;
        }).then((_data)=>{
            console.log("successfull");
        })
    }

    public append(element: Component){
        if(isDuplicate(this.elements, element)) {
            this.elements.push(element);
            this.render();
        }
    }

    public render(){
        if(this.elements.length != 1) {
            (this.domElement.childNodes[1] as HTMLElement).innerHTML = "";
        }

        this.elements.map((element) => this.domElement.childNodes[1].appendChild(element.getDomElement()))
    }
}

export default Tedit;