const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

const DATA_DIR = "/data";

const jsonParser = bodyParser.json()

app.use("/public",  express.static(path.join(__dirname, "/")));
app.use(jsonParser);

app.get("/", (_req: any, res: { sendFile: (arg0: any) => void; })=>{
    res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.post("/save", (req: any, res: any)=>{
    console.log(req.body)
    fs.writeFile(__dirname+DATA_DIR+"/data.json", JSON.stringify(req.body, null, 3), (err: any)=>{
        if (err) return console.log(err);
    })
    res.json({error: false});
});

app.listen(3000);