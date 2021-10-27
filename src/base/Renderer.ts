import Tedit from "src/core/tedit";
import DomWorker from "./DomWorker.js";

// ! Renderer and DomRenderer classes are colliding!
class Renderer {
    private static main: HTMLElement;
    private static teditInstance: Tedit;

    /**
     * 
     * @param elementName the id of the element into which the tedit instance is rendered
     */
    public static setMain(elementID:string, teditInstance:Tedit){
        this.teditInstance = teditInstance;

        // TODO: think of alternative for when elementID does not link to actual DOM element
        // ! attention: this.main has to be initialized in order for Renderer to function properly, thus this function has to be called at least once! Maybe rather own constructor?
        this.main = document.getElementById(elementID) || document.body;
    }

    public static renderMain(isFirstRender: boolean){
        console.log("# Rendering main")
        // TODO: the dom body mechanics are broken -> when the body gets cleared, all stylesheets get cleared as well!
        if(this.main != document.body) this.main.innerHTML = ""; // clear the main element before rendering the new content
        
        let container: HTMLElement;
        if(isFirstRender){
            container = DomWorker.create("div", {id:"teditContainer"});
            container.append(this.teditInstance.html);
            this.main.appendChild(container);
        } else {
            // if its not the first render, its a rerender, thus no new container element has to be added
            container = DomWorker.getByID("teditContainer") || document.body; // document.body is only for syntactic reasons, this expression always results in returning a HTMLElement
            DomWorker.clearElement(container);
            container.appendChild(this.teditInstance.html); // append latest version of html (so the contents) of the tedit editor
        }
    }
}

export default Renderer;