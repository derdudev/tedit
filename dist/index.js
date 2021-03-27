const express = require("express");
const path = require("path");
const app = express();
app.use("/public", express.static(path.join(__dirname, "/")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/", "index.html"));
});
app.listen(3000);
//# sourceMappingURL=index.js.map