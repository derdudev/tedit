import DomOptions from "../base/DomOptions.js";
import { eventName } from "../base/event.js";
import domComponent from "./domComponent.js";

class DomButton extends domComponent {
    private static defaultOptions:DomOptions = {
        tagName: "button",
        style: {
            padding: "2px",
        }
    }

    constructor(buttonOptions?:DomOptions){
        // TODO<question>: Is it better to use defaultOptions as non-static variable for each object?
        super(buttonOptions || DomButton.defaultOptions);
    }
    
    // TODO<note>: Maybe even move up to Component bc adding events is not only practical for buttons
    public addEvent(eventType:eventName, eventHandler:EventListener){
        this.html.addEventListener(eventType, eventHandler);
    }
}

export default DomButton;