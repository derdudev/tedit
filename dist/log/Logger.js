import globalConfig from "src/base/config.js";
class Logger {
    static clog(message) {
        if (globalConfig.debug)
            console.log(message);
    }
}
export default Logger;
//# sourceMappingURL=Logger.js.map