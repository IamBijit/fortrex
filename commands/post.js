const Discord = require("discord.js");
const config = require("./../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;
  let command = prefix + module.exports.help.name + 1;

  let myMSG = message.content.slice(command.length);
  let user = message.mentions.users.first() || message.author;
  let postid = "#" + Math.floor(Math.random() * 10 * 1000);
  let embed = new Discord.MessageEmbed();

  let TheUser = message.author.username;
  embed.setDescription(`${myMSG}`);
  embed.setTimestamp();
  embed.setFooter(`Posted by ${TheUser}`, user.avatarURL);
  message.channel.send(embed);
  message.delete();
};

module.exports.help = {
  name: "post",
  type: "general",
  usage: '`'+prefix+'post [post_content]`',
  about: "Use this command to make an embed post",
  aliases: [""]
};
