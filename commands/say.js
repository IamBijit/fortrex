// message.channel.send(say)
const config = require("./../config.json")
let prefix = config.prefix;

const Discord = require("discord.js");
// const prefix = "!";

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;
 let command = prefix + module.exports.help.name + 1;
  let say = message.content.slice(command.length);
  let hasPerm = (message.guild.me.hasPermission("ADMINISTRATOR"));
  if(hasPerm){
  message.channel.startTyping();
  message.delete();
  setTimeout(() => {
    message.channel.send(say).then(message => {
      message.channel.stopTyping();
    });
  }, 2000);
} if(!hasPerm){
  return message.channel.send(`:sob: I need **admin** pwer for this action! `);
}
};

module.exports.help = {
  
  name: "say",
  type: "fun",
  usage: `${prefix}say hello`,
  about: "To make custom message through the bot!",
  aliases: [""]
};
