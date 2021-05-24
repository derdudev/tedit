import { DomOptions } from "../base/dom"

type Variants = {
    "default": Variant;
} & {
    [key: number]: Variant;
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

class VariantLoader {
    // should return a map of types and their corresponding variants
    /*static getVariantsOfType(type: string): Variants{
        
    }*/
}

export {Variant, Variants, VariantLoader}