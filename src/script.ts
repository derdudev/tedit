import DOM from "./base/dom.js";
import * as CSS from 'csstype';

let stylingP: CSS.Properties = {
    color: "#fff",
    backgroundColor: "#444444",
    padding: "15px",
    width: "100%",
    textAlign: "center",
    transition: "all .3s ease",
    margin: "0px",
}

let p = DOM.create("p", {
    spellcheck: true,
    style: stylingP,
    innerText: "hello world",
    className: "p"
});

let p2 = DOM.create("p", {
    spellcheck: true,
    style: stylingP,
    innerText: "hello world"
});

let div = DOM.create("div", {
    spellcheck: true,
    style: {
        display: "flex",
        width: "100%",
        margin: "0px",
    }
}, {
    p, p2
});

let h1 = DOM.create("h1", {
    innerText: "Everything worked just fine"
});

let p3 = DOM.create("p", {
    innerText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Ultricies integer quis auctor elit. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Aliquam ultrices sagittis orci a scelerisque purus semper. Massa placerat duis ultricies lacus sed turpis tincidunt id. Non curabitur gravida arcu ac tortor dignissim. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Scelerisque purus semper eget duis at. Sem viverra aliquet eget sit amet tellus cras. Eget dolor morbi non arcu risus quis varius quam. Convallis a cras semper auctor neque vitae tempus. Blandit massa enim nec dui nunc mattis. Lectus quam id leo in vitae turpis massa sed. Lectus magna fringilla urna porttitor rhoncus. Lectus quam id leo in vitae turpis massa. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec.

    Egestas congue quisque egestas diam in. Dapibus ultrices in iaculis nunc sed augue. Eleifend quam adipiscing vitae proin. Interdum varius sit amet mattis. Arcu felis bibendum ut tristique. Ut eu sem integer vitae justo eget. Risus viverra adipiscing at in tellus. Nullam eget felis eget nunc lobortis mattis aliquam. Nullam vehicula ipsum a arcu cursus vitae congue. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Morbi leo urna molestie at elementum eu. Felis imperdiet proin fermentum leo vel orci porta. Id leo in vitae turpis. Ut etiam sit amet nisl purus. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Enim nec dui nunc mattis enim ut tellus elementum sagittis.
    
    Lorem mollis aliquam ut porttitor leo a. Aliquam id diam maecenas ultricies. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Bibendum at varius vel pharetra vel turpis nunc eget. Aliquam faucibus purus in massa tempor nec feugiat. Iaculis at erat pellentesque adipiscing. Egestas erat imperdiet sed euismod nisi porta lorem. Pharetra vel turpis nunc eget lorem dolor. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Fringilla est ullamcorper eget nulla facilisi etiam dignissim. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Viverra nam libero justo laoreet sit amet cursus sit. Duis convallis convallis tellus id interdum velit laoreet id. Ornare lectus sit amet est placerat in. Neque gravida in fermentum et. Fames ac turpis egestas sed tempus urna et.
    
    Enim praesent elementum facilisis leo vel. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Hendrerit dolor magna eget est lorem ipsum. Turpis nunc eget lorem dolor sed. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Magna fringilla urna porttitor rhoncus dolor purus non. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Arcu risus quis varius quam. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Consequat id porta nibh venenatis.
    
    Molestie a iaculis at erat pellentesque. Amet est placerat in egestas erat imperdiet. Donec ultrices tincidunt arcu non sodales. Accumsan sit amet nulla facilisi morbi. Velit ut tortor pretium viverra. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Faucibus nisl tincidunt eget nullam non. Massa tempor nec feugiat nisl pretium fusce id velit ut. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Consequat id porta nibh venenatis cras sed. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Id semper risus in hendrerit gravida rutrum. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Nunc sed id semper risus in.`
})

let container = DOM.create("div", {
    style: {
        width: "80%",
    }
}, {div, h1, p3});


DOM.render(container);
