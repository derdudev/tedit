import DOM from "../base/dom.js";
import Component from "../core/component.js";
import { Variant } from "../core/variant.js";
import Button from "../base/button.js";
import { randstr } from "../utilities/random.js";
import HTMLComponent from "../base/HTMLComponent.js";
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
            "default": new Variant({
                className: "p",
                onkeydown: this.handleKeyDown.bind(this),
                onclick: (() => {
                    Component.tedit.setActiveElement(this);
                    Component.tedit.navbar.load(this.navbarConfig);
                }).bind(this),
            }),
            0: new Variant({
                style: {
                    color: "#000000",
                    fontWeight: 500,
                    fontSize: "16px",
                },
                placeHolder: "Just a normal text field",
                contentEditable: true,
                className: "p",
                onkeydown: this.handleKeyDown.bind(this),
            }),
            1: new Variant({
                style: {
                    fontWeight: "bold",
                    fontSize: "22px",
                },
                tagName: "h1",
                placeHolder: "Header",
                contentEditable: true,
                className: "p",
                onkeydown: this.handleKeyDown.bind(this),
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
                    this.getDomElement().focus();
                },
            }),
            1: new Button({
                innerText: "H1",
                onclick: () => {
                    this.setState({ variant: 1 });
                    this.getDomElement().focus();
                },
            })
        };
        this.ID = randstr();
        let domElement;
        domElement = DOM.create("p", {
            placeHolder: "This is a text element.",
            contentEditable: true,
            className: "p",
            spellcheck: false,
            id: this.ID,
        });
        this.domComponent = new HTMLComponent(domElement);
        if ((config === null || config === void 0 ? void 0 : config.variant) != null) {
            this.setState({ variant: config.variant });
        }
        if ((config === null || config === void 0 ? void 0 : config.content) != null) {
            this.setContent(config.content);
        }
    }
    handleKeyDown(e) {
        setTimeout(() => {
            this.content.data = {
                text: e.target.innerText,
                variant: this.state.variant,
            };
        }, 1);
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
        this.getDomElement().innerText = content.data.text;
    }
    getDomComponent() {
        return this.domComponent;
    }
    setDomComponent(domComponent) {
        this.domComponent = domComponent;
    }
    getDomElement() {
        return this.domComponent.getDomElement();
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