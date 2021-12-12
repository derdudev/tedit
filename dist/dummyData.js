const data = [
    {
        type: "text",
        data: {
            text: "This is a headline",
            children: {},
        },
        template: 1,
    },
    {
        type: "text",
        data: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna. Id aliquet risus feugiat in ante metus. Augue eget arcu dictum varius duis at rem donec. Urna id volutpat lacus laoreet. In egestas erat d euismod nisi porta. Magnis dis parturient montes nascetur ridiculus. Aliquet lectus proin nibh nisl condimentum id. Habitant morbi tristique senectus et. Mauris a diam maecenas sed. Eget nunc lobortis mattis aliquam faucibus purus in. Enim tortor at auctor urna. Rhoncus dolor purus non enim praesent elementum facilisis. Hac habitasse platea dictumst vestibulum rhoncus. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.",
            children: [
                { type: "pText", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " },
                { type: "bold", content: "Malesuada fames" },
                { type: "pText", content: " ac turpis egestas sed tempus urna. Id aliquet risus feugiat in ante metus. Augue eget arcu dictum varius duis at rem donec. Urna id volutpat lacus laoreet. In egestas erat d euismod nisi porta. Magnis dis parturient montes nascetur ridiculus. Aliquet lectus proin nibh nisl condimentum id. Habitant morbi tristique senectus et. Mauris a diam maecenas sed. Eget nunc lobortis mattis aliquam faucibus purus in. Enim tortor at auctor urna. Rhoncus dolor purus non enim praesent elementum facilisis. Hac habitasse platea dictumst vestibulum rhoncus. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus." },
            ],
        },
        template: 0,
    },
    {
        type: "text",
        data: {
            text: "-> Wow, how nicely everything works",
            textF: "And this one is a very nice paragraph",
        },
        template: 0,
    },
];
const types = [
    {
        name: "text",
        variants: [
            {
                "default": {},
                0: {
                    style: {
                        color: "#000000",
                        fontWeight: 500,
                        fontSize: "16px",
                    },
                    placeHolder: "Just a normal text field",
                    contentEditable: true,
                    className: "p",
                },
                1: {
                    style: {
                        fontWeight: "bold",
                        fontSize: "22px",
                    },
                    tagName: "h1",
                    placeHolder: "Header",
                    contentEditable: true,
                    className: "p",
                },
            }
        ]
    }
];
const init = {
    data: data,
    types: types,
};
export { init };
//# sourceMappingURL=dummyData.js.map