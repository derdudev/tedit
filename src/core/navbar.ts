import DOM from "../base/dom.js";
import Button from "../base/button.js";
import Bar, { BarConfig } from "./bar.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import HTMLComponent from "../base/HTMLComponent.js";

class NavbarConfig implements BarConfig{
    [name: string]: Button;
}

class Navbar extends Bar{
    protected config: NavbarConfig;
    private domElement: HTMLElement;

    constructor(){
        super();
        this.domElement = DOM.create("div", {
            style: {
                height: "20px",
            }
        });
    }

    public getDomElement(): HTMLElement{
        return this.domElement;
    }

    public load(config: NavbarConfig): void {
        this.config = config;
        this.reset();
        for(let name in config){
            this.domElement.appendChild((getKeyValue(name as never)(config) as HTMLComponent).getDomElement());
        }
    }

    private reset(): void{
        this.domElement.innerHTML = "";
    }
}

export default Navbar;
export {NavbarConfig}