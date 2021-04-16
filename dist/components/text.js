import DOM from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
import Button from "../base/button.js";
import { randstr } from "../utilities/random.js";
class TxtContent {
}
class Txt extends Component {
    constructor(tedit) {
        super(tedit);
        this.name = "text";
        this.content = {
            type: this.name,
            data: {
                text: "",
                variant: this.state.variant,
            },
        };
        this.variants = {
            0: new Variant({
                style: {
                    color: "#000000",
                    fontWeight: 500,
                    fontSize: "16px",
                }
            }),
            1: new Variant({
                style: {
                    fontWeight: "bold",
                    fontSize: "22px",
                }
            }),
        };
        this.actions = {
            0: () => { this.setState({ variant: 0 }); },
            1: () => { this.setState({ variant: 1 }); },
        };
        this.navbarConfig = {
            0: new Button({
                innerText: "V0",
                onclick: (_e) => {
                    this.setState({ variant: 0 });
                },
            }),
            1: new Button({
                innerText: "V1",
                onclick: () => { this.setState({ variant: 1 }); },
            }),
        };
        this.ID = randstr();
        this.domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
        });
        this.domElement.addEventListener("keydown", (e) => {
            this.content = {
                type: this.name,
                data: {
                    text: e.target.innerText + e.key,
                    variant: this.state.variant,
                }
            };
        });
        this.domElement.addEventListener("click", () => {
            this.tedit.setActiveElement(this);
            this.tedit.navbar.load(this.navbarConfig);
        });
        this.domElement.id = randstr();
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getDomElement() {
        return this.domElement;
    }
    setDomElement(domElement) {
        this.domElement = domElement;
    }
    getName() {
        return this.name;
    }
    getID() {
        return this.ID;
    }
}
export default Txt;
//# sourceMappingURL=text.js.map