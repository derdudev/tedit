
import { DomOptions } from "../base/dom.js";
import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import Actions from "./actions.js";
import Content from "./content.js";
import { NavbarConfig } from "./navbar.js";
import State from "./state.js";
import Tedit from "./tedit.js";
import { Variant, Variants } from "./variant.js";

abstract class Component {
    protected abstract content:Content;
    protected abstract domElement:HTMLElement;
    protected abstract ID: string;
    protected abstract name: string;
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
    public abstract getName(): string;
    public setState(state: State){
        this.state = state;
        let updatedData = this.content.data;
        updatedData.variant = this.state.variant;
        this.content = {type: this.name, data: updatedData}

        getKeyValue("variant" as never)(this.state);

        let domOptions = (getKeyValue(getKeyValue("variant" as never)(this.state))(this.variants) as Variant).getDomOptions();
        //domOptions.innerText = this.domElement.innerText;
        this.update(domOptions);

        console.log((getKeyValue(getKeyValue("variant" as never)(this.state))(this.variants) as Variant).getDomOptions());
        console.log(this.state)
    }

    public update(options: DomOptions){
        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if(key !== "style"){
                this.domElement.setAttribute(key, valueOfKey as string);
                setKeyValue(key as never, valueOfKey as string)(this.domElement);
            } else {
                Object.assign(this.domElement.style, getKeyValue(key as never)(options));
            }
        }
    }
}

export default Component;