

require('dotenv').config({path: 'var.env'})
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes.js");

const server = express();
//server.use(express.bodyParser());
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.use('/api', routes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

