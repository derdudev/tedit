import Content from "./content";

class Template {
    public html: HTMLElement;

    /**
     * 
     * @param domElement 
     * @param barConfig 
     * @param templateLoader allows to switch to another template on button press defined in barConfig
     */
    constructor(domElement: HTMLElement, barConfig: Array<Object>, templateLoader: Function){
        this.html = domElement;
    }
    
    /**
     * 
     * @param data latest data, when it gets loaded, usually the template should be loaded too (by the parent)
     */
    public loadData(data: Object){
        
    }
}

export default Template;