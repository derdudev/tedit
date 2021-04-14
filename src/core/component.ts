
import Content from "./content.js";

abstract class Component {
    protected abstract content:Content;
    protected abstract domElement:HTMLElement;
    protected abstract name: String;

    constructor(){
    }

    public abstract getContent(): Content;
    public abstract setContent(content:Content): void;
    public abstract getDomElement(): HTMLElement;
    public abstract setDomElement(domElement: HTMLElement): void;
    public abstract getName(): String;
}

export default Component;