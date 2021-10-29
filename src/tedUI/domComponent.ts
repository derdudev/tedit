import DomOptions from "../base/DomOptions.js";
import DomWorker from "../base/DomWorker.js";

class DomComponent {
    public tagName:string;
    public html:HTMLElement;

    /**
     * 
     * @param options dom options for the element: if no tagname is given, default is "div"
     */
    // TODO<idea>: set default values ("div") in separate object/file (also for DomButton class)
    constructor(options: DomOptions, element?: HTMLElement){
        this.html = DomWorker.create(options.tagName || "div", options);
        if(element) this.html = element;
    }

    /**
     * @name replaceWith
     * @param replacementElement element that is the new "version" of the previous dom element
     * @description replaces the current domelement with a new one (after the replacement the old dom element is not present anymore in the DOM)
     */
    public replaceWith(replacementElement:HTMLElement){
        this.html.parentElement?.replaceChild(replacementElement, this.html);
        this.html = replacementElement;
    }
}

export default DomComponent;