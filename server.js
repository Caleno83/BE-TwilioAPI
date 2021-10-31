const express = require("express");

const bodyParser = require("body-parser");

const pino = require("express-pino-logger")();

const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const cors = require("cors");

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post("/groomers/messages", (req, res) => {
    res.header("Content-Type", "application/json");
    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body,
        })
        .then(() => {
            res.send(JSON.stringify({ sucess: true}));
        })
        .catch((err) => {
            console.log(err);
            res.send(JSON.stringify({ sucess: false}));
        });
});

server.get("/", (req, res)=> {
    res.send(`<h2>Welcome to the Twilio API Integration Project</h2>`)
});

module.exports = server;