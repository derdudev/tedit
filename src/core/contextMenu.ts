import DOM from "../base/dom.js";
import HTMLComponent from "../base/HTMLComponent.js";
import Component from "./component.js";
import Content from "./content.js";

export default class ContextMenu extends Component{
    constructor(){
        super();
        let domElement;
        domElement = DOM.create("div", {
            style: {
                display: "none",
                backgroundColor: "#fff",
                position: "fixed",
                height: "300px",
                width: "200px",
                top: "200px",
                left: "200px",
            }
        });

        this.domComponent = new HTMLComponent(domElement);
    }

    show(x: number, y:number){
        this.getDomElement().style.display = "block";
        this.getDomElement().style.top = y + "px";
        this.getDomElement().style.left = x + "px";
    }
    hide(){
        this.getDomElement().style.display = "none";
    }

    public getContent(): Content {
        throw new Error("Method not implemented.");
    }
    public setContent(content: Content): void {
        this.content = content;
    }
    public getDomComponent(): HTMLComponent {
        return this.domComponent;
    }
    public setDomComponent(domComponent: HTMLComponent): void {
        this.domComponent = domComponent;
    }
    public getName(): string {
        throw new Error("Method not implemented.");
    }
}