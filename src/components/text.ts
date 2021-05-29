import Content from "../core/content.js";
import DOM, { DOMWorker } from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
import Button from "../base/button.js";
import { randstr } from "../utilities/random.js";
import HTMLComponent from "../base/HTMLComponent.js";
import Tedit from "src/core/tedit.js";

class TxtContent implements Content{
    type: string;
    data: {text: string, variant: number};
}
class Txt extends Component{
    private command: string = "";
    constructor(config?: {variant: number, content: TxtContent}){
        super();
        this.name = "text";

        this.content = {
            type: this.name,
            data: {
                text: "",
                variant: this.state.variant,
            },
        }

        this.variants = {
            "default": new Variant ({
                className: "p",
                onkeydown: this.handleKeyDown.bind(this),
                onclick: (()=>{
                    Component.tedit.setActiveElement(this);
                    Component.tedit.navbar.load(this.navbarConfig);
                }).bind(this),
            }),
            0: new Variant({
                style: {
                    color: "#000000",
                    fontWeight: 500,
                    fontSize: "16px",
                },
                placeHolder: "Just a normal text field",
                contentEditable: true,
                className: "p",
            }),
            1: new Variant({
                style: {
                    fontWeight: "bold",
                    fontSize: "22px",
                }, 
                tagName: "h1",
                placeHolder: "Header",
                contentEditable: true,
                className: "p",
            }),
        }

        this.actions = {
            0: () => { this.setState({ variant: 0 }) },
            1: () => { this.setState({ variant: 1 }) },
        }

        this.navbarConfig = {
            0: new Button({
                innerText: "P",
                onclick: (_e:any) => { 
                    this.toTextVariant(0);
                },
            }),
            1: new Button({
                innerText: "H1",
                onclick: () => { 
                    this.toTextVariant(1);
                },
            }),
            2: new Button({
                innerText: "B",
                onclick: () => {
                    DOMWorker.surroundSelection(DOM.create("b"));
                },
                contentEditable: false,
            })
        }

        this.ID = randstr();

        let domElement;
        domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
        });

        this.domComponent = new HTMLComponent(domElement);

        if(config?.variant != null) {
            this.setState({variant: config.variant});
        } else {
            this.setState({variant: 0})
        }

        if(config?.content != null){
            this.setContent(config.content);
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        setTimeout(()=>{
            this.content.data = { 
                    text: (e.target as HTMLElement).innerText,
                    variant: this.state.variant,
                }
        }, 1);
        if(e.key === "$"){
            this.command += e.key;
            return;
        }
        if(this.command){
            this.command += e.key;
        }
        //end command with space
        if(e.key === " "){
            this.command = "";
        }

        if(this.command === "$text"){
            setTimeout(()=>{
                Txt.tedit.append(new Txt(), this.position+1);
            }, 1)
        }
        if(e.key === "Backspace" && (e.target as HTMLElement).innerText === ""){

        }
    }

    private toTextVariant(num: number){
        if(this.content.data.text) {
            let { anchorOffset } = document.getSelection() as Selection;
            this.setState({ variant: num });
            DOMWorker.setCursor(this.getDomElement().childNodes[0], anchorOffset); 
            this.getDomElement().focus();
        } else {
            this.setState({ variant: num });
            this.focus();
        }
    }

    public getContent(): TxtContent {
        return this.content;
    }
    public setContent(content: TxtContent): void {
        this.content = content;
        this.getDomElement().innerText = content.data.text;
    }  
    public getDomComponent(): HTMLComponent{
        return this.domComponent;
    }
    public setDomComponent(domComponent: HTMLComponent): void {
        this.domComponent = domComponent;
    }
    public getDomElement(): HTMLElement{
        return this.domComponent.getDomElement();
    }
    public getName(): string{
        return this.name;
    }
    public getID(): string{
        return this.ID;
    }
}

export default Txt;