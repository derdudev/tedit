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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        console.log(e.key, (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.anchorOffset);
        if (e.key == "a" || e.key == "A") {
            setTimeout(() => {
                var _a;
                let selection = document.getSelection();
                let selectionNode = this.html.childNodes[0];
                if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                    let range = new Range();
                    range.setStart(selectionNode, 0);
                    range.setEnd(selectionNode, (_a = selectionNode.textContent) === null || _a === void 0 ? void 0 : _a.length);
                    selection === null || selection === void 0 ? void 0 : selection.addRange(range);
                }
            }, 1);
        }
        if (e.key == " ") {
            e.preventDefault();
            let pos = ((_b = document.getSelection()) === null || _b === void 0 ? void 0 : _b.anchorOffset) || 0;
            let firstHalf = ((_c = this.html.textContent) === null || _c === void 0 ? void 0 : _c.slice(0, pos)) || "";
            let secondHalf = ((_d = this.html.textContent) === null || _d === void 0 ? void 0 : _d.slice(pos, this.html.textContent.length)) || "";
            console.log(firstHalf, secondHalf);
            this.html.innerHTML = firstHalf + "&nbsp;" + secondHalf;
            let selectionNode = this.html.childNodes[0];
            DomTextSelector.setCursor(selectionNode, ++pos);
        }
        else if (e.key == "Backspace") {
            e.preventDefault();
            let selection = document.getSelection();
            let pos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
            if (pos != 0) {
                let firstHalf, secondHalf;
                if (selection === null || selection === void 0 ? void 0 : selection.isCollapsed) {
                    firstHalf = ((_e = this.html.textContent) === null || _e === void 0 ? void 0 : _e.slice(0, --pos)) || "";
                    secondHalf = ((_f = this.html.textContent) === null || _f === void 0 ? void 0 : _f.slice(++pos, this.html.textContent.length)) || "";
                    this.html.innerHTML = firstHalf + secondHalf;
                    let selectionNode = this.html.childNodes[0];
                    DomTextSelector.setCursor(selectionNode, --pos);
                }
                else {
                    let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                    let startPos = (range === null || range === void 0 ? void 0 : range.startOffset) || 0;
                    let endPos = (range === null || range === void 0 ? void 0 : range.endOffset) || 0;
                    console.log(startPos, endPos);
                    firstHalf = ((_g = this.html.textContent) === null || _g === void 0 ? void 0 : _g.slice(0, startPos)) || "";
                    secondHalf = (_h = this.html.textContent) === null || _h === void 0 ? void 0 : _h.slice(endPos, this.html.textContent.length);
                    console.log(secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*\w/), ((secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*/)) || [])[0].length);
                    if (secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/^\s*\w/)) {
                        secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                    }
                    console.log(firstHalf, firstHalf.length, secondHalf);
                    this.html.innerHTML = firstHalf + secondHalf;
                    let selectionNode = this.html.childNodes[0];
                    if (this.html.innerHTML.length < pos)
                        DomTextSelector.setCursor(selectionNode, this.html.innerHTML.length);
                    else if (startPos == 0)
                        DomTextSelector.setCursor(selectionNode, 0);
                    else
                        DomTextSelector.setCursor(selectionNode, firstHalf.length);
                }
            }
            else {
                if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                    let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                    console.log(range, selection);
                    let startPos = (range === null || range === void 0 ? void 0 : range.startOffset) || 0;
                    let endPos = (range === null || range === void 0 ? void 0 : range.endOffset) || 0;
                    console.log(endPos, startPos);
                    this.html.innerHTML = ((_j = this.html.textContent) === null || _j === void 0 ? void 0 : _j.slice(endPos, this.html.textContent.length)) || "";
                    DomTextSelector.setCursor(this.html, pos);
                }
            }
        }
        else if (e.key == "Delete") {
            e.preventDefault();
            let selection = document.getSelection();
            let pos = (selection === null || selection === void 0 ? void 0 : selection.anchorOffset) || 0;
            if (pos != 0) {
                let firstHalf, secondHalf;
                if (selection === null || selection === void 0 ? void 0 : selection.isCollapsed) {
                    firstHalf = ((_k = this.html.textContent) === null || _k === void 0 ? void 0 : _k.slice(0, pos)) || "";
                    secondHalf = ((_l = this.html.textContent) === null || _l === void 0 ? void 0 : _l.slice(++pos, this.html.textContent.length)) || "";
                    this.html.innerHTML = firstHalf + secondHalf;
                    let selectionNode = this.html.childNodes[0];
                    DomTextSelector.setCursor(selectionNode, --pos);
                }
                else {
                    let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                    let startPos = (range === null || range === void 0 ? void 0 : range.startOffset) || 0;
                    let endPos = (range === null || range === void 0 ? void 0 : range.endOffset) || 0;
                    console.log(startPos, endPos);
                    firstHalf = ((_m = this.html.textContent) === null || _m === void 0 ? void 0 : _m.slice(0, startPos)) || "";
                    secondHalf = (_o = this.html.textContent) === null || _o === void 0 ? void 0 : _o.slice(endPos, this.html.textContent.length);
                    console.log(secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*\w/), ((secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/\s*/)) || [])[0].length);
                    if (secondHalf === null || secondHalf === void 0 ? void 0 : secondHalf.match(/^\s*\w/)) {
                        secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                    }
                    console.log(firstHalf, firstHalf.length, secondHalf);
                    this.html.innerHTML = firstHalf + secondHalf;
                    let selectionNode = this.html.childNodes[0];
                    if (this.html.innerHTML.length < pos)
                        DomTextSelector.setCursor(selectionNode, this.html.innerHTML.length);
                    else if (startPos == 0)
                        DomTextSelector.setCursor(selectionNode, 0);
                    else
                        DomTextSelector.setCursor(selectionNode, firstHalf.length);
                }
            }
            else {
                if (!(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                    let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                    console.log(range, selection);
                    let startPos = (range === null || range === void 0 ? void 0 : range.startOffset) || 0;
                    let endPos = (range === null || range === void 0 ? void 0 : range.endOffset) || 0;
                    console.log(endPos, startPos);
                    this.html.innerHTML = ((_p = this.html.textContent) === null || _p === void 0 ? void 0 : _p.slice(endPos, this.html.textContent.length)) || "";
                    DomTextSelector.setCursor(this.html, pos);
                }
            }
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