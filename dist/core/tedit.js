import Component from "./component.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import blockMap from "./internals/blockMap.js";
import DomWorker from "../base/DomWorker.js";
import TeditCollection from "./teditCollection.js";
import Renderer from "../base/Renderer.js";
import Logger from "../log/logger.js";
import NavbarModule from "./navbarModule.js";
import Navbar from "./navbar.js";
import DomButton from "../tedUI/domButton.js";
class Tedit {
    constructor({ data }) {
        Renderer.setMain("", this);
        this.collection = new TeditCollection();
        this.html = DomWorker.create("div", { id: "tedit" });
        Component.setTedit(this);
        if (data) {
            let compRef, compContent, comp;
            for (let i = 0; i < data.length; i++) {
                compRef = getKeyValue(data[i].type)(blockMap);
                compContent = data[i];
                comp = new compRef(compContent);
                this.collection.append(comp);
            }
        }
        Renderer.renderMain(true);
        this.navbarModule = new NavbarModule([new DomButton({ innerText: "press me" })]);
        this.navbar = new Navbar(this.navbarModule);
    }
    save() {
        Logger.clog("# Saving...");
    }
    getContent() {
        Logger.clog("# Fetching content...");
        let teditContent = [];
        for (let i = 0; i < this.collection.length; i++) {
            console.log(this.collection.get(i).getContent());
            teditContent.push(this.collection.get(i).getContent());
        }
        return teditContent;
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map