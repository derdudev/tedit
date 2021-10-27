import globalConfig from "src/base/config.js";

/**
 * should provide basic features listed on Trello
 */
class Logger {
    static clog(message: string){
        if(globalConfig.debug) console.log(message); 
    }
}

export default Logger;