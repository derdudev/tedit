import DOM from "../base/dom.js";

const getTextCaretPosition = () => {
    let tempSpan = DOM.create("span", {innerText: "."});
    window.getSelection()?.getRangeAt(0).surroundContents(tempSpan);
    //console.log(tempSpan.offsetLeft, tempSpan.offsetTop + tempSpan.offsetHeight);
    return {
        left: tempSpan.offsetLeft,
        top: tempSpan.offsetTop +  tempSpan.offsetHeight,
    }
}

export default getTextCaretPosition;