import * as CSS from 'csstype';

interface DomOptions {
    style?: CSS.Properties;
    pseudoStyle?: { [P in CSS.SimplePseudos]?: CSS.Properties },
    contentEditable?: boolean;
    spellcheck?: boolean;
    innerText?: string;
    className?: string;
    placeHolder?: string;
    id?: string;
    tagName?: string;
    onclick?: Function;
    onkeydown?: Function;
}

export default DomOptions;