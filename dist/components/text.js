import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
class Txt extends Component {
    constructor(initContent) {
        super();
        this.name = "text";
        this.ID = randstr();
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
        this.loadTemp(0);
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
            new DomButton({}, DomWorker.create("button", {
                innerText: "Button1",
            })),
            new DomButton({}, DomWorker.create("button", {
                innerText: "Button2",
            })),
        ]);
        let temp1 = new Template(domElement_temp1, barConfig_temp1, this.loadTemp, this.loadData);
        this.templates = [];
        this.templates.push(temp1);
    }
    loadData(content) {
        this.html.innerHTML = getKeyValue("text")(content.data);
    }
    saveContent() {
        setTimeout(() => {
            let text = this.html.innerText;
            this.content = {
                data: {
                    text: text,
                }
            };
        }, 1);
    }
    getContent() {
        return this.content;
    }
}
export default Txt;
//# sourceMappingURL=text.js.map