
import Content from "./content.js";
import Tedit from "./tedit.js";

abstract class Component {
    abstract _content:Content;
    abstract _domElement:HTMLElement;
    private tedit: Tedit;

    constructor(tedit: Tedit){
        this.tedit = tedit;
    }

    public abstract getContent(): Content;
    public abstract setContent(content:Content): void;
    public abstract getDomElement(): HTMLElement;
    public abstract setDomElement(domElement: HTMLElement): void;

    public getTedit(): Tedit{
        return this.tedit;
    }
}

export default Component;