const express = require("express")
const path = require("node:path")
const carRouter = require("./routes/carRouter.js")
require('dotenv').config()

const app = express()
app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))


