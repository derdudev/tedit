import DomOptions from "./DomOptions";
import {getKeyValue, setKeyValue} from "../utilities/objectOperations.js";

/**
 * @description Works on any dom related element. Can create, change and delete any element in the DOM (visible or not)
 */
class DomWorker {
    /**
     * @description creates an HTMLElement with predefined custom DOM properties
     * @param {string} tagName 
     * @param {DomOptions} options 
     * @param {children} children 
     * 
     * @return {HTMLElement} returns a custom HTMLElement (any kind of HTMLElement)
     */
    public static create(tagName: string, options?: DomOptions, children?: Object): HTMLElement{
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
}

export default DomWorker;