import Content from "../core/content.js";
import DOM from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
import { NavbarConfig } from "../core/navbar.js";
import Button, { MaterialIconButton } from "../base/button.js";
import { randstr } from "../utilities/random.js";
import HTMLComponent from "../base/HTMLComponent.js";

class TxtContent implements Content{
    type: string;
    data: {text: string, variant: number};
}
class Txt extends Component{
    protected ID: string;
    protected navbarConfig: NavbarConfig;
    protected name: string;
    protected content: TxtContent;
    protected domComponent: HTMLComponent;
    protected domElement: HTMLElement;

    constructor(config?: {variant: number}){
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
            0: new Variant({
                style: {
                    color: "#000000",
                    fontWeight: 500,
                    fontSize: "16px",
                },
                tagName: "p",
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
                onkeydown: (e:any)=>{
                    this.content = {
                        type: this.name,
                        data: { 
                            text: (e.target as HTMLElement).innerText + e.key,
                            variant: this.state.variant,
                        }
                    };
                }
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
                    this.setState({ variant: 0 });
                    this.getDomElement().focus()
                },
            }),
            1: new Button({
                innerText: "H1",
                onclick: () => { 
                    this.setState({ variant: 1 });
                    this.getDomElement().focus()
                },
            }),
            2: new MaterialIconButton("favorite", {
                style: {
                    fontSize: "16px",
                }, 
                onclick: () => {
                    //this.setState({ variant: 2});
                    this.domComponent.replace(DOM.create("h1", {className: "p", placeHolder:"Header element", contentEditable:true}));
                    this.getDomElement().focus();
                    console.log(this.getDomElement());
                }
            }),
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

        domElement.addEventListener("keydown", (e)=>{
            this.content = {
                type: this.name,
                data: { 
                    text: (e.target as HTMLElement).innerText + e.key,
                    variant: this.state.variant,
                }
            };
        });

        domElement.addEventListener("click", ()=>{
            Component.tedit.setActiveElement(this);
            Component.tedit.navbar.load(this.navbarConfig);
        });

        this.domComponent = new HTMLComponent(domElement);

        if(config?.variant) {
            this.setState({variant: config.variant});
            this.domComponent.getDomElement().addEventListener("click", ()=>{
                Component.tedit.setActiveElement(this);
                Component.tedit.navbar.load(this.navbarConfig);
            });
        }
    }

    public getContent(): TxtContent {
        return this.content;
    }
    public setContent(content: TxtContent): void {
        this.content = content;
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