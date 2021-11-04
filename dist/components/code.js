import DomWorker from "../base/DomWorker.js";
import EditableHandler from "../base/editableHandler.js";
import KeyHandler from "../base/keyHandler.js";
import TextWorker from "../base/textWorker.js";
import Component from "../core/component.js";
import NavbarModule from "../core/navbarModule.js";
import Template from "../core/Template.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import { randstr } from "../utilities/random.js";
class Code extends Component {
    constructor(initContent) {
        super();
        this.name = "code";
        this.ID = randstr();
        this.editableHandler = new EditableHandler(this);
        this.keyHandler = new KeyHandler(this);
        if (initContent) {
            this.content = initContent;
        }
        else {
            this.content = {
                data: {
                    text: "",
                }
            };
        }
        this.initTemps();
        this.html = DomWorker.create("div", {}, [this.templates[0].html]);
        this.loadTemp(true, 0);
    }
    initTemps() {
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
            new DomButton({}, DomWorker.create("button", {
                innerText: "Language",
            })),
            new DomButton({}, DomWorker.create("button", {
                innerText: "Theme",
            })),
        ]);
        let temp1 = new Template(domElement_temp1, barConfig_temp1, this.loadTemp, this.loadData);
        this.templates.push(temp1);
    }
    loadData(content) {
        this.html.innerHTML = getKeyValue("text")(content);
    }
    saveContent(e) {
        this.editableHandler.handleKeys(e);
        this.keyHandler.handleArrows(e);
        setTimeout(() => {
            let text = this.html.innerText;
            this.content = {
                text: TextWorker.trim(text),
            };
        }, 1);
    }
}
export default Code;
//# sourceMappingURL=code.js.map