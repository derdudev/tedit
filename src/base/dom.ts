import * as CSS from 'csstype';

interface DomOptions {
    style?: CSS.Properties;
    pseudoStyle?: { [P in CSS.SimplePseudos]?: CSS.Properties },
    contentEditable?: boolean;
    spellcheck?: boolean;
    innerText?: string;
}

const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key];
const setKeyValue = <T extends object, U extends keyof T>(key: U, value: any) => (obj: T) => obj[key] = value;

export default class DOM {
    static create(tagName: string, options?: DomOptions, children?: Object): HTMLElement {
        let element: HTMLElement = document.createElement(tagName);

        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if(key !== "style"){
                element.setAttribute(key, valueOfKey as string);
                setKeyValue(key as never, valueOfKey as string)(element);
            } else if (key === "style") {
                Object.assign(element.style, getKeyValue(key as never)(options));
            } else {
                Object.assign(element.style, getKeyValue(key as never)(options));
            }
        }

        for(let child in children){
            element.appendChild(getKeyValue(child as never)(children));
        }

        return element;
    }    
}