
import HTMLComponent from "../base/HTMLComponent.js";
import { DomOptions } from "../base/dom.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import Actions from "./actions.js";
import Content from "./content.js";
import { NavbarConfig } from "./navbar.js";
import State from "./state.js";
import Tedit from "./tedit.js";
import { Variant, Variants } from "./variant.js";

abstract class Component {
    protected abstract content:Content;
    protected abstract domComponent:HTMLComponent;
    protected abstract ID: string;
    protected abstract name: string;
    protected abstract navbarConfig: NavbarConfig;
    protected variants: Variants;
    protected state: State;
    protected actions: Actions;

    protected static tedit: Tedit;

    constructor(){
        this.state = {variant: 0};
    }

    public abstract getContent(): Content;
    public abstract setContent(content:Content): void;
    public abstract getDomComponent(): HTMLComponent;
    public abstract setDomComponent(domComponent: HTMLComponent): void;
    public abstract getDomElement(): HTMLElement;
    public abstract getName(): string;
    
    public static setTedit(tedit: Tedit){
        Component.tedit = tedit;
    }
    public setState(state: State){
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content = {type: this.name, data: updatedData}

        getKeyValue("variant" as never)(this.state);

        console.log((getKeyValue(getKeyValue("variant" as never)(this.state) as never)(this.variants) as Variant).getDomOptions());

        let domOptions = (getKeyValue(getKeyValue("variant" as never)(this.state) as never)(this.variants) as Variant).getDomOptions();
        //domOptions.innerText = this.domElement.innerText;
        this.update(domOptions);

        
        console.log(this.state)
    }

    public update(options: DomOptions){
        HTMLComponent.update(this.domComponent, options);
    }

    
}

export default Component;