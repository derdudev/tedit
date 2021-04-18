const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const DATA_DIR = "/data";
const jsonParser = bodyParser.json();
app.use("/public", express.static(path.join(__dirname, "/")));
app.use(jsonParser);
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "/", "index.html"));
});
app.post("/save", (req, res) => {
    console.log(req.body);
    fs.writeFile(__dirname + DATA_DIR + "/data.json", JSON.stringify(req.body, null, 3), (err) => {
        if (err)
            return console.log(err);
    });
    res.json({ error: false });
});
app.listen(3000);
//# sourceMappingURL=index.js.map