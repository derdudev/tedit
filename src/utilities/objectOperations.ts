const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T): any => obj[key];
const setKeyValue = <T extends object, U extends keyof T>(key: U, value: any) => (obj: T) => obj[key] = value;

export {getKeyValue, setKeyValue}