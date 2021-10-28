import globalConfig from "../base/config.js";
class Logger {
    static clog(message) {
        if (globalConfig.debug)
            console.log(message);
    }
}
export default Logger;
//# sourceMappingURL=logger.js.map