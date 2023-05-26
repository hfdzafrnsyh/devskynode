const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')


app.use(cors())
app.use("*", cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


require('dotenv').config()

const routes = require("./routes/routes");
routes(app)


module.exports=app;