import Component from "../core/component.js";

type Shortcut = {
    keys: shortcutKeys,
    handler: Function
}

type controlKey = "Control" | "Alt" | "Shift";
// maybe here more about specific length stings: https://stackoverflow.com/questions/51813272/declaring-string-type-with-min-max-length-in-typescript/54832231#54832231
type charKey = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

type shortcutKeys = [controlKey, charKey] | [controlKey, controlKey, charKey];

class ShortcutHandler {
    private isControlPressed: boolean;
    private isAltPressed: boolean;
    private isShiftPressed: boolean;

    private controlKeyMap = {
        "Control": this.getControlPressed.bind(this),
        "Alt": this.getAltPressed.bind(this),
        "Shift": this.getShiftPressed.bind(this),
    }

    private static isBodySet: boolean;

    private shortcutList: Shortcut[];

    constructor(){
        this.shortcutList = [];
        this.isControlPressed = false;
        this.isAltPressed = false;
        this.isShiftPressed = false;

        if(!ShortcutHandler.isBodySet) {
            ShortcutHandler.isBodySet = true;

            
        }

        // TODO: make booleans static 
        document.body.addEventListener("keydown", ((e: KeyboardEvent)=>{
            if(e.key == "Control") this.isControlPressed = true;
            else if(e.key == "Alt") this.isAltPressed = true;
            else if(e.key == "Shift") this.isShiftPressed = true;

            this.check(e);
        }).bind(this));
        document.body.addEventListener("keyup", ((e:KeyboardEvent)=>{
            if(e.key == "Control") this.isControlPressed = false;
            else if(e.key == "Alt") this.isAltPressed = false;
            else if(e.key == "Shift") this.isShiftPressed = false;
        }).bind(this));
    }

    /**
     * 
     * @param keys combination of two keys (e.g. ["Control", "T"] for Control + T)
     */
    public registerShortcut(keys: shortcutKeys, handler:Function){
        let shortcut = {
            keys: keys,
            handler: handler
        }
        this.shortcutList.push(shortcut);
    }

    public check(e:KeyboardEvent){
        let shortcut: Shortcut, shortcutKeys: shortcutKeys;
        for(let i=0; i<this.shortcutList.length; i++){
            shortcut = this.shortcutList[i];
            shortcutKeys = shortcut.keys;
            
            if(shortcutKeys.length == 2){
                let blockKeys:controlKey[];
                if(shortcutKeys[0] == "Control") blockKeys = ["Shift", "Alt"]
                else if (shortcutKeys[0] == "Shift") blockKeys = ["Control", "Alt"]
                else blockKeys = ["Control", "Shift"]

                // console.log(this.controlKeyMap[shortcutKeys[0]](), e.key.toUpperCase() == shortcutKeys[1], !this.controlKeyMap[blockKeys[0]]() , !this.controlKeyMap[blockKeys[1]]())

                if(this.controlKeyMap[shortcutKeys[0]]() && e.key.toUpperCase() == shortcutKeys[1] && !(this.controlKeyMap[blockKeys[0]]()) && !(this.controlKeyMap[blockKeys[1]]())) {
                    e.preventDefault();
                    shortcut.handler();
                }
            } else {
                // TODO: also add checks for blocked keys
                if(this.controlKeyMap[shortcutKeys[0]]() && this.controlKeyMap[shortcutKeys[1]]() && e.key.toUpperCase() == shortcutKeys[2]) {
                    e.preventDefault();
                    shortcut.handler();
                }
            }
        }
    }

    private getControlPressed():boolean{
        return this.isControlPressed;
    }
    private getAltPressed():boolean{
        return this.isAltPressed;
    }
    private getShiftPressed():boolean{
        return this.isShiftPressed;
    }
}

export default ShortcutHandler;