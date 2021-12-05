import globalConfig from "../base/config.js";
import { getKeyValue } from "../utilities/objectOperations.js";
class Logger {
    static clog(type, ...message) {
        if (getKeyValue(type)(globalConfig.debug))
            console.log(...message, "[" + type + "]");
    }
}
export default Logger;
//# sourceMappingURL=logger.js.map