interface Data {
    type: string;
    data: any;
}

interface Type {
    name: string;
    variants: any // temporary: TODO!!!
}

interface Init {
    data: Data[];
    types: Type[];
}

export { Init }