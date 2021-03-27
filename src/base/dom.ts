interface FontOptions {
    family: String,
    size: string,
    color: string,
    weight: string,
}

interface CSSStyle{
    font: FontOptions,
    color: string,
}

interface DomOptions {
    style?: CSSStyle;
    contentEditable?: boolean;
    spellcheck?: boolean;
}

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
  obj[key];

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

export default class DOM {
    static create(tagName: string, options: DomOptions): HTMLElement {
        let element: HTMLElement = document.createElement(tagName);

        for(let key in options){
            console.log(typeof key);
            element.setAttribute(key, prop(options, key))
        }

        return element;
    }    
}