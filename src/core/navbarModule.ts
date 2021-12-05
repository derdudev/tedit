import Logger from "../log/logger.js";
import DomComponent from "../tedUI/domComponent.js";

class NavbarModule {
    private elements: DomComponent[];
    public size: number;

    constructor(initElements?:DomComponent[]){
        this.elements = initElements || [];
        this.size = this.elements.length;

        Logger.clog("navbarLoading", this.elements);
    }

    public get(index:number): DomComponent{
        return this.elements[index];
    }
}

export default NavbarModule;