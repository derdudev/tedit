import Logger from "../log/logger.js";
import DomWorker from "./DomWorker.js";
class Renderer {
    static setMain(elementID, teditInstance) {
        this.teditInstance = teditInstance;
        this.main = document.getElementById(elementID) || document.body;
    }
    static renderMain(isFirstRender) {
        Logger.clog("# Rendering main");
        if (this.main != document.body)
            this.main.innerHTML = "";
        let container;
        if (isFirstRender) {
            container = DomWorker.create("div", { id: "teditContainer" });
            container.append(this.teditInstance.html);
            this.main.appendChild(container);
        }
        else {
            container = DomWorker.getByID("teditContainer") || document.body;
            DomWorker.clearElement(container);
            container.appendChild(this.teditInstance.html);
        }
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.js.map