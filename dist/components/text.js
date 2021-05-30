import DOM, { DOMWorker } from "../base/dom.js";
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
        this.command = "";
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
                    this.toTextVariant(0);
                },
            }),
            1: new Button({
                innerText: "H1",
                onclick: () => {
                    this.toTextVariant(1);
                },
            }),
            2: new Button({
                innerText: "B",
                onclick: () => {
                    DOMWorker.surroundSelection(DOM.create("b"));
                },
                contentEditable: false,
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
        else {
            this.setState({ variant: 0 });
        }
        if ((config === null || config === void 0 ? void 0 : config.content) != null) {
            this.setContent(config.content);
        }
    }
    handleKeyDown(e) {
        this.updateContent(e);
        if (e.key === "$") {
            this.command += e.key;
            return;
        }
        if (e.key === " ") {
            this.command = "";
            return;
        }
        if (this.command) {
            if (e.key !== "Enter")
                this.command += e.key;
        }
        if (this.command === "$text") {
            if (e.key === "Enter") {
                e.preventDefault();
                setTimeout(() => {
                    let length = this.getDomElement().innerText.length;
                    let position = length - this.command.length;
                    this.getDomElement().innerText = this.getDomElement().innerText.slice(0, position);
                    this.updateContent(e);
                    Txt.tedit.append(new Txt(), this.position + 1);
                }, 1);
                return;
            }
        }
        if (e.key === "Backspace" && e.target.innerText === "") {
            setTimeout(() => {
                Txt.tedit.removeElementAt(this.position);
            }, 1);
        }
        if (e.key === "Enter") {
            e.preventDefault();
            Txt.tedit.append(new Txt(), this.position + 1);
        }
    }
    updateContent(e) {
        setTimeout(() => {
            this.content.data = {
                text: e.target.innerText,
                variant: this.state.variant,
            };
        }, 1);
    }
    toTextVariant(num) {
        if (this.content.data.text) {
            let { anchorOffset } = document.getSelection();
            this.setState({ variant: num });
            DOMWorker.setCursor(this.getDomElement().childNodes[0], anchorOffset);
            this.getDomElement().focus();
        }
        else {
            this.setState({ variant: num });
            this.focus();
        }
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
    focus() {
        setTimeout(() => {
            var _a;
            let domElement = this.getDomElement();
            domElement.click();
            if (domElement.childNodes[0]) {
                let anchorOffset = ((_a = (domElement.childNodes[0]).textContent) === null || _a === void 0 ? void 0 : _a.length) || 0;
                console.log(domElement.childNodes);
                DOMWorker.setCursor(this.getDomElement().childNodes[0], anchorOffset);
            }
            else {
                domElement.focus();
            }
        }, 1);
    }
}
export default Txt;
//# sourceMappingURL=text.js.map