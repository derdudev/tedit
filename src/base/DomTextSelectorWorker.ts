import DomTextSelector from "./DomTextSelector.js";
import DomWorker from "./DomWorker.js";

/**
 * @description Changes text selection related elements in the DOM (does the visible work)
 */
class DomTextSelectorWorker {
    /**
     * 
     * @param element 
     */
    public static surroundSelection(element: HTMLElement){
        let selection = document.getSelection();
        let selectedNode = selection?.focusNode as Node;
        let parent = selectedNode?.parentElement;
        let mainElement = parent?.parentElement;

        console.log(selection);

        let selectionNode;

        if(parent?.className == element.className) {
            let textNodeParent = DomWorker.create("p", {innerText: selectedNode?.textContent || ""});
            let textNode = textNodeParent.childNodes[0];
            parent.replaceWith(textNode);

            selectionNode = textNode;
        }
        else {
            selection?.getRangeAt(0).cloneRange().surroundContents(element);
            selectionNode = element.childNodes[0];
        }

        DomTextSelector.setSelection(selectionNode as Node, 0, selectionNode.textContent?.length as number);

        mainElement?.normalize(); // selection does not get lost
    }
}

export default DomTextSelectorWorker;