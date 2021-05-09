
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
    public getDomElement(): HTMLElement{
        return this.domComponent.getDomElement();
    }
    public abstract getName(): string;
    
    public static setTedit(tedit: Tedit){
        Component.tedit = tedit;
    }
    public setState(state: State){
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content.data = updatedData;

        let domOptions = this.getCurrentVariant().getDomOptions();
        domOptions.innerText = this.domComponent.getDomElement().innerText;
        domOptions = Object.assign(domOptions, this.variants.default.getDomOptions());
        this.update(domOptions);
    }

    private getCurrentVariantID(): keyof Variants {
        return getKeyValue("variant" as never)(this.state);
    }

    private getCurrentVariant(): Variant {
        return getKeyValue(this.getCurrentVariantID() as never)(this.variants);
    }

    public update(options: DomOptions){
        HTMLComponent.update(this.domComponent, options);
    }

    public focus(): void{
        setTimeout(()=> {
            this.getDomElement().focus();
            this.getDomElement().click();
        }, 1);
    }
}

export default Component;