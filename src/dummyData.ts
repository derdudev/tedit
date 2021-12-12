const data = [
    {
        type: "text", 
        data: {
            text: "This is a headline",
            children: {

            },
        },
        template: 1,
    },
    {
        type: "text", 
        data: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna. Id aliquet risus feugiat in ante metus. Augue eget arcu dictum varius duis at rem donec. Urna id volutpat lacus laoreet. In egestas erat d euismod nisi porta. Magnis dis parturient montes nascetur ridiculus. Aliquet lectus proin nibh nisl condimentum id. Habitant morbi tristique senectus et. Mauris a diam maecenas sed. Eget nunc lobortis mattis aliquam faucibus purus in. Enim tortor at auctor urna. Rhoncus dolor purus non enim praesent elementum facilisis. Hac habitasse platea dictumst vestibulum rhoncus. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.",
            children: [
                // pText = pureText
                {type:"pText", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},
                {type:"bold", content:"Malesuada fames"},
                {type:"pText", content:" ac turpis egestas sed tempus urna. Id aliquet risus feugiat in ante metus. Augue eget arcu dictum varius duis at rem donec. Urna id volutpat lacus laoreet. In egestas erat d euismod nisi porta. Magnis dis parturient montes nascetur ridiculus. Aliquet lectus proin nibh nisl condimentum id. Habitant morbi tristique senectus et. Mauris a diam maecenas sed. Eget nunc lobortis mattis aliquam faucibus purus in. Enim tortor at auctor urna. Rhoncus dolor purus non enim praesent elementum facilisis. Hac habitasse platea dictumst vestibulum rhoncus. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus."},
            ],
        },
        template: 0,
    },
    // {
    //     type: "code",
    //     data: {
    //         language: "js",
    //         text: "This is a piece of wellwritten code"
    //     },
    //     template : 0,
    // },
    {
        type: "text",
        data: {
            text: "Praesent tristique magna sit amet purus gravida quis blandit turpis. Commodo sed egestas egestas fringilla phasellus faucibus. Dui sapien eget mi proin sed. In mollis nunc sed id semper. Nam aliquam sem et tortor consequat id porta nibh. Leo urna molestie at elementum eu. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Arcu dui vivamus arcu felis bibendum ut tristique. Arcu odio ut sem nulla. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Urna neque viverra justo nec. Porttitor rhoncus dolor purus non enim praesent elementum. Diam phasellus vestibulum lorem sed risus ultricies tristique. A scelerisque purus semper eget duis at tellus at urna. Sit amet purus gravida quis. Auctor eu augue ut lectus arcu bibendum. Purus in mollis nunc sed id. Viverra nibh cras pulvinar mattis nunc sed. Eu facilisis sed odio morbi quis commodo odio aenean sed."
        },
        template: 0
    },
    {
        type: "text", 
        data: {
            text: "-> Wow, how nicely everything works",
            textF: "And this one is a very nice paragraph",
        },
        template: 0,
    },
]

const types = [
    {
        name: "text",
        variants: [
            {
                "default": {

                },
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
]

const init = {
    data: data,
    types: types,
}

export {init}