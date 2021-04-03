interface FontOptions {
    family: String,
    size: string,
    color: string,
    weight: string,
}

interface CSSStyle{
    font?: FontOptions,
    color?: string,
}

interface DomOptions {
    style?: CSSStyle;
    contentEditable?: boolean;
    spellcheck?: boolean;
}

const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key];

export default class DOM {
    static create(tagName: string, options: DomOptions): HTMLElement {
        let element: HTMLElement = document.createElement(tagName);

        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if(key !== "style"){
                element.setAttribute(key, valueOfKey as string);
            } else {
                for(let style in valueOfKey as CSSStyle){
                    element.style.setProperty(style, getKeyValue(style as never)(valueOfKey));
                }
            }
        }

        return element;
    }    
}