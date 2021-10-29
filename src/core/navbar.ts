import DomWorker from "../base/DomWorker.js";
import NavbarModule from "./navbarModule.js";

class Navbar {
    public html:HTMLElement;

    constructor(initModule: NavbarModule){
        this.html = DomWorker.create("nav");

        this.load(initModule);
        DomWorker.getByID("teditContainer")?.insertAdjacentElement("afterbegin", this.html);
    }

    // TODO: should be static?
    public load(navbarModule:NavbarModule){
        for(let i=0; i<navbarModule.size; i++){
            this.html.appendChild(navbarModule.get(i).html);
        }
    }
}

export default Navbar;