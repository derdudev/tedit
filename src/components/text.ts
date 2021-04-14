import Content from "../core/content.js";
import DOM from "../base/dom.js";
import Component from "../core/component.js";
import Tedit from "../core/tedit.js";

class Txt extends Component{
    _content: Content;
    _domElement: HTMLElement;

    constructor(tedit: Tedit){
        super(tedit);

        this._domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
        });
    }

    public getContent(): Content {
        throw new Error("Method not implemented.");
    }
    public setContent(content: Content): void {
        this._content = content;
    }
    public getDomElement(): HTMLElement {
        return this._domElement;
    }
    public setDomElement(domElement: HTMLElement): void {
        this._domElement = domElement;
    }    
}

export default Txt;