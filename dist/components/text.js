import DOMWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
class Txt extends Component {
    constructor(initContent) {
        super();
        this.name = "text";
        this.ID = randstr();
        this.initTemps();
        this.container = DOMWorker.create("div", {}, [this.templates[0].html]);
        if (initContent) {
            this.content = initContent;
        }
        this.loadTemp(0);
    }
    loadTemp(index) {
        this.templates[index].loadData(this.content);
        this.render(this.templates[index]);
    }
    render(template) {
        Component.tedit.html.appendChild(template.html);
    }
    initTemps() {
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
        let temp1 = new Template(domElement_temp1, barConfig_temp1, this.loadTemp);
        this.templates = [];
        this.templates.push(temp1);
    }
}
export default Txt;
//# sourceMappingURL=text.js.map