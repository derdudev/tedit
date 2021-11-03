import Content from "../core/content.js";
import DomWorker from "../base/DomWorker.js";
import Component from "../core/component.js";
import { randstr } from "../utilities/random.js";
import Template from "../core/Template.js";
import NavbarModule from "../core/navbarModule.js";
import DomButton from "../tedUI/domButton.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import TextWorker from "../base/textWorker.js";
import DomTextSelector from "../base/DomTextSelector.js";
//import getTextCaretPosition from "../utilities/textCaretPosition.js";
class Txt extends Component {
    public name: string = "text";

    /**
     * 
     * @param initContent initial data to be loaded on initialisation
     */
    constructor(initContent?: Content){
        super();
        this.ID = randstr();

        // TODO<issue>: this class has to extend component but that class has to be rethought again 
        //Component.tedit.append(this);

        if(initContent){
            this.content = initContent;
        } else {
            this.content = {
                    text: "",
            }
        }

        this.initTemps();
        this.html = DomWorker.create("div", {}, [this.templates[0].html]); // ! TODO: has to be implemented into Template as well!

        this.loadTemp(0);
    }

    public initTemps(){
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
            new DomButton({},DomWorker.create("button", {
                innerText: "Button1", 
            })),
            new DomButton({},DomWorker.create("button", {
                innerText: "Button2", 
            })),
        ]);

        let temp1 = new Template(domElement_temp1,barConfig_temp1, this.loadTemp, this.loadData);

        this.templates = [];
        this.templates.push(temp1);
    }

    private loadData(content: Content){
        this.html.innerHTML = getKeyValue("text" as never)(content);
    }

    private saveContent(e:KeyboardEvent): void{
        console.log(e.key, document.getSelection()?.anchorOffset);

        // needed for firefox in case of Ctrl + A
        if(e.key == "a" || e.key == "A"){
            setTimeout(()=>{
                let selection = document.getSelection();
                let selectionNode = this.html.childNodes[0];

                // if selection is not collapsed, anchorOffset != focusOffset
                if(!selection?.isCollapsed){
                    selection?.removeAllRanges();
                    let range = new Range();
                    range.setStart(selectionNode as Node, 0);
                    range.setEnd(selectionNode as Node, selectionNode.textContent?.length as number);
                    selection?.addRange(range);
                }
            },1)
        }

        if(e.key == " "){
            e.preventDefault();
            let pos = document.getSelection()?.anchorOffset || 0;
            //this.html.childNodes[0].textContent += " "; // this.html.innerText += " " doesnt work

            let firstHalf = this.html.textContent?.slice(0,pos) || "";
            let secondHalf = this.html.textContent?.slice(pos, this.html.textContent.length) || "";

            console.log(firstHalf, secondHalf)
            this.html.innerHTML = firstHalf + "&nbsp;" + secondHalf;
            
            // this.html.innerHTML += "&nbsp;"; // NOTE: if only " " (Space) is appended, after the first Space, the element text breaks somehow
            let selectionNode = this.html.childNodes[0];
            // ! innerText does not get updated properly -> textContent is more reliable
            // console.log(selectionNode, pos, this.html.textContent?.length, this.html.innerHTML.length)
            DomTextSelector.setCursor(selectionNode as Node, ++pos);
            // console.log(document.getSelection()?.anchorOffset)
        } else if (e.key == "Backspace" || e.key == "Delete") {
            e.preventDefault();

            let selection = document.getSelection();

            let pos = selection?.anchorOffset || 0;

            if(pos != 0){
                let firstHalf, secondHalf;
                if(selection?.isCollapsed){
                    // returns true only if selection is cursor

                    firstHalf = this.html.textContent?.slice(0,--(pos as number)) || "";
                    secondHalf = this.html.textContent?.slice(++(pos as number), this.html.textContent.length) || "";

                    this.html.innerHTML = firstHalf + secondHalf;
                    let selectionNode = this.html.childNodes[0];

                    DomTextSelector.setCursor(selectionNode as Node, --(pos as number));
                } else {
                    let range = selection?.getRangeAt(0);

                    let startPos = range?.startOffset || 0;
                    let endPos = range?.endOffset || 0;
                    console.log(startPos, endPos)

                    firstHalf = this.html.textContent?.slice(0, startPos) || "";
                    secondHalf = this.html.textContent?.slice(endPos, this.html.textContent.length);

                    console.log(secondHalf?.match(/\s*\w/),(secondHalf?.match(/\s*/) || [])[0].length);

                    if(secondHalf?.match(/^\s*\w/)){
                        // if starts with a space
                        secondHalf = "&nbsp;" + secondHalf.slice(1, secondHalf.length);
                    }

                    console.log(firstHalf, firstHalf.length, secondHalf)
                        
                    this.html.innerHTML = firstHalf + secondHalf;
                    let selectionNode = this.html.childNodes[0];

                    if(this.html.innerHTML.length < pos) DomTextSelector.setCursor(selectionNode as Node, this.html.innerHTML.length);
                    else if (startPos == 0) DomTextSelector.setCursor(selectionNode as Node, 0);
                    else DomTextSelector.setCursor(selectionNode as Node, firstHalf.length);
                    
                }
            } else {
                if(!selection?.isCollapsed){
                    // ! only in firefox there is a problem with Ctrl+A and Selection (0:1) in Chrome Selection works
                    // selection spans from start (0) to some position (n)
                    let range = selection?.getRangeAt(0);

                    console.log(range, selection);

                    let startPos = range?.startOffset || 0;
                    let endPos = range?.endOffset || 0;
                    console.log(endPos, startPos);

                    this.html.innerHTML = this.html.textContent?.slice(endPos, this.html.textContent.length) || "";

                    DomTextSelector.setCursor(this.html, pos);
                }
            }

            /* check still necessary but not in this way
            setTimeout(()=>{
                if(!this.html.textContent){
                    this.html.innerHTML = "";
                }
            },1);
            */
        }

        // TODO: remove setTimout !
        setTimeout(()=>{
            let text = this.html.textContent;

            this.content = {
                    text: text, //TextWorker.trim(text),
                    textF: text,
            }
        }, 1);
    }
}

export default Txt;