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
    constructor({ data, types }) {
        Renderer.setMain("", this);
        this.collection = new TeditCollection();
        this.html = DomWorker.create("div", { id: "tedit" });
        Component.setTedit(this);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.collection.append((new (getKeyValue(data[i].type)(blockMap))()));
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
        for (let i = 0; i < this.collection.length; i++) {
            console.log(this.collection.get(i).getContent());
        }
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map