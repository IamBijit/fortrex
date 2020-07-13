const Discord = require('discord.js')
const botconfig = require("./../config.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  


    let msg = await message.channel.send("Generating avatar...");

    let mentionedUser = message.mentions.users.first() || message.author;

        let embed = new Discord.MessageEmbed()

        .setImage(mentionedUser.avatarURL())
        .setColor(botconfig.primary)
        .setTitle("Avatar")
        .setFooter("Searched by " + message.author.tag)
        .setDescription("[Avatar URL link]("+mentionedUser.avatarURL()+")");

        message.channel.send(embed)


    msg.delete();
}

module.exports.help = {
  name:"avatar",
  type:"general",
  usage: "`avatar [mention_user]`",
  about: "Use this command to get user avatar",
  aliases: ["dp"]
}
