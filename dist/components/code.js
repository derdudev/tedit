import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import NavbarModule from "../core/navbarModule.js";
import Template from "../core/Template.js";
import DomButton from "../tedUI/domButton.js";
import { randstr } from "../utilities/random.js";
class Code extends Component {
    constructor(initContent) {
        super();
        this.name = "code";
        this.ID = randstr();
        this.initTemps();
        this.container = DomWorker.create("div", {}, [this.templates[0].html]);
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
        this.loadTemp(0);
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
        let temp1 = new Template(domElement_temp1, barConfig_temp1, this.loadTemp);
        this.templates.push(temp1);
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
export default Code;
//# sourceMappingURL=code.js.map