import Content from "../core/content.js";
import DOMWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
//import getTextCaretPosition from "../utilities/textCaretPosition.js";
class Txt extends Component {
    private templates: any;

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
        this.container = DOMWorker.create("div", {}, [this.templates[0].html]);

        // TODO<issue>: this class has to extend component but that class has to be rethought again 
        //Component.tedit.append(this);

        if(initContent){
            this.content = initContent;
        }

        this.loadTemp(0);
    }    

    /**
     * 
     * @param index the number of the template to be loaded (index in the template array)
     */
    public loadTemp(index: number){
        this.templates[index].loadData(this.content);
        this.render(this.templates[index]);
    }

    private initTemps(){
        let domElement_temp1 = DOMWorker.create("p", {
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

        let barConfig_temp1 = [
            DOMWorker.create("button", {
                innerText: "Button1", 
            }),
            DOMWorker.create("button", {
                innerText: "Button2", 
            }),
        ];

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp);

        this.templates = [];
        this.templates.push(temp1);
    }
}

export default Txt;