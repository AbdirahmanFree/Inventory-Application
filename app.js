const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter.js");
require('dotenv').config();

const app = express();
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use("/",indexRouter);
const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`listiening at http://localhost:${PORT}`);
})




