abstract class HTMLComponent{
    protected domElement: HTMLElement;

    public getDomElement(): HTMLElement {
        return this.domElement;
    }
}

export default HTMLComponent;