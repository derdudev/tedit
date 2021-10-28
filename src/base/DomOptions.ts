import * as CSS from 'csstype';
import Event from './event.js';

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
    events?: Array<Event>;
}

export default DomOptions;