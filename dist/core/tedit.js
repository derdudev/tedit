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
import ShortcutHandler from "../base/shortcutHandler.js";
import DomTextSelectorWorker from "../base/DomTextSelectorWorker.js";
class Tedit {
    constructor({ data }) {
        Renderer.setMain("", this);
        this.shortcutHandler = new ShortcutHandler();
        this.shortcutHandler.registerShortcut(["Control", "D"], () => {
            let reloadButton = document.getElementById("reloadBtn");
            reloadButton === null || reloadButton === void 0 ? void 0 : reloadButton.click();
            console.log(reloadButton);
        });
        this.shortcutHandler.registerShortcut(["Control", "B"], () => {
            var _a;
            if (!((_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.isCollapsed))
                DomTextSelectorWorker.surroundSelection(DomWorker.create("b", { className: "ted-text-bold" }));
        });
        this.shortcutHandler.registerShortcut(["Control", "I"], () => {
            var _a;
            if (!((_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.isCollapsed))
                DomTextSelectorWorker.surroundSelection(DomWorker.create("i", { className: "ted-text-italic" }));
        });
        this.collection = new TeditCollection();
        this.html = DomWorker.create("div", {
            id: "tedit",
            style: {
                whiteSpace: "pre-wrap",
            }
        });
        Component.setTedit(this);
        if (data) {
            let compRef, compData, comp;
            for (let i = 0; i < data.length; i++) {
                compRef = getKeyValue(data[i].type)(blockMap);
                compData = data[i];
                comp = new compRef(compData);
                this.collection.append(comp);
            }
        }
        Renderer.renderMain(true);
        this.navbarModule = new NavbarModule([new DomButton({ innerText: "press me" })]);
        this.navbar = new Navbar(this.navbarModule);
    }
    save() {
        Logger.clog("stage", "%c# Saving...", "font-family: 'Roboto Mono'; font-weight: bold");
    }
    getContent() {
        Logger.clog("stage", "%c# Fetching content...", "font-family: 'Roboto Mono'; font-weight: bold");
        let teditContent = [];
        for (let i = 0; i < this.collection.length; i++) {
            teditContent.push(this.collection.get(i).getContent());
        }
        return teditContent;
    }
    getCompData() {
        Logger.clog("stage", "%c# Fetching component data...", "font-family: 'Roboto Mono'; font-weight: bold");
        let teditCompData = [];
        for (let i = 0; i < this.collection.length; i++) {
            teditCompData.push(this.collection.get(i).getCompData());
        }
        return teditCompData;
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map