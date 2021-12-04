import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import EditableHandler from "../base/editableHandler.js";
import KeyHandler from "../base/keyHandler.js";
class Txt extends Component {
    constructor({ data: initContent, template: initTemp }) {
        super();
        this.name = "text";
        this.ID = randstr();
        this.keyHandler = new KeyHandler(this);
        console.log(initContent, initTemp);
        if (initContent) {
            this.content = initContent;
        }
        else {
            this.content = {
                text: "",
            };
        }
        this.initTemps();
        this.html = DomWorker.create("div", {}, [this.templates[0].html]);
        this.loadTemp(true, initTemp);
        this.editableHandler = new EditableHandler(this);
    }
    initTemps() {
        let domElement_temp1 = DomWorker.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
            style: {
                backgroundColor: "#fff",
                padding: "2px 10px",
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
                padding: "2px 10px",
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
            new DomButton({}, DomWorker.create("button", {
                innerText: "Headline",
                events: [
                    {
                        type: "click",
                        handler: headline.bind(this),
                    }
                ]
            })),
            new DomButton({}, DomWorker.create("button", {
                innerText: "Paragraph",
                events: [
                    {
                        type: "click",
                        handler: paragraph.bind(this),
                    }
                ]
            })),
        ]);
        let temp1 = new Template(domElement_temp1, barConfig_temp1, this.loadTemp, this.loadData);
        let temp2 = new Template(domElement_temp2, barConfig_temp1, this.loadTemp, this.loadData);
        this.templates = [];
        this.templates.push(temp1);
        this.templates.push(temp2);
    }
    loadData(content) {
        this.html.innerHTML = getKeyValue("text")(content);
    }
    saveContent(e) {
        this.editableHandler.handleKeys(e);
        this.keyHandler.handleArrows(e);
        setTimeout(() => {
            let text = this.html.textContent;
            this.content = {
                text: text,
                textF: text,
            };
        }, 1);
    }
}
export default Txt;
//# sourceMappingURL=text.js.map