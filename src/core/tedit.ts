import Component from "./component.js";
import {getKeyValue} from "../utilities/objectOperations.js";
import blockMap from "./internals/blockMap.js";
import { Init } from "./data.js";
import DomWorker from "../base/DomWorker.js";
import TeditCollection from "./teditCollection.js";
import Renderer from "../base/Renderer.js";
import Logger from "../log/logger.js";
import NavbarModule from "./navbarModule.js";
import Navbar from "./navbar.js";
import DomButton from "../tedUI/domButton.js";
import Content, { ComponentData } from "./content.js";
import ShortcutHandler from "../base/shortcutHandler.js";
import DomTextSelectorWorker from "../base/DomTextSelectorWorker.js";


// TODO: make tedit static and 
class Tedit {
    public collection: TeditCollection;
    public html: HTMLElement;
    // TODO: add the navbar container
    private navbarModule: NavbarModule; // the latest loaded navbar module
    public navbar: Navbar;

    private shortcutHandler: ShortcutHandler;

    constructor({data}: Init){
        Renderer.setMain("", this);

        this.shortcutHandler = new ShortcutHandler();
        this.shortcutHandler.registerShortcut(["Control", "D"], ()=>{
            let reloadButton = document.getElementById("reloadBtn");
            reloadButton?.click();

            console.log(reloadButton)
        })
        this.shortcutHandler.registerShortcut(["Control", "B"], ()=>{
            if(!document.getSelection()?.isCollapsed) DomTextSelectorWorker.surroundSelection(DomWorker.create("b", {className:"ted-text-bold"}));
        })
        this.shortcutHandler.registerShortcut(["Control", "I"], ()=>{
            if(!document.getSelection()?.isCollapsed) DomTextSelectorWorker.surroundSelection(DomWorker.create("i", {className:"ted-text-italic"}));
        })

        // document.body.addEventListener("click", ()=>{
        //     console.log(document.getSelection())
        // })
        
        this.collection = new TeditCollection();
        
        this.html = DomWorker.create("div", {
            id:"tedit", 
            style: {
                whiteSpace: "pre-wrap",
            }
        });
        // TODO: inside the container for the board should be the "real" board which then can also be easily reloaded

        //this.html = this.html.children[0] as HTMLElement;

        Component.setTedit(this);

        if(data) {
            let compRef, compData, comp;
            for(let i=0; i<data.length; i++){
                //blockMap[data[i].type]
                compRef = getKeyValue(data[i].type as never)(blockMap);
                compData = data[i];
                comp = new compRef(compData);
                this.collection.append(comp);
            }
        }

        Renderer.renderMain(true);

        this.navbarModule = new NavbarModule([new DomButton({innerText: "New"}), new DomButton({innerText: "Open"})]);
        this.navbar = new Navbar(this.navbarModule);
    }

    public save(){
        Logger.clog("stage", "%c# Saving...", "font-family: 'Roboto Mono'; font-weight: bold");
    }

    public getContent(){
        Logger.clog("stage", "%c# Fetching content...", "font-family: 'Roboto Mono'; font-weight: bold");
        let teditContent:Content[] = [];
        for(let i=0; i<this.collection.length; i++){
            //console.log(this.collection.get(i).getContent());
            teditContent.push(this.collection.get(i).getContent());
        }

        return teditContent;
    }

    public getCompData(){
        Logger.clog("stage", "%c# Fetching component data...", "font-family: 'Roboto Mono'; font-weight: bold");
        let teditCompData: ComponentData[] = [];
        for(let i=0; i<this.collection.length; i++){
            teditCompData.push(this.collection.get(i).getCompData());
        }

        return teditCompData;
    }
}

export default Tedit;