class Renderer {
    static setMain(elementID, teditInstance) {
        this.teditInstance = teditInstance;
        this.main = document.getElementById(elementID) || document.body;
    }
    static renderMain() {
        console.log("# Rendering main");
        if (this.main != document.body)
            this.main.innerHTML = "";
        this.main.appendChild(this.teditInstance.html);
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.js.map