import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import Content from "../core/content.js";
import NavbarModule from "../core/navbarModule.js";
import Template from "../core/Template.js";
import DomButton from "../tedUI/domButton.js";
import { randstr } from "../utilities/random.js";

class Code extends Component{
    public name: string = "code";
    public ID: string;
    private container: HTMLElement;

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

        this.loadTemp(0);
    }

    public initTemps(): void {
        let domElement_temp1 = DomWorker.create("p", {
            placeHolder: "This is a code element.",
            contentEditable: true,
            className: "code p",
            spellcheck: false,
            id: this.ID,
            style: {
                backgroundColor: "#c9c9c9",
                padding: "5px 10px",
                fontFamily: "Roboto Mono",
            }
        });

        let barConfig_temp1 = new NavbarModule([
            new DomButton({},DomWorker.create("button", {
                innerText: "Language", 
            })),
            new DomButton({},DomWorker.create("button", {
                innerText: "Theme", 
            })),
        ]);

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp);

        this.templates.push(temp1);
    }
}

export default Code;