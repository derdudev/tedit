
import HTMLComponent from "../base/HTMLComponent.js";
import { getKeyValue } from "../utilities/objectOperations.js";
// import Actions from "./actions.js";
import Content from "./content.js";
import { NavbarConfig } from "./navbar.js";
import State from "./state.js";
import Tedit from "./tedit.js";
import Template from "./Template.js";

abstract class Component {
    protected content:Content;
    protected ID: string;
    protected name: string;
    protected position: number;
    public html: HTMLElement;

    // TODO: do not forget to bring back to protected!
    public static tedit: Tedit;

    constructor(){}

    // ! pretty bad way of rendering - or not?
    protected render(template: Template){
        // TODO: not only appending, but replacing the previous version of the element
        Component.tedit.html.appendChild(template.html);
    }

    public static setTedit(tedit: Tedit){
        this.tedit = tedit;
    }
}

export default Component;