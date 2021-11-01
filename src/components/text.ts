import Content from "../core/content.js";
import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import TextWorker from "../base/textWorker.js";
import DomTextSelector from "../base/DomTextSelector.js";
//import getTextCaretPosition from "../utilities/textCaretPosition.js";
class Txt extends Component {
    public name: string = "text";

    /**
     * 
     * @param initContent initial data to be loaded on initialisation
     */
    constructor(initContent?: Content){
        super();
        this.ID = randstr();

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

        this.loadTemp(0);
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
                innerText: "Button1", 
            })),
            new DomButton({},DomWorker.create("button", {
                innerText: "Button2", 
            })),
        ]);

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp, this.loadData);

        this.templates = [];
        this.templates.push(temp1);
    }

    private loadData(content: Content){
        this.html.innerHTML = getKeyValue("text" as never)(content);
    }

    private saveContent(e:KeyboardEvent): void{
        console.log(e.key, document.getSelection()?.anchorOffset);
        if(e.key == " "){
            e.preventDefault();
            let pos = document.getSelection()?.anchorOffset;
            //this.html.childNodes[0].textContent += " "; // this.html.innerText += " " doesnt work
            
            this.html.innerHTML += "&nbsp;";
            let selectionNode = this.html.childNodes[0];
            // ! innerText does not get updated properly -> textContent is more reliable
            console.log(selectionNode, pos, this.html.textContent?.length, this.html.innerHTML.length)
            DomTextSelector.setCursor(selectionNode as Node, ++(pos as number));
            console.log(document.getSelection()?.anchorOffset)
        } else if (e.key == "Backspace") {
            setTimeout(()=>{
                if(!this.html.textContent){
                    this.html.innerHTML = "";
                }
            },1);
        }
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