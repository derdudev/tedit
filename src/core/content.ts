interface Content{
    data: Object;
}

interface ComponentData {
    type: string;
    content: Content,
}

export default Content;
export { ComponentData };