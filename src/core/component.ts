import DomTextSelector from "../base/DomTextSelector.js";
import Logger from "../log/logger.js";
import Content, { ComponentData } from "./content.js";
import Tedit from "./tedit.js";
import Template from "./Template.js";

abstract class Component {
    protected content:Content;
    protected ID: string;
    protected name: string;
    protected position: number;
    public html: HTMLElement;
    protected templates: Template[];
    protected activeTemplate: Template; // the currently loaded template

    // TODO: do not forget to bring back to protected!
    public static tedit: Tedit;

    constructor(){
        this.templates = [];
    }

    // ! pretty bad way of rendering - or not?
    protected render(isFirstRender:boolean, template: Template){
        const selection = document.getSelection();
        let startPos = selection?.anchorOffset;
        let endPos = selection?.focusOffset;

        // console.log(startPos, endPos, this.html.childNodes[0]);

        let selectionNode;

        if(template != this.activeTemplate){
            template.html.addEventListener("click", this.onclick.bind(this));
            if(isFirstRender) Component.tedit.html.appendChild(template.html);
            else {
                Component.tedit.html.replaceChild(template.html, this.html);
            }

            this.html = template.html;
            selectionNode = this.html.childNodes[0] || this.html;
        } else {
            selectionNode = this.html.childNodes[0] || this.html;
        }
        DomTextSelector.setSelection(selectionNode, startPos as number, endPos as number);
        setTimeout(()=>Logger.clog("renderSelectionCheck", document.getSelection()), 1);
    }

    /**
     * 
     * @param index the number of the template to be loaded (index in the template array)
     */
    // TODO: move to Component class
    public loadTemp(isFirstLoad:boolean, index: number){
        if(this.templates[index] != this.activeTemplate) this.templates[index].loadData(this.content);
        this.render(isFirstLoad, this.templates[index]);
        this.activeTemplate = this.templates[index];
    }

    abstract initTemps(): void;

    // abstract getContent(): Content;
    public getContent(): Content{
        return this.content;
    }

    // abstract getCompData(): ComponentData;
    // can and should be overritten if necessary 
    public getCompData(): ComponentData {
        return {
            type: this.name,
            content: this.content,
            template: this.templates.indexOf(this.activeTemplate),
        }
    }

    // default method - should be overritten for custom handling
    public focus(cursorPos?:number) {
        let domElement = this.html;
        domElement.click();

        let textNode = domElement.childNodes[0];
        let textContent = textNode.textContent;
        if(domElement.childNodes[0]){
            let anchorOffset: number = textContent?.length || 0;
            if(cursorPos != undefined && cursorPos as number <= (textContent?.length as number)) DomTextSelector.setCursor(textNode, cursorPos); 
            else DomTextSelector.setCursor(textNode, anchorOffset); 
        } else {
            domElement.focus();
        }
    }

    // # general component methods

    public static setTedit(tedit: Tedit){
        this.tedit = tedit;
    }

    // TODO: check for already loaded navbar - otherwise unecessary loading cycles
    private onclick() {
        // console.log(this);
        Component.tedit.navbar.load(this.activeTemplate.barConfig);
    }
}

export default Component;