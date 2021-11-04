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


// TODO: make tedit static and 
class Tedit {
    public collection: TeditCollection;
    public html: HTMLElement;
    // TODO: add the navbar container
    private navbarModule: NavbarModule; // the latest loaded navbar module
    public navbar: Navbar;

    constructor({data}: Init){
        Renderer.setMain("", this);
        
        this.collection = new TeditCollection();
        
        this.html = DomWorker.create("div", {id:"tedit"});
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

        this.navbarModule = new NavbarModule([new DomButton({innerText: "press me"})]);
        this.navbar = new Navbar(this.navbarModule);
    }

    public save(){
        Logger.clog("# Saving...");
    }

    public getContent(){
        Logger.clog("# Fetching content...");
        let teditContent:Content[] = [];
        for(let i=0; i<this.collection.length; i++){
            //console.log(this.collection.get(i).getContent());
            teditContent.push(this.collection.get(i).getContent());
        }

        return teditContent;
    }

    public getCompData(){
        Logger.clog("# Fetching component data...");
        let teditCompData: ComponentData[] = [];
        for(let i=0; i<this.collection.length; i++){
            teditCompData.push(this.collection.get(i).getCompData());
        }

        return teditCompData;
    }
}

export default Tedit;