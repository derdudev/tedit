
import Actions from "./actions.js";
import Content from "./content.js";
import State from "./state.js";
import { Variants } from "./variant.js";

abstract class Component {
    protected abstract content:Content;
    protected abstract domElement:HTMLElement;
    protected abstract name: String;
    protected variants: Variants;
    protected state: State;
    protected actions: Actions;

    constructor(){
    }

    public abstract getContent(): Content;
    public abstract setContent(content:Content): void;
    public abstract getDomElement(): HTMLElement;
    public abstract setDomElement(domElement: HTMLElement): void;
    public abstract getName(): String;
    public setState(state: State){
        this.state = state;
    }
}

export default Component;