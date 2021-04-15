
import { DomOptions } from "../base/dom.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import Actions from "./actions.js";
import Content from "./content.js";
import { NavbarConfig } from "./navbar.js";
import State from "./state.js";
import Tedit from "./tedit.js";
import { Variants } from "./variant.js";

abstract class Component {
    protected abstract content:Content;
    protected abstract domElement:HTMLElement;
    protected abstract name: String;
    protected abstract navbarConfig: NavbarConfig;
    protected variants: Variants;
    protected state: State;
    protected actions: Actions;

    protected tedit: Tedit;

    constructor(tedit: Tedit){
        this.tedit = tedit;
        this.state = {variant: 0};
    }

    public abstract getContent(): Content;
    public abstract setContent(content:Content): void;
    public abstract getDomElement(): HTMLElement;
    public abstract setDomElement(domElement: HTMLElement): void;
    public abstract getName(): String;
    public setState(state: State){
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content = {type: this.name, data: updatedData}

        getKeyValue("variant" as never)(this.state);

        console.log(this.state)
    }

    public update(_options: DomOptions){
        
    }
}

export default Component;