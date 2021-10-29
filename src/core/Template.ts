import NavbarModule from "./navbarModule.js";

class Template {
    public html: HTMLElement;
    public barConfig: NavbarModule;

    /**
     * 
     * @param domElement 
     * @param barConfig 
     * @param templateLoader allows to switch to another template on button press defined in barConfig
     */
    constructor(domElement: HTMLElement, barConfig: NavbarModule, templateLoader: Function){
        this.html = domElement;
        this.barConfig = barConfig;
    }
    
    /**
     * 
     * @param data latest data, when it gets loaded, usually the template should be loaded too (by the parent)
     */
    public loadData(data: Object){
        
    }
}

export default Template;