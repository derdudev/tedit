import Content from "../core/content.js";
import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
//import getTextCaretPosition from "../utilities/textCaretPosition.js";
class Txt extends Component {
    public name: string = "text";
    public ID: string; 
    private container: HTMLElement;

    /**
     * 
     * @param initContent initial data to be loaded on initialisation
     */
    constructor(initContent?: Content){
        super();
        this.ID = randstr();
        this.initTemps();
        this.container = DomWorker.create("div", {}, [this.templates[0].html]);

        // TODO<issue>: this class has to extend component but that class has to be rethought again 
        //Component.tedit.append(this);

        if(initContent){
            this.content = initContent;
        }

        let defaultNavbar = new NavbarModule([new DomButton({innerText: "Press me"})]);
        this.navbarModules.push(defaultNavbar);

        this.loadTemp(0);
    }    

    /**
     * 
     * @param index the number of the template to be loaded (index in the template array)
     */
    // TODO: move to Component class
    public loadTemp(index: number){
        this.templates[index].loadData(this.content);
        this.render(this.templates[index]);
        this.activeTemplate = this.templates[index];
    }

    private initTemps(){
        let domElement_temp1 = DomWorker.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
            style: {
                backgroundColor: "#fff",
                padding: "5px 10px",
            }
        });

        // TODO: get this together with the navbarModule object
        let barConfig_temp1 = new NavbarModule([
            new DomButton({},DomWorker.create("button", {
                innerText: "Button1", 
            })),
            new DomButton({},DomWorker.create("button", {
                innerText: "Button2", 
            })),
        ]);

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp);

        this.templates = [];
        this.templates.push(temp1);
    }
}

export default Txt;