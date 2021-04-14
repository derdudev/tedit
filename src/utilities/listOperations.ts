const isDuplicate = (list:Array<any>, element: any) => {
    return list.indexOf(element) === -1;
}

export {isDuplicate};