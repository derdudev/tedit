import * as CSS from 'csstype';
import {getKeyValue, setKeyValue} from "../utilities/objectOperations.js";

interface DomOptions {
    style?: CSS.Properties;
    pseudoStyle?: { [P in CSS.SimplePseudos]?: CSS.Properties },
    contentEditable?: boolean;
    spellcheck?: boolean;
    innerText?: string;
    className?: string;
    placeHolder?: string;
    onclick?: Function;
}

export default class DOM {
    static create(tagName: string, options?: DomOptions, children?: Object): HTMLElement {
        let element: HTMLElement = document.createElement(tagName);

        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if(key !== "style"){
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