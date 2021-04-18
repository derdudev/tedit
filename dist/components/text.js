import DOM from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
import Button, { MaterialIconButton } from "../base/button.js";
import { randstr } from "../utilities/random.js";
class TxtContent {
}
class Txt extends Component {
    constructor(config) {
        super();
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
                innerText: "P",
                onclick: (_e) => {
                    this.setState({ variant: 0 });
                    this.domElement.focus();
                },
            }),
            1: new Button({
                innerText: "H1",
                onclick: () => {
                    this.setState({ variant: 1 });
                    this.domElement.focus();
                },
            }),
            2: new MaterialIconButton("favorite", {
                style: {
                    fontSize: "16px",
                },
                onclick: () => {
                    this.setState({ variant: 2 });
                    this.domElement.focus();
                }
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
            Component.tedit.setActiveElement(this);
            Component.tedit.navbar.load(this.navbarConfig);
        });
        if (config === null || config === void 0 ? void 0 : config.variant)
            this.setState({ variant: config.variant });
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