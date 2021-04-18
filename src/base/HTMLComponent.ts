import { getKeyValue, setKeyValue } from "../utilities/objectOperations.js";
import { DomOptions } from "./dom.js";

abstract class HTMLComponent{
    protected domElement: HTMLElement;

    public getDomElement(): HTMLElement {
        return this.domElement;
    }

    public update(options: DomOptions){
        let valueOfKey;
        for(let key in options){
            valueOfKey = getKeyValue(key as never)(options);
            if(key !== "style"){
                this.domElement.setAttribute(key, valueOfKey as string);
                setKeyValue(key as never, valueOfKey as string)(this.domElement);
            } else {
                Object.assign(this.domElement.style, getKeyValue(key as never)(options));
            }
        }
    }
}

export default HTMLComponent;