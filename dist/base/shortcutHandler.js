class ShortcutHandler {
    constructor() {
        this.controlKeyMap = {
            "Control": this.getControlPressed.bind(this),
            "Alt": this.getAltPressed.bind(this),
            "Shift": this.getShiftPressed.bind(this),
        };
        this.shortcutList = [];
        this.isControlPressed = false;
        this.isAltPressed = false;
        this.isShiftPressed = false;
        if (!ShortcutHandler.isBodySet) {
            ShortcutHandler.isBodySet = true;
        }
        document.body.addEventListener("keydown", ((e) => {
            if (e.key == "Control")
                this.isControlPressed = true;
            else if (e.key == "Alt")
                this.isAltPressed = true;
            else if (e.key == "Shift")
                this.isShiftPressed = true;
            this.check(e);
        }).bind(this));
        document.body.addEventListener("keyup", ((e) => {
            if (e.key == "Control")
                this.isControlPressed = false;
            else if (e.key == "Alt")
                this.isAltPressed = false;
            else if (e.key == "Shift")
                this.isShiftPressed = false;
        }).bind(this));
    }
    registerShortcut(keys, handler) {
        let shortcut = {
            keys: keys,
            handler: handler
        };
        this.shortcutList.push(shortcut);
    }
    check(e) {
        let shortcut, shortcutKeys;
        for (let i = 0; i < this.shortcutList.length; i++) {
            shortcut = this.shortcutList[i];
            shortcutKeys = shortcut.keys;
            if (shortcutKeys.length == 2) {
                let blockKeys;
                if (shortcutKeys[0] == "Control")
                    blockKeys = ["Shift", "Alt"];
                else if (shortcutKeys[0] == "Shift")
                    blockKeys = ["Control", "Alt"];
                else
                    blockKeys = ["Control", "Shift"];
                if (this.controlKeyMap[shortcutKeys[0]]() && e.key.toUpperCase() == shortcutKeys[1] && !(this.controlKeyMap[blockKeys[0]]()) && !(this.controlKeyMap[blockKeys[1]]())) {
                    e.preventDefault();
                    shortcut.handler();
                }
            }
            else {
                if (this.controlKeyMap[shortcutKeys[0]]() && this.controlKeyMap[shortcutKeys[1]]() && e.key.toUpperCase() == shortcutKeys[2]) {
                    e.preventDefault();
                    shortcut.handler();
                }
            }
        }
    }
    getControlPressed() {
        return this.isControlPressed;
    }
    getAltPressed() {
        return this.isAltPressed;
    }
    getShiftPressed() {
        return this.isShiftPressed;
    }
}
export default ShortcutHandler;
//# sourceMappingURL=shortcutHandler.js.map