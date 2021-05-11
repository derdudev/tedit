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
            }),
            2: new Button({
                innerText: "B",
                onclick: () => {
                    var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    console.log((_b = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.focusNode) === null || _b === void 0 ? void 0 : _b.parentElement);
                    if (((_f = (_d = (_c = window.getSelection()) === null || _c === void 0 ? void 0 : _c.focusNode) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _f === void 0 ? void 0 : _f.tagName) != "B")
                        (_g = window.getSelection()) === null || _g === void 0 ? void 0 : _g.getRangeAt(0).cloneRange().surroundContents(DOM.create("b"));
                    else
                        (_l = (_k = (_j = (_h = window.getSelection()) === null || _h === void 0 ? void 0 : _h.focusNode) === null || _j === void 0 ? void 0 : _j.parentNode) === null || _k === void 0 ? void 0 : _k.parentNode) === null || _l === void 0 ? void 0 : _l.replaceChild((_m = window.getSelection()) === null || _m === void 0 ? void 0 : _m.focusNode, (_p = (_o = window.getSelection()) === null || _o === void 0 ? void 0 : _o.focusNode) === null || _p === void 0 ? void 0 : _p.parentElement);
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