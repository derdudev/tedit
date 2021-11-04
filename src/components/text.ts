import Content from "../core/content.js";
import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import EditableHandler from "../base/editableHandler.js";
import KeyHandler from "../base/keyHandler.js";
import { Data } from "../core/data.js";
//import getTextCaretPosition from "../utilities/textCaretPosition.js";
class Txt extends Component {
    public name: string = "text";
    private editableHandler:EditableHandler;
    private keyHandler: KeyHandler;

    /**
     * 
     * @param initContent initial data to be loaded on initialisation
     */
    constructor({data: initContent, template: initTemp}:Data){
        super();
        this.ID = randstr();
        this.editableHandler = new EditableHandler(this);
        this.keyHandler = new KeyHandler(this);

        console.log(initContent, initTemp);

        // TODO<issue>: this class has to extend component but that class has to be rethought again 
        //Component.tedit.append(this);

        if(initContent){
            this.content = initContent;
        } else {
            this.content = {
                    text: "",
            }
        }

        this.initTemps();
        this.html = DomWorker.create("div", {}, [this.templates[0].html]); // ! TODO: has to be implemented into Template as well!

        this.loadTemp(true, initTemp);
    }

    public initTemps(){
        let domElement_temp1 = DomWorker.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
            style: {
                backgroundColor: "#fff",
                padding: "5px 10px",
                fontSize: "16px"
            },
            events: [
                {
                    type: "keydown",
                    handler: this.saveContent.bind(this),
                }
            ]
        });

        let domElement_temp2 = DomWorker.create("p", {
            placeHolder: "This is a headline.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
            style: {
                backgroundColor: "#fff",
                padding: "5px 10px",
                fontSize: "20px",
                fontWeight: "bold",
            },
            events: [
                {
                    type: "keydown",
                    handler: this.saveContent.bind(this),
                }
            ]
        });

        const headline = () => this.loadTemp(false, 1);
        const paragraph = () => this.loadTemp(false, 0);

        let barConfig_temp1 = new NavbarModule([
            new DomButton({},DomWorker.create("button", {
                innerText: "Headline", 
                events: [
                    {
                        type: "click",
                        handler: headline.bind(this),
                    }
                ]
            })),
            new DomButton({},DomWorker.create("button", {
                innerText: "Paragraph", 
                events: [
                    {
                        type: "click",
                        handler: paragraph.bind(this),
                    }
                ]
            })),
        ]);

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp, this.loadData);
        let temp2 = new Template(domElement_temp2, barConfig_temp1, this.loadTemp, this.loadData);

        this.templates = [];
        this.templates.push(temp1);
        this.templates.push(temp2);
    }

    private loadData(content: Content){
        this.html.innerHTML = getKeyValue("text" as never)(content);
    }

    private saveContent(e:KeyboardEvent): void{
        // console.log(e.key, document.getSelection()?.anchorOffset);

        this.editableHandler.handleKeys(e);
        this.keyHandler.handleArrows(e);

        // to also register all other key presses
        setTimeout(()=>{
            let text = this.html.textContent;

            this.content = {
                    text: text, //TextWorker.trim(text),
                    textF: text,
            }
        }, 1);
    }
}

export default Txt;