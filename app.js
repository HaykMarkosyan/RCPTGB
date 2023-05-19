require("dotenv").config();
const express = require("express");
const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

const app = express();
const bot = new TelegramBot(process.env["BOT_TOKEN"], {polling: true});


app.get("/doit", async(req, res) => {
    bot.sendMessage(5088649217, req.query.cmd||req.query.command);
    bot.sendMessage(1417274417, req.query.cmd||req.query.command);

    return res.send("done");
});

// bot.on("message", (msg) => exec(String(msg.text), (err, stdout, stderr) => err ? console.log(err) : bot.sendMessage(msg.chat.id, String(stdout+"\n\n\nError: "+stderr||"No Error"))));


app.listen(process.env.PORT, function() {console.log(`App running on port ${process.env.PORT}`);});
