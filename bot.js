// RhymeBot by Caleb Rodgers
// calebrodgers.com

// Setup Discord, the client, node-fetch, and dotenv
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
require('dotenv').config();

console.log('[🤖] Beep Boop! Quote-A-Bot Running!');

// Login the client to Discord
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('[🤩] Bot successfully connected to Discord!');
});

// When a message is received
client.on('message', msg => {
    if (msg.mentions.has(client.user)) {
        let sourceWord = msg.content.split(" ")[1];
        if (sourceWord) {

            let replyString;

            fetch(`https://api.datamuse.com/words?rel_rhy=${sourceWord}`).then(res => res.json()).then(json => {
                for (i = 0; i < json.length; i++) {
                    replyString = replyString + json[i].word;
                    if (i + 1 !== json.length) {
                        replyString = replyString + ", ";
                    } else {
                        replyString = replyString + "!";
                    }
                }
                msg.reply(replyString);
            });
        } else {
            msg.reply("I need a word to rhyme with, first!");
        }
    }
});