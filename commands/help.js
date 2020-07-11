const Discord = require("discord.js");
const config = require("./../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;

  let command = prefix + module.exports.help.name + 1;
  let msg = message.content.slice(command.length);
  

  if (msg === "") {
    let embed = new Discord.MessageEmbed()
      .setAuthor("Help center", config.qmark, config.url)
      .addField("Prefix", "` " + prefix + " `", true)
      .addField("Commands", " `commands` ", true)
      .addField("Learn About A Command", "`command [command_name]` ", true)

      .setColor(config.primary);
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  type: "general",
  usage: `${prefix}help`,
  about: "Literally a help command",
  aliases: [""]
};
