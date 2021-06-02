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

    show(){
        this.getDomElement().style.display = "block";
    }
    hide(){
        this.getDomElement().style.display = "none";
    }

    public getContent(): Content {
        throw new Error("Method not implemented.");
    }
    public setContent(content: Content): void {
        throw new Error("Method not implemented.");
    }
    public getDomComponent(): HTMLComponent {
        throw new Error("Method not implemented.");
    }
    public setDomComponent(domComponent: HTMLComponent): void {
        throw new Error("Method not implemented.");
    }
    public getName(): string {
        throw new Error("Method not implemented.");
    }
}