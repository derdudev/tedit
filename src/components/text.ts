import Content from "../core/content.js";
import DOM from "../base/dom.js";
import Component from "../core/component.js";
import Tedit from "../core/tedit.js";

class TxtContent implements Content{
    type: String;
    data: {text: String};
}
class Txt extends Component{
    protected name: String;
    _content: TxtContent;
    _domElement: HTMLElement;

    constructor(tedit: Tedit){
        super(tedit);
        this.name = "text";

        this._content = {
            type: this.name,
            data: {
                text: "",
            },
        }

        this._domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
        });

        this._domElement.addEventListener("keydown", (e)=>{
            this._content = {
                type: this.name,
                data: { 
                    text: (e.target as HTMLElement).innerText + e.key,
                }
            };
            console.log(tedit.getContent());
        });
    }

    public getContent(): TxtContent {
        return this._content;
    }
    public setContent(content: TxtContent): void {
        this._content = content;
    }
    public getDomElement(): HTMLElement {
        return this._domElement;
    }
    public setDomElement(domElement: HTMLElement): void {
        this._domElement = domElement;
    }    
    public getName(): String{
        return this.name;
    }
}

export default Txt;