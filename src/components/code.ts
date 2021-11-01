import DomWorker from "../base/DomWorker.js";
import TextWorker from "../base/textWorker.js";
import Component from "../core/component.js";
import Content, { ComponentData } from "../core/content.js";
import NavbarModule from "../core/navbarModule.js";
import Template from "../core/Template.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import { randstr } from "../utilities/random.js";

class Code extends Component{
    public name: string = "code";
    public ID: string;

    constructor(initContent?: Content){
        super();
        this.ID = randstr();

        // TODO<issue>: this class has to extend component but that class has to be rethought again 
        //Component.tedit.append(this);

        // TODO: maybe move to super?!
        if(initContent){
            this.content = initContent;
        } else {
            this.content = {
                data: {
                    text: "",
                }
            }
        }

        this.initTemps();
        this.html = DomWorker.create("div", {}, [this.templates[0].html]); // ! TODO: has to be implemented into Template as well!
        
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
            },
            events: [
                {
                    type: "keydown",
                    handler: this.saveContent.bind(this),
                }
            ]
        });

        let barConfig_temp1 = new NavbarModule([
            new DomButton({},DomWorker.create("button", {
                innerText: "Language", 
            })),
            new DomButton({},DomWorker.create("button", {
                innerText: "Theme", 
            })),
        ]);

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp, this.loadData);

        this.templates.push(temp1);
    }

    private loadData(content: Content){
        this.html.innerHTML = getKeyValue("text" as never)(content);
    }

    private saveContent(): void{
        setTimeout(()=>{
            let text = this.html.innerText;

            this.content = {
                    text: TextWorker.trim(text),
            }
        },1);
    }
}

export default Code;