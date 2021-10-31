import DomOptions from "./DomOptions";
import {getKeyValue, setKeyValue} from "../utilities/objectOperations.js";
import Logger from "../log/logger.js";

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

    // TODO<refactor>: why dont specify tagName in options object?
    public static create(tagName: string, options?: DomOptions, children?: any): HTMLElement{
        let element: HTMLElement = document.createElement(tagName);
        //console.log(element, tagName, options?.innerText);

        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if (key == "tagName"){

            } else if (key == "events") {
                // TODO: refactor into helper method
                let events = getKeyValue(key as never)(options);
                for(let i=0; i<events.length; i++){
                    element.addEventListener(events[i].type, events[i].handler);
                }
            } else if(key !== "style"){
                element.setAttribute(key, valueOfKey as string);
                setKeyValue(key as never, valueOfKey as string)(element);
                //console.log(element.className)
            } else {
                Object.assign(element.style, getKeyValue(key as never)(options));
            }
        }

        if(children){
            for(let i=0; i<children.length; i++){
                element.appendChild(children[i]);
            }
        }

        return element;
    }

    public static getByID(id: string): HTMLElement|null{
        return document.getElementById(id);
    }

    public static clearElement(element: HTMLElement){
        element.innerHTML = "";
    }
}

export default DomWorker;