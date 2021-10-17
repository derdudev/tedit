import Bar from "./bar.js";
import { getKeyValue } from "../utilities/objectOperations.js";
import DomWorker from "src/base/DomWorker.js";
class NavbarConfig {
}
class Navbar extends Bar {
    constructor() {
        super();
        this.domElement = DomWorker.create("div", {
            style: {
                height: "20px",
                display: "flex",
                alignItems: "center",
            }
        });
    }
    getDomElement() {
        return this.domElement;
    }
    load(config) {
        this.config = config;
        this.reset();
        for (let name in config) {
            this.domElement.appendChild(getKeyValue(name)(config).getDomElement());
        }
    }
    reset() {
        this.domElement.innerHTML = "";
    }
}
export default Navbar;
export { NavbarConfig };
//# sourceMappingURL=navbar.js.map