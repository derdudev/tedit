import globalConfig from "../base/config.js";
import { getKeyValue } from "../utilities/objectOperations.js";

/**
 * should provide basic features listed on Trello
 */
class Logger {
    static clog(type:string, ...message: any){
        if(getKeyValue(type as never)(globalConfig.debug)) console.log(...message, "["+type+"]"); 
    }
}

export default Logger;