import Content from "../core/content.js";
import DOM, { DOMWorker } from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
import Button from "../base/button.js";
import { randstr } from "../utilities/random.js";
import HTMLComponent from "../base/HTMLComponent.js";
import getTextCaretPosition from "../utilities/textCaretPosition.js";

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
        this.updateContent(e);
        console.log(this.command);
        if(this.command === "" && this.content.data.text[-1] != "$"){
            Txt.tedit.getContextMenu().hide();
        }
        
        if(e.key === "$"){
            this.command += e.key;
            //const {left: x, top: y} = getTextCaretPosition();
            //Txt.tedit.getContextMenu().show(x, y);
            return;
        }
        //end command with space
        if(e.key === " "){
            this.command = "";
            return;
        }
        if(this.command){
            if(e.key !== "Enter") this.command += e.key;
            //Component.tedit.getContextMenu().show()
        }

        // PLACEHOLDER: loop to check through all possible commands (user should be able to create own one in component): text-caret-position (github: https://github.com/component/textarea-caret-position/blob/master/index.js)
        if(this.command === "$text"){
            if(e.key === "Enter"){
                e.preventDefault();

                setTimeout(()=>{
                    let length = this.getDomElement().innerText.length;
                    let position = length - this.command.length;
                    this.getDomElement().innerText = this.getDomElement().innerText.slice(0, position);
                    this.updateContent(e);
                    console.log(this.position, Txt.tedit.getContent().length+1)
                    Txt.tedit.append(new Txt(), this.position+1);
                    this.command = "";
                }, 1);
                return;
            }

        }

        if((e.key === "Backspace" || e.key === "Delete") && (e.target as HTMLElement).innerText === ""){
            setTimeout(()=>{
                Txt.tedit.removeElementAt(this.position)
            }, 1)
        }
        

        if(e.key === "Enter") {
            e.preventDefault();
            console.log(this.position, Txt.tedit.getContent().length+1, Txt.tedit.getActiveElement())
            Txt.tedit.append(new Txt(), this.position+1);
        }
    }

    private updateContent(e: KeyboardEvent){
        setTimeout(()=>{
            this.content.data = { 
                    text: (e.target as HTMLElement).innerText,
                    variant: this.state.variant,
                }
        }, 1);
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

    public focus(){
        setTimeout(()=> {
            let domElement = this.getDomElement();
            domElement.click();
            if(domElement.childNodes[0]){
                let anchorOffset: number = (domElement.childNodes[0]).textContent?.length || 0;
                DOMWorker.setCursor(this.getDomElement().childNodes[0], anchorOffset); 
            } else {
                domElement.focus();
            }
        }, 1);
        //DOMWorker.setCursor(this.getDomElement().childNodes[0], anchorOffset); 
    }
}

export default Txt;