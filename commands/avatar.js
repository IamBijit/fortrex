const Discord = require('discord.js')
const botconfig = require("./../config.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  


    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(botconfig.primary)
      .setAuthor(user.username)
      .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);

}

module.exports.help = {
  name:"avatar",
  type:"general",
  usage: "`avatar [mention_user]`",
  about: "Use this command to get user avatar",
  aliases: ["dp"]
}