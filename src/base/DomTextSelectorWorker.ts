/**
 * @description Changes text selection related elements in the DOM (does the visible work)
 */
class DomTextSelectorWorker {
    /**
     * 
     * @param element 
     */
    public static surroundSelection(element: HTMLElement){
        let selection = Object.freeze(window.getSelection());
        let selectedNode = selection?.focusNode as Node;
        let parent = selectedNode?.parentElement;

        console.log(selection);

        if(parent?.tagName != "B") selection?.getRangeAt(0).cloneRange().surroundContents(element);
        else selectedNode?.parentNode?.parentNode?.replaceChild(selectedNode, parent);

        let range = new Range();
        range.setStart(element.childNodes[0], 0);
        range.setEnd(element.childNodes[0], element.innerText.length-1);
        document.getSelection()?.addRange(range as Range);

        console.log(document.getSelection())
    }
}

export default DomTextSelectorWorker;