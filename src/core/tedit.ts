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


// TODO: make tedit static and 
class Tedit {
    private collection: TeditCollection;
    public html: HTMLElement;
    // TODO: add the navbar container
    private navbarModule: NavbarModule; // the latest loaded navbar module
    private navbar: Navbar;

    constructor({data, types}: Init, ){
        Renderer.setMain("", this);
        
        this.collection = new TeditCollection();
        
        this.html = DomWorker.create("div", {id:"tedit"});
        // TODO: inside the container for the board should be the "real" board which then can also be easily reloaded

        //this.html = this.html.children[0] as HTMLElement;

        Component.setTedit(this);

        if(data) {
            for(let i=0; i<data.length; i++){
                //blockMap[data[i].type]
                this.collection.append((new (getKeyValue(data[i].type as never)(blockMap))()));
            }
        }

        Renderer.renderMain(true);

        this.navbar = new Navbar(new NavbarModule([new DomButton({innerText: "press me"})]));
    }

    public save(){
        Logger.clog("# Saving...");
    }

    public getContent(){
        Logger.clog("# Fetching content...");
    }
}

export default Tedit;