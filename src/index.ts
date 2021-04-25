const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

const AdmZip = require("adm-zip");

const DATA_DIR = "/data";
const TEMP_DIR = "/temp";

const jsonParser = bodyParser.json()

app.use("/public",  express.static(path.join(__dirname, "/")));
app.use(jsonParser);

app.get("/", (_req: any, res: { sendFile: (arg0: any) => void; })=>{
    res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.post("/save", (req: any, res: any)=>{
    console.log(req.body);
    const saveDir = __dirname+DATA_DIR+TEMP_DIR+"/data.json";
    fs.mkdirSync(__dirname+DATA_DIR+TEMP_DIR);
    fs.writeFile(saveDir, JSON.stringify(req.body, null, 3), (err: any)=>{
        if (err) {
            throw err;
        }

        const file = new AdmZip();
        file.addLocalFile(saveDir);
        fs.writeFile(__dirname+DATA_DIR+"/untitled.ted", file.toBuffer(), ()=>{
            
        });

        fs.rmdir(__dirname+DATA_DIR+TEMP_DIR, {recursive:true}, (err: any) => {
            if (err) {
               throw err; 
            }
        });
    })
    res.json({error: false});
});

app.listen(3000);