class TextWorker {
    public static trim(text:string): string{
        // console.log("hello <br> /helloworld".match(/\<[a-z]*\>|\/[a-z]*/g)); - matches tags and / commands
        // console.log(escape(text).replace(/\%0A/, ""));
        // console.log(text.trimEnd() + "hello");
        // console.log(escape(text).match(/\\[a-z|A-Z]/g)); - matches escaped characters
        // removes \n at end of contenteditable input
        return text.trimEnd();
    }   
}

export default TextWorker;