import {getKeyValue, setKeyValue} from "../utilities/objectOperations.js";
import DomOptions from "./DomOptions.js";

export default class DOM {
    static create(tagName: string, options?: DomOptions, children?: Object): HTMLElement {
        let element: HTMLElement = document.createElement(tagName);

        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if (key == "tagName"){

            } else if(key !== "style"){
                element.setAttribute(key, valueOfKey as string);
                setKeyValue(key as never, valueOfKey as string)(element);
                //console.log(element.className)
            } else {
                Object.assign(element.style, getKeyValue(key as never)(options));
            }
        }

        for(let child in children){
            element.appendChild(getKeyValue(child as never)(children));
        }

        return element;
    }    

    static render(element: HTMLElement, parent?: HTMLElement){
        if(parent){
            parent.appendChild(element);
        } else {
            document.body.appendChild(element);
        }
    }
}

class DOMWorker {
    static surroundSelection(element: HTMLElement){
        let selection = Object.freeze(window.getSelection());
        let selectedNode = selection?.focusNode as Node;
        let parent = selectedNode?.parentElement;

        console.log(selection);

        if(parent?.tagName != "B") selection?.getRangeAt(0).cloneRange().surroundContents(element);
        else selectedNode?.parentNode?.parentNode?.replaceChild(selectedNode, parent);

        let range = new Range();
        range.setStart(element.childNodes[0], 0);
        range.setEnd(element.childNodes[0], element.innerText.length-1);
        document.getSelection()?.addRange(range as Range);

        console.log(document.getSelection())
    }

    static setCursor(textNode: Node, pos: number){
        // https://www.geeksforgeeks.org/how-to-set-cursor-position-in-content-editable-element-using-javascript/
        let range = document.createRange();

        range.setStart(textNode, pos);
        range.collapse(true);

        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(range);
    }
}

export {DomOptions, DOMWorker};