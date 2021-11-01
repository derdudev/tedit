import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import DomTextSelector from "../base/DomTextSelector.js";
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
                text: "",
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
        this.html.innerHTML = getKeyValue("text")(content);
    }
    saveContent(e) {
        var _a, _b, _c, _d;
        console.log(e.key, (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.anchorOffset);
        if (e.key == " ") {
            e.preventDefault();
            let pos = (_b = document.getSelection()) === null || _b === void 0 ? void 0 : _b.anchorOffset;
            this.html.innerHTML += "&nbsp;";
            let selectionNode = this.html.childNodes[0];
            console.log(selectionNode, pos, (_c = this.html.textContent) === null || _c === void 0 ? void 0 : _c.length, this.html.innerHTML.length);
            DomTextSelector.setCursor(selectionNode, ++pos);
            console.log((_d = document.getSelection()) === null || _d === void 0 ? void 0 : _d.anchorOffset);
        }
        else if (e.key == "Backspace") {
            setTimeout(() => {
                if (!this.html.textContent) {
                    this.html.innerHTML = "";
                }
            }, 1);
        }
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