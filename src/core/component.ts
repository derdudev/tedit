
import Content from "./content.js";
import Tedit from "./tedit.js";

abstract class Component {
    protected abstract _content:Content;
    protected abstract _domElement:HTMLElement;
    protected abstract name: String;
    protected tedit: Tedit;

    constructor(tedit: Tedit){
        this.tedit = tedit;
    }

    public abstract getContent(): Content;
    public abstract setContent(content:Content): void;
    public abstract getDomElement(): HTMLElement;
    public abstract setDomElement(domElement: HTMLElement): void;
    public abstract getName(): String;
}

export default Component;