import { DomOptions } from "../base/dom"

interface Variants{
}

class Variant{
    private domOptions: DomOptions;

    constructor(domOptions: DomOptions){
        this.domOptions = domOptions;
    }

    public getDomOptions(): DomOptions{
        return this.domOptions;
    }
}

export {Variant, Variants}