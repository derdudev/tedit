import Component from "./component.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import blockMap from "./internals/blockMap.js";
import DomWorker from "../base/DomWorker.js";
class Tedit {
    constructor({ data, types }) {
        console.log(data, types);
        this.html = DomWorker.create("div");
        this.html.appendChild(DomWorker.create("div"));
        Component.setTedit(this);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.append((new (getKeyValue(data[i].type)(blockMap))()));
            }
        }
    }
    append(element) {
        console.log("# Appending <", element, ">");
    }
    save() {
        console.log("# Saving...");
    }
    getContent() {
        console.log("# Fetching content...");
    }
}
export default Tedit;
//# sourceMappingURL=tedit.js.map